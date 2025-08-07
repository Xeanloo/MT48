////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Access Control
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetAccessControl(szItemId)
{
    var jsAccessControl = GetAccessControlJSON();
    if (jsAccessControl)
    {
        if (jsAccessControl.locks && IsItemProtected(szItemId, jsAccessControl.locks))
        {
            var szPassword = prompt("Password requested to access to " + GetItemName(szItemId, jsAccessControl.items) + " page", "");

            var tPasswords = GetItemPasswords(szItemId, jsAccessControl.locks);
            for (var i = 0; i < tPasswords.length; i++)
            {
                if (szPassword == DecryptLockPassword(tPasswords[i]))
                {
                    return true;
                }
            }
            
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return true;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetAccessControlJSON()
{
    var jsEngine;

    if (RavennaDeviceCache && RavennaDeviceCache.document())
    {
        jsEngine = RavennaDeviceCache.document();
    }

    if (jsEngine == null)
    {
        return;
    }

    if (jsEngine._oem_ui_process_engine == null || jsEngine._oem_ui_process_engine.access_control == null)
    {
        return;
    }

    return jsEngine._oem_ui_process_engine.access_control;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsItemProtected(szItemId, jsLocks)
{
    var bProtected = false;

    for (var idx = 0; idx < jsLocks.length; idx++)
    {
        if (JSON.stringify(jsLocks[idx].items).includes(szItemId))
        {
            nLockIdx = idx;
            bProtected = true;
            break;
        }
    }

    return bProtected;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetItemName(szItemId, jsAccessControlItems)
{
    for (var idx = 0; idx < jsAccessControlItems.length; idx++)
    {
        if (jsAccessControlItems[idx].id  == szItemId)
        {
            return jsAccessControlItems[idx].name;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetItemPasswords(szItemId, jsLocks)
{
    var tPasswords = [];
    for (var idx = 0; idx < jsLocks.length; idx++)
    {
        if (JSON.stringify(jsLocks[idx].items).includes(szItemId))
        {
            tPasswords.push(jsLocks[idx].password);
        }
    }

    return tPasswords;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DecryptLockPassword(szEncryptedPassword)
{
    var szPaswordKey = "$%FRGREW543wgfdsge4534r$%#$%#$RTRgsdfgRETWE";
    var uiPos = 0;

    var szDecryptedPassWord = "";
    for (var idx = 0; idx < szEncryptedPassword.length; idx++)
    {
        szDecryptedPassWord += String.fromCharCode(szEncryptedPassword[idx].charCodeAt(0) ^ szPaswordKey[uiPos].charCodeAt(0));

        ++uiPos;
        uiPos %= szPaswordKey.length;
    }
    return szDecryptedPassWord;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetItemIdFromSettingsName(szSettingsName)
{
    switch (szSettingsName)
    {
        case "GeneralSettings":
            return "_SettingsGeneral";

        case "MeterSettings":
            return "_SettingsMeters";

        case "MonitoringSettings":
            return "_SettingsMonitoring";

        case "PresetSettings":
            return "_SettingsPresets";
    }
}