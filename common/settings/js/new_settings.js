////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Settings
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const WIZARD_MISSION_ID          = 0;
const MONITOR_MISSION_ID         = 1;
const NETWORK_IO_MISSION_ID      = 2;
const MUSIC_MISSION_ID           = 3;
const MUSIC_LITE_MISSION_ID      = 4;
const COMMENTARY_UNIT_MISSION_ID = 5;
const MIXING_CONSOLE_MISSION_ID  = 6;
const VENUE_MISSION_ID           = 7;
const MT48_MUSIC_MISSION_ID      = 8;
const MT48_MONITOR_MISSION_ID    = 9;

const g_nSettingsHeight = 40;
const g_nSettingsBorderWidth = 1;
const g_nSettingsGoToMargin = 2;
const g_nSettingsParamMargin = 20;

var g_nCurrentMissionID = -1;

var g_isSettingsScroller = null;
var g_nSettingsMainScrollY = 0;
var g_nSettingsScrollY = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsMT48()
{
    var nProductType = GetJSONValue("$.identity.product_type");
    switch (nProductType)
    {
        case 7: // device::zman::EPT_AnubisUSB
        case 107: // device::zman::EPT_AnubisUSB_Dante
            return true;
        default:
            return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsDante()
{
    var nProductType = GetJSONValue("$.identity.product_type");
    switch (nProductType)
    {
        case 101: // EPT_Anubis_Dante
        case 102: // EPT_HapiMkII_Dante
        case 103: // EPT_ZOEM_Dante
        case 107: // EPT_AnubisUSB_Dante = 107
            return true;
        default:
            return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDanteLogo()
{
	if (e_DanteLogo)
	{
		if (IsDante())
		{
			e_DanteLogo.classList.add("On");
		}
		else
		{
			e_DanteLogo.classList.remove("On");
		}
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetDeviceJSON()
{
    var jsDevice = null;

	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
        jsDevice = RavennaDeviceCache.document();
	}

    if (jsDevice == null)
	{
		return;
	}

    return jsDevice;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetJSONValue(szPath)
{
    var jsDevice = GetDeviceJSON();
    if (jsDevice == null)
    {
        return null;
    }

    var result = RavennaDeviceCache.getSubValue2(jsDevice, szPath);
    if (result == null)
    {
        return null;
    }

    if (result.hasOwnProperty("value"))
    {
        return result.value;
    }
    else
    {
        return null;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetRowTextElement(eRow)
{
    var eRowChildren = eRow.childNodes;
    for (var nIdx = 0; nIdx < eRowChildren.length; nIdx++)
    {
        if (eRowChildren[nIdx].classList.contains("settingsRowText") && eRowChildren[nIdx].innerText != "")
        {
            return eRowChildren[nIdx];
        }
    }

    return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AdaptRowTextElementWidth(eRow, nReduceWidth, bFirstAdapt)
{
    var eRowChildren = eRow.childNodes;

    var eRowText = null;
    for (var nIdx = 0; nIdx < eRowChildren.length; nIdx++)
    {
        if (eRowChildren[nIdx].classList.contains("settingsRowText") && eRowChildren[nIdx].innerText != "")
        {
            eRowText = eRowChildren[nIdx];
            break;
        }
    }

    if (eRowText)
    {
        if (bFirstAdapt)
        {
            for (var nIdx = 0; nIdx < eRowChildren.length; nIdx++)
            {
                if (eRowChildren[nIdx] != eRowText)
                {
                    nReduceWidth += eRowChildren[nIdx].offsetWidth;
                }
                else
                {
                    break;
                }
            }
        }

        eRowText.style.width = (eRowText.offsetWidth - nReduceWidth) + "px";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsFirstAdapt(eRow, nNbNewChildren)
{
    var eChildren = eRow.childNodes;
    var nNbElements = 1;
    for (var nIdx = 0; nIdx < eChildren.length; nIdx++)
    {
        if (eChildren[nIdx].classList.contains("settingsRowImage"))
        {
            nNbElements++;
            break;
            return eChildren.length <= 2 + (nNbNewChildren == undefined ? 1 : nNbNewChildren);
        }
    }

    return eChildren.length <= nNbElements + (nNbNewChildren == undefined ? 1 : nNbNewChildren);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowSettingsPopupContainer()
{
	var eSettingsSectionPopupContainer = document.getElementById("settingsSectionPopupContainer");
	if (eSettingsSectionPopupContainer == null)
	{
		return;
	}

	eSettingsSectionPopupContainer.classList.add("settingsSectionPopupContainer-show");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSettingsPopupContainer()
{
	var eSettingsSectionPopupContainer = document.getElementById("settingsSectionPopupContainer");
	if (eSettingsSectionPopupContainer == null)
	{
		return;
	}

	eSettingsSectionPopupContainer.classList.remove("settingsSectionPopupContainer-show");

	eSettingsSectionPopupContainer.innerHTML = "";
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsSection()
{
    var eSettingsSection = document.getElementById("newSettingsSection");
    if (eSettingsSection == null)
    {
        return;
    }

    if (!eSettingsSection.classList.contains("visible"))
        eSettingsSection.classList.add("visible");

    var jsMissionEngine;
    if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
        jsMissionEngine = RavennaDeviceCache.document();
	}

    var nMissionID = -1;
    if (jsMissionEngine && jsMissionEngine.identity)
    {
        nMissionID = jsMissionEngine.identity.anubis_mission;
    }

    g_nCurrentMissionID = nMissionID;

    BuildSettings();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSettingsSection()
{
    var eSettingsSection = document.getElementById("newSettingsSection");
    if (eSettingsSection)
    {
        if (eSettingsSection.classList.contains("visible"))
        {
            eSettingsSection.classList.remove("visible");
            eSettingsSection.innerHTML = "";
        }
    }

    g_nCurrentMissionID = -1;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildSettings()
{
    if (g_nCurrentMissionID == -1)
    {
        return;
    }

    var eSettingsSection = document.getElementById("newSettingsSection");
    if (eSettingsSection == null)
    {
        return;
    }

    eSettingsSection.innerHTML = "";

    var nScrollContainerHeight = eSettingsSection.offsetHeight - 35;

    var szPage = "";
    {
        szPage += "<div id='settingsTitleClose' class='settingsTitleClose' style='top: " + eSettingsSection.offsetTop + "px;'>X</div>";

        szPage += "<div id='settingsTitle' class='settingsTitle'>SETTINGS</div>";

        szPage += "<div id='settingsScrollContainer' class='settingsScrollContainer' style='height: " + nScrollContainerHeight + "px;'>";

            szPage += "<div id='settingsScroll' class='settingsScroll'></div>";

        szPage += "</div>";
    }
    eSettingsSection.innerHTML = szPage;


    var eSettingsScroll = document.getElementById("settingsScroll");
    if (eSettingsScroll == null)
    {
        return;
    }

    var nGoToIndex = 0;

    AddRowGoTo("General-" + nGoToIndex++, "GENERAL", function () { OpenSettingsGeneral(); }, "common/Settings.png", eSettingsScroll);
    switch (g_nCurrentMissionID)
    {
        case MONITOR_MISSION_ID:
        case MT48_MONITOR_MISSION_ID:
        {
            AddRowGoTo("Meters-" + nGoToIndex++, "METERS", function () { OpenSettingsMeters(); }, "common/Meters.png", eSettingsScroll);
            //AddRowGoTo("Presets-" + nGoToIndex++, "PRESETS", function () { OpenSettingsPresets(); }, "common/Presets.png", eSettingsScroll);

            AddRowTitle("Monitoring", "MONITORING", eSettingsScroll);
            {
                AddRowGoTo("MonitoringMonitorLevels-" + nGoToIndex++, "MONITOR LEVELS", function () { OpenSettingsMonitorLevels(); }, "common/Levels.png", eSettingsScroll);
            }

            AddRowTitle("IO", "I/O", eSettingsScroll);
            {
				if (!IsDante())
					AddRowGoTo("IOAudioInputs-" + nGoToIndex++, "AUDIO INPUTS", function () { OpenSettingsAudioInputs(); }, "common/InOut.png", eSettingsScroll);
				
                AddRowGoTo("IOAudioOutputs-" + nGoToIndex++, "AUDIO OUTPUTS", function () { OpenSettingsAudioOutputs(); }, "common/InOut.png", eSettingsScroll);

                if (IsMT48())
                {
                    AddRowGoTo("IOUSBIOs-" + nGoToIndex++, (IsDante() ? "USB-DANTE I/O" : "USB I/O"), function () { OpenSettingsUSBDanteMapping(); }, "common/USB.png", eSettingsScroll);
                }
                else if (IsDante())
                {
                    AddRowGoTo("IODanteIOs-" + nGoToIndex++, "DANTE I/O", function () { OpenSettingsUSBDanteMapping(); }, "common/Dante.png", eSettingsScroll);
                }

                if (g_nCurrentMissionID == MT48_MONITOR_MISSION_ID)
                    AddRowGoTo("IOOpticalIOs-" + nGoToIndex++, "OPTICAL I/O", function () { OpenSettingsOpticalIOs(); }, "common/Toslink.png", eSettingsScroll);
            }
            break;
        }

        case MUSIC_MISSION_ID:
        {         
            AddRowTitle("IO", "I/O", eSettingsScroll);
            {
				if (!IsDante())
					AddRowGoTo("IOAudioInputs-" + nGoToIndex++, "AUDIO INPUTS", function () { OpenSettingsAudioInputs(); }, "common/InOut.png", eSettingsScroll);

                AddRowGoTo("IOAudioOutputs-" + nGoToIndex++, "AUDIO OUTPUTS", function () { OpenSettingsAudioOutputs(); }, "common/InOut.png", eSettingsScroll);

                if (IsDante())
                    AddRowGoTo("IODanteIOs-" + nGoToIndex++, "DANTE I/O", function () { OpenSettingsUSBDanteMapping(); }, "common/Dante.png", eSettingsScroll);
            }

            AddRowTitle("Music", "MUSIC", eSettingsScroll);
            {
                var eRow = AddRow("MusicExpertMode", "EXPERT MODE", eSettingsScroll, "/common/GPO.png");
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "expert_mode", false, false, "", "", false, eRow);
            }

            AddRowGoTo("MusicMixing-" + nGoToIndex++, "MIXING", function () { OpenSettingsMixing(); }, "common/Samplerate.png", eSettingsScroll);
            AddRowGoTo("MusicMonitoring-" + nGoToIndex++, "MONITORING", function () { OpenSettingsMonitoring(); }, "music_common/Monitoring.png", eSettingsScroll);
            AddRowGoTo("Meters-" + nGoToIndex++, "METERS", function () { OpenSettingsMeters(); }, "common/Meters.png", eSettingsScroll);
            break;
        }

        case COMMENTARY_UNIT_MISSION_ID:
        {
            AddRowGoTo("Commentary-" + nGoToIndex++, "COMMENTARY", function () { OpenSettingsCommentary(); }, "music_common/Talk.png", eSettingsScroll);
            AddRowGoTo("Commentator0-" + nGoToIndex++, "COMMENTATOR 1", function () { OpenSettingsCommentator(0); }, "music_common/Talk.png", eSettingsScroll);
            AddRowGoTo("Commentator1-" + nGoToIndex++, "COMMENTATOR 2", function () { OpenSettingsCommentator(1); }, "music_common/Talk.png", eSettingsScroll);
            AddRowGoTo("Monitoring-" + nGoToIndex++, "MONITORING", function () { OpenSettingsMonitoring(); }, "music_common/Monitoring.png", eSettingsScroll); 
            AddRowGoTo("Monitoring-" + nGoToIndex++, "AUTO-DIM", function () { OpenSettingsAutoDim(); }, "music_common/Dim.png", eSettingsScroll); 
            AddRowGoTo("Meters-" + nGoToIndex++, "METERS", function () { OpenSettingsMeters(); }, "common/Meters.png", eSettingsScroll);
            AddRowGoTo("AudioOutputs-" + nGoToIndex++, "AUDIO OUTPUTS", function () { OpenSettingsAudioOutputs(); }, "common/InOut.png", eSettingsScroll);
            break;
        }

        case MT48_MUSIC_MISSION_ID:
        {
            if (!IsDante())
                AddRowGoTo("AudioInputs-" + nGoToIndex++, "AUDIO INPUTS", function () { OpenSettingsAudioInputs(); }, "common/InOut.png", eSettingsScroll);            
            AddRowGoTo("AudioOutputs-" + nGoToIndex++, "AUDIO OUTPUTS", function () { OpenSettingsAudioOutputs(); }, "common/InOut.png", eSettingsScroll);
            AddRowGoTo("OpticalIOs-" + nGoToIndex++, "OPTICAL I/O", function () { OpenSettingsOpticalIOs(); }, "common/Toslink.png", eSettingsScroll);
            AddRowGoTo("USBIOs-" + nGoToIndex++, (IsDante() ? "USB-DANTE I/O" : "USB I/O"), function () { OpenSettingsUSBDanteMapping(); }, "common/USB.png", eSettingsScroll);
            AddRowGoTo("Monitoring-" + nGoToIndex++, "MONITORING", function () { OpenSettingsMonitoring(); }, "music_common/Monitoring.png", eSettingsScroll);
            AddRowGoTo("Meters-" + nGoToIndex++, "METERS", function () { OpenSettingsMeters(); }, "common/Meters.png", eSettingsScroll);
            break;
        }

        default:
            break;
    }

    AddRowTitle("Empty", "", eSettingsScroll);
    AddRowGoTo("EmptyInfo-" + nGoToIndex++, "INFO", function () { OpenSettingsInfo(); }, "common/Info.png", eSettingsScroll);
    AddRowGoTo("EmptyExit-" + nGoToIndex++, "EXIT", function () { OpenSettingsExit(); }, "common/Exit.png", eSettingsScroll);

    ResizeScroll(true);

    AddEvent("settingsTitleClose", "click", function () { _toggleSettings(); });

    if (g_nSettingsGoToIndex != -1)
    {
        var eRows = document.getElementsByClassName("settingsRow")
        for (var nIdx = 0; nIdx < eRows.length; nIdx++)
        {
            var eGoTo = eRows[nIdx].lastChild;
            if (eGoTo && eGoTo.classList.contains("settingsGoToArrow") && eRows[nIdx].id.includes("-" + g_nSettingsGoToIndex))
            {
                eRows[nIdx].click();
                break;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSettingsSectionTitle(szTitle)
{
    var eTitle = document.getElementById("settingsTitle");
    if (eTitle == null)
    {
        return;
    }

    eTitle.innerText = szTitle;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetScroll(bFromMain)
{
    if (g_isSettingsScroller)
    {
        if (bFromMain)
        {
            g_nSettingsScrollY = 0;
        }
        else
        {
            g_nSettingsMainScrollY = g_isSettingsScroller.y;
        }

        g_isSettingsScroller.destroy();
        g_isSettingsScroller = null;
    }
    g_isSettingsScroller = new iScroll("settingsScrollContainer", { hScroll: false, vScroll: true, bounce: false, wheelAction: "none" });

    g_isSettingsScroller.scrollTo(0, bFromMain ? g_nSettingsMainScrollY : g_nSettingsScrollY, 0);

    AddEvent("settingsScrollContainer", "click", function ()
    {
        var eIntegerFloatInputs = document.getElementsByClassName("settingsIntegerFloatValueInputParam");
        for (var nIdx = 0; nIdx < eIntegerFloatInputs.length; nIdx++)
        {
            eIntegerFloatInputs[nIdx].blur();
        }

        var eIPAddressInputs = document.getElementsByClassName("settingsIPAddressInputParam");
        for (var nIdx = 0; nIdx < eIPAddressInputs.length; nIdx++)
        {
            eIPAddressInputs[nIdx].blur();
        }

        var eTextInputs = document.getElementsByClassName("settingsTextInputParam");
        for (var nIdx = 0; nIdx < eTextInputs.length; nIdx++)
        {
            eTextInputs[nIdx].blur();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResizeScroll(bMain)
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    var FakeRow = document.createElement("div");
    FakeRow.classList.add(bMain ? "settingsMainFakeRow" : "settingsFakeRow");

    eScroll.appendChild(FakeRow);

    SetScroll(bMain);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TitleRows
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRowGoTo(szID, szText, fnCallback, szImagePath, eScroll)
{
    if (szID == "" || szText == "" || fnCallback == null || szImagePath == "" || eScroll == null )
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsGoTo" + szID;
    eRow.classList.add("settingsRow");

    var szPage = "";
    {
        szPage += "<div id='' class='settingsGoToImage' style='background-image: url(../common/settings/images/" + szImagePath + ");'></div>";
        szPage += "<div id='' class='settingsGoToRowText'>" + szText + "</div>";
        szPage += "<div id='' class='settingsGoToArrow'>></div>";
    }
    eRow.innerHTML = szPage;

    eScroll.appendChild(eRow);

    AddEvent(eRow.id, "click", function ()
    {
        g_nSettingsGoToIndex = Number(szID.substring(szID.indexOf("-") + 1));
        save_ToCookie(true);

        fnCallback();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddSettingsBackTo(szText)
{
    var eSection = document.getElementById("newSettingsSection");
    var eScrollContainer = document.getElementById("settingsScrollContainer");
    if (eSection == null || eScrollContainer == null)
    {
        return;
    }    

    var eRow = document.createElement("div");
    eRow.id = "settingsBackToSettings";
    eRow.classList.add("settingsRow");

    var szPage = "";
    {
        szPage += "<div id='' class='settingsBackToArrow'><</div>";
        szPage += "<div id='' class='settingsBackToText'>" + szText + "</div>";
    }
    eRow.innerHTML = szPage;    

    eSection.insertBefore(eRow, eScrollContainer);

    eScrollContainer.style.height = eSection.offsetHeight - 35 - (g_nSettingsHeight + g_nSettingsBorderWidth * 2) + "px";

    AddEvent(eRow.id, "click", function ()
    {
        g_nSettingsGoToIndex = -1;
        save_ToCookie(true);

        BuildSettings();
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRowTitle(szID, szText, eScroll)
{
    if (szID == "" || eScroll == null)
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsTitle" + szID;
    eRow.classList.add("settingsRow");
    eRow.classList.add("settingsRowTitle");

    var szPage = "";
    {
        szPage += "<div id='' class='settingsTitleRowText'>" + szText + "</div>";
        szPage += "<div id='settingsTitle" + szID + "Collapse' class='settingsRowTitleCollapse'>&#8722;</div>";
    }
    eRow.innerHTML = szPage;

    eScroll.appendChild(eRow);
    
    AddEvent(eRow.id, "click", function ()
    {
        var eCollapse = document.getElementById("settingsTitle" + szID + "Collapse");
        if (eCollapse)
        {
            var bCollapse = !eCollapse.classList.contains("collapsed");

            bCollapse ? eCollapse.classList.add("collapsed") : eCollapse.classList.remove("collapsed");
            eCollapse.innerHTML = bCollapse ? "+" : "&#8722;";

            var eRows = document.getElementsByClassName("settingsRow");
            for (var nIdx = 0; nIdx < eRows.length; nIdx++)
            {
                if (eRows[nIdx].id.includes(szID) && !eRows[nIdx].classList.contains("settingsRowTitle"))
                    bCollapse ? eRows[nIdx].classList.add("hidden") : eRows[nIdx].classList.remove("hidden");
            }

            var eScalableRows = document.getElementsByClassName("settingsRowHeightScalable");
            for (var nIdx = 0; nIdx < eScalableRows.length; nIdx++)
            {
                if (eScalableRows[nIdx].id.includes(szID))
                    bCollapse ? eScalableRows[nIdx].classList.add("hidden") : eScalableRows[nIdx].classList.remove("hidden");
            }

            SetScroll(false);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SettingsRows
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRow(szID, szText, eScroll, szImagePath, bEndRowImage)
{
    if (szID == "" || eScroll == null)
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsRow" + szID;
    eRow.classList.add("settingsRow");

    if (szText == "EMPTY")
        eRow.classList.add("settingsTitleRowTextEmpty");

    var szPage = "";
    {
        if (szImagePath != "" && szImagePath != undefined && bEndRowImage == undefined)
            szPage += "<div id='' class='settingsRowImage' style='background-image: url(../common/settings/images/" + szImagePath + ");'></div>";

        szPage += "<div id='' class='settingsRowText'>" + szText + "</div>";

        if (szImagePath != "" && szImagePath != undefined && bEndRowImage != undefined && bEndRowImage)
            szPage += "<div id='' class='settingsRowImage' style='background-image: url(../common/settings/images/" + szImagePath + ");'></div>";
    }
    eRow.innerHTML = szPage;    

    eScroll.appendChild(eRow);

    if (bEndRowImage)
    {
        eRow.firstChild.style.width = (eRow.firstChild.offsetWidth - eRow.lastChild.offsetWidth) + "px";
    }

    return eRow;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRowHeightScalable(szID, szText, eScroll, szImagePath)
{
    if (szID == "" || eScroll == null)
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsRow" + szID;
    eRow.classList.add("settingsRowHeightScalable");

    var szPage = "";
    {
        if (szImagePath != "" && szImagePath != undefined)
            szPage += "<div id='' class='settingsRowImage' style='background-image: url(../common/settings/images/" + szImagePath + ");'></div>";

        szPage += "<div id='' class='settingsRowText'>" + szText + "</div>";
    }
    eRow.innerHTML = szPage;

    eScroll.appendChild(eRow);

    return eRow;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRowDateTime(szID, eScroll)
{
    if (szID == "" || eScroll == null)
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsRow" + szID;
    eRow.classList.add("settingsRowHeightScalable");

    var szPage = "";
    {
        szPage += "<div id='settingsText1' class='settingsRowText'>DATE</div>";
        szPage += "<div id='settingsParam" + szID + "Day' class='settingsDateTime'></div>";
        szPage += "<div id='settingsDateTimeSeparator' class='settingsDateTimeSeparator'>/</div>";
        szPage += "<div id='settingsParam" + szID + "Month' class='settingsDateTime'></div > ";
        szPage += "<div id='' class='settingsDateTimeSeparator'>/</div>";
        szPage += "<div id='settingsParam" + szID + "Year' class='settingsDateTime'></div>";

        szPage += "<div id='settingsText2' class='settingsRowText'>TIME</div>";
        szPage += "<div id='settingsParam" + szID + "Hour' class='settingsDateTime'></div>";
        szPage += "<div id='' class='settingsDateTimeSeparator'>:</div>";
        szPage += "<div id='settingsParam" + szID + "Minute' class='settingsDateTime'></div>";
        szPage += "<div id='' class='settingsDateTimeSeparator'>:</div>";
        szPage += "<div id='settingsParam" + szID + "Second' class='settingsDateTime'></div>";
    }
    eRow.innerHTML = szPage;

    var eApply = document.createElement("div");
    eApply.id = "settingsParam" + szID + "Apply";
    eApply.classList.add("settingsDateTimeApply");
    eApply.innerText = "APPLY DATE & TIME TO DEVICE";

    eRow.appendChild(eApply);

    eScroll.appendChild(eRow);

    eRow.style.height = "123px";

    var eTitle1 = document.getElementById("settingsText1");
    var eTitle2 = document.getElementById("settingsText2");
    var eDay = document.getElementById("settingsParam" + szID + "Day");
    var eSeparator = document.getElementById("settingsDateTimeSeparator");
    if (eTitle1 && eTitle2 && eDay && eSeparator)
    {
        eTitle1.style.width = (eTitle1.offsetWidth - eDay.offsetWidth * 3 - eSeparator.offsetWidth * 2) + "px";
        eTitle2.style.width = (eTitle2.offsetWidth - eDay.offsetWidth * 3 - eSeparator.offsetWidth * 2) + "px";
    }

    AddEvent(eApply.id, "click", function () { if (!eApply.classList.contains("Disabled")) { DateTimeApply(); } });

    UpdateDateTime();
    window.setInterval(UpdateDateTime, 1000);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDateTime()
{
    var eDay = document.getElementById("settingsParamDate&TimeDay");
    var eMonth = document.getElementById("settingsParamDate&TimeMonth");
    var eYear = document.getElementById("settingsParamDate&TimeYear");
    var eHour = document.getElementById("settingsParamDate&TimeHour");
    var eMinute = document.getElementById("settingsParamDate&TimeMinute");
    var eSecond = document.getElementById("settingsParamDate&TimeSecond");

    if (eDay && eMonth && eYear && eHour && eMinute && eSecond)
    {
        var now = new Date();

        eYear.innerText = now.getFullYear();
        eMonth.innerText = Number(now.getMonth() + 1);
        eDay.innerText = now.getDate();
        eHour.innerText = now.getHours();
        eMinute.innerText = now.getMinutes();
        eSecond.innerText = now.getSeconds();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DateTimeApply()
{
    var now = new Date();
    var szSubst1 = now.toISOString().substring(0, 19); // first cut off unneeded
    var szSubst2 = szSubst1.replace(/-/g, "."); // this is the regular expression with option g to find all dashes "-"
    var szDateTime = szSubst2.replace("T", "-");  // since there is only one "T" this replace is fine

    var setDateTimeCommand = "set_date " + szDateTime;
    self.Communicator.publish("/service/ravenna/commands", { command: setDateTimeCommand });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddRowBoardsRunRow(eScroll)
{
    if (eScroll == null)
    {
        return;
    }

    var eRow = document.createElement("div");
    eRow.id = "settingsRowBoardsRun";
    eRow.classList.add("settingsRow");

    var szPage = "<div id='' class='settingsRowText'>BOARDS RUN</div>";

    var szID = eRow.id.replace("settingsRow", "");

    var eText = document.createElement("div");
    eText.id = "settingsParam" + szID + "Text";
    eText.classList.add("settingsTextParamBoardRevisions");

    eRow.innerHTML = szPage;

    eRow.appendChild(eText);

    eScroll.appendChild(eRow);

    AdaptRowTextElementWidth(eRow, eText.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    var jsInitialValue = GetJSONValue("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.anubis");

    RouterApp.notifyMe("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.anubis", function (data)
    {
        UpdateRowBoardsRunRow(eText, data);
    });

    UpdateRowBoardsRunRow(eText, jsInitialValue);

    return eRow;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateRowBoardsRunRow(eText, jsAnubis)
{
    if (jsAnubis.hasOwnProperty("optical_run_id") || jsAnubis.hasOwnProperty("main_run_id") || jsAnubis.hasOwnProperty("front_run_id") || jsAnubis.hasOwnProperty("ui_run_id")
     || jsAnubis.hasOwnProperty("main_run") || jsAnubis.hasOwnProperty("front_run") || jsAnubis.hasOwnProperty("ui_run"))
    {
        let szRevisions = "";

        if (jsAnubis.hasOwnProperty("manufacturing_code") && jsAnubis.manufacturing_code != 0xFFFFFFFF)
        {       
            if (jsAnubis.hasOwnProperty("optical_run_id"))
            {
                szRevisions += "Optical: " + jsAnubis.optical_run_id + " ";
            }

            szRevisions += "Main: " + jsAnubis.main_run_id;
            szRevisions += " Front: " + jsAnubis.front_run_id;
            szRevisions += " UI: " + jsAnubis.ui_run_id;
        }
        else
        {
            szRevisions += "Main: " + jsAnubis.main_run;
            szRevisions += " Front: " + jsAnubis.front_run;
            szRevisions += " UI: " + jsAnubis.ui_run;
        }

        eText.innerHTML = szRevisions;
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SettingsParams
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddSwitchParam(szPath, szName, bReadOnly, bQuestionBox, szText, szInformativeText, bRebootOnChange, eRow, bNotValue)
{
    if (szPath == "" || szName == "" || eRow == null)
    {
        return;
    }

    var bInitialValue = GetJSONValue(szPath + "." + szName);
    if (bInitialValue == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eSwitch = document.createElement("div");
    eSwitch.id = "settingsParam" + szID + "Switch";
    eSwitch.classList.add("settingsSwitchParam");

    var eSwitchCursor = document.createElement("div");
    eSwitchCursor.id = "settingsParam" + szID + "SwitchCursor";
    eSwitchCursor.classList.add("settingsSwitchParamCursor");

    if (bReadOnly)
    {
        eSwitch.classList.add("settingsSwitchParamReadOnly");
        eSwitchCursor.classList.add("settingsSwitchParamReadOnly");
    }

    eSwitch.appendChild(eSwitchCursor);
    eRow.appendChild(eSwitch);

    AdaptRowTextElementWidth(eRow, eSwitch.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    if (!bReadOnly)
    {
        if (bQuestionBox)
        {
            AddEvent(eSwitch.id, "click", function () { OpenQuestionBoxPopup(eSwitch, szText, szInformativeText, function () { PublishSettings(szPath, szName, !eSwitch.classList.contains("On")); CloseSettingsPopupContainer(); if (bRebootOnChange) self.Communicator.publish("/service/ravenna/commands", { command: "reboot" }); }); });
        }
        else
        {
            AddEvent(eSwitch.id, "click", function () { PublishSettings(szPath, szName, (bNotValue != undefined && bNotValue ? eSwitch.classList.contains("On") : !eSwitch.classList.contains("On"))); });
        }
    }

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateSwitchParam(eSwitch, eSwitchCursor, data.value, bNotValue);
    });

    UpdateSwitchParam(eSwitch, eSwitchCursor, bInitialValue, bNotValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddPTPMasterSwitch(szPath, eRow)
{
    if (szPath == "" || eRow == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eSwitch = document.createElement("div");
    eSwitch.id = "settingsParam" + szID + "Switch";
    eSwitch.classList.add("settingsSwitchParam");

    var eSwitchCursor = document.createElement("div");
    eSwitchCursor.id = "settingsParam" + szID + "SwitchCursor";
    eSwitchCursor.classList.add("settingsSwitchParamCursor");

    eSwitch.appendChild(eSwitchCursor);
    eRow.appendChild(eSwitch);

    AdaptRowTextElementWidth(eRow, eSwitch.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    AddEvent(eSwitch.id, "click", function ()
    {
        var bToUpdate = !eSwitch.classList.contains("On");

        self.Communicator.publish("/service/ravenna/settings", { path: szPath, value: { module_id: ZMI_SYNC, input_id: bToUpdate ? 0 : 1 } }); // device::zman::EModuleSyncinput_id::Internal / // device::zman::EModuleSyncinput_id::Ravenna
    });

    RouterApp.notifyMe(szPath, function (data)
    {
        var bValue = GetJSONValue(szPath + ".module_id") == ZMI_SYNC && GetJSONValue(szPath + ".input_id") == 0; // device::zman::EModuleSyncinput_id::Internal

        UpdateSwitchParam(eSwitch, eSwitchCursor, bValue);
    });

    var bInitialValue = GetJSONValue(szPath + ".module_id") == ZMI_SYNC && GetJSONValue(szPath + ".input_id") == 0; // device::zman::EModuleSyncinput_id::Internal

    UpdateSwitchParam(eSwitch, eSwitchCursor, bInitialValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSwitchParam(eSwitch, eSwitchCursor, bValue, bNotValue)
{
    if (eSwitch && eSwitchCursor)
    {
        var bOn = bValue;
        if (bNotValue != undefined)
            bOn = !bValue;

        bOn ? eSwitch.classList.add("On") : eSwitch.classList.remove("On");
        bOn ? eSwitchCursor.classList.add("On") : eSwitchCursor.classList.remove("On");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddUSBDanteMappingParam(szPath, szName, eRow)
{
    if (szPath == "" || szName == "" || eRow == null)
    {
        return;
    }

    var bInitialValue = GetJSONValue(szPath + "." + szName);
    if (bInitialValue == null)
    {
        return;
    }

    var bInitialText = GetJSONValue(szPath + ".state." + szName + "_text");
    if (bInitialText == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eParam = document.createElement("div");
    if (szPath.includes("dante_mapping"))
    {
        eParam.id = "settingsParam" + szID + "DanteMapping";
    }
    else
    {
        eParam.id = "settingsParam" + szID + "USBMapping";
    }
    eParam.classList.add("settingsUSBDanteParam");

    eRow.appendChild(eParam);

    AdaptRowTextElementWidth(eRow, eParam.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    AddEvent(eParam.id, "click", function () { PublishSettings(szPath, szName, !eParam.classList.contains("On")); });

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateUSBDanteParam(eParam, data.value, null);
    });

    RouterApp.notifyMe(szPath + ".state." + szName + "_text", function (data)
    {
        UpdateUSBDanteParam(eParam, null, data.value);
    });

    UpdateUSBDanteParam(eParam, bInitialValue, bInitialText);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateUSBDanteParam(eParam, bValue, szText)
{
    if (eParam)
    {
        if (bValue != null)
            bValue ? eParam.classList.add("On") : eParam.classList.remove("On");

        if (szText != null)
            eParam.innerHTML = (szText == "" ? "-" : szText);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddOnOffParam(szPath, szName, szHTMLText, eRow)
{
    if (szPath == "" || szName == "" || szHTMLText == "" || eRow == null)
    {
        return;
    }

    var bInitialValue = GetJSONValue(szPath + "." + szName);
    if (bInitialValue == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eOnOff = document.createElement("div");
    eOnOff.id = "settingsParam" + szID + "OnOff";
    eOnOff.classList.add("settingsOnOffParam");
    eOnOff.innerHTML = szHTMLText;

    eRow.appendChild(eOnOff);

    AdaptRowTextElementWidth(eRow, eOnOff.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    AddEvent(eOnOff.id, "click", function ()
    {
        var bToUpdate = !eOnOff.classList.contains("On");

        PublishSettings(szPath, szName, bToUpdate);
    });

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateOnOffParam(eOnOff, data.value);
    });

    UpdateOnOffParam(eOnOff, bInitialValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateOnOffParam(eOnOff, bValue)
{
    if (eOnOff)
    {
        bValue ? eOnOff.classList.add("On") : eOnOff.classList.remove("On");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddTextParam(szPath, szName, szText, bLongText, bReadOnly, eRow, nWidth, bTextAlignLeft)
{
    if (eRow == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eText = document.createElement(bReadOnly ? "div" : "input");
    if (bReadOnly)
    {
        eText.classList.add("settingsTextParam");
    }
    else
    {
        eText.classList.add("settingsTextInputParam");
        eText.type = "text";
    }

    eText.id = "settingsParam" + szID + "Text";

    if (bLongText)
        eText.classList.add("LongText");

    if (szPath == "" && szName == "" && szText == "EMPTY")
        eText.classList.add("settingsTextParamEmpty");

    if (nWidth != undefined && nWidth > 0)
        eText.style.width = nWidth + "px";

    if (bTextAlignLeft != undefined)
        eText.style.textAlign = "left";

    eRow.appendChild(eText);

    AdaptRowTextElementWidth(eRow, eText.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    if (!bReadOnly)
    {
        AddEvent(eText.id, "change", function ()
        {          
            PublishSettings(szPath, szName, '"' + eText.value + '"');
            eText.blur();
        });

        AddEvent(eText.id, "blur", function ()
        {
            if (eText.value == "" || !eText.checkValidity())
            {
                var szValue = GetJSONValue(szPath + "." + szName);
                if (szValue == null)
                {
                    return;
                }

                eText.value = szValue;
            }
        });
        
        AddEvent(eRow.id, "click", function () { eText.focus(); event.stopPropagation(); });
    }

    var szInitialValue = "";
    if (szPath == "" && szName == "" && szText != "") // Fixed text
    {
        szInitialValue = szText;
    }
    else if (szPath != "" && szName != "" && szText != "") // Variale text with unit
    {
        szInitialValue = GetJSONValue(szPath + "." + szName) + " " + szText;
    }
    else if (szPath != "" && szName != "" && szText == "") // Variale text without unit
    {
        szInitialValue = GetJSONValue(szPath + "." + szName);
    }

    if (szPath != "" && szName != "")
    {        
        RouterApp.notifyMe(szPath + "." + szName, function (data)
        {
            UpdateTextParam(eText, bReadOnly, data.value + (szText != "" ? " " + szText : ""));
        });
    }

    UpdateTextParam(eText, bReadOnly, szInitialValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateTextParam(eText, bReadOnly, szText)
{
    if (eText)
    {
        if (bReadOnly)
        {
            eText.innerHTML = szText;
        }
        else
        {
            eText.value = szText;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddIntegerValueParam(nMin, nMax, nStep, nDivider, szUnit, szPath, szName, bReadOnly, eRow)
{
    if (szPath == "" || szName == "" || eRow == null)
    {
        return;
    }

    var nInitialValue = GetJSONValue(szPath + "." + szName);
    if (nInitialValue == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eInput = document.createElement(bReadOnly ? "div" : "input");
    eInput.classList.add(bReadOnly ? "settingsIntegerFloatValueInputParamReadOnly" : "settingsIntegerFloatValueInputParam");
    if (!bReadOnly)
    {
        eInput.type = "number";
        eInput.id = "settingsParam" + szID + "IntegerValue";
        eInput.min = nMin / nDivider;
        eInput.max = nMax / nDivider;
        eInput.step = nStep / nDivider;
    }

    eRow.appendChild(eInput);    

    if (szUnit != "")
    {
        var eUnit = document.createElement("div");
        eUnit.classList.add("settingsIntegerFloatValueUnitParam");
        eUnit.innerHTML = szUnit;

        eRow.appendChild(eUnit);
    }

    AdaptRowTextElementWidth(eRow, eInput.offsetWidth + g_nSettingsParamMargin + (szUnit != "" ? eUnit.offsetWidth + g_nSettingsParamMargin / 7 : 0), IsFirstAdapt(eRow, szUnit != "" ? 2 : 1));

    if (!bReadOnly)
    {
        AddEvent(eInput.id, "change", function ()
        {
            var nValue = parseFloat(eInput.value) * nDivider;

            var nRest = nStep < 1 ? ((nValue * 10) % (nStep * 10)) : (nValue % nStep);

            var nPublishValue;
            if (nValue >= nMin && nValue <= nMax && nRest == 0)
            {
                nPublishValue = nValue;            
            }
            else
            {
                if (nValue < nMin)
                {
                    nPublishValue = nMin;
                }
                else if (nValue > nMax)
                {
                    nPublishValue = nMax;
                }
                else if (nRest != 0)
                {
                    // TODO
                    console.log(nValue, nStep, nValue % nStep);
                    return;
                }
            }

            PublishSettings(szPath, szName, nPublishValue);
            eInput.blur();
        });

        AddEvent(eInput.id, "blur", function ()
        {
            if (eInput.value == "" || !eInput.checkValidity())
            {
                var nValue = GetJSONValue(szPath + "." + szName);
                if (nValue == null)
                {
                    return;
                }

                eInput.value = nDivider > 1 ? Number(nValue / nDivider).toFixed(1) : nValue;
            }
        });

        AddEvent(eRow.id, "click", function (event) { eInput.focus(); event.stopPropagation(); });
    }

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateIntegerValueParam(eInput, bReadOnly, nDivider > 1 ? Number(data.value / nDivider).toFixed(1) : Math.round(data.value / nDivider));
    });

    UpdateIntegerValueParam(eInput, bReadOnly, nDivider > 1 ? Number(nInitialValue / nDivider).toFixed(1) : Math.round(nInitialValue / nDivider));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateIntegerValueParam(eInput, bReadOnly, nValue)
{
    if (eInput)
    {
        if (bReadOnly)
        {
            eInput.innerHTML = String(nValue);
        }
        else
        {
            eInput.value = nValue;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddFloatValueParam(nMin, nMax, nStep, szUnit, szPath, szName, bReadOnly, eRow)
{
    if (szPath == "" || szName == "" || eRow == null)
    {
        return;
    }

    var nInitialValue = GetJSONValue(szPath + "." + szName);
    if (nInitialValue == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eInput = document.createElement(bReadOnly ? "div" : "input");
    eInput.classList.add(bReadOnly ? "settingsIntegerFloatValueInputParamReadOnly" : "settingsIntegerFloatValueInputParam");
    if (!bReadOnly)
    {
        eInput.type = "number";
        eInput.id = "settingsParam" + szID + "FloatValue";
        eInput.min = nMin;
        eInput.max = nMax;
        eInput.step = nStep;
    }

    eRow.appendChild(eInput);    

    if (szUnit != "")
    {
        var eUnit = document.createElement("div");
        eUnit.classList.add("settingsIntegerFloatValueUnitParam");
        eUnit.innerHTML = szUnit;

        eRow.appendChild(eUnit);
    }

    AdaptRowTextElementWidth(eRow, eInput.offsetWidth + g_nSettingsParamMargin + (szUnit != "" ? eUnit.offsetWidth + g_nSettingsParamMargin / 7 : 0), IsFirstAdapt(eRow, szUnit != "" ? 2 : 1));

    if (!bReadOnly)
    {
        AddEvent(eInput.id, "change", function ()
        {
            var nValue = parseFloat(eInput.value);

            var nRest = (nValue * 10) % (nStep * 10); // because nStep < 1

            var nPublishValue;
            if (nValue >= nMin && nValue <= nMax && nRest == 0)
            {
                nPublishValue = nValue;            
            }
            else
            {
                if (nValue < nMin)
                {
                    nPublishValue = nMin;
                }
                else if (nValue > nMax)
                {
                    nPublishValue = nMax;
                }
                else if (nRest != 0)
                {
                    // TODO
                    console.log(nValue, nStep, nValue % nStep);
                    return;
                }
            }

            PublishSettings(szPath, szName, nPublishValue);
            eInput.blur();
        });

        AddEvent(eInput.id, "blur", function ()
        {
            if (eInput.value == "" || !eInput.checkValidity())
            {
                var nValue = GetJSONValue(szPath + "." + szName);
                if (nValue == null)
                {
                    return;
                }

                eInput.value = Number(nValue).toFixed(1);
            }
        });

        AddEvent(eRow.id, "click", function (event) { eInput.focus(); event.stopPropagation(); });
    }

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateFloatValueParam(eInput, bReadOnly, Number(data.value).toFixed(1));
    });

    UpdateFloatValueParam(eInput, bReadOnly, Number(nInitialValue).toFixed(1));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateFloatValueParam(eInput, bReadOnly, nValue)
{
    if (eInput)
    {
        if (bReadOnly)
        {
            eInput.innerHTML = String(nValue);
        }
        else
        {
            eInput.value = nValue;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddMultiChoiceParam(szPath, szName, tParams, szEnablePath, szEnableName, enabledValue, bReadOnly, bQuestionBox, szInformativeText, eRow) // tParams = [[stringToDisplay, value], [], ...]
{
    if (szPath == "" || szName == "" || tParams == null || tParams == [] || eRow == null)
    {
        return;
    }

    var initialValue = GetJSONValue(szPath + "." + szName);
    if (initialValue == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eMultiChoice = document.createElement("div");
    eMultiChoice.id = "settingsParam" + szID + "MultiChoice";
    eMultiChoice.classList.add("settingsMultiChoiceParam");

    if (bReadOnly)
        eMultiChoice.classList.add("settingsMultiChoiceParamReadOnly");

    eRow.appendChild(eMultiChoice);

    AdaptRowTextElementWidth(eRow, eMultiChoice.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    if (!bReadOnly)
        AddEvent(eMultiChoice.id, "click", function () { OpenMultiChoiceParamPopup(eMultiChoice, szPath, szName, tParams, true, null, null, bQuestionBox, szInformativeText); });

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateMultiChoiceParam(eMultiChoice, data.value, tParams, szEnablePath, szEnableName, enabledValue);
    });

    RouterApp.notifyMe(szEnablePath + "." + szEnableName, function (data)
    {
        UpdateMultiChoiceParam(eMultiChoice, null, tParams, szEnablePath, szEnableName, data.value);
    });
    
    UpdateMultiChoiceParam(eMultiChoice, initialValue, tParams, szEnablePath, szEnableName, enabledValue);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateMultiChoiceParam(eMultiChoice, value, tParams, szEnablePath, szEnableName, enabledValue)
{
    if (eMultiChoice)
    {
        var currentEnabledValue = null;
        if (szEnablePath != null && szEnablePath != null && enabledValue != null)
        {
            currentEnabledValue = GetJSONValue(szEnablePath + "." + szEnableName);
            if (currentEnabledValue == null)
            {
                return;
            }
        }

        if (currentEnabledValue != null)
        {
            currentEnabledValue == enabledValue ? eMultiChoice.classList.remove("settingsMultiChoiceParamDisabled") : eMultiChoice.classList.add("settingsMultiChoiceParamDisabled");
        }

        if (value != null)
        {
            for (var nIdx = 0; nIdx < tParams.length; nIdx++)
            {
                if (tParams[nIdx][1] == value)
                    eMultiChoice.innerText = tParams[nIdx][0];
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddIPAddressInterfaceTitle(szTitle, eRow)
{
    var eBackground = document.createElement("div");
    eBackground.classList.add("settingsIPAddressInterfaceTitle");

    var eTitle = document.createElement("div");
    eTitle.classList.add("settingsRowText");
    eTitle.innerText = szTitle;

    eBackground.appendChild(eTitle);

    var eRowText = GetRowTextElement(eRow);
    eRow.insertBefore(eBackground, eRowText);
}

var g_tIPAdressModes = [["AUTO", 1], ["MANUAL", 0]];
var g_tCurrentIPAdressModes = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddIPAddressModeParam(nInterfaceId, eRow)
{
    if (eRow == null)
    {
        return;
    }

    var szPath = "$.network.interfaces[" + nInterfaceId + "]";
    var szName = "config";

    var nInitialMode = GetJSONValue(szPath + "." + szName);
    if (nInitialMode == null)
    {
        return;
    }

    g_tCurrentIPAdressModes.push(nInitialMode);

    var szID = eRow.id.replace("settingsRow", "");

    var eIPAddressMode = document.createElement("div");
    eIPAddressMode.id = "settingsParam" + szID + "Mode" + nInterfaceId;
    eIPAddressMode.classList.add("settingsMultiChoiceParam");

    eRow.appendChild(eIPAddressMode);

    AdaptRowTextElementWidth(eRow, eIPAddressMode.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    if (g_tCurrentIPAdressModes.length > nInterfaceId)
        AddEvent(eIPAddressMode.id, "click", function () { OpenMultiChoiceParamPopup(eIPAddressMode, szPath, szName, g_tIPAdressModes, false, function (nNewMode) { g_tCurrentIPAdressModes[nInterfaceId] = nNewMode; UpdateIPAddressInterfaces(); }, g_tCurrentIPAdressModes[nInterfaceId]) });

    RouterApp.notifyMe(szPath + "." + szName, function (data)
    {
        UpdateIPAddressModeParam(eIPAddressMode, data.value);
        UpdateIPAddressInterfaces();
    });
    
    UpdateIPAddressModeParam(eIPAddressMode, nInitialMode);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateIPAddressModeParam(eIPAddressMode, nMode)
{
    if (eIPAddressMode)
    {
        for (var nIdx = 0; nIdx < g_tIPAdressModes.length; nIdx++)
        {
            if ((nMode == 0 && g_tIPAdressModes[nIdx][1] == nMode) || ((nMode == 1 || nMode == 2) && g_tIPAdressModes[nIdx][1] == 1))
                eIPAddressMode.innerText = g_tIPAdressModes[nIdx][0];
        }        
    }
}

var g_tIPAddressInterfacesInfos = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddIPAddressInterface(nInterfaceId, nNbOfInterface, szInterfacePath, eRow)
{
    if (eRow == null)
	{
		return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eInterface = document.createElement("div");
    eInterface.id = "settingsParam" + szID + "Interface" + nInterfaceId;
    eInterface.classList.add("settingsIPAddressInterface");


    var tLineInfos = [["IPAddress", "IP ADDRESS", "address"], ["SubnetMask", "SUBNET MASK", "netmask"], ["DefaultGateway", "DEFAULT GATEWAY", "gateway"]];


    var tInterfaceInfo = [];

    tInterfaceInfo.push([tLineInfos[0][0], [0, 0, 0, 0]]);
    tInterfaceInfo.push([tLineInfos[1][0], [0, 0, 0, 0]]);
    tInterfaceInfo.push([tLineInfos[2][0], [0, 0, 0, 0]]);

    g_tIPAddressInterfacesInfos.push([nInterfaceId, tInterfaceInfo]);

    for (var nLineIdx = 0; nLineIdx < 3; nLineIdx++)
    {
        var eLine = document.createElement("div");
        eLine.classList.add("settingsIPAddressLine");

        var eTitle = document.createElement("div");
        eTitle.classList.add("settingsRowText");
        eTitle.innerText = tLineInfos[nLineIdx][1];

        eLine.appendChild(eTitle);
        eInterface.appendChild(eLine);
        eRow.appendChild(eInterface);

        for (var nIdx = 0; nIdx < 4; nIdx++)
        {
            var szPath = szInterfacePath + "." + tLineInfos[nLineIdx][2];

            var eInput = document.createElement("input");
            eInput.type = "number";
            eInput.id = "settingsParam" + szID + "Interface" + nInterfaceId + tLineInfos[nLineIdx][0] + "Param" + nIdx;
            eInput.classList.add("settingsIPAddressInputParam");
            eInput.min = 0;
            eInput.max = 255;
            eInput.step = 1;

            eLine.appendChild(eInput);

            AddEvent(eInput.id, "change", (function (_eInput, _nLineIdx, _nIdx) { return function() {
            {
                var nValue = parseFloat(_eInput.value);

                if (nValue >= _eInput.min && nValue <= _eInput.max && nValue % _eInput.step == 0)
                {
                    g_tIPAddressInterfacesInfos[nInterfaceId][1][_nLineIdx][1][_nIdx] = _eInput.value;

                    _eInput.blur();
                }
            } } })(eInput, nLineIdx, nIdx));

            AddEvent(eInput.id, "blur", (function (_eInput, _szPath) { return function() {
            {
                if (_eInput.value == "" || !_eInput.checkValidity())
                {
                    var szAddress = GetJSONValue(_szPath);
                    if (szAddress == null)
                    {
                        return;
                    }

                    UpdateIPAddressInput(_eInput, nInterfaceId, szAddress);
                }               
            } } })(eInput, szPath));
            

            AddEvent(eInput.id, "click", (function (_eInput) { return function () { if (!_eInput.classList.contains("Disabled")) { _eInput.focus(); event.stopPropagation(); } } })(eInput));

            RouterApp.notifyMe(szPath, function (data)
            {
                UpdateIPAddressInput(eInput, nInterfaceId, data.value);
            });

            var szInitialAddress = GetJSONValue(szPath);
            if (szInitialAddress == null)
            {
                return;
            }

            UpdateIPAddressInput(eInput, nInterfaceId, szInitialAddress);
        }

        eTitle.style.width = (470 - (57 + g_nSettingsParamMargin) * 4 - 2) + "px";        
    }    

    var eApply = document.createElement("div");
    eApply.id = "settingsParam" + szID + "Apply" + nInterfaceId;
    eApply.classList.add("settingsIPAddressApply");
    eApply.innerText = "APPLY AND REBOOT";

    eRow.appendChild(eApply);

    eRow.style.height = ((nNbOfInterface > 1 ? 101.5 : 55) + eInterface.offsetHeight + eApply.offsetHeight) + "px";

    AddEvent(eApply.id, "click", function () { if (!eApply.classList.contains("Disabled")) { OpenQuestionBoxPopup(eApply, "Apply and reboot ?", "", function () { IPAddressApplyAndReboot(nInterfaceId); CloseSettingsPopupContainer(); }); } });

    UpdateIPAddressInterfaces();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateIPAddressInterfaces()
{
    var eMultiChoices = document.getElementsByClassName("settingsMultiChoiceParam");
    for (var nIdx = 0; nIdx < eMultiChoices.length; nIdx++)
    {
        if (eMultiChoices[nIdx].id.includes("settingsParamNetworkIPAddressMode"))
        {
            var nInterfaceId = Number(eMultiChoices[nIdx].id.replace("settingsParamNetworkIPAddressMode", ""));

            if (g_tCurrentIPAdressModes.length > nInterfaceId)
                UpdateIPAddressModeParam(eMultiChoices[nIdx], g_tCurrentIPAdressModes[nInterfaceId]);

            var eIPAddressInput = document.getElementsByClassName("settingsIPAddressInputParam");
            for (var nInputIdx = 0; nInputIdx < eIPAddressInput.length; nInputIdx++)
            {
                if (eIPAddressInput[nInputIdx].id.includes("Interface" + nInterfaceId))
                {
                    g_tCurrentIPAdressModes[nInterfaceId] == 1 ? eIPAddressInput[nInputIdx].classList.add("Disabled") : eIPAddressInput[nInputIdx].classList.remove("Disabled");
                }
            }

            var eApplys = document.getElementsByClassName("settingsIPAddressApply");
            for (var nApplyIdx = 0; nApplyIdx < eApplys.length; nApplyIdx++)
            {
                if (eApplys[nApplyIdx].id.includes("Apply" + nInterfaceId))
                {
                    g_tCurrentIPAdressModes[nInterfaceId] == 1 ? eApplys[nApplyIdx].classList.add("Disabled") : eApplys[nApplyIdx].classList.remove("Disabled");
                }     
            }
        }
    }

    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateIPAddressInput(eInput, nInterfaceId, szAddress)
{
    if (eInput)
    {
        var nId = Number(eInput.id.slice(eInput.id.length - 1));

        for (var nIdx = 0; nIdx < g_tIPAddressInterfacesInfos.length; nIdx++)
        {
            if (g_tIPAddressInterfacesInfos[nIdx][0] == nInterfaceId)
            {
                for (var nInfosIdx = 0; nInfosIdx < g_tIPAddressInterfacesInfos[nIdx][1].length; nInfosIdx++)
                {
                    for (var nAddressIdx = 0; nAddressIdx < g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][1].length; nAddressIdx++)
                    {
                        if (eInput.id.includes("settingsParamNetworkIPAddressInterface" + nInterfaceId + g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][0] + "Param" + nAddressIdx))
                        {
                            if (szAddress != "")
                            {
                                var tNumbers = szAddress.split(".");
                                g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][1][nAddressIdx] = tNumbers[nId];

                                eInput.value = g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][1][nAddressIdx];
                            }
                            else
                            {
                                g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][1][nAddressIdx] = 0;
                            }

                            eInput.value = g_tIPAddressInterfacesInfos[nIdx][1][nInfosIdx][1][nAddressIdx];

                            break;
                        }
                    }                    
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IPAddressApplyAndReboot(nInterfaceId)
{
    if (!IPAddress_IsSubnetMaskValid(nInterfaceId))
	{
		return;
    }

    var jsValue =
    {
        path: "$.network.interfaces[" + nInterfaceId + "]",
        value:
        {
            config: g_tCurrentIPAdressModes[nInterfaceId],
            address: IPAddress_MakeIPString(g_tIPAddressInterfacesInfos[nInterfaceId][1][0][1]),
            netmask: IPAddress_MakeIPString(g_tIPAddressInterfacesInfos[nInterfaceId][1][1][1]),
            gateway: IPAddress_MakeIPString(g_tIPAddressInterfacesInfos[nInterfaceId][1][2][1])
        }
    };

    self.Communicator.publish("/service/ravenna/settings", jsValue);

    self.Communicator.publish("/service/ravenna/commands", { command: "reboot"});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IPAddress_IsSubnetMaskValid(nInterfaceId)
{
    if (g_tIPAddressInterfacesInfos[nInterfaceId][1][1][0] == "SubnetMask" && g_tIPAddressInterfacesInfos[nInterfaceId][1][2][1].length == 4)
    {
        // subnet make must have contigous 1 bit from left.
        var ui32SubnetMask = (Number(g_tIPAddressInterfacesInfos[nInterfaceId][1][1][1][0]) << 24) + (Number(g_tIPAddressInterfacesInfos[nInterfaceId][1][1][1][1]) << 16) + (Number(g_tIPAddressInterfacesInfos[nInterfaceId][1][1][1][2]) << 8) + (Number(g_tIPAddressInterfacesInfos[nInterfaceId][1][1][1][3]));
        for (var nBit = 31; nBit >= 0; --nBit)
        { // search first zero from left
            var ui32Mask = 0xFFFFFFFF << nBit;
            if ((ui32Mask & ui32SubnetMask) != ui32Mask)
            { // zero found
                // check that all remaining bits are zero
                ui32Mask <<= 1;
                ui32Mask = ~ui32Mask;
                if (ui32Mask & ui32SubnetMask)
                { // at least one bit is not zero
                    return false;
                }
                // all bits are zero
                return true;
            }
        }
        return false;
    }
    return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IPAddress_MakeIPString(tInfos)
{
    var szIPString = "";

    if (tInfos.length == 4)
    {
        szIPString = tInfos[0] + "." + tInfos[1] + "." + tInfos[2] + "." + tInfos[3];
    }

    return szIPString;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenMultiChoiceParamPopup(eMultiChoice, szPath, szName, tParams, bPublishSettings, fnSaveNewValue, nCurrentValue, bQuestionBox, szInformativeText)
{
    var eSettingsSectionPopupContainer = document.getElementById("settingsSectionPopupContainer");
    var eScroll = document.getElementById("settingsScroll");
    if (eSettingsSectionPopupContainer == null || eScroll == null || eMultiChoice == null || eMultiChoice.classList.contains("settingsMultiChoiceParamDisabled"))
	{
		return;
    }

    if (bPublishSettings && (fnSaveNewValue == undefined || fnSaveNewValue == null) && (nCurrentValue == undefined || nCurrentValue == null))
    {
        nCurrentValue = GetJSONValue(szPath + "." + szName);
        if (nCurrentValue == null)
        {
            return;
        }
    }
    if (nCurrentValue == undefined)
    {
        return;
    }


    var szPage = "";

    szPage += "<div id='settingsSectionPopup' class='settingsSectionPopup'>";
        
		szPage += "<div id='settingsSectionPopupMultiChoice' class='settingsSectionPopupMultiChoice'>";

            var nMaxLength = 0;
            for (var nIdx = 0; nIdx < tParams.length; nIdx++)
            {
                nMaxLength = Math.max(nMaxLength, tParams[nIdx][0].length);
                szPage += "<div id='settingsSectionPopupMultiChoiceButton" + nIdx + "' class='settingsSectionPopupMultiChoiceButton " + (tParams[nIdx][1] == nCurrentValue ? "settingsSectionPopupMultiChoiceButtonChecked" : "") + "'>" + tParams[nIdx][0] + "</div>";
            }

        szPage += "</div>";

    szPage += "</div>";


    eSettingsSectionPopupContainer.innerHTML = szPage;


    var ePopup = document.getElementById("settingsSectionPopupMultiChoice");
    if (ePopup)
    {
        var nTop = eScroll.offsetTop - eSettingsSectionPopupContainer.offsetTop + eMultiChoice.offsetTop + g_isSettingsScroller.y;
        if (nTop + ePopup.offsetHeight > eSettingsSectionPopupContainer.offsetHeight)
        {
            nTop -= (ePopup.offsetHeight - eMultiChoice.offsetHeight);
            if (nTop < eScroll.offsetTop)
            {
                nTop += (ePopup.offsetHeight / 2 - eMultiChoice.offsetHeight / 2);
            }
        }        

        var nWidth = Math.max(99, nMaxLength * 10.5 - 8);

        ePopup.style.setProperty("top", nTop + "px");
        ePopup.style.setProperty("width", nWidth + "px");
        ePopup.style.setProperty("left", (500 - nWidth - 23) + "px");
    }


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
        AddEvent("settingsSectionPopup", "click", function (event) { CloseSettingsPopupContainer(); }, true);
	}
	else
	{
        AddEvent("settingsSectionPopup", "touchstart", function (event) { CloseSettingsPopupContainer(); }, true);
        AddEvent("settingsSectionPopup", "mousedown", function (event) { CloseSettingsPopupContainer(); }, true);
    }

    AddEvent("settingsSectionPopupMultiChoice", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("settingsSectionPopupMultiChoice", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("settingsSectionPopupMultiChoice", "mousedown", function (event) { event.stopPropagation(); }, true);

    for (var nIdx = 0; nIdx < tParams.length; nIdx++)
    {
        if (bPublishSettings)
        {
            if (bQuestionBox)
            {
                AddEvent("settingsSectionPopupMultiChoiceButton" + nIdx, "click", (function (_szNewValue, _value)
                {
                    return function ()
                    {
                        if (_value == nCurrentValue)
                        {
                            CloseSettingsPopupContainer();
                            return;
                        }

                        OpenQuestionBoxPopup(eMultiChoice, "Are you sure you want to select " + _szNewValue + " ?", szInformativeText, function () { PublishSettings(szPath, szName, _value); CloseSettingsPopupContainer(); });
                    }
                })(tParams[nIdx][0], tParams[nIdx][1]));
            }
            else
            {
                AddEvent("settingsSectionPopupMultiChoiceButton" + nIdx, "click", (function (_value)
                {
                    return function ()
                    {
                        if (_value == nCurrentValue)
                        {
                            CloseSettingsPopupContainer();
                            return;
                        }

                        PublishSettings(szPath, szName, _value);
                        CloseSettingsPopupContainer();
                    }
                })(tParams[nIdx][1]));
            }
        }
        else if (fnSaveNewValue != undefined)
        {
            AddEvent("settingsSectionPopupMultiChoiceButton" + nIdx, "click", (function (_nNewValue)
            {
                return function ()
                {
                    if (_nNewValue == nCurrentValue)
                    {
                        CloseSettingsPopupContainer();
                        return;
                    }

                    fnSaveNewValue(_nNewValue);
                    CloseSettingsPopupContainer();
                }
            })(tParams[nIdx][1]));
        }
    }

    ShowSettingsPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddSyncSourcesParams(eRow)
{
    if (eRow == null)
	{
		return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eSyncSourcesParams = document.createElement("div");
    eSyncSourcesParams.id = "settingsParam" + szID + "SyncSourcesParams";
    eSyncSourcesParams.classList.add("settingsSyncSourcesParams");

    eRow.appendChild(eSyncSourcesParams);

    AdaptRowTextElementWidth(eRow, eSyncSourcesParams.offsetWidth + g_nSettingsParamMargin, IsFirstAdapt(eRow));

    return eSyncSourcesParams;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddSyncSourcesParam(szSignalName, nModuleId, nInputId, eParams)
{
    if (eParams == null)
	{
		return;
    }

    var szID = eParams.id.replace("settingsParam", "");
    szID = szID.replace("SyncSourcesParams", "");

    var eSignal = document.createElement("div");
    eSignal.id = "settingsParam" + szID + "SyncSourcesParamSignal-module" + nModuleId + "-input" + nInputId;
    eSignal.classList.add("settingsSyncSourcesSignal");

    var eSource = document.createElement("div");
    eSource.id = "settingsParam" + szID + "SyncSourcesParamSource-module" + nModuleId + "-input" + nInputId;
    eSource.classList.add("settingsSyncSourcesSource");
    eSource.innerText = szSignalName;

    var eLock = document.createElement("div");
    eLock.id = "settingsParam" + szID + "SyncSourcesParamLock-module" + nModuleId + "-input" + nInputId;
    eLock.classList.add("settingsSyncSourcesLock");

    eParams.appendChild(eSignal);
    eParams.appendChild(eSource);
    eParams.appendChild(eLock);

    eParams.parentNode.style.height = (eParams.offsetHeight + 5) + "px";

    AddEvent(eSource.id, "click", function () { PublishSyncSource(nModuleId, nInputId); });

    RouterApp.notifyMe("$._modules", function (data)
    {
        UpdateSyncSourcesParamSignal(data.value);
        UpdateSyncSourcesParamLock(data.value);
    });

    RouterApp.notifyMe("$._modules[?(@.id==" + ZMI_SYNC + ")][0].sync_source", function (data)
    {
        UpdateSyncSourcesParamSource(data.value);
    });

    var jsModules = GetJSONValue("$._modules");
    if (jsModules)
    {
        UpdateSyncSourcesParamSignal(jsModules);
        UpdateSyncSourcesParamLock(jsModules);
    }

    var jsSyncSource = GetJSONValue("$._modules[?(@.id==" + ZMI_SYNC + ")][0].sync_source");
    if (jsSyncSource)
    {
        UpdateSyncSourcesParamSource(jsSyncSource);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSyncSourcesParamSignal(jsModules)
{
    var jsLock = GetJSONValue("$._modules[?(@.id==" + ZMI_SYNC + ")][0].state.lock");
    if (jsLock == null)
    {
        return;
    }

    var eSignals = document.getElementsByClassName("settingsSyncSourcesSignal");

    for (var nModuleIdx = 0; nModuleIdx < jsModules.length; ++nModuleIdx)
	{
        var jsModule = jsModules[nModuleIdx];
        if (jsModule.hasOwnProperty("state") && jsModule.state.hasOwnProperty("sync_sources"))
		{
			var jsSyncSources = jsModule.state.sync_sources;

            for (var nSourceIdx = 0; nSourceIdx < jsSyncSources.length; ++nSourceIdx)
			{
                jsSyncSource = jsSyncSources[nSourceIdx];

                for (var nSourceIdx = 0; nSourceIdx < jsSyncSources.length; ++nSourceIdx)
                {
                    var jsSyncSource = jsSyncSources[nSourceIdx];    
                    for (var nIdx = 0; nIdx < eSignals.length; nIdx++)
                    {
                        if (eSignals[nIdx].id.includes("-module" + jsModule.id + "-input" + nSourceIdx))
                        {
                            jsSyncSource.signal_lockable ? eSignals[nIdx].classList.add("SignalLockable") : eSignals[nIdx].classList.remove("SignalLockable");
                            !jsSyncSource.signal_lockable && jsSyncSource.signal_present ? eSignals[nIdx].classList.add("SignalPresent") : eSignals[nIdx].classList.remove("SignalPresent");
                            !jsSyncSource.signal_lockable && !jsSyncSource.signal_present ? eSignals[nIdx].classList.add("NoSignal") : eSignals[nIdx].classList.remove("NoSignal");
                        }
                    }
                }
			}
		}
	}    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSyncSourcesParamSource(jsSyncSource)
{
    var nModuleId = jsSyncSource.module_id;
    var nInputId = jsSyncSource.input_id;

    var eSources = document.getElementsByClassName("settingsSyncSourcesSource");
    for (var nIdx = 0; nIdx < eSources.length; nIdx++)
    {
        eSources[nIdx].id.includes("-module" + nModuleId + "-input" + nInputId) ? eSources[nIdx].classList.add("Checked") : eSources[nIdx].classList.remove("Checked");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSyncSourcesParamLock(jsModules)
{
    var jsLockSource = GetJSONValue("$._modules[?(@.id==" + ZMI_SYNC + ")][0].state.lock");
    if (jsLockSource == null)
    {
        return;
    }

    var eLocks = document.getElementsByClassName("settingsSyncSourcesLock");

    var jsSelectedSyncSource = GetJSONValue("$._modules[?(@.id==" + ZMI_SYNC + ")][0].sync_source");
    if (jsSelectedSyncSource)
    {
        var nSelectedSyncSourceModuleId = jsSelectedSyncSource.module_id;
        var nSelectedSyncSourceInputId = jsSelectedSyncSource.input_id;

        for (var nModuleIdx = 0; nModuleIdx < jsModules.length; ++nModuleIdx)
	    {
            var jsModule = jsModules[nModuleIdx];
            if (jsModule.hasOwnProperty("state") && jsModule.state.hasOwnProperty("sync_sources"))
		    {
			    var jsSyncSources = jsModule.state.sync_sources;
                for (var nSourceIdx = 0; nSourceIdx < jsSyncSources.length; ++nSourceIdx)
                {
                    for (var nIdx = 0; nIdx < eLocks.length; nIdx++)
                    {
                        if (eLocks[nIdx].id.includes("-module" + jsModule.id + "-input" + nSourceIdx))
                        {
                            var nMode = -1;
                            if (eLocks[nIdx].id.includes("-module" + jsLockSource.sync_source.module_id + "-input" + jsLockSource.sync_source.input_id))
                            {
                                nMode = jsLockSource.status;
                            }
                            else if (eLocks[nIdx].id.includes("-module" + nSelectedSyncSourceModuleId + "-input" + nSelectedSyncSourceInputId))
                            {
                                nMode = 0;
                            }
                            else
                            {
                                nMode = 3;
                            }

                            nMode == 0 ? eLocks[nIdx].classList.add("Item0") : eLocks[nIdx].classList.remove("Item0"); // Unlocked
                            nMode == 1 ? eLocks[nIdx].classList.add("Item1") : eLocks[nIdx].classList.remove("Item1"); // Locking
                            nMode == 2 ? eLocks[nIdx].classList.add("Item2") : eLocks[nIdx].classList.remove("Item2"); // Locked
                            nMode == 3 ? eLocks[nIdx].classList.add("Item3") : eLocks[nIdx].classList.remove("Item3");
                        }
                    }
                }
		    }
	    }    
    }    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddGetStatusReportButton(eRow)
{
    if (eRow == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eButton = document.createElement("div");
    eButton.id = "settingsParam" + szID + "ActionButton";
    eButton.classList.add("settingsInfoButton");
    eButton.innerText = "DOWNLOAD STATUS REPORT";

    eRow.appendChild(eButton);

    AddEvent(eButton.id, "click", function () { window.open('/commands/get_report', '_blank'); });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddUploadStartScreenImageButton(eRow)
{
    if (eRow == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eButton = document.createElement("div");
    eButton.id = "settingsParam" + szID + "ActionButton";
    eButton.classList.add("settingsInfoButton");
    eButton.innerText = "UPLOAD STARTUP IMAGE";

    var eForm = document.createElement("form");
    eForm.action = "/upload";
    eForm.method = "post";
    eForm.enctype = "multipart/form-data";

    var eInput = document.createElement("input");
    eInput.id = "settingsParam" + szID + "Input";
    eInput.name = "directories_write_file:StartupImages";
    eInput.type = "file";
    eInput.accept = ".png";
    eInput.size = "1";
    eInput.maxlength = "10000000";
    eInput.tabIndex = -1;
    eInput.style.display = "none";

    eForm.appendChild(eInput);
    eRow.appendChild(eButton);
    eRow.appendChild(eForm);

    AddEvent(eButton.id, "click", function () { document.getElementById("settingsParam" + szID + "Input").click(); });
    AddEvent(eInput.id, "change", function () { eForm.submit(); });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddResetStartScreenImageButton(eRow)
{
    if (eRow == null)
    {
        return;
    }

    var szID = eRow.id.replace("settingsRow", "");

    var eButton = document.createElement("div");
    eButton.id = "settingsParam" + szID + "ActionButton";
    eButton.classList.add("settingsInfoButton");
    eButton.innerText = "RESET STARTUP IMAGE";

    eRow.appendChild(eButton);

    AddEvent(eButton.id, "click", function ()
    {
        OpenQuestionBoxPopup(eButton, "Are you sure you want to reset the startup image ?", "", function ()
        {
            var xhttp = new XMLHttpRequest();
            xhttp.open('DELETE', '/commands/directories_delete_file:StartupImages:psplash_user_background.ppm'); // file to destroy (hardcoded name to follow the C++ code)
            xhttp.send();
            CloseSettingsPopupContainer();
        });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishSyncSource(nModuleId, nInputId)
{
    self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + ZMI_SYNC + ")][0].sync_source", value: { module_id: nModuleId, input_id: nInputId } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenQuestionBoxPopup(eElement, szText, szInformativeText, fnCallback)
{
    var eSettingsSectionPopupContainer = document.getElementById("settingsSectionPopupContainer");
    var eScroll = document.getElementById("settingsScroll");
    if (eSettingsSectionPopupContainer == null || eScroll == null)
	{
		return;
    }

    var szPage = "";

    szPage += "<div id='settingsSectionPopup' class='settingsSectionPopup'>";
        
		szPage += "<div id='settingsSectionPopupQuestionBox' class='settingsSectionPopupQuestionBox'>";

            szPage += "<div id='settingsSectionPopupQuestionBoxText' class='settingsSectionPopupQuestionBoxTextZone'>" + szText + "</div>";
            szPage += "<div id='settingsSectionPopupQuestionBoxText' class='settingsSectionPopupQuestionBoxInformativeTextZone'>" + szInformativeText + "</div>";
            szPage += "<div id='settingsSectionPopupQuestionBoxButtonYes' class='settingsSectionPopupQuestionBoxButton Yes'>YES</div>";
            szPage += "<div id='settingsSectionPopupQuestionBoxButtonNo' class='settingsSectionPopupQuestionBoxButton No'>NO</div>";

        szPage += "</div>";

    szPage += "</div>";


    eSettingsSectionPopupContainer.innerHTML = szPage;


    var ePopup = document.getElementById("settingsSectionPopupQuestionBox");
    if (ePopup)
    {
        var nTop = eScroll.offsetTop - eSettingsSectionPopupContainer.offsetTop + eElement.offsetTop + g_isSettingsScroller.y + eElement.offsetHeight / 2 - ePopup.offsetHeight / 2;
        if (nTop + ePopup.offsetHeight > eSettingsSectionPopupContainer.offsetHeight)
        {
            nTop -= (ePopup.offsetHeight / 2 - eElement.offsetHeight / 2);            
        }
        if (nTop < eScroll.offsetTop)
        {
            nTop += (ePopup.offsetHeight / 2 - eElement.offsetHeight / 2);
        }

        ePopup.style.setProperty("top", nTop + "px");
        ePopup.style.setProperty("left", (eScroll.offsetWidth / 2 - ePopup.offsetWidth / 2) + "px");
    }


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
        AddEvent("settingsSectionPopup", "click", function (event) { CloseSettingsPopupContainer(); }, true);
	}
	else
	{
        AddEvent("settingsSectionPopup", "touchstart", function (event) { CloseSettingsPopupContainer(); }, true);
        AddEvent("settingsSectionPopup", "mousedown", function (event) { CloseSettingsPopupContainer(); }, true);
    }

    AddEvent("settingsSectionPopupQuestionBox", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("settingsSectionPopupQuestionBox", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("settingsSectionPopupQuestionBox", "mousedown", function (event) { event.stopPropagation(); }, true);

    AddEvent("settingsSectionPopupQuestionBoxButtonYes", "click", function () { fnCallback(); });
    AddEvent("settingsSectionPopupQuestionBoxButtonNo", "click", function () { CloseSettingsPopupContainer(); });


    ShowSettingsPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishSettings(szPath, szName, value)
{
    var szValue = '{ "path": "' + szPath + '", "value": { "' + szName + '": ' + value + ' } }';
    var jsValue = JSON.parse(szValue);

    self.Communicator.publish("/service/ravenna/settings", jsValue);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMON
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsGeneral()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    var jsDevice = GetDeviceJSON();
    if (jsDevice == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("GENERAL");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        AddRowTitle("SampleRate", "SAMPLE RATE", eScroll);
        {
            var tSampleRates = [];
            for (var nIdx = 0; nIdx < jsDevice.ios[0].capabilities.sampleRate.length; nIdx++)
            {
                var nSampleRate = jsDevice.ios[0].capabilities.sampleRate[nIdx];
                var szSampleRate = "";
                if (nSampleRate == 352800)
                {
                    szSampleRate = "DXD/DSD";
                }
                else
                {
                    /*szSampleRate = Number(nSampleRate / 1000).toFixed(0) + "k";
                    if (nSampleRate % 44100 == 0)
                        szSampleRate += nSampleRate / 44100;*/

                    szSampleRate = Number(nSampleRate / 1000).toFixed(nSampleRate % 44100 == 0 ? 1 : 0) + "kHz";
                }

                tSampleRates.push([szSampleRate, nSampleRate]);
            }
            var eRow = AddRow("SampleRateAuto", "SAMPLING RATE", eScroll, "/common/Samplerate.png");
            AddMultiChoiceParam("$.ios[0].configuration", "sampleRate", tSampleRates, null, null, null, false, false, "", eRow);

            if (!IsDante())
            {
                eRow = AddRow("SampleRateAuto", "AUTO", eScroll, "/common/Auto.png");
                AddSwitchParam("$", "_auto_sample_rate", false, false, "", "", false, eRow);
            }

            var nAlagoType = GetJSONValue("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.anubis.analog_type");
            if (nAlagoType != null && nAlagoType == 1) // EAT_Premium
            {
                var tADModes = [["DXD", 0x0], ["DSD64", 0x1], ["DSD128", 0x2], ["DSD256", 0x3]];

                var eRow = AddRow("SampleRateADModeInDXDDSD", "A/D MODE IN DXD/DSD", eScroll, "/common/Channel.png");
                AddMultiChoiceParam("$._modules[?(@.id==" + ZMI_LOGICAL_ANUBIS_DESK_ADC + ")][0]", "inputs_audio_data_format_at_352k8", tADModes, "$.ios[0].configuration", "sampleRate", 352800, false, false, "", eRow);
            }
        }


        // DANTE_NO_FRAMESIZE
        if (!IsDante())
        {
            AddRowTitle("FrameMode", "FRAME MODE", eScroll);
            {
                // TODO_DANTE: we should get framesizes from capabilities
                var tLatencys = [["AES67 (6)", 6], ["AES67 (12)", 12], ["ULTRA (16)", 16], ["EXTRA (32)", 32], ["AES67 (48)", 48], ["LOW (64)", 64]];

                var eRow = AddRow("FrameModeLatency", "LATENCY", eScroll, "/common/Latency.png");
                AddMultiChoiceParam("$", "_frame_size_at_1FS", tLatencys, null, null, null, false, false, "", eRow);
            }
        }

        AddRowTitle("Clock", "CLOCK", eScroll);
        {
            if (IsMT48())
            {
                var eRow = AddRowHeightScalable("ClockSyncSources", "SYNC SOURCES", eScroll, "/common/PTPMaster.png");
                var eParams = AddSyncSourcesParams(eRow);

                var jsModules = GetJSONValue("$._modules");
                for (var nModuleIdx = 0; nModuleIdx < jsModules.length; ++nModuleIdx)
                {
                    var jsModule = jsModules[nModuleIdx];
                    if (jsModule.hasOwnProperty("state") && jsModule.state.hasOwnProperty("sync_sources"))
                    {
                        var jsSyncSources = jsModule.state.sync_sources;
                        for (var nSourceIdx = 0; nSourceIdx < jsSyncSources.length; ++nSourceIdx)
                        {
                            var jsSyncSource = jsSyncSources[nSourceIdx];

                            // We don't want to display USB's sync
                            if (jsModule.id == ZMI_USB)
                                continue;

                             // TODO_DANTE: sync source must use input_id instead of idx
                            AddSyncSourcesParam(jsSyncSource.signal_name.toUpperCase(), jsModule.id, jsSyncSource.input_id, eParams);
                        }
                    }
                }
            }
            else
            {
                if (!IsDante())
                {
                    var eRow = AddRow("ClockPTPMaster", "PTP MASTER", eScroll, "/common/PTPMaster.png");
                    AddPTPMasterSwitch("$._modules[?(@.id==" + ZMI_SYNC + ")][0].sync_source", eRow);
                }
            }

            var tStates = [["INITALIZING", 0], ["FAULTY", 1], ["DISABLED", 2], ["LISTENING", 3], ["PRE MASTER", 4], ["MASTER", 5], ["PASSIVE", 6], ["UNCALIBRATED", 7], ["SLAVE", 8]];
            var tLockStatus = [["UNKNOWN", 0], ["UNLOCKED", 1], ["LOCKING", 2], ["LOCKED", 3]];

            var eRow = AddRow("ClockPTPStatus", "PTP STATUS", eScroll, "/common/PTPStatus.png");
            AddMultiChoiceParam("$.network.PTP.Status.Interfaces[0]", "State", tStates, null, null, null, true, false, "", eRow);
            AddMultiChoiceParam("$.network.PTP.Status", "LockStatus", tLockStatus, null, null, null, true, false, "", eRow);

            if (!IsDante())
            {
                eRow = AddRow("ClockASIOClock", "ASIO CLOCK", eScroll, "/common/PTPMaster.png");
                AddMultiChoiceParam("$", "_ASIO_clock", [["AUTO", 2], ["OFF", 0], ["ON", 1]], null, null, null, false, false, "", eRow);
            }
        }

        AddRowTitle("Fan", "FAN", eScroll);
        {
            var eRow = AddRow("FanCoolingMode", "COOLING MODE", eScroll, "/common/Fan.png");
            AddMultiChoiceParam("$._oem_ui_process_engine.anubis_settings.fan", "cooling_mode", [["LOW", 0], ["MID", 1], ["HIGH", 2]], null, null, null, false, false, "", eRow);

            eRow = AddRow("FanStopOnTalk", "STOP ON TALK", eScroll, "/music_common/Talk.png");
            AddSwitchParam("$._oem_ui_process_engine.anubis_settings.fan", "stop_on_talk", false, false, "", "", false, eRow);
        }

        AddRowTitle("Network", "NETWORK", eScroll);
        {
            if (jsDevice.hasOwnProperty("network") && jsDevice.network.hasOwnProperty("multi_interface_mode"))
            {
                var eRow = AddRow("NetworkST2022-7", IsDante() ? "REDUNDANT MODE": "MULTI-INTERFACE (ST2022-7)", eScroll, "/common/Network.png");
                AddSwitchParam("$.network", "multi_interface_mode", false, true, "Are you sure you want to change Multi-Interface mode ?", "Note: Anubis will reboot.", true, eRow);
            }
            {
                var nNbOfInterface = GetJSONValue("$.network.interfaces").length;

                g_tCurrentIPAdressModes = [];
                g_tIPAddressInterfacesInfos = [];

                for (var nId = 0; nId < nNbOfInterface; nId++)
                {                    
                    var eRow = AddRowHeightScalable("NetworkIPAddress", "OBTAIN AN IP ADDRESS", eScroll);

                    AddIPAddressModeParam(nId, eRow);

                    if (nNbOfInterface > 1)
                        AddIPAddressInterfaceTitle("INTERFACE " + (nId + 1), eRow);

                    AddIPAddressInterface(nId, nNbOfInterface, "$.network.interfaces[" + nId + "]", eRow);
                }
            }           
        }

        AddRowTitle("Date&Time", "DATE & TIME", eScroll);
        {
            var eRow = AddRowDateTime("Date&Time", eScroll);
            eRow = AddRow("Date&TimeInfo", "Date change requires a reboot", eScroll);
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsAudioInputs()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    var jsDevice = GetDeviceJSON();
    if (jsDevice == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("AUDIO INPUTS");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        switch (g_nCurrentMissionID)
        {
            case MUSIC_MISSION_ID:
            case MT48_MUSIC_MISSION_ID:
            {              
                var eRow = AddRow("GenericAES67Streams", "GENERIC AES67 STREAMS", eScroll, "/common/InOut.png");
                AddIntegerValueParam(0, 48, 2, 1, "", "$._oem_ui_process_engine.music.inputs_settings", "ravenna_inputs", false, eRow);
                var eRow = AddRow("InputsInfo", "Changes will apply after next reboot", eScroll);
                break;
            }

            case MONITOR_MISSION_ID:
            case MT48_MONITOR_MISSION_ID:
            {
                var eRow = AddRow(g_nCurrentMissionID == MONITOR_MISSION_ID ? "Combo1/2Split" : "Mic/Line1/2Split", g_nCurrentMissionID == MONITOR_MISSION_ID ? "COMBO 1/2 SPLIT" : "MIC/LINE 1/2 SPLIT", eScroll, "/common/Channel.png");        
                AddSwitchParam("$._modules[?(@.id==" + (ZMI_LOGICAL_ANUBIS_DESK_ADC + 2) + ")][0]", "io_hidden", false, false, "", "", false, eRow, true);

                eRow = AddRow(g_nCurrentMissionID == MONITOR_MISSION_ID ? "Jack3/4Split" : "Inst/Line3/4Split", g_nCurrentMissionID == MONITOR_MISSION_ID ? "JACK 3/4 SPLIT" : "INST/LINE 3/4 SPLIT", eScroll, "/common/Channel.png");   
                AddSwitchParam("$._modules[?(@.id==" + (ZMI_LOGICAL_ANUBIS_DESK_ADC + 3) + ")][0]", "io_hidden", false, false, "", "", false, eRow, true);
                break;
            }

            default:
                break;
        }        
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsAudioOutputs()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    var jsDevice = GetDeviceJSON();
    if (jsDevice == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("AUDIO OUTPUTS");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        AddRowTitle("Global", "GLOBAL", eScroll);
        {
            var tRollOffFilters = [["SHARP", 1], ["SLOW", 0], ["APODIZING", 2], ["BRICKWALL", 3]];

            var eRow = AddRow("GlobalRollOffFilter", "ROLL OFF FILTER", eScroll, "/common/Slope.png");
            AddMultiChoiceParam("$._modules[?(@.id==" + ZMI_LOGICAL_ANUBIS_DESK_DAC + ")][0].custom.outs", "roll_off_filter", tRollOffFilters, null, null, null, false, false, "", eRow);
        }

        var tOuputsLabels = [["Main12", "MAIN 1/2"], ["Line34", "LINE 3/4"], ["Headphone1", "HEADPHONE 1"], ["Headphone2", "HEADPHONE 2"]];
        var tLevels = [[["+18dBu", 0], ["+24dBu", 1]], [[(g_nCurrentMissionID == MT48_MUSIC_MISSION_ID || g_nCurrentMissionID == MT48_MONITOR_MISSION_ID ? "+8dBu" : "+9dBu"), 0], [(g_nCurrentMissionID == MT48_MUSIC_MISSION_ID || g_nCurrentMissionID == MT48_MONITOR_MISSION_ID ? "+16dBu" : "+18dBu"), 1]]];
        var tChannelIdBase = [0, 2, 0, 0];

        for (var nIdx = 0; nIdx < tOuputsLabels.length; nIdx++)
        {
            AddRowTitle(tOuputsLabels[nIdx][0], tOuputsLabels[nIdx][1], eScroll);
            {
                var szOutsPath = "$._modules[?(@.id==" + (ZMI_LOGICAL_ANUBIS_DESK_DAC + nIdx) + ")][0].custom.outs";

                var szQuestionBoxInformativeText = nIdx < 2 ? "" : "Do NOT select " + tLevels[1][1][0] + " for Headphones with impedance < 200 Ohms.";

                var eRow = AddRow(tOuputsLabels[nIdx][0] + "MaxLevel", "OUTPUT MAX LEVEL", eScroll, "/common/Levels.png");
                AddMultiChoiceParam(szOutsPath, "out_max_level", tLevels[nIdx < 2 ? 0 : 1], null, null, null, false, nIdx > 1, szQuestionBoxInformativeText, eRow);

                eRow = AddRow(tOuputsLabels[nIdx][0] + "Attenuation", "ATTENUATION", eScroll, "/common/Levels.png");
                AddIntegerValueParam(-360, 0, 5, 10, "dB", szOutsPath, "attenuation", false, eRow);


                for (var nChannelIdx = 0; nChannelIdx < 2; nChannelIdx++)
                {
                    eRow = AddRow(tOuputsLabels[nIdx][0] + "Channel" + (tChannelIdBase[nIdx] + nChannelIdx + 1) + "Phase", "CHANNEL " + (tChannelIdBase[nIdx] + nChannelIdx + 1), eScroll, "/common/Channel.png");
                    AddOnOffParam(szOutsPath + ".channels[" + nChannelIdx + "]", "phase", "&#216;", eRow);
                }
            }
        }

        var eRow = AddRow("OutputsInfo", "Set individual trim and phase settings", eScroll);
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsInfo()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("INFO");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var eRow = AddRow("DeviceName", "DEVICE'S NAME", eScroll);
        AddTextParam("$.identity", "name", "", true, true, eRow);

        if (GetJSONValue("$.identity.product_type") == 1 // device::zman::EPT_Anubis
            || GetJSONValue("$.identity.product_type") == 101) // device::zman::EPT_Anubis_Dante
        {
            eRow = AddRow("Type", "TYPE", eScroll);
            AddTextParam("", "", GetJSONValue("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.anubis.analog_type") == 0 ? "PRO" : "PREMIUM", true, true, eRow);
        }

        eRow = AddRow("FirmwareVersion", "FIRMWARE VERSION", eScroll);
        AddTextParam("$", "_firmware_version", "", true, true, eRow);

        eRow = AddRow("MaintenanceModeVersion", "MAINTENANCE MODE VERSION", eScroll);
        AddTextParam("$", "_maintenance_mode_version", "", false, true, eRow);

        eRow = AddRow("SerialNumber", "SERIAL NUMBER", eScroll);
        AddTextParam("$.identity", "serial", "", true, true, eRow);

        AddRowBoardsRunRow(eScroll);

        eRow = AddRow("AOIP", "AOIP", eScroll);
        AddTextParam("", "", GetJSONValue("$.identity.Dante") == null ? "RAVENNA/AES67" : "Dante/AES67", true, true, eRow);
        
        if (IsDante())
        {
            eRow = AddRow("DanteLicense", "DANTE LICENSE", eScroll);
            AddTextParam("$._modules[?(@.id==" + ZMI_DANTE + ")][0].state", "dante_license", "", false, true, eRow);
        }
        else
        {
            eRow = AddRow("DanteCapable", "DANTE CAPABLE", eScroll);
            AddTextParam("", "", GetJSONValue("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.dante_capable") == true ? "YES" : "NO", true, true, eRow);
        }

        AddRowTitle("Status", "STATUS", eScroll);
        {
            eRow = AddRow("StatusTemperature", "TEMPERATURE", eScroll);
            AddTextParam("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state", "temperature", "&#176;C", false, true, eRow);

            eRow = AddRow("StatusCores", "CORES", eScroll);
            AddIntegerValueParam(0, 200, 1, 1, "%", "$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state", "cpu0_load", true, eRow);
            AddIntegerValueParam(0, 200, 1, 1, "%", "$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state", "cpu1_load", true, eRow);

            eRow = AddRow("StatusMemory", "MEMORY", eScroll);
            AddIntegerValueParam(0, 200, 1, 1, "%", "$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state", "memory_load", true, eRow);

            if (!IsDante())
            {
                eRow = AddRow("StatusEthernetInput", "ETHERNET INPUT (TOTAL/AUDIO)", eScroll);
                AddIntegerValueParam(0, 100, 1, 1, "", "$._modules[?(@.id==" + ZMI_RAVENNAACCELERATION + ")][0].state", "ethernet_input_total_bandwidth", true, eRow);
                AddIntegerValueParam(0, 100, 1, 1, "", "$._modules[?(@.id==" + ZMI_RAVENNAACCELERATION + ")][0].state", "ethernet_input_audio_bandwidth", true, eRow);

                eRow = AddRow("StatusEthernetOutput", "ETHERNET OUTPUT (GP/AUDIO)", eScroll);
                AddIntegerValueParam(0, 100, 1, 1, "", "$._modules[?(@.id==" + ZMI_RAVENNAACCELERATION + ")][0].state", "ethernet_output_gp_bandwidth", true, eRow);
                AddIntegerValueParam(0, 100, 1, 1, "", "$._modules[?(@.id==" + ZMI_RAVENNAACCELERATION + ")][0].state", "ethernet_output_audio_bandwidth", true, eRow);
            }
        }

        if (g_nCurrentMissionID == MT48_MUSIC_MISSION_ID || g_nCurrentMissionID == MT48_MONITOR_MISSION_ID)
        {
            eRow = AddRow("GetReport", "", eScroll);
            AddGetStatusReportButton(eRow);

            eRow = AddRow("UploadStartScreenImage", "", eScroll);
            AddUploadStartScreenImageButton(eRow);

            eRow = AddRow("ResetStartScreenImage", "", eScroll);
            AddResetStartScreenImageButton(eRow);
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsExit()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("EXIT");


    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var eRow0 = AddRow("Reboot", "REBOOT", eScroll, "/common/Reboot.png", true);
        AddEvent(eRow0.id, "click", function () { OpenQuestionBoxPopup(eRow0, "Are you sure you want to reboot ?", "", function () { self.Communicator.publish("/service/ravenna/commands", { command: "reboot" }); CloseSettingsPopupContainer(); }); });

        var eRow1 = AddRow("Save", "SAVE", eScroll, "/common/Store.png", true);
        AddEvent(eRow1.id, "click", function () { self.Communicator.publish("/service/ravenna/commands", { command: "save" }); });

        var eRow2 = AddRow("RebootToFactory", "REBOOT TO FACTORY", eScroll, "/common/Factory.png", true);
        AddEvent(eRow2.id, "click", function () { OpenQuestionBoxPopup(eRow2, "Are you sure you want to reboot to factory ?", "", function () { self.Communicator.publish("/service/ravenna/commands", { command: "reset_to_factory" }); CloseSettingsPopupContainer(); }); });
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsMonitoring()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("MONITORING");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        switch (g_nCurrentMissionID)
        {    
            case MUSIC_MISSION_ID:
            {
                AddRowTitle("Monitoring", "MONITORING", eScroll);
                {
                    var eRow = AddRow("MonitoringRefLevel", "REF LEVEL", eScroll, "/music_common/Monitoring.png");
                    AddIntegerValueParam(-600, 0, 5, 10, "dB", "$._oem_ui_process_engine.music.mixer.settings", "ref_level", false, eRow);

                    eRow = AddRow("MonitoringDimLevel", "DIM LEVEL", eScroll, "/music_common/Dim.png");
                    AddIntegerValueParam(-600, -60, 5, 10, "dB", "$._oem_ui_process_engine.music.mixer.settings", "dim_level", false, eRow);

                    eRow = AddRow("MonitoringMixerLayout", "MIXER LAYOUT", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.settings", "mixer_layout", [["SOLO", 0], ["MUTE", 1]], null, null, null, false, false, "", eRow);

                    eRow = AddRow("MonitoringSoloExclusive", "SOLO EXCLUSIVE", eScroll, "/music_common/Monitoring.png");
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "solo_exclusive", false, false, "", "", false, eRow);

                    eRow = AddRow("MonitoringSoloPfl", "SOLO PFL", eScroll, "/music_common/Monitoring.png");                
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "solo_pfl", false, false, "", "", false, eRow);

                    eRow = AddRow("MonitoringMainMixSoloSafe", "MAIN MIX SOLO SAFE", eScroll, "/music_common/Monitoring.png");                
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix_solo_safe", false, false, "", "", false, eRow);

                    eRow = AddRow("MonitoringTalkLatch", "TALK LATCH", eScroll, "/music_common/Talk.png");        
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_latch", false, false, "", "", false, eRow);

                    eRow = AddRow("MonitoringHeadphonesCrossfeed", "HEADPHONES CROSSFEED", eScroll, "/music_common/Crossfeed.png");
                    AddIntegerValueParam(0, 100, 1, 1, "%", "$._oem_ui_process_engine.music.mixer.settings", "headphones_crossfeed", false, eRow);

                    eRow = AddRow("MonitoringMainMixMasterMuteSafe", "MAIN MIX MASTER/MUTE SAFE", eScroll, "/music_common/Monitoring.png");
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix_rotary_knob_safe", false, false, "", "", false, eRow);

                    eRow = AddRow("MonitoringDisableCuesMonitoring", "DISABLE MIX/ALT CUES MONITORING", eScroll, "/music_common/Monitoring.png");        
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "cue_monitoring_disabled", false, false, "", "", false, eRow);
                }

                AddRowTitle("MixAlt", "MIX-ALT", eScroll);
                {
                    var eRow = AddRow("MixAltMode", "MIX-ALT MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.settings", "mix_alt_mode", [["MIX ALT", 0], ["MIX A/B", 1], ["SUB .1", 2], ["SUB .2", 3]], null, null, null, false, false, "", eRow);

                    eRow = AddRow("MixAltABOrSubTrim", "A/B OR SUB TRIM", eScroll, "/music_common/Boost.png");
                    AddIntegerValueParam(-12, 12, 1, 1, "dB", "$._oem_ui_process_engine.music.mixer.settings", "mix_alt_trim", false, eRow);

                    eRow = AddRow("MixAltSubCrossover", "SUB CROSSOVER", eScroll, "/music_common/Crossover.png");
                    AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix_alt_crossover", false, false, "", "", false, eRow);
                    AddTextParam("", "", "80 Hz", false, true, eRow);

                    var tModes = [["CUE", 0], ["MIX-ALT", 1]];

                    eRow = AddRow("MixAltCue1Mode", "CUE 1 MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==2)][0]", "cue_mode", tModes, null, null, null, false, false, "", eRow);

                    eRow = AddRow("MixAltCue2Mode", "CUE 2 MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==3)][0]", "cue_mode", tModes, null, null, null, false, false, "", eRow);

                    eRow = AddRow("MixAltCue3Mode", "CUE 3 MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==4)][0]", "cue_mode", tModes, null, null, null, false, false, "", eRow);

                    eRow = AddRow("MixAltCue4Mode", "CUE 4 MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==5)][0]", "cue_mode", tModes, null, null, null, false, false, "", eRow);

                    eRow = AddRow("MixAltCue5Mode", "CUE 5 MODE", eScroll, "/music_common/Monitoring.png");
                    AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==6)][0]", "cue_mode", tModes, null, null, null, false, false, "", eRow);
                }
                break;
            }

            case COMMENTARY_UNIT_MISSION_ID:
            {
                var tLevels = [["0dB", 0], ["+6dB", 60], ["+12dB", 120]];

                var eRow = AddRow("RefLevel", "REF LEVEL", eScroll, "/music_common/Monitoring.png");
                AddIntegerValueParam(-600, 0, 5, 10, "dB", "$._oem_ui_process_engine.commentary_unit", "ref_level", false, eRow);

                eRow = AddRow("DimLevel", "DIM LEVEL", eScroll, "/music_common/Dim.png");
                AddIntegerValueParam(-600, -60, 5, 10, "dB", "$._oem_ui_process_engine.commentary_unit", "dim_level", false, eRow);

                eRow = AddRow("MonitorsMaxLevel", "MONITORS MAX LEVEL", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "monitors_max_level", tLevels, null, null, null, false, false, "", eRow);

                eRow = AddRow("SidetonesMaxLevel", "SIDETONES MAX LEVEL", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "sidetones_max_level", tLevels, null, null, null, false, false, "", eRow);

                eRow = AddRow("IntsMaxLevel", "INTS MAX LEVEL", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "ints_max_level", tLevels, null, null, null, false, false, "", eRow);

                eRow = AddRow("ProgsMaxLevel", "PROGS MAX LEVEL", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "progs_max_level", tLevels, null, null, null, false, false, "", eRow);

                eRow = AddRow("ProgsDimming", "PROGS DIMING", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "progs_dimming", [["BOTH Ears", 0], ["LEFT Ear", 1], ["RIGHT Ear", 2]], null, null, null, false, false, "", eRow);

                eRow = AddRow("TalksDimming", "TALKS DIMMING", eScroll, "/music_common/Talk.png");
                AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "talks_dimming", false, false, "", "", false, eRow);

                eRow = AddRow("TalksSplitting", "TALKS SPLITTING", eScroll, "/music_common/Talk.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.commentary_unit", "talks_splitting", [["NONE", 0], ["PROGS/SIDES", 1], ["SIDES/PROGS", 2]], null, null, null, false, false, "", eRow);

                eRow = AddRow("TalksBoosting", "TALKS BOOSTING", eScroll, "/music_common/Talk.png");
                AddIntegerValueParam(-120, +120, 5, 10, "dB", "$._oem_ui_process_engine.commentary_unit", "talks_boosting", false, eRow);

                eRow = AddRow("OnAirCutMonitor1", "ON AIR CUT MONITOR 1", eScroll, "/music_common/Monitoring.png");
                AddSwitchParam("$._oem_ui_process_engine.commentary_unit.commentators[?(@.id==0)][0]", "mon_cut_on_air", false, false, "", "", false, eRow);

                eRow = AddRow("OnAirCutMonitor2", "ON AIR CUT MONITOR 2", eScroll, "/music_common/Monitoring.png");
                AddSwitchParam("$._oem_ui_process_engine.commentary_unit.commentators[?(@.id==1)][0]", "mon_cut_on_air", false, false, "", "", false, eRow);

                break;
            }

            case MT48_MUSIC_MISSION_ID:
            {   
                var eRow = AddRow("RefLevel", "REF LEVEL", eScroll, "/music_common/Monitoring.png");
                AddIntegerValueParam(-600, 0, 5, 10, "dB", "$._oem_ui_process_engine.music.mixer.settings", "ref_level", false, eRow);

                eRow = AddRow("DimLevel", "DIM LEVEL", eScroll, "/music_common/Dim.png");
                AddIntegerValueParam(-600, -60, 5, 10, "dB", "$._oem_ui_process_engine.music.mixer.settings", "dim_level", false, eRow);

                eRow = AddRow("MixerLayout", "MIXER LAYOUT", eScroll, "/music_common/Monitoring.png");
                AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.settings", "mixer_layout", [["SOLO", 0], ["MUTE", 1]], null, null, null, false, false, "", eRow);

                eRow = AddRow("SoloExclusive", "SOLO EXCLUSIVE", eScroll, "/music_common/Monitoring.png");
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "solo_exclusive", false, false, "", "", false, eRow);

                eRow = AddRow("SoloPfl", "SOLO PFL", eScroll, "/music_common/Monitoring.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "solo_pfl", false, false, "", "", false, eRow);             

                eRow = AddRow("HeadphonesCrossfeed", "HEADPHONES CROSSFEED", eScroll, "/music_common/Crossfeed.png");
                AddIntegerValueParam(0, 100, 1, 1, "%", "$._oem_ui_process_engine.music.mixer.settings", "headphones_crossfeed", false, eRow);

                eRow = AddRow("TalkLatch", "TALK LATCH", eScroll, "/music_common/Talk.png");        
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_latch", false, false, "", "", false, eRow);

                eRow = AddRow("TalkToMix1", "TALK TO MIX 1", eScroll, "/music_common/Talk.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_to_mix1", false, false, "", "", false, eRow);

                eRow = AddRow("TalkToMix2", "TALK TO MIX 2", eScroll, "/music_common/Talk.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_to_mix2", false, false, "", "", false, eRow);

                eRow = AddRow("TalkToMix3", "TALK TO MIX 3", eScroll, "/music_common/Talk.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_to_mix3", false, false, "", "", false, eRow);

                eRow = AddRow("TalkToMix4", "TALK TO MIX 4", eScroll, "/music_common/Talk.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "talk_to_mix4", false, false, "", "", false, eRow);

                eRow = AddRow("Mix2FollowsMix1", "MIX 2 FOLLOWS MIX 1", eScroll, "/music_common/Monitoring.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix2_follow_mix1", false, false, "", "", false, eRow);

                eRow = AddRow("Mix3FollowsMix1", "MIX 3 FOLLOWS MIX 1", eScroll, "/music_common/Monitoring.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix3_follow_mix1", false, false, "", "", false, eRow);

                eRow = AddRow("Mix4FollowsMix1", "MIX 4 FOLLOWS MIX 1", eScroll, "/music_common/Monitoring.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix4_follow_mix1", false, false, "", "", false, eRow);

                eRow = AddRow("Mix12InABMode", "MIX 1-2 IN A/B MODE", eScroll, "/music_common/Monitoring.png");                
                AddSwitchParam("$._oem_ui_process_engine.music.mixer.settings", "mix1_mix2_ab", false, false, "", "", false, eRow);

                break;
            }

            default:
                break;
        }
    }

    ResizeScroll(false);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MUSIC MISSION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsMixing()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("MIXING");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        AddRowTitle("General", "GENERAL", eScroll);
        {
            var eRow = AddRow("GeneralStripsResetValue", "STRIPS RESET VALUE", eScroll, "common/Meters.png");
            AddMultiChoiceParam("$._oem_ui_process_engine.music.mixer.settings", "strips_reset_value", [["0 dB", 0], ["-oo dB", -1445]], null, null, null, false, false, "", eRow);
        }

        AddRowTitle("MainMixPostFader", "MAIN MIX POST FADER", eScroll);
        {
            var eRow = AddRow("MainMixPostFaderCue1", "CUE 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==2)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderCue2", "CUE 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==3)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderCue3", "CUE 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==4)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderCue4", "CUE 4", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==5)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderCue5", "CUE 5", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==6)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderReverb", "REVERB", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==7)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderDynamics", "DYNAMICS", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==8)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderSend1", "SEND 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==9)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderSend2", "SEND 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==10)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostFaderSend3", "SEND 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==11)][0]", "main_mix_post_fader", false, false, "", "", false, eRow);
        }

        AddRowTitle("MainMixPostMute", "MAIN MIX POST MUTE", eScroll);
        {
            var eRow = AddRow("MainMixPostMuteCue1", "CUE 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==2)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteCue2", "CUE 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==3)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteCue3", "CUE 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==4)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteCue4", "CUE 4", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==5)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteCue5", "CUE 5", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==6)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteReverb", "REVERB", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==7)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteDynamics", "DYNAMICS", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==8)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteSend1", "SEND 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==9)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteSend2", "SEND 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==10)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPostMuteSend3", "SEND 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==11)][0]", "main_mix_post_mute", false, false, "", "", false, eRow);
        }

        AddRowTitle("MainMixPanLinked", "MAIN MIX PAN LINKED", eScroll);
        {
            var eRow = AddRow("MainMixPanLinkedCue1", "CUE 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==2)][0]", "pan_linked", false, false, "", "", false,eRow);

            eRow = AddRow("MainMixPanLinkedCue2", "CUE 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==3)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedCue3", "CUE 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==4)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedCue4", "CUE 4", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==5)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedCue5", "CUE 5", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==6)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedReverb", "REVERB", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==7)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedDynamics", "DYNAMICS", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==8)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedSend1", "SEND 1", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==9)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedSend2", "SEND 2", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==10)][0]", "pan_linked", false, false, "", "", false, eRow);

            eRow = AddRow("MainMixPanLinkedSend3", "SEND 3", eScroll, "common/Meters.png");
            AddSwitchParam("$._oem_ui_process_engine.music.mixer.busses[?(@.id==11)][0]", "pan_linked", false, false, "", "", false, eRow);
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MT48 MISSION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsOpticalIOs()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("OPTICAL I/O");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var tModes = [["SPDIF", 1], ["ADAT", 2]];

        var eRow = AddRow("OpticalPhysicalMode", "PHYSICAL MODE", eScroll, "/common/Toslink.png");
        AddMultiChoiceParam("$._modules[?(@.id==" + (ZMI_SPDIF_0) + ")][0]", "physical_mode", tModes, null, null, null, false, false, "", eRow);
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsUSBDanteMapping()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    if (IsMT48())
    {
        var nUSBInputs = GetJSONValue("$._modules[?(@.id==" + ZMI_USB + ")][0].state.ios_info.current_nb_inputs");
        var nUSBOutputs = GetJSONValue("$._modules[?(@.id==" + ZMI_USB + ")][0].state.ios_info.current_nb_outputs");

        UpdateSettingsSectionTitle("USB I/O (" + nUSBOutputs + "/" + nUSBInputs + ")");
    }
    else
    {
        UpdateSettingsSectionTitle("DANTE I/O");
    }


    // auto configure from mission id
    let bDisplayUSBInputMapping = false;
    let bDisplayDanteInputMapping = IsDante();

    let bDisplayOutputMapping = false;

    // inputs -> USB or Dante
    let bDisplaySplit = false;
    let bDisplayOptical = false;
    let bDisplayPeering = !IsDante();
    let bDisplayPostFX = false;
    let bDisplayMusicBusReturn = false;
    let bDisplayMT48MusicBusReturn = false;

    switch (g_nCurrentMissionID)
    {
        case MONITOR_MISSION_ID:
            bDisplaySplit = true;
            break;

        case MUSIC_MISSION_ID:
            bDisplayPostFX = true;
            bDisplayMusicBusReturn = true;
            break;

        case MT48_MUSIC_MISSION_ID:
            bDisplayUSBInputMapping = true;

            bDisplayOptical = true;
            bDisplayPostFX = true;
            bDisplayMT48MusicBusReturn = true;

            bDisplayOutputMapping = true;
            break;

        case MT48_MONITOR_MISSION_ID:
            bDisplayUSBInputMapping = true;

            bDisplaySplit = true;
            bDisplayOptical = true;
            break;

        default:
            break;
    }


    var nOpticalInputs = 0;
    var nOpticalOutputs = 0;

    var nDanteInputs = 0;
    var nDanteOutputs = 0;

    if (bDisplayOptical)
    {
        nOpticalInputs = GetJSONValue("$._modules[?(@.id==" + ZMI_SPDIF_0 + ")][0].state.ios_info.current_nb_inputs");
        nOpticalOutputs = GetJSONValue("$._modules[?(@.id==" + ZMI_SPDIF_0 + ")][0].state.ios_info.current_nb_outputs");
    }

    if (bDisplayDanteInputMapping)
    {
        nDanteInputs = GetJSONValue("$._modules[?(@.id==" + ZMI_DANTE + ")][0].state.ios_info.current_nb_inputs");
        nDanteOutputs = GetJSONValue("$._modules[?(@.id==" + ZMI_DANTE + ")][0].state.ios_info.current_nb_outputs");
    }
    

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        AddRowTitle("InputsRoutedToComputeur", "INPUTS ROUTED TO COMPUTER", eScroll);
        {
            var eRow = AddRow("InputsRoutedToComputeurTitle", "EMPTY", eScroll);

            if (bDisplayDanteInputMapping)
            {
                AddTextParam("", "", "Dante Ch.", false, true, eRow, 68, true);
            }
            if (bDisplayUSBInputMapping)
            {
                AddTextParam("", "", "USB Ch.", false, true, eRow, 68, true);
            }


            var tInfos = [];
            tInfos.push(["AnalogIn", "ANALOG IN", "analog_in", "/common/Mic.png", true]);

            if (bDisplaySplit)
            {
                tInfos.push(["AnalogInSplit", "ANALOG IN SPLIT", "analog_in_split", "/common/Mic.png", true]);
            }

            if (bDisplayOptical)
            {
                let Text = nOpticalInputs > 0 ? "OPTICAL 1-" + nOpticalInputs.toString() : "OPTICAL";
                tInfos.push(["Optical", Text, "optical_in", "/common/Toslink.png", true]);
            }

            if (bDisplayPeering)
            {
                tInfos.push(["Peered", "PEERED", "peered_in", "/common/RJ45.png", true]);
            }

            if (bDisplayPostFX)
            {
                tInfos.push(["AnalogInPostFx", "ANALOG IN POST FX", "post_fx_analog_in", "/common/Mic.png", true]);

                if (bDisplayOptical)
                {
                    let Text = nOpticalInputs > 0 ? "OPTICAL 1-" + nOpticalInputs.toString() + " POST FX" : "OPTICAL POST FX";
                    tInfos.push(["OpticalPostFX", Text, "post_fx_optical_in", "/common/Toslink.png", true]);
                }
            }

            if (bDisplayPostFX && bDisplayPeering)
            {
                tInfos.push(["PeeredPostFx", "PEERED POST FX", "post_fx_peered_in", "/common/RJ45.png", true]);
            }

            tInfos.push(["BuiltInMic", "BUILT-IN MIC", "builtin_mic", "/common/Mic.png", true]);

            if (bDisplayMusicBusReturn)
            {
                tInfos.push(["BusReturnMix", "BUS RETURN MIX", "mix_bus", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnMixAlt", "BUS RETURN M-ALT", "mix_alt_bus", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnCue1", "BUS RETURN CUE 1", "cue_bus_1", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnCue2", "BUS RETURN CUE 2", "cue_bus_2", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnCue3", "BUS RETURN CUE 3", "cue_bus_3", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnCue4", "BUS RETURN CUE 4", "cue_bus_4", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnCue5", "BUS RETURN CUE 5", "cue_bus_5", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnRev", "BUS RETURN REV", "rev_bus", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnDyn", "BUS RETURN DYN", "dyn_bus", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnSend1", "BUS RETURN SEND 1", "send_bus_1", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnSend2", "BUS RETURN SEND 2", "send_bus_2", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnSend3", "BUS RETURN SEND 3", "send_bus_3", "/common/Mixer.png", true]);
            }

            if (bDisplayMT48MusicBusReturn)
            {
                tInfos.push(["BusReturnMix1", "BUS RETURN MIX 1", "mix_bus_1", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnMix2", "BUS RETURN MIX 2", "mix_bus_2", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnMix3", "BUS RETURN MIX 3", "mix_bus_3", "/common/Mixer.png", true]);
                tInfos.push(["BusReturnMix4", "BUS RETURN MIX 4", "mix_bus_4", "/common/Mixer.png", true]);
            }

            if (IsDante() && bDisplayUSBInputMapping)
            {
                // pre_fx
                if (nDanteInputs > 0)
                {
                    let nLastChannel = Math.min(8, nDanteInputs);
                    tInfos.push(["DanteInGrp0", "DANTE 1-" + nLastChannel.toString() + " &rightarrow; USB", "dante_in_grp_0", "/common/Dante.png", false]);
                }

                if (nDanteInputs > 8)
                {
                    let nLastChannel = Math.min(16, nDanteInputs);
                    tInfos.push(["DanteInGrp1", "DANTE 9-" + nLastChannel.toString() + " &rightarrow; USB", "dante_in_grp_1", "/common/Dante.png", false]);
                }

                // post_fx
                if (bDisplayPostFX)
                {
                    if (nDanteInputs > 0)
                    {
                        let nLastChannel = Math.min(8, nDanteInputs);
                        tInfos.push(["DanteInPostFXGrp0", "DANTE 1-" + nLastChannel.toString() + " POST FX &rightarrow; USB", "post_fx_dante_in_grp_0", "/common/Dante.png", false]);
                    }

                    if (nDanteInputs > 8)
                    {
                        let nLastChannel = Math.min(16, nDanteInputs);
                        tInfos.push(["DanteInPostFXGrp1", "DANTE 9-" + nLastChannel.toString() + " POST FX &rightarrow; USB", "post_fx_dante_in_grp_1", "/common/Dante.png", false]);
                    }
                }
            }

            for (var nIdx = 0; nIdx < tInfos.length; nIdx++)
            {
                var tInfo = tInfos[nIdx];
                eRow = AddRow("InputsRoutedToComputeur" + tInfo[0], tInfo[1], eScroll, tInfo[3]);

                if (bDisplayDanteInputMapping && tInfo[4])
                {
                    AddUSBDanteMappingParam("$._oem_ui_process_engine.dante_mapping", tInfo[2], eRow);
                }

                if (bDisplayUSBInputMapping)
                {
                    AddUSBDanteMappingParam("$._oem_ui_process_engine.usb_mapping", tInfo[2], eRow);
                }                
            }
        }

        if (bDisplayOutputMapping)
        {
            AddRowTitle("SoftwarePlayback", "SOFTWARE PLAYBACK", eScroll);
            {
                var eRow = AddRow("SoftwarePlaybackTitle1", "SOFTWARE PLAYBACK TO MT 48 MIXER", eScroll);
                AddTextParam("", "", "USB Ch.", false, true, eRow, 68, true);

                for (var nIdx = 0; nIdx < 4; nIdx++)
                {
                    var szName = GetJSONValue("$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + (100 + (nIdx * 2)) + ")].name");
                    if (szName != null)
                        szName = szName.replace("-L", "").replace("-R", "");

                    eRow = AddRow("SoftwarePlaybackDaw" + (nIdx + 1), szName.toUpperCase(), eScroll, "/common/Mixer.png");

                    AddUSBDanteMappingParam("$._oem_ui_process_engine.usb_mapping", "daw_" + (nIdx + 1), eRow);
                }


                eRow = AddRow("SoftwarePlaybackTitle2", "SOFTWARE PLAYBACK - DIRECT ROUTING", eScroll);
                AddTextParam("", "", "USB Ch.", false, true, eRow, 68, true);

                var tInfos = [];
                tInfos.push(["MainOut12", "MAIN OUT 1/2", "main_out", "/common/SpeakerA.png"]);
                tInfos.push(["LineOut34", "LINE OUT 3/4", "line_out", "/common/SpeakerB.png"]);
                tInfos.push(["Headphone1", "HEADPHONE 1", "hp1", "/common/Headphone1.png"]);
                tInfos.push(["Headphone2", "HEADPHONE 2", "hp2", "/common/Headphone2.png"]);

                if (bDisplayOptical)
                {
                    let Text = nOpticalOutputs > 0 ? "OPTICAL 1-" + nOpticalOutputs.toString() : "OPTICAL";
                    tInfos.push(["Optical", Text, "optical_out", "/common/Toslink.png"]);
                }

                if (IsDante())
                {
                    if (nDanteOutputs > 0)
                    {
                        let nLastChannel = Math.min(8, nDanteOutputs);
                        tInfos.push(["Dante_out_grp0", "DANTE 1-" + nLastChannel.toString() + " &leftarrow; USB", "dante_out_grp_0", "/common/Dante.png"]);
                    }
                    if (nDanteOutputs > 8)
                    {
                        let nLastChannel = Math.min(16, nDanteOutputs);
                        tInfos.push(["Dante_out_grp1", "DANTE 9-" + nLastChannel.toString() + " &leftarrow; USB", "dante_out_grp_1", "/common/Dante.png"]);
                    }
                }

                for (var nIdx = 0; nIdx < tInfos.length; nIdx++)
                {
                    var tInfo = tInfos[nIdx];
                    eRow = AddRow("SoftwarePlayback" + tInfo[0], tInfo[1], eScroll, tInfo[3]);

                    AddUSBDanteMappingParam("$._oem_ui_process_engine.usb_mapping", tInfo[2], eRow);
                }
            }
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// COMMENTARY UNIT MISSION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsCommentary()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("COMMENTARY");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        AddRowTitle("Options", "OPTIONS", eScroll);
        {
            var eRow = AddRow("OptionsOnAirABMode", "ON AIR A/B MODE", eScroll, "/music_common/Talk.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "on_air_ab_mode", false, false, "", "", false, eRow);

            eRow = AddRow("OptionsHilightMonitors", "HILIGHT MONITORS", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "highlight_monitors", false, false, "", "", false, eRow);
        }

        AddRowTitle("Names", "NAMES", eScroll);
        {
            var eRow = AddRow("NamesOnAir", "ON AIR", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "on_air_name", "", true, false, eRow);

            eRow = AddRow("NamesOnAirB", "ON AIR B", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "on_air_name_b", "", true, false, eRow);

            eRow = AddRow("NamesMute", "MUTE", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "mute_name", "", true, false, eRow);

            eRow = AddRow("NamesTalkA", "TALK A", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "talk_name_a", "", true, false, eRow);

            eRow = AddRow("NamesTalkB", "TALK B", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "talk_name_b", "", true, false, eRow);

            eRow = AddRow("NamesTalkC", "TALK C", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "talk_name_c", "", true, false, eRow);

            eRow = AddRow("NamesTalkD", "TALK D", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "talk_name_d", "", true, false, eRow);

            eRow = AddRow("NamesMonitor1", "MONITOR 1", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "monitor_name_1", "", true, false, eRow);

            eRow = AddRow("NamesMonitor2", "MONITOR 2", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "monitor_name_2", "", true, false, eRow);

            eRow = AddRow("NamesSidetone1", "SIDETONE 1", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "sidetone_name_1", "", true, false, eRow);

            eRow = AddRow("NamesSidetone2", "SIDETONE 2", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "sidetone_name_2", "", true, false, eRow);

            eRow = AddRow("NamesInt1", "INT 1", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "int_name_1", "", true, false, eRow);

            eRow = AddRow("NamesInt2", "INT 2", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "int_name_2", "", true, false, eRow);

            eRow = AddRow("NamesProg1", "PROG 1", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_1", "", true, false, eRow);

            eRow = AddRow("NamesProg2", "PROG 2", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_2", "", true, false, eRow);

            eRow = AddRow("NamesProg3", "PROG 3", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_3", "", true, false, eRow);

            eRow = AddRow("NamesProg4", "PROG 4", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_4", "", true, false, eRow);

            eRow = AddRow("NamesProg5", "PROG 5", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_5", "", true, false, eRow);

            eRow = AddRow("NamesProg6", "PROG 6", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_6", "", true, false, eRow);

            eRow = AddRow("NamesProg7", "PROG 7", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_7", "", true, false, eRow);

            eRow = AddRow("NamesProg8", "PROG 8", eScroll, "/common/Name.png");
            AddTextParam("$._oem_ui_process_engine.commentary_unit", "prog_name_8", "", true, false, eRow);
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsCommentator(nCommentatorID)
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("COMMENTATOR " + (nCommentatorID + 1));

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var szPath = "$._oem_ui_process_engine.commentary_unit.commentators[?(@.id==" + nCommentatorID + ")][0]";

        if (nCommentatorID == 1)
        {
            var eRow = AddRow("Enable", "ENABLE", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibleOnTFT", "VISIBLE ON TFT", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "visible", false, false, "", "", false, eRow);
        }

        var eRow = AddRow("Name", "NAME", eScroll, "/common/Name.png");
        AddTextParam(szPath, "name", "", true, false, eRow);

        if (nCommentatorID == 0)
        {
            eRow = AddRow("UseBuiltInMic", "USE BUILT-IN MIC", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "use_builtin_mic", false, false, "", "", false, eRow);
        }

        AddRowTitle("Latch", "LATCH", eScroll);
        {
            eRow = AddRow("LatchMute", "MUTE", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "mute_latch", false, false, "", "", false, eRow);

            eRow = AddRow("LatchTalkA", "TALK A", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "talk_a_latch", false, false, "", "", false, eRow);

            eRow = AddRow("LatchTalkB", "TALK B", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "talk_b_latch", false, false, "", "", false, eRow);

            eRow = AddRow("LatchTalkC", "TALK C", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "talk_c_latch", false, false, "", "", false, eRow);

            eRow = AddRow("LatchTalkD", "TALK D", eScroll, "/music_common/Talk.png");
            AddSwitchParam(szPath, "talk_d_latch", false, false, "", "", false, eRow);
        }

        AddRowTitle("Lock", "LOCK", eScroll);
        {
            eRow = AddRow("LockOnAir", "ON AIR", eScroll, "/common/Lock.png");
            AddSwitchParam(szPath, "on_air_lock", false, false, "", "", false, eRow);

            eRow = AddRow("LockMute", "MUTE", eScroll, "/common/Lock.png");
            AddSwitchParam(szPath, "mute_lock", false, false, "", "", false, eRow);
        }

        AddRowTitle("Visibility", "VISIBILITY", eScroll);
        {
            eRow = AddRow("VisibilitySidetone1", "SIDETONE 1", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "sidetone_1_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilitySidetone2", "SIDETONE 2", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "sidetone_2_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityInt1", "INT 1", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "int_1_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityInt2", "INT 2", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "int_2_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg1", "PROG 1", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_1_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg2", "PROG 2", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_2_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg3", "PROG 3", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_3_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg4", "PROG 4", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_4_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg5", "PROG 5", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_5_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg6", "PROG 6", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_6_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg7", "PROG 7", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_7_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityProg8", "PROG 8", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "prog_8_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityTalkA", "TALK A", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "talk_a_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityTalkB", "TALK B", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "talk_b_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityTalkC", "TALK C", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "talk_c_enable", false, false, "", "", false, eRow);

            eRow = AddRow("VisibilityTalkD", "TALK D", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam(szPath, "talk_d_enable", false, false, "", "", false, eRow);
        }
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsAutoDim()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("AUTO-DIM");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var eRow = AddRow("AutoDimVoxOnThreshold", "VOX ON THRESHOLD", eScroll, "/music_common/Monitoring.png");
        AddIntegerValueParam(-1445, 0, 5, 10, "dB", "$._oem_ui_process_engine.commentary_unit", "autodim_on_threshold", false, eRow);

        eRow = AddRow("AutoDimVoxOffThreshold", "VOX OFF THRESHOLD", eScroll, "/music_common/Monitoring.png");
        AddIntegerValueParam(-1445, 0, 5, 10, "dB", "$._oem_ui_process_engine.commentary_unit", "autodim_off_threshold", false, eRow);

        eRow = AddRow("AutoDimVoxHoldTime", "VOX HOLD TIME", eScroll, "/music_common/Monitoring.png");
        AddIntegerValueParam(0, 5000, 50, 0, "ms", "$._oem_ui_process_engine.commentary_unit", "autodim_hold_time", false, eRow);

        AddRowTitle("Listen", "LISTEN", eScroll);
        {
            eRow = AddRow("ListenInt1", "INT 1", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "int_1_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenInt2", "INT 2", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "int_2_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg1", "PROG 1", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_1_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg2", "PROG 2", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_2_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg3", "PROG 3", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_3_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg4", "PROG 4", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_4_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg5", "PROG 5", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_5_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg6", "PROG 6", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_6_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg7", "PROG 7", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_7_autodim_listen_enable", false, false, "", "", false, eRow);

            eRow = AddRow("ListenProg8", "PROG 8", eScroll, "/music_common/Monitoring.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_8_autodim_listen_enable", false, false, "", "", false, eRow);
        }

        AddRowTitle("Dim", "DIM", eScroll);
        {
            eRow = AddRow("DimProg1", "PROG 1", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_1_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg2", "PROG 2", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_2_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg3", "PROG 3", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_3_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg4", "PROG 4", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_4_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg5", "PROG 5", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_5_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg6", "PROG 6", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_6_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg7", "PROG 7", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_7_autodim_enable", false, false, "", "", false, eRow);

            eRow = AddRow("DimProg8", "PROG 8", eScroll, "/music_common/Dim.png");
            AddSwitchParam("$._oem_ui_process_engine.commentary_unit", "prog_8_autodim_enable", false, false, "", "", false, eRow);
        }
    }

    ResizeScroll(false);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MONITOR MISSION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsPresets()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("PRESETS");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        //AddRowTitle("SampleRate", "SAMPLE RATE", eScroll);
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsMeters()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("METERS");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var szPath = "$._modules[?(@.id==" + ZMI_ROUTERVUMETER + ")][0].vumeter";

        var nProductType = GetJSONValue("$.identity.product_type");
        var nAlagoType = GetJSONValue("$._modules[?(@.id==" + ZMI_ZMAN + ")][0].state.anubis.analog_type");
        if (nProductType != null && nAlagoType != null && (nProductType == 1 || nProductType == 101) && nAlagoType == 1) // EPT_Anubis, EPT_Anubis_Dante, EAT_Premium
        {
            var eRow = AddRow("MetersHotPCM", "HOT (PCM)", eScroll, "/common/Meters.png");
            AddFloatValueParam(-2, 0, 0.1, "dB", szPath, "level_hot", false, eRow);

            eRow = AddRow("MetersHotDXDDSD", "HOT (DXD/DSD)", eScroll, "/common/Meters.png");
            AddFloatValueParam(-2, 6, 0.1, "dB", szPath, "level_dxddsd_hot", false, eRow);
        }
        else
        {
            var eRow = AddRow("MetersHot", "HOT", eScroll, "/common/Meters.png");
            AddFloatValueParam(-2, 0, 0.1, "dB", szPath, "level_hot", false, eRow);
        }

        var eRow = AddRow("MetersAlignment", "ALIGNMENT", eScroll, "/common/Meters.png");
        AddIntegerValueParam(-24, 0, 0.1, 1, "dB", szPath, "level_alignment", false, eRow);

        var tTimes = [["OFF", 0]];
        for (var i = 25; i <= 100; i += 25)
        {
            tTimes.push([i + " ms/dB", i]);
        }

        eRow = AddRow("MetersDecayTime", "DECAY INTEGRATION TIME", eScroll, "/common/Meters.png");
        AddMultiChoiceParam(szPath, "decay_integration_time", tTimes, null, null, null, false, false, "", eRow);

        var eRow = AddRow("MetersPeakHold", "PEAK HOLD", eScroll, "/common/Meters.png");
        AddSwitchParam(szPath, "peak_hold", false, false, "", "", false, eRow);
    }

    ResizeScroll(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSettingsMonitorLevels()
{
    var eScroll = document.getElementById("settingsScroll");
    if (eScroll == null)
    {
        return;
    }

    UpdateSettingsSectionTitle("MONITOR LEVELS");

    eScroll.innerHTML = "";
    {
        AddSettingsBackTo("SETTINGS");

        var szPath = "$._oem_ui_process_engine.monitoring.speaker_set";

        var eRow = AddRow("MaxLevel", "MAX LEVEL", eScroll, "/common/Levels.png");
        AddIntegerValueParam(Parameters_Value_Definition[EPE_SPEAKER_SET_MAX_LEVEL][EPPE_MIN], Parameters_Value_Definition[EPE_SPEAKER_SET_MAX_LEVEL][EPPE_MAX], Parameters_Value_Definition[EPE_SPEAKER_SET_MAX_LEVEL][EPPE_STEPS], Parameters_Value_Definition[EPE_SPEAKER_SET_MAX_LEVEL][EPPE_DIVIDER], "dB", szPath, "max_level", false, eRow);

        eRow = AddRow("RefLevel", "REF LEVEL", eScroll, "/common/Levels.png");
        AddIntegerValueParam(Parameters_Value_Definition[EPE_SPEAKER_SET_REF_LEVEL][EPPE_MIN], Parameters_Value_Definition[EPE_SPEAKER_SET_REF_LEVEL][EPPE_MAX], Parameters_Value_Definition[EPE_SPEAKER_SET_REF_LEVEL][EPPE_STEPS], Parameters_Value_Definition[EPE_SPEAKER_SET_REF_LEVEL][EPPE_DIVIDER], "dB", szPath, "ref_level", false, eRow);

        eRow = AddRow("DimLevel", "DIM LEVEL", eScroll, "/common/Levels.png");
        AddIntegerValueParam(Parameters_Value_Definition[EPE_SPEAKER_SET_DIM][EPPE_MIN], Parameters_Value_Definition[EPE_SPEAKER_SET_DIM][EPPE_MAX], Parameters_Value_Definition[EPE_SPEAKER_SET_DIM][EPPE_STEPS], Parameters_Value_Definition[EPE_SPEAKER_SET_DIM][EPPE_DIVIDER], "dB", szPath, "dim_level", false, eRow);
    }

    ResizeScroll(false);
}
