////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Music Mission Mixer Popups
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nOpenedBusRoutingPopupBusID = -1;
var g_nOpenedBusRoutingPopupLeftOutputID = -1;
var g_nOpenedBusRoutingPopupRightOutputID = -1;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsDante() {
    var nProductType = GetJSONValue("$.identity.product_type");
    switch (nProductType) {
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
function GetFirmwareVersion() {
    var Firmware_Version = GetJSONValue("$._firmware_version");
    return Firmware_Version.match("[0-9]+.[0-9]+.[0-9]+")[0];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowPopupContainer()
{
	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	eMixerSectionPopupContainer.classList.add("mixerSectionPopupContainer-show");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClosePopupContainer()
{
	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	eMixerSectionPopupContainer.classList.remove("mixerSectionPopupContainer-show");


	eMixerSectionPopupContainer.innerHTML = "";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowPopupContainerZ1()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ1");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    eMixerSectionPopupContainer.classList.add("mixerSectionPopupContainerZ1-show");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClosePopupContainerZ1()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ1");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    eMixerSectionPopupContainer.classList.remove("mixerSectionPopupContainerZ1-show");


    eMixerSectionPopupContainer.innerHTML = "";
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowPopupContainerZ2()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ2");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    eMixerSectionPopupContainer.classList.add("mixerSectionPopupContainerZ2-show");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClosePopupContainerZ2()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ2");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    eMixerSectionPopupContainer.classList.remove("mixerSectionPopupContainerZ2-show");


    eMixerSectionPopupContainer.innerHTML = "";
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenEffectsSection(bBuildEQ, bBuildDynamics, bBuildReverb, bBuildDeesser, bBusEffect, nBusID, bInputEffect, nInputID, szScrollToEffectName)
{
    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var nRerverbTypeID = jsMixer.reverb_type_id;
    var bDeesserAuthorized = bInputEffect && jsMixer.deesser_authorized;

    if (!eEffectsSection.classList.contains("visible"))
        eEffectsSection.classList.add("visible");

    if (g_bDisplaySettings)
        _toggleSettings();


    BuildEffects(bBuildEQ, bBuildDynamics, bBuildReverb && nRerverbTypeID == MERGING_REVERB_ID, bBuildReverb && nRerverbTypeID == EVENTIDE_BLACKHOLE_REVERB_ID, bBuildDeesser && bDeesserAuthorized, bBusEffect, nBusID, bInputEffect, nInputID, szScrollToEffectName);
    
    //ResizeScrollArea();

    g_nEffectSectionControlBusID = nBusID;
    g_nEffectSectionControlInputID = nInputID;
    g_szScrollToEffectName = szScrollToEffectName;

    save_ToCookie(true);

    //EnsureStripIsVisible(nInputID);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EnsureStripIsVisible(nStripID)
{
    var eStrip = document.getElementById("strip" + nStripID);
    if (eStrip == null)
    {
        return;
    }
    
    var nStripPosX = eStrip.offsetLeft;

    if (g_isStripsScroller)
    {
        g_isStripsScroller.scrollTo(-nStripPosX, 0, 0);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResizeScrollArea()
{
    if (g_isStripsScroller)
    {   
        var eStrips = document.getElementsByClassName("strip-li");
        var nStripsLength = eStrips.length;
        var nStripsWidth = nStripsLength * g_nStripWidth;

        if (document.getElementById("strips"))
        {
            g_isStripsScroller._resize();

            /*var nStipsContainerWidth = document.getElementById("strips").offsetWidth;
            g_isStripsScroller.maxScrollX = nStipsContainerWidth - nStripsWidth;
            g_isStripsScroller.refresh();  */          
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseEffectsSection()
{
    g_nEffectSectionControlBusID = -1;
    g_nEffectSectionControlInputID = -1;
    g_szScrollToEffectName = "";

    CloseEffects();

    //ResizeScrollArea();

    save_ToCookie(true);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenMainMenu()
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
    }
    var bNeumannEdition = jsMixer.settings.neumann_edition;

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eHeader = document.getElementById("header");
	if (eHeader == null)
	{
		return;
	}

	var nLeft = g_nMixerMargin;
	var nTop = Number(eHeader.offsetHeight);

    var szColumn1Width = (g_nStripWidth * (bNeumannEdition ? 2.7 : 2.5)) + "px";
    var szColumn2Width = (g_nStripWidth * (bNeumannEdition ? 2.7 : 3.3)) + "px";

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + szColumn1Width + " " + szColumn2Width + "'>";

            // build column1
            var szColumn1 = ""
            var nColumn1NbEntries = 0;
            {

				szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='resetPeaks'>RESET PEAKS</div>";
                nColumn1NbEntries++;
                
				if (!bNeumannEdition) {
                    szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft" + (jsMixer.busses[g_nCurrentBusID].muted_daws_shown ? " mixerSectionPopupMenuItemChecked" : "") + "' id='showAllAux'>SHOW ALL AUX</div>";
                    nColumn1NbEntries++;
                }

       			szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft" + (g_bDisplayPreamps ? " mixerSectionPopupMenuItemChecked" : "") + "' id='showPreamps'>";
						szColumn1 += "SHOW PREAMPS";
				szColumn1 += "</div>";
                nColumn1NbEntries++;

				szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft" + (g_bShowSendRotaries ? " mixerSectionPopupMenuItemChecked" : "") + "' id='showSendRotaries'>SHOW " + (bNeumannEdition ? "EFFECTS" : "SEND") + " KNOBS</div>";
                nColumn1NbEntries++;

                szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='showAnubisUserManual'>" + (bNeumannEdition ? "MT 48" : "ANUBIS") + " MANUAL</div>";
                nColumn1NbEntries++;
                       

                if (!bNeumannEdition)
                {
                    szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='showMissionUserManual'>MISSION MANUAL</div>";
                    nColumn1NbEntries++;
                }

                if (IsDante()) {
                    szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='showDanteAppendixManual'>DANTE APPENDIX</div>";
                    nColumn1NbEntries++;
                }

                if (!bNeumannEdition) {
                    szColumn1 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='debugReport'>DEBUG REPORT</div>";
                    nColumn1NbEntries++;
                }
            }

            // build column2
            var szColumn2 = ""
            var nColumn2NbEntries = 0;
            {
                szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='showRouting'>";
					szColumn2 += "BUS ROUTING";
				szColumn2 += "</div>";
                nColumn2NbEntries++;

				szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft" + (g_bDisplaySettings ? " mixerSectionPopupMenuItemChecked" : "") + "' id='showSettings'>";
						szColumn2 += "SETTINGS";
				szColumn2 += "</div>";
                nColumn2NbEntries++;

				szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='showSnapshots'>";
					szColumn2 += "SNAPSHOTS";
                szColumn2 += "</div>";
                nColumn2NbEntries++;

				szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='downloadPreset'>";
					szColumn2 += "DOWNLOAD SNAPSHOT";
				szColumn2 += "</div>";
                nColumn2NbEntries++;

				szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='uploadPreset'>";
						szColumn2 += "UPLOAD SNAPSHOT";

					szColumn2 += "<form action='/upload' method='post' enctype='multipart/form-data'>";
						szColumn2 += "<input id='uploadPresetInput' style='display: none;' name='preset_from_disk' type='file' accept=" + (bNeumannEdition ? '.NeuMi' : '.MuMi') + "  size='50' maxlength='10000000' onchange='LoadPresetSubmit(this.form)' tabIndex=-1>";
					szColumn2 += "</form>";
				szColumn2 += "</div>";
                nColumn2NbEntries++;

                if (!bNeumannEdition)
                {
                    szColumn2 += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='uploadSoundIDProfile'>";
						    szColumn2 += "UPLOAD SOUNDID PROFILES";  

						    szColumn2 += "<form action='/upload' method='post' enctype='multipart/form-data'>";
							    szColumn2 += "<input id='uploadSoundIDProfileInput' style='display: none;' name='directories_write_file:SoundIdProfiles' type='file' multiple accept='.bin' size='50' maxlength='10000000' accept='*/cfg' onchange='this.form.submit()' tabIndex=-1>";
                    	    szColumn2 += "</form>";
                    szColumn2 += "</div>";
                    nColumn2NbEntries++;
                }

            }
            szPage += "<div class='mixerSectionPopupMenuColumn'>";
                szPage += szColumn1;
                if (nColumn1NbEntries < nColumn2NbEntries) {
                    for (let i = 0; i < nColumn2NbEntries - nColumn1NbEntries; i++) {
                        // add blank entry to preserve layout
                        szPage += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='' style='background-color: transparent;'></div>";
                    }
                    nColumn1NbEntries = nColumn2NbEntries;
                }
			szPage += "</div>";


			szPage += "<div class='mixerSectionPopupMenuColumn'>";
                szPage += szColumn2;
                if (nColumn2NbEntries < nColumn1NbEntries) {
                    for (let i = 0; i < nColumn1NbEntries - nColumn2NbEntries; i++) {
                        // add blank entry to preserve layout
                        szPage += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItemTextLeft' id='' style='background-color: transparent;'></div>";
                    }
                    nColumn2NbEntries = nColumn1NbEntries;
                }
			szPage += "</div>";

		szPage += "</div>";

	szPage += "</div>";

	eMixerSectionPopupContainer.innerHTML = szPage;


    var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
	    AddEvent("mixerSectionPopup", "click", function (event) { CloseMainMenu(); }, true);
	}
	else
	{
	    AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseMainMenu(); }, true);
	    AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseMainMenu(); }, true);
	}

	AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);


	AddEvent("resetPeaks", "click", function(event)
	{
	    ResetPeaks();
	    CloseMainMenu();
	} );

	AddEvent("showAllAux", "click", function(event)
	{
	    ShowAllAux();
	    CloseMainMenu();
	} );

	AddEvent("showSendRotaries", "click", function(event)
	{
        ShowSendRotaries();
	    CloseMainMenu();
	} );


	AddEvent("showAnubisUserManual", "click", function(event)
    {
        let Firmware_Version = GetFirmwareVersion();        
        if (bNeumannEdition) {
             // TODO_URL
            window.open("https://www.merging.com/download/docs/Neumann_" + Firmware_Version + "/Neumann_MT48_User_Manual_" + Firmware_Version + ".pdf", '_blank');
        }
        else {
            window.open("https://www.merging.com/download/docs/Merging_" + Firmware_Version + "/Merging_Anubis_User_Manual_" + Firmware_Version + ".pdf", '_blank');
        }

		CloseMainMenu();
	} );

	AddEvent("showMissionUserManual", "click", function(event)
	{
        let Firmware_Version = GetFirmwareVersion();

        // Note: never call in MT48 because the "Mission Manual" bouton is hidden
        //if (bNeumannEdition) {
        //    // TODO_URL
        //    window.open("https://www.merging.com/download/docs/Neumann_" + Firmware_Version + "/Merging_Neumann_MT48_Music_Mission_Manual_" + Firmware_Version + ".pdf", '_blank');
        //}
        //else 
        {
            window.open("https://www.merging.com/download/docs/Merging_" + Firmware_Version + "/Merging_Anubis_Music_Mission_Appendix_" + Firmware_Version + ".pdf", '_blank');
        }
	    CloseMainMenu();
	} );

    AddEvent("showDanteAppendixManual", "click", function () {

        let Firmware_Version = GetFirmwareVersion();
        if (bNeumannEdition) {
            // TODO_URL
            window.open("https://www.merging.com/download/docs/Neumann_" + Firmware_Version + "/Neumann_MT48_Dante_Appendix_" + Firmware_Version + ".pdf", '_blank');
        }
        else {
            window.open("https://www.merging.com/download/docs/Merging_" + Firmware_Version + "/Merging_Anubis_Dante_Appendix_" + Firmware_Version + ".pdf", '_blank');
        }

        CloseMainMenu();
    });

	AddEvent("debugReport", "click", function(event)
	{
	    window.open('/commands/get_report', '_blank');
	    CloseMainMenu();
	} );


	AddEvent("showRouting", "click", function(event)
	{
	    OpenBusRouting();
	} );

	AddEvent("showPreamps", "click", function(event)
	{
        ShowPreamps();
	    CloseMainMenu();
	} );

	AddEvent("showSettings", "click", function(event)
	{
	    _toggleSettings();
        CloseMainMenu();
	} );


	AddEvent("showSnapshots", "click", function(event)
	{
		OpenSnapshots(true, false, "preset", false, -1, false, -1);
	} );

	AddEvent("downloadPreset", "click", function(event)
	{
	    window.open('/commands/get_device_configuration', '_blank');
	    CloseMainMenu();
    });

    AddEvent("uploadPreset", "click", function (event)
    {
        document.getElementById("uploadPresetInput").click();
    });

    AddEvent("uploadSoundIDProfile", "click", function (event)
    {
        document.getElementById("uploadSoundIDProfileInput").click();
    });

	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LoadPresetSubmit(form)
{
	document.body.appendChild(form);
	form.submit();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseMainMenu()
{
	ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusRouting()
{
    if (window.innerWidth >= 768)
        OpenBusRouting_Large();
    else
        OpenBusRouting_Low();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseBusRouting()
{
    ClosePopupContainer();
}


var g_nUpdateBusRoutingTimer = null;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusRouting()
{
    if (window.innerWidth >= 768 && document.getElementById("mixerSectionPopupBusRouting_Large"))
    {
        UpdateBusRouting_Large();
        UpdateBusRoutingPopup(g_nOpenedBusRoutingPopupBusID, g_nOpenedBusRoutingPopupLeftOutputID, g_nOpenedBusRoutingPopupRightOutputID);
    }
    else if (document.getElementById("mixerSectionPopupBusRouting_Low"))
    {
        UpdateBusRouting_Low();
    }

    clearTimeout(g_nUpdateBusRoutingTimer);
    g_nUpdateBusRoutingTimer = null;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusRouting_Low()
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var jsOutputs = GetOutputJSON(-1);
    if (jsOutputs == null)
    {
        return;
    }

    var eMixer = document.getElementById("mixerSection");
    if (eMixer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

    var nPopupPadding = 10;

    var nWidth = 750;
    var nHeight = 500;
    var nTop = Number(eMixer.offsetTop) + (Number(eMixer.offsetHeight) / 2) - (nHeight / 2);
    var nLeft = g_nMixerMargin + (nStripsWidth / 2) - (nWidth / 2);

    if (window.innerWidth <= 812 && (window.innerWidth > window.innerHeight))
    {
        nWidth = nStripsWidth;
        nHeight = Number(eMixer.offsetHeight) - g_nMixerMargin * 2;
        nTop = Number(eMixer.offsetTop) + g_nMixerMargin;
        nLeft = g_nMixerMargin;
    }

    var nBusButtonWidth = (nWidth - g_nElementsBorderWidth * 14 - nPopupPadding * 7) / 6;
    var nBusButtonHeight = (((nHeight - g_nElementsBorderWidth * 2) * 1 / 3) - (nPopupPadding * 3 - g_nElementsBorderWidth * 4)) / 2;

    var nOutputButtonWidth = (nWidth - g_nElementsBorderWidth * 2 - nPopupPadding * 5) / 4;
    var nOutputButtonHeight = (((nHeight - g_nElementsBorderWidth * 2) * 2 / 3) - nPopupPadding * 5) / 4;



    var szBusButtonStyle = " style='width:" + nBusButtonWidth + "px; height:" + nBusButtonHeight + "px; line-height: " + nBusButtonHeight + "px;'";
    var szOutputButtonStyle = " style='width:" + nOutputButtonWidth + "px; height:" + nOutputButtonHeight + "px; line-height: " + nOutputButtonHeight + "px;'";

    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupBusRouting_Low' class='mixerSectionPopupBusRouting_Low' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

        if (jsSettings.neumann_edition)
        {
            szPage += "<div id='' class='mixerSectionPopupBusRoutingBussesContainer' style='height: " + ((nHeight - nPopupPadding * 2.5 - g_nElementsBorderWidth * 2) * 1 / 3) + "px; width: " + (nWidth / 2) + "px;'>";

                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton2' class='mixerSectionPopupBusRoutingBusButton0 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton3' class='mixerSectionPopupBusRoutingBusButton1 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton4' class='mixerSectionPopupBusRoutingBusButton2 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton5'  class='mixerSectionPopupBusRoutingBusButton3 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";

            szPage += "</div>";
        }
        else
        {
            if (jsSettings.expert_mode)
            {
                szPage += "<div id='' class='mixerSectionPopupBusRoutingBussesContainerExpertMode' style='height: " + ((nHeight - nPopupPadding * 2.5 - g_nElementsBorderWidth * 2) * 1 / 3) + "px;'>";
                 
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton0' class='mixerSectionPopupBusRoutingBusButton0 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton7' class='mixerSectionPopupBusRoutingBusButton1 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton8' class='mixerSectionPopupBusRoutingBusButton2 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton9'  class='mixerSectionPopupBusRoutingBusButton3 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton10' class='mixerSectionPopupBusRoutingBusButton4 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton11' class='mixerSectionPopupBusRoutingBusButton5 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton1' class='mixerSectionPopupBusRoutingBusButton6 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton2' class='mixerSectionPopupBusRoutingBusButton7 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton3' class='mixerSectionPopupBusRoutingBusButton8 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton4' class='mixerSectionPopupBusRoutingBusButton9 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton5' class='mixerSectionPopupBusRoutingBusButton10 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton6' class='mixerSectionPopupBusRoutingBusButton11 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";

                szPage += "</div>";
            }
            else
            {
                szPage += "<div id='' class='mixerSectionPopupBusRoutingBussesContainer' style='height: " + ((nHeight - nPopupPadding * 2.5 - g_nElementsBorderWidth * 2) * 1 / 3) + "px; width: " + (nWidth / 2) + "px;'>";

                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton0' class='mixerSectionPopupBusRoutingBusButton0 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton1' class='mixerSectionPopupBusRoutingBusButton1 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton2' class='mixerSectionPopupBusRoutingBusButton2 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingBusButton9'  class='mixerSectionPopupBusRoutingBusButton3 mixerSectionPopupBusRoutingBusButton'" + szBusButtonStyle + "></div>";

                szPage += "</div>";
            }
        }
                   

            szPage += "<div id='' class='mixerSectionPopupBusRoutingOutputsContainer' style='height: " + ((nHeight - nPopupPadding * 2.5 - g_nElementsBorderWidth * 2) * 2 / 3) + "px;'>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton0' class='mixerSectionPopupBusRoutingOutputButton0 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop0' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom0' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97)  + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton8' class='mixerSectionPopupBusRoutingOutputButton1 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop8' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom8' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton16' class='mixerSectionPopupBusRoutingOutputButton2 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop16' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom16' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton24'  class='mixerSectionPopupBusRoutingOutputButton3 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop24' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom24' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton2' class='mixerSectionPopupBusRoutingOutputButton4 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop2' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom2' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton10' class='mixerSectionPopupBusRoutingOutputButton5 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop10' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom10' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton18' class='mixerSectionPopupBusRoutingOutputButton6 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop18' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom18' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton26' class='mixerSectionPopupBusRoutingOutputButton7 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop26' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom26' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton4' class='mixerSectionPopupBusRoutingOutputButton8 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop4' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom4' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton12' class='mixerSectionPopupBusRoutingOutputButton9 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop12' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom12' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton20' class='mixerSectionPopupBusRoutingOutputButton10 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop20' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom20' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton28' class='mixerSectionPopupBusRoutingOutputButton11 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop28' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom28' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton6' class='mixerSectionPopupBusRoutingOutputButton12 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop6' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom6' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton14' class='mixerSectionPopupBusRoutingOutputButton13 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop14' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom14' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton22' class='mixerSectionPopupBusRoutingOutputButton14 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop22' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom22' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

                szPage += "<div id='mixerSectionPopupBusRoutingOutputButton30' class='mixerSectionPopupBusRoutingOutputButton15 mixerSectionPopupBusRoutingOutputButton'" + szOutputButtonStyle + ">";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonTop30' class='mixerSectionPopupBusRoutingOutputButtonTop' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                    szPage += "<div id='mixerSectionPopupBusRoutingOutputButtonBottom30' class='mixerSectionPopupBusRoutingOutputButtonBottom' style='height: " + ((nOutputButtonHeight / 2) * 0.97) + "px; line-height: " + ((nOutputButtonHeight / 2) * 0.97) + "px;'></div>";
                szPage += "</div>";

            szPage += "</div>";

        szPage += "</div>";

    szPage += "</div>";



    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateBusRouting_Low();


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseBusRouting(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseBusRouting(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseBusRouting(); }, true);
    }

    AddEvent("mixerSectionPopupBusRouting_Low", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRouting_Low", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRouting_Low", "mousedown", function (event) { event.stopPropagation(); }, true);


    // Bus buttons events
    AddEvent("mixerSectionPopupBusRoutingBusButton0", "click", function (event) { SelectBus(MM_ID_MONITOR_BUS); });
    AddEvent("mixerSectionPopupBusRoutingBusButton1", "click", function (event) { SelectBus(MM_ID_ALT_MONITOR_BUS); });
    AddEvent("mixerSectionPopupBusRoutingBusButton2", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS); });
    AddEvent("mixerSectionPopupBusRoutingBusButton9", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS); });

    if (jsMixer.settings.expert_mode)
    {
        AddEvent("mixerSectionPopupBusRoutingBusButton3", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 1); });
        AddEvent("mixerSectionPopupBusRoutingBusButton4", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 2); });
        AddEvent("mixerSectionPopupBusRoutingBusButton5", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 3); });
        AddEvent("mixerSectionPopupBusRoutingBusButton6", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 4); });
        AddEvent("mixerSectionPopupBusRoutingBusButton7", "click", function (event) { SelectBus(MM_ID_REVERB_BUS); });
        AddEvent("mixerSectionPopupBusRoutingBusButton8", "click", function (event) { SelectBus(MM_ID_DYNAMICS_BUS); });
        AddEvent("mixerSectionPopupBusRoutingBusButton10", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS + 1); });
        AddEvent("mixerSectionPopupBusRoutingBusButton11", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS + 2); });
    }

    // Output buttons events
    for (var i = 0; i < jsOutputs.length; i += 2)
    {
        if (jsSettings.neumann_edition)
        {
        }
        else
        {
            if (jsSettings.expert_mode && jsOutputs[i].name != "")
            {
                AddEvent("mixerSectionPopupBusRoutingOutputButton" + i, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(g_nCurrentBusID, i, i + 1));
            }
            else if (!jsSettings.expert_mode && (g_nCurrentBusID == MM_ID_MONITOR_BUS || g_nCurrentBusID == MM_ID_ALT_MONITOR_BUS || g_nCurrentBusID == MM_ID_FIRST_CUE_BUS || g_nCurrentBusID == MM_ID_FIRST_SEND_BUS) && jsOutputs[i].name != "" && jsOutputs[i].type != OT_PEERED_GENERIC)
            {
                AddEvent("mixerSectionPopupBusRoutingOutputButton" + i, "click", (function _SetBusOutputs(iBusId, iLeftOutputId, iRightOutputId, bStereo, bUpdateL, bUpdateR) { return function () { return SetBusOutputs(iBusId, iLeftOutputId, iRightOutputId, bStereo, bUpdateL, bUpdateR); } })(g_nCurrentBusID, i, i + 1, true, true, true));
            }
        }        
    }


    ShowPopupContainer();


    if (document.getElementById("mixerSectionPopupBusRoutingPopup"))
        UpdateBusRoutingPopup(g_nOpenedBusRoutingPopupBusID, g_nOpenedBusRoutingPopupLeftOutputID, g_nOpenedBusRoutingPopupRightOutputID);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusRouting_Low()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var eBusRouting = document.getElementById("mixerSectionPopupBusRouting_Low");
    if (eBusRouting == null)
    {
        return;
    } 

    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var jsOutputs = GetOutputJSON(-1);
    if (jsOutputs == null)
    {
        return;
    }

    var eBusButtons = document.getElementsByClassName("mixerSectionPopupBusRoutingBusButton");
    if (eBusButtons == null)
    {
        return;
    }

    var eOutputButtons = document.getElementsByClassName("mixerSectionPopupBusRoutingOutputButton");
    if (eOutputButtons == null)
    {
        return;
    }


    // Update bus buttons
    if (jsSettings.neumann_edition)
    {
        for (var iBusButtonId = MM_NEUMANN_ID_FIRST_MIX_BUS; iBusButtonId < MM_NEUMANN_ID_FIRST_MIX_BUS + MM_NEUMANN_NB_MIX_BUS; iBusButtonId++)
        {
            var eBusButton = document.getElementById("mixerSectionPopupBusRoutingBusButton" + iBusButtonId);
            if (eBusButton == null)
            {
                return;
            }

            // High-light the current bus button
            eBusButton.classList.remove("mixerSectionPopupBusRoutingBusButtonChecked");

            if (g_nCurrentBusID == iBusButtonId)
                eBusButton.classList.add("mixerSectionPopupBusRoutingBusButtonChecked");

            // Update button name
            if (eBusButton.textContent != jsBusses[iBusButtonId].name)
                eBusButton.textContent = jsBusses[iBusButtonId].name;
        }
    }
    else
    {
        if (jsSettings.expert_mode)
        {
            for (var iBusButtonId = MM_ID_MONITOR_BUS; iBusButtonId < eBusButtons.length; iBusButtonId++)
            {
                var eBusButton = document.getElementById("mixerSectionPopupBusRoutingBusButton" + iBusButtonId);
                if (eBusButton == null)
                {
                    return;
                }

                // High-light the current bus button
                eBusButton.classList.remove("mixerSectionPopupBusRoutingBusButtonChecked");

                if (iBusButtonId == g_nCurrentBusID)
                    eBusButton.classList.add("mixerSectionPopupBusRoutingBusButtonChecked");

                // Update button name
                if (eBusButton.textContent != jsBusses[iBusButtonId].name)
                    eBusButton.textContent = jsBusses[iBusButtonId].name;
            }
        }
        else
        {
            for (var iBusButtonId = MM_ID_MONITOR_BUS; iBusButtonId < MM_ID_FIRST_CUE_BUS + 1; iBusButtonId++)
            {
                var eBusButton = document.getElementById("mixerSectionPopupBusRoutingBusButton" + iBusButtonId);
                if (eBusButton == null)
                {
                    return;
                }

                // High-light the current bus button
                eBusButton.classList.remove("mixerSectionPopupBusRoutingBusButtonChecked");

                if (g_nCurrentBusID == iBusButtonId)
                    eBusButton.classList.add("mixerSectionPopupBusRoutingBusButtonChecked");

                // Update button name
                if (eBusButton.textContent != jsBusses[iBusButtonId].name)
                    eBusButton.textContent = jsBusses[iBusButtonId].name;
            }

            var eBusButton = document.getElementById("mixerSectionPopupBusRoutingBusButton9");
            if (eBusButton == null)
            {
                return;
            }

            // High-light the current bus button
            eBusButton.classList.remove("mixerSectionPopupBusRoutingBusButtonChecked");

            if (g_nCurrentBusID == MM_ID_FIRST_SEND_BUS)
                eBusButton.classList.add("mixerSectionPopupBusRoutingBusButtonChecked");

            // Update button name
            if (eBusButton.textContent != jsBusses[MM_ID_FIRST_SEND_BUS].name)
                eBusButton.textContent = jsBusses[MM_ID_FIRST_SEND_BUS].name;
        }
    }

    // Update output buttons
    var bMainOutMapped = false;
    var bLineOutMapped = false;
    var bHP1Mapped = false;
    var bHP2Mapped = false;
    var bOpticalOutMapped = false;
    var bDanteOutGrp0Mapped = false;
    var bDanteOutGrp1Mapped = false;
    var jsUSBMapping = RavennaDeviceCache.document();
    if (jsSettings.neumann_edition && jsUSBMapping._oem_ui_process_engine.usb_mapping)
    {
        jsUSBMapping = jsMusicEngine._oem_ui_process_engine.usb_mapping;

        bMainOutMapped = jsUSBMapping.main_out;
        bLineOutMapped = jsUSBMapping.line_out;
        bHP1Mapped = jsUSBMapping.hp1;
        bHP2Mapped = jsUSBMapping.hp2;
        bOpticalOutMapped = jsUSBMapping.optical_out;
        bDanteOutGrp0Mapped = jsUSBMapping.dante_out_grp_0;
        bDanteOutGrp1Mapped = jsUSBMapping.dante_out_grp_1;
    }

    var nNbDanteMapped = 0;
    var jsDanteMapping = RavennaDeviceCache.document();
    if (IsDante() && jsDanteMapping._oem_ui_process_engine.dante_mapping.state.nb_outputs_mapped)
    {
        nNbDanteMapped = jsDanteMapping._oem_ui_process_engine.dante_mapping.state.nb_outputs_mapped;
    }

    var nDanteButtonIdx = 0;
    for (var iOutputIdx = 0; iOutputIdx < jsOutputs.length * 2; iOutputIdx += 2)
    {
        var eOutputButton = document.getElementById("mixerSectionPopupBusRoutingOutputButton" + iOutputIdx);
        if (eOutputButton == null)
        {
            return;
        }

        var eOutputButtonTop = document.getElementById("mixerSectionPopupBusRoutingOutputButtonTop" + iOutputIdx);
        if (eOutputButtonTop == null)
        {
            return;
        }

        var eOutputButtonBottom = document.getElementById("mixerSectionPopupBusRoutingOutputButtonBottom" + iOutputIdx);
        if (eOutputButtonBottom == null)
        {
            return;
        }

        var nDanteGrp = Math.trunc(nDanteButtonIdx / 4);  // we have 4 * stereo buttons per group of 8 Dante's channels

        var jsOutput = jsOutputs[iOutputIdx];
        if (jsOutput)
        {
            if (jsOutput.name == "")
            {
                eOutputButton.innerText = "N/A";
            }
            else
            {
                var bOutputUsed = false;

                var szBottomText = eOutputButtonBottom.innerText;

                for (var iBusIdx = 0; iBusIdx < jsBusses.length; iBusIdx++)
                {
                    var nBusLeftOutputID = jsBusses[iBusIdx].left_output_id;
                    var nBusRightOutputID = jsBusses[iBusIdx].right_output_id;

                    if (nBusLeftOutputID == iOutputIdx || nBusRightOutputID == iOutputIdx + 1 || nBusLeftOutputID == iOutputIdx + 1 || nBusRightOutputID == iOutputIdx)
                    {
                        if ((nBusLeftOutputID == iOutputIdx && nBusRightOutputID == iOutputIdx + 1) || (nBusLeftOutputID == iOutputIdx + 1 && nBusRightOutputID == iOutputIdx))
                        {
                            szBottomText = "(" + jsBusses[iBusIdx].name + ")";
                        }
                        else if (nBusLeftOutputID == iOutputIdx || nBusRightOutputID == iOutputIdx)
                        {
                            if (szBottomText != "")
                                szBottomText = szBottomText.replace("(", "(" + jsBusses[iBusIdx].name + ",");
                            else
                                szBottomText = "(" + jsBusses[iBusIdx].name;
                        }
                        else if (nBusLeftOutputID == iOutputIdx + 1 || nBusRightOutputID == iOutputIdx + 1)
                        {
                            szBottomText = szBottomText.replace(")", "");

                            szBottomText += "," + jsBusses[iBusIdx].name + ")";
                        }

                        if (!szBottomText.includes(")"))
                            szBottomText += ")";

                        if (!szBottomText.includes("(") && szBottomText.includes(","))
                            szBottomText = szBottomText.replace(",", "(");

                        bOutputUsed = true;
                    }


                    var bUSBMapped = jsSettings.neumann_edition && ((iOutputIdx == 0 && bMainOutMapped) || (iOutputIdx == 2 && bLineOutMapped) || (iOutputIdx == 4 && bHP1Mapped) || (iOutputIdx == 6 && bHP2Mapped)
                        || (jsOutputs[iOutputIdx].type == OT_LOCAL_ADAT && bOpticalOutMapped)
                        || (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE && ((nDanteGrp == 0 && bDanteOutGrp0Mapped) || (nDanteGrp == 1 && bDanteOutGrp1Mapped))));

                    var bDanteMapped = false;
                    if (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE)
                    {
                        bDanteMapped = nDanteButtonIdx < (nNbDanteMapped / 2);
                    }

                    RemoveEvent("mixerSectionPopupBusRoutingOutputButton" + iOutputIdx, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(g_nCurrentBusID, iOutputIdx, iOutputIdx + 1));
                    if (!bUSBMapped && !bDanteMapped)
                    {
                        AddEvent("mixerSectionPopupBusRoutingOutputButton" + iOutputIdx, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(g_nCurrentBusID, iOutputIdx, iOutputIdx + 1));
                    }
                }

                if (bOutputUsed || (jsSettings.neumann_edition && ((iOutputIdx == 0 && bMainOutMapped) || (iOutputIdx == 2 && bLineOutMapped) || (iOutputIdx == 4 && bHP1Mapped) || (iOutputIdx == 6 && bHP2Mapped)
                || (jsOutputs[iOutputIdx].type == OT_LOCAL_ADAT && bOpticalOutMapped)
                || (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE && ((nDanteGrp == 0 && bDanteOutGrp0Mapped) || (nDanteGrp == 1 && bDanteOutGrp1Mapped)))))
                || jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE && nDanteButtonIdx < (nNbDanteMapped / 2))
                {
                    if (jsOutput.type == OT_PEERED_GENERIC || jsOutput.type == OT_LOCAL_ADAT || jsOutput.type == OT_LOCAL_DANTE)
                    {
                        eOutputButtonTop.innerText = jsOutput.name.replace("-L", "") + "/" + (Number(jsOutput.name.substring(jsOutput.name.length - 2)) + 1);
                        eOutputButtonBottom.innerText = szBottomText;
                    }
                    else
                    {
                        eOutputButtonTop.innerText = jsOutput.name.replace("-L", "");
                        eOutputButtonBottom.innerText = szBottomText;
                    }
                }
                else
                {
                    if (jsOutput.type == OT_PEERED_GENERIC || jsOutput.type == OT_LOCAL_ADAT || jsOutput.type == OT_LOCAL_DANTE)
                        eOutputButton.innerText = jsOutput.name.replace("-L", "") + "/" + (Number(jsOutput.name.substring(jsOutput.name.length - 2)) + 1);
                    else
                        eOutputButton.innerText = jsOutput.name.replace("-L", "");
                }
            }
        }
        else
        {
            eOutputButton.innerText = "N/A";
        }            

        // High light the outputs used by the current bus
        eOutputButton.classList.remove("mixerSectionPopupBusRoutingOutputButtonChecked");
        eOutputButtonTop.classList.remove("mixerSectionPopupBusRoutingOutputButtonTopChecked");
        eOutputButtonTop.classList.remove("mixerSectionPopupBusRoutingOutputButtonUSBMapped");
        eOutputButtonBottom.classList.remove("mixerSectionPopupBusRoutingOutputButtonBottomChecked");
        eOutputButtonBottom.classList.remove("mixerSectionPopupBusRoutingOutputButtonUSBMapped");

        if ((jsBusses[g_nCurrentBusID].left_output_id != -1 && (jsBusses[g_nCurrentBusID].left_output_id == iOutputIdx || jsBusses[g_nCurrentBusID].left_output_id == iOutputIdx + 1)) || (jsBusses[g_nCurrentBusID].right_output_id != -1 && (jsBusses[g_nCurrentBusID].right_output_id == iOutputIdx + 1 || jsBusses[g_nCurrentBusID].right_output_id == iOutputIdx)))
        {
            eOutputButton.classList.add("mixerSectionPopupBusRoutingOutputButtonChecked");
            eOutputButtonTop.classList.add("mixerSectionPopupBusRoutingOutputButtonTopChecked");
            eOutputButtonBottom.classList.add("mixerSectionPopupBusRoutingOutputButtonBottomChecked");
        }

        if (jsSettings.neumann_edition) // Update USB Mapping for MT48 only
        {
            if ((iOutputIdx == 0 && bMainOutMapped) || (iOutputIdx == 2 && bLineOutMapped) || (iOutputIdx == 4 && bHP1Mapped) || (iOutputIdx == 6 && bHP2Mapped)
            || ((jsOutputs[iOutputIdx].name.includes("ADAT") || jsOutputs[iOutputIdx].name.includes("SPDIF")) && bOpticalOutMapped)
            || (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE && ((nDanteGrp == 0 && bDanteOutGrp0Mapped) || (nDanteGrp == 1 && bDanteOutGrp1Mapped))))
            {
                eOutputButtonBottom.innerText = "(USB MAPPED)";

                eOutputButtonTop.classList.add("mixerSectionPopupBusRoutingOutputButtonUSBMapped");
                eOutputButtonBottom.classList.add("mixerSectionPopupBusRoutingOutputButtonUSBMapped");
            }
        }

        if (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE && nDanteButtonIdx < (nNbDanteMapped / 2))
        {
            eOutputButtonBottom.innerText = "(MAPPED)";

            eOutputButtonTop.classList.add("mixerSectionPopupBusRoutingOutputButtonUSBMapped");
            eOutputButtonBottom.classList.add("mixerSectionPopupBusRoutingOutputButtonUSBMapped");
        }

        if (jsOutputs[iOutputIdx].type == OT_LOCAL_DANTE)
        {
            nDanteButtonIdx++;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusRouting_Large()
{
    var eMixer = document.getElementById("mixerSection");
    if (eMixer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var jsOutputs = GetOutputJSON(-1);
    if (jsOutputs == null)
    {
        return;
    }


    var nOutputAvailable = 0;
    for (var iOutputId = 0; iOutputId < jsOutputs.length; iOutputId++)
    {
        if (jsOutputs[iOutputId].name == "" || (!jsSettings.expert_mode && jsOutputs[iOutputId].type == OT_PEERED_GENERIC) || ((jsOutputs[iOutputId].type == OT_LOCAL_ADAT || jsOutputs[iOutputId].type == OT_LOCAL_DANTE) && !jsOutputs[iOutputId].enabled))
            continue;
        else
            nOutputAvailable++;
    }


    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = eMixer.offsetHeight - g_nMixerMargin * 2;

    var nTop = Number(eMixer.offsetTop) + g_nMixerMargin;
    var nLeft = g_nMixerMargin;

    var nWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? nStripsWidth : nStripsWidth / 5 * (7 / 3);

    var nTargetButtonWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? ((nWidth - g_nElementsBorderWidth * 32) * 4 / 5) / 12 - g_nElementsBorderWidth * 2 : ((nWidth - g_nElementsBorderWidth * 16) * 4 / 7) / 4 - g_nElementsBorderWidth * 2;

    if (nTargetButtonWidth > g_nStripButtonWidth)
    {
        nWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? ((g_nStripButtonWidth + g_nElementsBorderWidth * 2) * 12 * 5 / 4) + g_nElementsBorderWidth * 32 : ((g_nStripButtonWidth + g_nElementsBorderWidth * 2) * 4 * 7 / 4) + g_nElementsBorderWidth * 16;
        nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    }

    if (!jsSettings.expert_mode || jsSettings.neumann_edition)
        nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;

    // Adaptation of popup height according to the screen height and the available outputs
    var nHeight = jsSettings.expert_mode && !jsSettings.neumann_edition ? nWidth * 11 / 15 + g_nElementsBorderWidth : nWidth * 11 / 7 + g_nElementsBorderWidth;
    for (var iOutputAvailableIdx = 0; iOutputAvailableIdx < nOutputAvailable / 2 ; iOutputAvailableIdx++)
    {
        if ((nWidth * ((iOutputAvailableIdx + 3) + 1) / (jsSettings.expert_mode && !jsSettings.neumann_edition ? 15 : 7)) < nStripsHeight)
        {
            nHeight = nWidth * ((iOutputAvailableIdx + 3) + 1) / (jsSettings.expert_mode && !jsSettings.neumann_edition ? 15 : 7);
        }
        else
            break;
    }       
    

    var nBusNameHeight = jsSettings.expert_mode && !jsSettings.neumann_edition ? ((nWidth - g_nElementsBorderWidth * 32) * 4 / 5) / 12 - g_nElementsBorderWidth * 2 : ((nWidth - g_nElementsBorderWidth * 16) * 4 / 7) / 4 - g_nElementsBorderWidth * 2;
    var nBusNameWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? ((nWidth - g_nElementsBorderWidth * 2) / 5 - g_nElementsBorderWidth * 2) : ((nWidth - g_nElementsBorderWidth * 2) * 3 / 7 - g_nElementsBorderWidth * 2);

    var nOutputNameHeight = nBusNameHeight;
    var nOutputNameWidth = nBusNameWidth;

    var nOutputSelectorWidth = nOutputNameHeight;
    var nOutputSelectorHeight = nOutputSelectorWidth;

    var nScrollContainerHeight = nHeight - g_nElementsBorderWidth * 5 - nBusNameWidth;

    var szBusContainerStyle = "style='width: " + nBusNameWidth + "px; height: " + nBusNameHeight + "px; line-height: " + nBusNameHeight + "px;";
    var szBusNameStyle = "style='width: " + nBusNameWidth + "px; height: " + nBusNameHeight + "px; line-height: " + nBusNameHeight + "px;'";
    var szBusLStyle = "style='width: " + (nBusNameWidth / 10) + "px; height: " + (nBusNameHeight / 2) + "px; line-height: " + (nBusNameHeight / 2) + "px;'";
    var szBusRStyle = "style='width: " + (nBusNameWidth / 10) + "px; height: " + (nBusNameHeight / 2) + "px; line-height: " + (nBusNameHeight / 2) + "px; top: " + (nBusNameHeight / 2) + "px;'";
    var szBusSoundIDStyle = "style='width: " + (nBusNameHeight / 2.3) + "px; height: " + (nBusNameHeight / 2.3) + "px; background-size: " + (nBusNameHeight / 2.3) + "px " + (nBusNameHeight / 2.3) + "px; top: " + (nBusNameHeight / 24) + "px; left: " + (nBusNameWidth - nBusNameHeight / 1.9) + "px;'";


    var szOutputContainerStyle = "style='width: " + nOutputNameWidth + "px; height: " + nOutputNameHeight + "px; line-height: " + nOutputNameHeight + "px;'";
    var szOutputNameStyle = "style='width: " + nOutputNameWidth + "px; height: " + nOutputNameHeight + "px; line-height: " + nOutputNameHeight + "px;'";
    var szOutputLStyle = "style='width: " + (nOutputNameWidth - g_nElementsBorderWidth * 3) + "px; height: " + (nOutputNameHeight / 2) + "px; line-height: " + (nOutputNameHeight / 2) + "px;'";
    var szOutputRStyle = "style='width: " + (nOutputNameWidth - g_nElementsBorderWidth * 3) + "px; height: " + (nOutputNameHeight / 2) + "px; line-height: " + (nOutputNameHeight / 2) + "px;'";

    var szOutputSelectorStyle = "style='width: " + nOutputSelectorWidth + "px; height: " + nOutputSelectorHeight + "px;'";
    var szOutputSelectorMonoStyle = "style='width: " + ((nOutputSelectorWidth - g_nElementsBorderWidth * 4) / 2) + "px; height: " + ((nOutputSelectorHeight - g_nElementsBorderWidth * 4) / 2) + "px;";

    
    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupBusRouting_Large' class='mixerSectionPopupBusRouting_Large' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div id='busRoutingBussesContainer' class='busRoutingBussesContainer' style='left: " + (g_nElementsBorderWidth * 5 + nOutputNameWidth) + "px; top: " + (g_nElementsBorderWidth * 3 + nBusNameWidth) + "px;'>";
                
            var nBusPosX = 0;
            for (var iBusId = 0; iBusId < jsBusses.length; iBusId++)
            {
                if (jsSettings.neumann_edition)
                {
                    if (iBusId < MM_NEUMANN_ID_FIRST_MIX_BUS)
                        continue;
                    else if (iBusId > MM_NEUMANN_ID_FIRST_MIX_BUS + MM_NEUMANN_NB_MIX_BUS - 1)
                        break;
                                        
                    nBusPosX = iBusId - MM_NEUMANN_ID_FIRST_MIX_BUS;
                }
                else
                {
                    if (jsSettings.expert_mode)
                    {
                        nBusPosX = iBusId;
                    }
                    else
                    {
                        if (iBusId != MM_ID_MONITOR_BUS && iBusId != MM_ID_ALT_MONITOR_BUS && iBusId != MM_ID_FIRST_CUE_BUS && iBusId != MM_ID_FIRST_SEND_BUS)
                            continue;
                    }
                }

                szPage += "<div id='' class='busRoutingBusContainer' " + szBusContainerStyle + " top: " + ((nBusNameHeight + g_nElementsBorderWidth * 4) * nBusPosX) + "px;'>";

                    szPage += "<div id='busRoutingBus" + iBusId + "Name' class='busRoutingBusName' " + szBusNameStyle + "></div>";
                    szPage += "<div id='busRoutingBus" + iBusId + "L' class='busRoutingBusLR' " + szBusLStyle + ">L</div>";
                    szPage += "<div id='busRoutingBus" + iBusId + "R' class='busRoutingBusLR' " + szBusRStyle + ">R</div>";

                if (!jsSettings.neumann_edition)
                    szPage += "<div id='busRoutingBus" + iBusId + "SoundID' class='busRoutingBusSoundID' " + szBusSoundIDStyle + "></div>";

                szPage += "</div>";

                if (!jsSettings.expert_mode && (iBusId == MM_ID_MONITOR_BUS || iBusId == MM_ID_ALT_MONITOR_BUS || iBusId == MM_ID_FIRST_CUE_BUS || iBusId == MM_ID_FIRST_SEND_BUS))
                    nBusPosX++;
            }


            szPage += "</div>";

            szPage += "<div id='busRoutingOutputsSection' class='busRoutingOutputsSection' style='top: " + (nBusNameWidth + g_nElementsBorderWidth * 4) + "px; left : " + g_nElementsBorderWidth + "px; height: " + nScrollContainerHeight + "px;'>";

                szPage += "<div id='busRouting-scroll' class='busRouting-scroll'>";

                    var nOutputPosY = 0;
                    for (var iOutputId = 0; iOutputId < jsOutputs.length; iOutputId += 2)
                    {
                        if (jsOutputs[iOutputId].name == "" || ((jsOutputs[iOutputId].type == OT_LOCAL_ADAT || jsOutputs[iOutputId].type == OT_LOCAL_DANTE) && !jsOutputs[iOutputId].enabled)/*|| (!jsSettings.expert_mode && jsOutputs[iOutputId].type == OT_PEERED_GENERIC)*/)
                        {
                            continue;
                        }
                        else
                        {
                            szPage += "<div id='busRoutingOutputLine" + iOutputId + "' class='busRoutingOutputLine'>";                               

                                szPage += "<div id='busRoutingOutput" + iOutputId + "Container' class='busRoutingOutputContainer0 busRoutingOutputContainer' " + szOutputContainerStyle + ">";
                                
                                    szPage += "<div id='busRoutingOutput" + iOutputId + "Name' class='busRoutingOutputName' " + szOutputNameStyle + ">";
                                    {
                                        szPage += "<div id='busRoutingOutput" + iOutputId + "NameLine1' class='' style='position: absolute; top: 0px; width: 100%; height: " + (nOutputNameHeight / 3) + "px; line-height: " + ((nOutputNameHeight + g_nElementsBorderWidth * 2) / 3) + "px;'></div>";
                                        szPage += "<div id='busRoutingOutput" + iOutputId + "NameLine2' class='' style='position: absolute; top: " + g_nElementsBorderWidth * 2 + "px; width: 100%; height: " + (nOutputNameHeight / 2) + "px; line-height: " + ((nOutputNameHeight + g_nElementsBorderWidth * 2) / 2) + "px;'></div>";
                                        szPage += "<div id='busRoutingOutput" + iOutputId + "NameLine3' class='' style='position: absolute; top: " + g_nElementsBorderWidth + "px; width: 100%; height: " + (nOutputNameHeight) + "px; line-height: " + (nOutputNameHeight) + "px;'></div>";
                                        szPage += "<div id='busRoutingOutput" + iOutputId + "NameLine4' class='' style='position: absolute; top: " + (nOutputNameHeight / 2 - g_nElementsBorderWidth) + "px; width: 100%; height: " + (nOutputNameHeight / 2) + "px; line-height: " + ((nOutputNameHeight + g_nElementsBorderWidth * 2) / 2) + "px;'></div>";
                                        szPage += "<div id='busRoutingOutput" + iOutputId + "NameLine5' class='busRoutingOutputRouteLine' style='position: absolute; top: " + (g_nElementsBorderWidth + nOutputNameHeight * 2 / 3) + "px; width: 100%; height: " + (nOutputNameHeight / 3) + "px; line-height: " + ((nOutputNameHeight + g_nElementsBorderWidth * 2) / 3) + "px;'></div>";
                                    }
                                    szPage += "</div>";

                                    var szLeftOutputName;
                                    var szRightOutputName;
                                    if (jsOutputs[iOutputId].type == OT_LOCAL_LINE || jsOutputs[iOutputId].type == OT_LOCAL_HEADPHONE)
                                    {
                                        szLeftOutputName = Number(Number(jsOutputs[iOutputId].id) + 1);
                                        szRightOutputName = Number(Number(jsOutputs[iOutputId].id) + 2);
                                    }
                                    else if (jsOutputs[iOutputId].type == OT_LOCAL_ADAT)
                                    {
                                        if (jsOutputs[iOutputId].name.includes("ADAT"))
                                        {
                                            szLeftOutputName = jsOutputs[iOutputId].name.replace("ADAT ", "");
                                            szRightOutputName = Number(Number(jsOutputs[iOutputId].name.replace("ADAT ", "")) + 1);
                                        }
                                        else
                                        {
                                            szLeftOutputName = jsOutputs[iOutputId].name.replace("SPDIF ", "");
                                            szRightOutputName = Number(Number(jsOutputs[iOutputId].name.replace("SPDIF ", "")) + 1);
                                        }
                                    }
                                    else if (jsOutputs[iOutputId].type == OT_PEERED_GENERIC)
                                    {
                                        szLeftOutputName = jsOutputs[iOutputId].peered_channel_name;
                                        szRightOutputName = Number(Number(jsOutputs[iOutputId].peered_channel_name) + 1);
                                    }
                                    else if (jsOutputs[iOutputId].type == OT_LOCAL_DANTE)
                                    {
                                        szLeftOutputName = jsOutputs[iOutputId].name.replace("Dante ", "");
                                        szRightOutputName = Number(Number(jsOutputs[iOutputId].name.replace("Dante ", "")) + 1);
                                    }

                                    szPage += "<div id='busRoutingOutput" + iOutputId + "' class='busRoutingOutputLR' " + szOutputLStyle + ">" + (jsOutputs[iOutputId].name.includes("HP") ? "L" : szLeftOutputName) + "</div>";
                                    szPage += "<div id='busRoutingOutput" + (iOutputId + 1) + "' class='busRoutingOutputLR' " + szOutputRStyle + ">" + (jsOutputs[iOutputId].name.includes("HP") ? "R" : szRightOutputName) + "</div>";

                                szPage += "</div>";


                                szPage += "<div id='busRoutingOutputSelectors" + iOutputId + "' class='busRoutingOutputSelectors'>";

                                    var nOutputPosX = 0;
                                    for (var iBusId = 0; iBusId < jsBusses.length; iBusId++)
                                    {
                                        var szDivId = "busRoutingOutput" + iOutputId + "SelectorBus" + iBusId;

                                        if (jsSettings.neumann_edition)
                                        {
                                            if (iBusId < MM_NEUMANN_ID_FIRST_MIX_BUS)
                                                continue;
                                            else if (iBusId > MM_NEUMANN_ID_FIRST_MIX_BUS + MM_NEUMANN_NB_MIX_BUS - 1)
                                                break;
                                        
                                            nOutputPosX = iBusId - MM_NEUMANN_ID_FIRST_MIX_BUS;
                                        }
                                        else
                                        {
                                            if (jsSettings.expert_mode)
                                            {
                                                nOutputPosX = iBusId;
                                            }
                                            else
                                            {
                                                if (iBusId != MM_ID_MONITOR_BUS && iBusId != MM_ID_ALT_MONITOR_BUS && iBusId != MM_ID_FIRST_CUE_BUS && iBusId != MM_ID_FIRST_SEND_BUS)
                                                    continue;
                                            }
                                        }
                                    
                                        szPage += "<div id='" + szDivId + "' class='busRoutingOutputSelector" + iBusId + " busRoutingOutputSelector' " + szOutputSelectorStyle + ">";

                                            szPage += "<div id='busRoutingOutput" + iOutputId + "SelectorBus" + iBusId + "L' class='busRoutingOutputSelectorMono' " + szOutputSelectorMonoStyle + " top: " + (g_nElementsBorderWidth + (nOutputSelectorHeight + g_nElementsBorderWidth * 4) * nOutputPosY) + "px; left: " + (g_nElementsBorderWidth * 4 + nOutputNameWidth + (nOutputSelectorWidth + g_nElementsBorderWidth * 4) * nOutputPosX) + "px;'></div>";
                                            szPage += "<div id='busRoutingOutput" + iOutputId + "SelectorBus" + iBusId + "R' class='busRoutingOutputSelectorMono' " + szOutputSelectorMonoStyle + " top: " + (g_nElementsBorderWidth + (nOutputSelectorHeight + g_nElementsBorderWidth * 4) * nOutputPosY) + "px; left: " + (g_nElementsBorderWidth * 4 + nOutputNameWidth + (nOutputSelectorWidth + g_nElementsBorderWidth * 4) * nOutputPosX + (nOutputSelectorWidth) / 2) + "px;'></div>";

                                            szPage += "<div id='busRoutingOutput" + (iOutputId + 1) + "SelectorBus" + iBusId + "L' class='busRoutingOutputSelectorMono' " + szOutputSelectorMonoStyle + " top: " + (g_nElementsBorderWidth + (nOutputSelectorHeight + g_nElementsBorderWidth * 4) * nOutputPosY + (nOutputSelectorHeight) / 2) + "px; left: " + (g_nElementsBorderWidth * 4 + nOutputNameWidth + (nOutputSelectorWidth + g_nElementsBorderWidth * 4) * nOutputPosX) + "px'></div>";
                                            szPage += "<div id='busRoutingOutput" + (iOutputId + 1) + "SelectorBus" + iBusId + "R' class='busRoutingOutputSelectorMono' " + szOutputSelectorMonoStyle + " top: " + (g_nElementsBorderWidth + (nOutputSelectorHeight + g_nElementsBorderWidth * 4) * nOutputPosY + (nOutputSelectorHeight) / 2) + "px; left: " + (g_nElementsBorderWidth * 4 + nOutputNameWidth + (nOutputSelectorWidth + g_nElementsBorderWidth * 4) * nOutputPosX + (nOutputSelectorWidth) / 2) + "px'></div>";
                                        
                                        szPage += "</div>";

                                        if (!jsSettings.expert_mode && (iBusId == MM_ID_MONITOR_BUS || iBusId == MM_ID_ALT_MONITOR_BUS || iBusId == MM_ID_FIRST_CUE_BUS || iBusId == MM_ID_FIRST_SEND_BUS))
                                            nOutputPosX++;
                                    }

                                szPage += "</div>";

                            szPage += "</div>";

                            nOutputPosY++;
                        }
                    }

                szPage += "</div>";

            szPage += "</div>";

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateBusRouting_Large();


    var isBusRoutingScroller = new iScroll("busRoutingOutputsSection", { hScroll: false, vScroll: true, bounce: false });


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseBusRouting(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseBusRouting(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseBusRouting(); }, true);
    }

    AddEvent("mixerSectionPopupBusRouting_Large", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRouting_Large", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRouting_Large", "mousedown", function (event) { event.stopPropagation(); }, true);


    for (var iOutputId = 0; iOutputId < jsOutputs.length; iOutputId += 2)
    {
        if (jsOutputs[iOutputId].name != "")
        {
            for (var iBusId = 0; iBusId < jsBusses.length; iBusId++)
            {
                var szDivId = "busRoutingOutput" + iOutputId + "SelectorBus" + iBusId;

                if (jsSettings.neumann_edition)
                {
                }
                else if (jsSettings.expert_mode)
                {
                    AddEvent(szDivId, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(iBusId, iOutputId, iOutputId + 1));
                }                    
                else if (!jsSettings.expert_mode && (iBusId == MM_ID_MONITOR_BUS || iBusId == MM_ID_ALT_MONITOR_BUS || iBusId == MM_ID_FIRST_CUE_BUS || iBusId == MM_ID_FIRST_SEND_BUS))
                {
                    AddEvent(szDivId, "click", (function _SetBusOutputs(nBusId, nLeftOutputId, nRightOutputId, bStereo, bUpdateL, bUpdateR) { return function () { return SetBusOutputs(nBusId, nLeftOutputId, nRightOutputId, bStereo, bUpdateL, bUpdateR); } })(iBusId, iOutputId, iOutputId + 1, true, true, true));
                }                               
            }
        }
    }
    

    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusRouting_Large()
{
    var eBusRouting = document.getElementById("mixerSectionPopupBusRouting_Large");
    if (eBusRouting == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    
    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var jsOutputs = GetOutputJSON(-1);
    if (jsOutputs == null)
    {
        return;
    }


    var eBussesLR = document.getElementsByClassName("busRoutingBusLR");
    if (eBussesLR == null)
    {
        return;
    }

    var eOutputsLR = document.getElementsByClassName("busRoutingOutputLR");
    if (eOutputsLR == null)
    {
        return;
    }

    var eSelectorsMono = document.getElementsByClassName("busRoutingOutputSelectorMono");
    if (eSelectorsMono == null)
    {
        return;
    }
    

    // clear routing
    for (var iBusLRIdx = 0; iBusLRIdx < eBussesLR.length; iBusLRIdx++)
    {
        eBussesLR[iBusLRIdx].classList.remove("busRoutingLRChecked");
    }

    for (var iOutputLRIdx = 0; iOutputLRIdx < eOutputsLR.length; iOutputLRIdx++)
    {
        eOutputsLR[iOutputLRIdx].classList.remove("busRoutingLRChecked");
    }

    for (var iSelectorMonoIdx = 0; iSelectorMonoIdx < eSelectorsMono.length; iSelectorMonoIdx++)
    {
        eSelectorsMono[iSelectorMonoIdx].classList.remove("busRoutingOutputSelectorMonoChecked");
        eSelectorsMono[iSelectorMonoIdx].classList.remove("busRoutingOutputSelectorMonoCheckedOffline");
    }


    // set routing
    for (var iBusId = 0; iBusId < jsBusses.length; iBusId++)
    {
        var eBusName = document.getElementById("busRoutingBus" + iBusId + "Name");
        if (eBusName == null)
        {
            continue;
        }

        // Update button name
        if (eBusName.textContent != jsBusses[iBusId].name)
            eBusName.textContent = jsBusses[iBusId].name;


        var eBusL = document.getElementById("busRoutingBus" + iBusId + "L");
        if (jsBusses[iBusId].left_output_id != -1)
        {
            if (eBusL)
                eBusL.classList.add("busRoutingLRChecked");

            var eOutputConnected = document.getElementById("busRoutingOutput" + jsBusses[iBusId].left_output_id);
            if (eOutputConnected)
            {
                if (jsOutputs[jsBusses[iBusId].left_output_id].type == OT_LOCAL_LINE || jsOutputs[jsBusses[iBusId].left_output_id].type == OT_LOCAL_HEADPHONE || jsOutputs[jsBusses[iBusId].left_output_id].type == OT_LOCAL_ADAT || jsOutputs[jsBusses[iBusId].left_output_id].type == OT_LOCAL_DANTE)
                {
                    eOutputConnected.classList.add("busRoutingLRChecked");
                }
                else if (jsOutputs[jsBusses[iBusId].left_output_id].type == OT_PEERED_GENERIC && jsOutputs[jsBusses[iBusId].left_output_id].peered_connection_state != 0)
                {
                    eOutputConnected.classList.add("busRoutingLRChecked");
                }
            }

            var eSelectorMono = document.getElementById("busRoutingOutput" + jsBusses[iBusId].left_output_id + "SelectorBus" + iBusId + "L");
            if (eSelectorMono)
            {
                if (jsOutputs[jsBusses[iBusId].left_output_id].type == OT_PEERED_GENERIC && jsOutputs[jsBusses[iBusId].left_output_id].peered_connection_state == 0)
                    eSelectorMono.classList.add("busRoutingOutputSelectorMonoCheckedOffline");
                else
                    eSelectorMono.classList.add("busRoutingOutputSelectorMonoChecked");
            }
        }
            
        var eBusR = document.getElementById("busRoutingBus" + iBusId + "R");
        if (jsBusses[iBusId].right_output_id != -1)
        {
            if (eBusR)
                eBusR.classList.add("busRoutingLRChecked");

            var eOutputConnected = document.getElementById("busRoutingOutput" + jsBusses[iBusId].right_output_id);
            if (eOutputConnected)
            {
                if (jsOutputs[jsBusses[iBusId].right_output_id].type == OT_LOCAL_LINE || jsOutputs[jsBusses[iBusId].right_output_id].type == OT_LOCAL_HEADPHONE || jsOutputs[jsBusses[iBusId].right_output_id].type == OT_LOCAL_ADAT || jsOutputs[jsBusses[iBusId].right_output_id].type == OT_LOCAL_DANTE)
                {
                    eOutputConnected.classList.add("busRoutingLRChecked");
                }
                else if (jsOutputs[jsBusses[iBusId].right_output_id].type == OT_PEERED_GENERIC && jsOutputs[jsBusses[iBusId].right_output_id].peered_connection_state != 0)
                {
                    eOutputConnected.classList.add("busRoutingLRChecked");
                }
            }
            var eSelectorMono = document.getElementById("busRoutingOutput" + jsBusses[iBusId].right_output_id + "SelectorBus" + iBusId + "R");
            if (eSelectorMono)
            {
                if (jsOutputs[jsBusses[iBusId].right_output_id].type == OT_PEERED_GENERIC && jsOutputs[jsBusses[iBusId].right_output_id].peered_connection_state == 0)
                    eSelectorMono.classList.add("busRoutingOutputSelectorMonoCheckedOffline");
                else
                    eSelectorMono.classList.add("busRoutingOutputSelectorMonoChecked");
            }
        }

        if (!jsSettings.neumann_edition)
        {
            var eBusSoundID = document.getElementById("busRoutingBus" + iBusId + "SoundID");
            if (eBusSoundID)
            {
                eBusSoundID.classList.remove("busRoutingBusSoundIDEnabled");

                if (jsBusses[iBusId].soundid_profile != null && jsBusses[iBusId].soundid_profile != -1)
                    eBusSoundID.classList.add("busRoutingBusSoundIDEnabled");
            }
        }        
    }

    // Update Outputs Name (and USB Mapping for MT48 only)
    var bMainOutMapped = false;
    var bLineOutMapped = false;
    var bHP1Mapped = false;
    var bHP2Mapped = false;
    var bOpticalOutMapped = false;
    var bDanteOutGrp0Mapped = false;
    var bDanteOutGrp1Mapped = false;
    var jsUSBMapping = RavennaDeviceCache.document();
    if (jsSettings.neumann_edition && jsUSBMapping._oem_ui_process_engine.usb_mapping)
    {
        jsUSBMapping = jsMusicEngine._oem_ui_process_engine.usb_mapping;

        bMainOutMapped = jsUSBMapping.main_out;
        bLineOutMapped = jsUSBMapping.line_out;
        bHP1Mapped = jsUSBMapping.hp1;
        bHP2Mapped = jsUSBMapping.hp2;
        bOpticalOutMapped = jsUSBMapping.optical_out;
        bDanteOutGrp0Mapped = jsUSBMapping.dante_out_grp_0;
        bDanteOutGrp1Mapped = jsUSBMapping.dante_out_grp_1;
    }

    var nNbDanteMapped = 0;
    var jsDanteMapping = RavennaDeviceCache.document();
    if (IsDante() && jsDanteMapping._oem_ui_process_engine.dante_mapping.state.nb_outputs_mapped)
    {
        nNbDanteMapped = jsDanteMapping._oem_ui_process_engine.dante_mapping.state.nb_outputs_mapped;
    }

    var nDanteButtonIdx = 0;
    for (var iOutputId = 0; iOutputId < jsOutputs.length; iOutputId += 2)
    {
        var szOutputName = jsOutputs[iOutputId].name.replace("-L", "");

        if (jsOutputs[iOutputId].type == OT_LOCAL_ADAT)
        {
            if (jsOutputs[iOutputId].name.includes("ADAT"))
                szOutputName += "/" + (Number(jsOutputs[iOutputId].name.replace("ADAT ", "")) + 1);
            else
                szOutputName += "/" + (Number(jsOutputs[iOutputId].name.replace("SPDIF ", "")) + 1);
        }
        else if (jsOutputs[iOutputId].type == OT_PEERED_GENERIC)
        {
            szOutputName += "/" + (Number(jsOutputs[iOutputId].name.substring(jsOutputs[iOutputId].name.length - 2)) + 1);
        }
        else if (jsOutputs[iOutputId].type == OT_LOCAL_DANTE)
        {
            szOutputName += "/" + (Number(jsOutputs[iOutputId].name.replace("Dante ", "")) + 1);
        }


        var nDanteGrp = Math.trunc(nDanteButtonIdx / 4);  // we have 4 * stereo buttons per group of 8 Dante's channels

        var eOutputContainer = document.getElementById("busRoutingOutput" + iOutputId + "Container");
        if (eOutputContainer)
        {
            var eOutputNameLine1 = document.getElementById("busRoutingOutput" + iOutputId + "NameLine1");
            var eOutputNameLine2 = document.getElementById("busRoutingOutput" + iOutputId + "NameLine2");
            var eOutputNameLine3 = document.getElementById("busRoutingOutput" + iOutputId + "NameLine3");
            var eOutputNameLine4 = document.getElementById("busRoutingOutput" + iOutputId + "NameLine4");
            var eOutputNameLine5 = document.getElementById("busRoutingOutput" + iOutputId + "NameLine5");
            if (eOutputNameLine1 && eOutputNameLine2 && eOutputNameLine3 && eOutputNameLine4 && eOutputNameLine5)
            {
                var bUSBMapped = jsSettings.neumann_edition && ((iOutputId == 0 && bMainOutMapped) || (iOutputId == 2 && bLineOutMapped) || (iOutputId == 4 && bHP1Mapped) || (iOutputId == 6 && bHP2Mapped)
                    || (jsOutputs[iOutputId].type == OT_LOCAL_ADAT && bOpticalOutMapped)
                    || (jsOutputs[iOutputId].type == OT_LOCAL_DANTE && (nDanteGrp == 0 && bDanteOutGrp0Mapped || nDanteGrp == 1 && bDanteOutGrp1Mapped)));

                var bDanteMapped = false;
                if (jsOutputs[iOutputId].type == OT_LOCAL_DANTE)
                {
                    bDanteMapped = nDanteButtonIdx < (nNbDanteMapped / 2);
                }


                eOutputNameLine1.innerText = "";
                eOutputNameLine2.innerText = "";
                eOutputNameLine3.innerText = "";
                eOutputNameLine4.innerText = "";
                eOutputNameLine5.innerText = "";

                eOutputNameLine4.classList.remove("busRoutingOutputRouteLine");

                eOutputContainer.classList.remove("busRoutingOutputOffline");
                eOutputNameLine1.classList.remove("busRoutingOutputOffline");
                eOutputNameLine2.classList.remove("busRoutingOutputOffline");
                eOutputNameLine3.classList.remove("busRoutingOutputOffline");
                eOutputNameLine4.classList.remove("busRoutingOutputOffline");
                eOutputNameLine5.classList.remove("busRoutingOutputOffline");

                eOutputContainer.classList.remove("busRoutingOutputUsbMapped");
                eOutputNameLine2.classList.remove("busRoutingOutputUsbMapped");
                eOutputNameLine4.classList.remove("busRoutingOutputUsbMapped");

                var szRouteLine = "";
                var szLeftRouteBusName = "";
                var szRightRouteBusName = "";
                for (var iBusId = 0; iBusId < jsBusses.length; iBusId++)
                {
                    if (jsBusses[iBusId].left_output_id == iOutputId || jsBusses[iBusId].right_output_id == iOutputId)
                    {
                        szLeftRouteBusName = jsBusses[iBusId].name;
                    }

                    if (jsBusses[iBusId].left_output_id == iOutputId + 1 || jsBusses[iBusId].right_output_id == iOutputId + 1)
                    {
                        szRightRouteBusName = jsBusses[iBusId].name;
                    }


                    RemoveEvent("busRoutingOutput" + iOutputId + "SelectorBus" + iBusId, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(iBusId, iOutputId, iOutputId + 1));
                    if (!bUSBMapped && !bDanteMapped)
                    {
                        AddEvent("busRoutingOutput" + iOutputId + "SelectorBus" + iBusId, "click", (function _OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId) { return function () { return OpenBusRoutingPopup(nBusId, nLeftOutputId, nRightOutputId); } })(iBusId, iOutputId, iOutputId + 1));
                    }
                }

                if (szLeftRouteBusName != "" && szRightRouteBusName != "")
                {
                    if (szLeftRouteBusName == szRightRouteBusName)
                    {
                        szRouteLine = "(" + szLeftRouteBusName + ")";
                    }
                    else
                    {
                        szRouteLine = "(" + szLeftRouteBusName + "," + szRightRouteBusName + ")";
                    }
                }
                else if (szLeftRouteBusName != "")
                {
                    szRouteLine = "(" + szLeftRouteBusName + ")";
                }
                else if (szRightRouteBusName != "")
                {
                    szRouteLine = "(" + szRightRouteBusName + ")";
                }

                if (bUSBMapped)
                {
                    szRouteLine = "(USB MAPPED)";
                }
                else if (bDanteMapped)
                {
                    szRouteLine = "(MAPPED)";
                }

                if (jsOutputs[iOutputId].type == OT_PEERED_GENERIC)
                {
                    jsOutputs[iOutputId].peered_device_name;

                    if (szRouteLine != "")
                    {
                        eOutputNameLine1.innerText = jsOutputs[iOutputId].peered_device_name;
                        eOutputNameLine3.innerText = szOutputName;
                        eOutputNameLine5.innerText = szRouteLine;
                    }
                    else
                    {
                        eOutputNameLine2.innerText = jsOutputs[iOutputId].peered_device_name;
                        eOutputNameLine4.innerText = szOutputName;
                    }
                }
                else
                {
                    if (szRouteLine != "")
                    {
                        eOutputNameLine4.classList.add("busRoutingOutputRouteLine");

                        eOutputNameLine2.innerText = szOutputName;
                        eOutputNameLine4.innerText = szRouteLine;
                    }
                    else
                    {
                        eOutputNameLine3.innerText = szOutputName;
                    }
                }                
            }

            
            if (bUSBMapped || bDanteMapped)
            {
                eOutputContainer.classList.add("busRoutingOutputUsbMapped");
                eOutputNameLine2.classList.add("busRoutingOutputUsbMapped");
                eOutputNameLine4.classList.add("busRoutingOutputUsbMapped");
            }

            if (jsOutputs[iOutputId].type == OT_PEERED_GENERIC && jsOutputs[iOutputId].peered_connection_state == 0)
            {
                eOutputContainer.classList.add("busRoutingOutputOffline");
                eOutputNameLine1.classList.add("busRoutingOutputOffline");
                eOutputNameLine2.classList.add("busRoutingOutputOffline");
                eOutputNameLine3.classList.add("busRoutingOutputOffline");
                eOutputNameLine4.classList.add("busRoutingOutputOffline");
                eOutputNameLine5.classList.add("busRoutingOutputOffline");
            }

            if (jsOutputs[iOutputId].type == OT_LOCAL_DANTE)
            {
                nDanteButtonIdx++;
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusRoutingPopup(nBusID, nLeftOutputID, nRightOutputID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    var jsLeftOutput = GetOutputJSON(nLeftOutputID);
    if (jsLeftOutput == null)
    {
        return;
    }

    var jsRightOutput = GetOutputJSON(nRightOutputID);
    if (jsRightOutput == null)
    {
        return;
    }

    var eMixer = document.getElementById("mixerSection");
    if (eMixer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ1");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nWidth = 420;
    var nHeight = nWidth / 2;
    var nTop = eMixer.offsetTop + 50;
    var nLeft = g_nMixerMargin + nStripsWidth / 2 - nWidth / 2 + (jsSettings.expert_mode && !jsSettings.neumann_edition ? 79 : 0);


    var bLow = false;
    if (window.innerWidth < 812 && (window.innerWidth > window.innerHeight))
    {
        nWidth = 360;
        nHeight = nWidth / 2;
        nTop = eMixer.offsetTop + eMixer.offsetHeight / 2 - nHeight / 2 + 53;
        nLeft = g_nMixerMargin + nStripsWidth / 2 - nWidth / 2;

        bLow = true;
    }

    var nMargin = 10;
    var nButtonWidth = (nWidth - g_nElementsBorderWidth * 6 - nMargin * 4) / 4;
    var nButtonHeight = (nHeight - g_nElementsBorderWidth * 4 - nMargin * 4) / 3;

    var szTitleStyle = "style='top: " + nMargin + "px; width: " + nWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;'";
    var szStereoButtonStyle = "style='top: " + (nMargin * 2 + nButtonHeight) + "px; left: " + nMargin + "px; width: " + (nButtonWidth * 2) + "px; height: " + nButtonHeight + "px;'";
    var szMonoButtonStyle = "style='width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;";


    var szTitle = jsBus.name + " &rightarrow; ";

    if (jsLeftOutput.type == OT_LOCAL_ADAT)
    {
        if (jsRightOutput.name.includes("ADAT"))
            szTitle += jsLeftOutput.name + "/" + jsRightOutput.name.replace("ADAT ", "");
        else
            szTitle += jsLeftOutput.name + "/" + jsRightOutput.name.replace("SPDIF ", "");
    }
    else if (jsLeftOutput.type == OT_PEERED_GENERIC)
    {
        szTitle += jsLeftOutput.peered_device_name + " " + jsLeftOutput.peered_module_name;

        if (jsLeftOutput.peered_connection_state == 0)
            szTitle += " (OFFLINE)";
    }
    else if (jsLeftOutput.type == OT_LOCAL_DANTE)
    {
        szTitle += jsLeftOutput.name + "/" + jsRightOutput.name.replace("Dante ", "");
    }
    else
    {
        szTitle += jsLeftOutput.name.replace("-L", "");
    }


    var szStereoOutputName = "L-R &rightarrow; ";
    if (nLeftOutputID == 4 && nRightOutputID == 5)
    {
        szStereoOutputName += "HP1 L-R";
    }
    else if (nLeftOutputID == 6 && nRightOutputID == 7)
    {
        szStereoOutputName += "HP2 L-R";
    }
    else if (jsRightOutput.type == OT_LOCAL_ADAT)
    {
        if (jsRightOutput.name.includes("ADAT"))
            szStereoOutputName += jsLeftOutput.name.replace("ADAT ", "") + "-" + jsRightOutput.name.replace("ADAT ", "");
        else
            szStereoOutputName += jsLeftOutput.name.replace("SPDIF ", "") + "-" + jsRightOutput.name.replace("SPDIF ", "");
    }
    else if (jsRightOutput.type == OT_PEERED_GENERIC)
    {
        szStereoOutputName += jsLeftOutput.peered_channel_name + "-" + jsRightOutput.peered_channel_name;
    }
    else if (jsRightOutput.type == OT_LOCAL_DANTE)
    {
        szStereoOutputName += jsLeftOutput.name.replace("Dante ", "") + "-" + jsRightOutput.name.replace("Dante ", "");
    }
    else
    {
        szStereoOutputName += Number(nLeftOutputID + 1) + "-" + Number(nRightOutputID + 1);
    }

    var szLeftOutputName;
    if (nLeftOutputID == 4)
    {
        szLeftOutputName = "HP1-L";
    }
    else if (nLeftOutputID == 6)
    {
        szLeftOutputName = "HP2-L";
    }
    else if (jsLeftOutput.type == OT_LOCAL_ADAT)
    {
        if (jsLeftOutput.name.includes("ADAT"))
            szLeftOutputName = jsLeftOutput.name.replace("ADAT ", "");
        else
            szLeftOutputName = jsLeftOutput.name.replace("SPDIF ", "");
    }
    else if (jsLeftOutput.type == OT_PEERED_GENERIC)
    {
        szLeftOutputName = jsLeftOutput.peered_channel_name;
    }
    else if (jsLeftOutput.type == OT_LOCAL_DANTE)
    {
        szLeftOutputName = jsLeftOutput.name.replace("Dante ", "");
    }
    else
    {
        szLeftOutputName = nLeftOutputID + 1;
    }

    var szRightOutputName;
    if (nRightOutputID == 5)
    {
        szRightOutputName = "HP1-R";
    }
    else if (nRightOutputID == 7)
    {
        szRightOutputName = "HP2-R";
    }
    else if (jsRightOutput.type == OT_LOCAL_ADAT)
    {
        if (jsRightOutput.name.includes("ADAT"))
            szRightOutputName = jsRightOutput.name.replace("ADAT ", "");
        else
            szRightOutputName = jsRightOutput.name.replace("SPDIF ", "");
    }
    else if (jsRightOutput.type == OT_PEERED_GENERIC)
    {
        szRightOutputName = jsRightOutput.peered_channel_name;
    }
    else if (jsRightOutput.type == OT_LOCAL_DANTE)
    {
        szRightOutputName = jsRightOutput.name.replace("Dante ", "");
    }
    else
    {
        szRightOutputName = nRightOutputID + 1;
    }


    var szPage = "";

    szPage += "<div id='mixerSectionPopupZ1' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupBusRoutingPopup' class='mixerSectionPopupBusRoutingPopup " + (bLow ? "mixerSectionPopupBusRoutingPopupLow" : "") + "' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";


            szPage += "<div id='' class='mixerSectionPopupBusRoutingPopupTitle' " + szTitleStyle + ">" + szTitle + "</div>";

            szPage += "<div id='BusRoutingPopupStereoButtonBus" + nBusID + "Output" + nLeftOutputID + nRightOutputID + "' class='mixerSectionPopupBusRoutingPopupButton' " + szStereoButtonStyle + ">";
                szPage += "<div id='' class='mixerSectionPopupBusRoutingPopupTitle' style='position: absolute; top: " + (nButtonHeight / 10) + "px; width: 100%; height: 40%; line-height: " + (nButtonHeight / 2) + "px;'>STEREO</div>";
                szPage += "<div id='' class='mixerSectionPopupBusRoutingPopupTitle' style='position: absolute; top: " + (nButtonHeight / 2 - g_nElementsBorderWidth * 2) + "px; width: 100%; height: 40%; line-height: " + (nButtonHeight / 2) + "px;'>" + szStereoOutputName + "</div>";
            szPage += "</div>";


            szPage += "<div id='BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nLeftOutputID + "' class='mixerSectionPopupBusRoutingPopupButton' " + szMonoButtonStyle + "top: " + (nMargin * 2 + nButtonHeight) + "px; left: " + (nMargin * 2 + nButtonWidth * 2 + g_nElementsBorderWidth * 2) + "px;'>L &rightarrow; " + szLeftOutputName + "</div>";
            szPage += "<div id='BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nLeftOutputID + "' class='mixerSectionPopupBusRoutingPopupButton' " + szMonoButtonStyle + "top: " + (nMargin * 2 + nButtonHeight) + "px; left: " + (nMargin * 3 + nButtonWidth * 3 + g_nElementsBorderWidth * 4) + "px;'>R &rightarrow; " + szLeftOutputName + "</div>";

            szPage += "<div id='BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nRightOutputID + "' class='mixerSectionPopupBusRoutingPopupButton' " + szMonoButtonStyle + "top: " + (nMargin * 3 + nButtonHeight * 2 + g_nElementsBorderWidth * 2) + "px; left: " + (nMargin * 2 + nButtonWidth * 2 + g_nElementsBorderWidth * 2) + "px';>L &rightarrow; " + szRightOutputName + "</div>";
            szPage += "<div id='BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nRightOutputID + "' class='mixerSectionPopupBusRoutingPopupButton' " + szMonoButtonStyle + "top: " + (nMargin * 3 + nButtonHeight * 2 + g_nElementsBorderWidth * 2) + "px; left: " + (nMargin * 3 + nButtonWidth * 3 + g_nElementsBorderWidth * 4) + "px;'>R &rightarrow; " + szRightOutputName + "</div>";


        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    g_nOpenedBusRoutingPopupBusID = nBusID;
    g_nOpenedBusRoutingPopupLeftOutputID = nLeftOutputID;
    g_nOpenedBusRoutingPopupRightOutputID = nRightOutputID;

    
    UpdateBusRoutingPopup(g_nOpenedBusRoutingPopupBusID, g_nOpenedBusRoutingPopupLeftOutputID, g_nOpenedBusRoutingPopupRightOutputID);


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopupZ1", "click", function (event) { CloseBusRoutingPopup(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopupZ1", "touchstart", function (event) { CloseBusRoutingPopup(); }, true);
        AddEvent("mixerSectionPopupZ1", "mousedown", function (event) { CloseBusRoutingPopup(); }, true);
    }

    AddEvent("mixerSectionPopupBusRoutingPopup", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRoutingPopup", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusRoutingPopup", "mousedown", function (event) { event.stopPropagation(); }, true);

    // Stereo
    AddEvent("BusRoutingPopupStereoButtonBus" + nBusID + "Output" + nLeftOutputID + nRightOutputID + "", "click", function (event) { SetBusOutputs(nBusID, nLeftOutputID, nRightOutputID, true, true, true); });

    // Mono
    AddEvent("BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nLeftOutputID, "click", function (event) { SetBusOutputs(nBusID, nLeftOutputID, -1, false, true, false); });
    AddEvent("BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nLeftOutputID, "click", function (event) { SetBusOutputs(nBusID, -1, nLeftOutputID, false, false, true); });
    AddEvent("BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nRightOutputID, "click", function (event) { SetBusOutputs(nBusID, nRightOutputID, -1, false, true, false); });
    AddEvent("BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nRightOutputID, "click", function (event) { SetBusOutputs(nBusID, -1, nRightOutputID, false, false, true); });


    ShowPopupContainerZ1();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusRoutingPopup(nBusID, nLeftOutputID, nRightOutputID)
{
    var eBusRoutingPopup = document.getElementById("mixerSectionPopupBusRoutingPopup");
    if (eBusRoutingPopup == null)
    {
        return;
    }

    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    var jsLeftOutput = GetOutputJSON(nLeftOutputID);
    if (jsLeftOutput == null)
    {
        return;
    }

    var jsRightOutput = GetOutputJSON(nRightOutputID);
    if (jsRightOutput == null)
    {
        return;
    }

    var nBusLeftOutputID = jsBus.left_output_id;
    var nBusRightOutputID = jsBus.right_output_id;

    var eRoutingButtons = document.getElementsByClassName("mixerSectionPopupBusRoutingPopupButton");
    if (eRoutingButtons == null)
    {
        return;
    }

    // clear routing
    for (var i = 0; i < eRoutingButtons.length; i++)
    {
        eRoutingButtons[i].classList.remove("mixerSectionPopupBusRoutingPopupButtonChecked");
    }

    var eStereoButton = document.getElementById("BusRoutingPopupStereoButtonBus" + nBusID + "Output" + nBusLeftOutputID + nBusRightOutputID);
    if (eStereoButton)
    {
        eStereoButton.classList.add("mixerSectionPopupBusRoutingPopupButtonChecked");
        return;
    }

    var eMonoBusLOutputLButton = document.getElementById("BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nBusLeftOutputID);
    if (eMonoBusLOutputLButton)
    {
        eMonoBusLOutputLButton.classList.add("mixerSectionPopupBusRoutingPopupButtonChecked");
    }

    var eMonoBusROutputLButton = document.getElementById("BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nBusRightOutputID);
    if (eMonoBusROutputLButton)
    {
        eMonoBusROutputLButton.classList.add("mixerSectionPopupBusRoutingPopupButtonChecked");
    }

    var eMonoBusLOutputRButton = document.getElementById("BusRoutingPopupMonoButtonBus" + nBusID + "LOutput" + nBusLeftOutputID);
    if (eMonoBusLOutputRButton)
    {
        eMonoBusLOutputRButton.classList.add("mixerSectionPopupBusRoutingPopupButtonChecked");
    }

    var eMonoBusROutputRButton = document.getElementById("BusRoutingPopupMonoButtonBus" + nBusID + "ROutput" + nBusRightOutputID);
    if (eMonoBusROutputRButton)
    {
        eMonoBusROutputRButton.classList.add("mixerSectionPopupBusRoutingPopupButtonChecked");
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseBusRoutingPopup()
{
    g_nOpenedBusRoutingPopupBusID = -1;
    g_nOpenedBusRoutingPopupLeftOutputID = -1;
    g_nOpenedBusRoutingPopupRightOutputID = -1;

    ClosePopupContainerZ1();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetBusOutputs(nBusID, nLeftOutputID, nRightOutputID, bStereoRouting, bUpdateLeft, bUpdateRight)
{
    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    var jsValue = null;
    if (bStereoRouting)
    {
        var nLeft = jsBus.left_output_id == nLeftOutputID && jsBus.right_output_id == nRightOutputID ? -1 : nLeftOutputID;
        var nRight = jsBus.left_output_id == nLeftOutputID && jsBus.right_output_id == nRightOutputID ? -1 : nRightOutputID;

        jsValue = { left_output_id: nLeft, right_output_id: nRight };
    }
    else
    {       
        if (jsBus.left_output_id == g_nOpenedBusRoutingPopupLeftOutputID && jsBus.right_output_id == g_nOpenedBusRoutingPopupRightOutputID)
        {
            jsValue = { left_output_id: nLeftOutputID, right_output_id: nRightOutputID };
		}
        else if ((jsBus.left_output_id == g_nOpenedBusRoutingPopupLeftOutputID && nRightOutputID == g_nOpenedBusRoutingPopupRightOutputID) || (nLeftOutputID == g_nOpenedBusRoutingPopupLeftOutputID && jsBus.right_output_id == g_nOpenedBusRoutingPopupRightOutputID))
        {
            var nLeft = jsBus.left_output_id == nLeftOutputID ? -1 : nLeftOutputID;
            var nRight = jsBus.right_output_id == nRightOutputID ? -1 : nRightOutputID;

            jsValue = { left_output_id: nLeft, right_output_id: nRight };
		}
		else
		{
            if (bUpdateLeft)
            {
                jsValue = { left_output_id: (jsBus.left_output_id == nLeftOutputID ? -1 : nLeftOutputID) };
            }

            if (bUpdateRight)
            {
                jsValue = { right_output_id: (jsBus.right_output_id == nRightOutputID ? -1 : nRightOutputID) };
            }
		}        
    }

    if (jsValue != null)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]", value: jsValue });
}


var g_bPresets = false;
var g_bSubsets = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSnapshots(bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID)
{
    var jsMusicEngine;
    if (RavennaDeviceCache && RavennaDeviceCache.document())
    {
        jsMusicEngine = RavennaDeviceCache.document();
    }

    g_bPresets = bPresets;
    g_bSubsets = bSubsets;
    g_szSnapshotsCategory = szSnapshotsCategory;

    save_ToCookie(false);

    var bEQ = false;
    var bDynamics = false;
    var bReverb = false;
    var bDeesser = false;
    var bEventideBlackhole = false;

    var jsSnapshots;
    if (bPresets)
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.presets;
    }
    else if (bSubsets && szSnapshotsCategory == "eq")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eq;
        bEQ = true;
    }
    else if (bSubsets && szSnapshotsCategory == "reverb")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.reverb;
        bReverb = true;
    }
    else if (bSubsets && szSnapshotsCategory == "dynamics")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.dynamics;
        bDynamics = true;
    }
    else if (bSubsets && szSnapshotsCategory == "deesser")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.deesser;
        bDeesser = true;
    }
    else if (bSubsets && szSnapshotsCategory == "eventide_blackhole")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eventide_blackhole;
        bEventideBlackhole = true;
    }

    if (jsSnapshots == null)
    {
        return;
    }

    var eMixer = document.getElementById("mixerSection");
    if (eMixer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

    var nWidth = 750;
    var nHeight = 500;
    var nTop = eMixer.offsetTop + eMixer.offsetHeight / 2 - (nHeight / 2);
    var nLeft = g_nMixerMargin + (nStripsWidth / 2) - (nWidth / 2);

    var bLowScreen = false;
    if (window.innerWidth <= 812 && (window.innerWidth > window.innerHeight))
    {
        nWidth = nStripsWidth;
        nHeight = eMixer.offsetHeight - g_nMixerMargin * 2;
        nTop = eMixer.offsetTop + g_nMixerMargin;
        nLeft = g_nMixerMargin;

        bLowScreen = true;
    }

    var nSnapshotButtonWidth = (nWidth - g_nElementsBorderWidth * 2 - g_nElementsBorderWidth * 6 - g_nElementsBorderWidth * 8) / 3;
    var nSnapshotButtonHeight = (nHeight - g_nElementsBorderWidth * 2 - g_nElementsBorderWidth * 12 - g_nElementsBorderWidth * 14) / 6;

    var szSnapshotButtonStyle = "style =' width: " + nSnapshotButtonWidth + "px; height: " + nSnapshotButtonHeight + "px; line-height: " + nSnapshotButtonHeight + "px;";
    var szSnapshotButtonNAStyle = "style =' width: " + (nSnapshotButtonWidth - g_nElementsBorderWidth * 2) + "px; height: " + (nSnapshotButtonHeight - g_nElementsBorderWidth * 2) + "px; line-height: " + (nSnapshotButtonHeight - g_nElementsBorderWidth *2) + "px;";
    var szSnapshotButtonNumberStyle = "style =' width: " + (nSnapshotButtonWidth / 8) + "px; height: " + (nSnapshotButtonHeight / 2.5) + "px; line-height: " + (nSnapshotButtonHeight / 2.5) + "px;";
    var szSnapshotButtonCommentStyle = "style =' width: " + (bLowScreen ? (nSnapshotButtonWidth * 7 / 8 - g_nElementsBorderWidth * 3) : (nSnapshotButtonWidth * 7 / 8 - g_nElementsBorderWidth * 5)) + "px; height: " + (nSnapshotButtonHeight / 2.5) + "px; line-height: " + (nSnapshotButtonHeight / 2.5) + "px;";
    var szSnapshotButtonNameStyle = "style =' width: " + (nSnapshotButtonWidth - g_nElementsBorderWidth * 4) + "px; height: " + (nSnapshotButtonHeight / 2.5) + "px; line-height: " + (nSnapshotButtonHeight / 2.5) + "px;";


    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupSnapshots' class='mixerSectionPopupSnapshots' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            var nIndexX = 0;
            var nIndexY = 0;
            for (var iSnapshotId = 0; iSnapshotId < jsSnapshots.length; iSnapshotId++)
            {
                var nTop = g_nElementsBorderWidth * 3 + nIndexY * (nSnapshotButtonHeight + g_nElementsBorderWidth * 4);
                var nLeft = g_nElementsBorderWidth * 3 + nIndexX * (nSnapshotButtonWidth + g_nElementsBorderWidth * 4);

                szPage += "<div id='snapshotButton" + iSnapshotId + "' class='mixerSectionPopupSnapshotButton' " + szSnapshotButtonStyle + "top: " + nTop + "px; left: " + nLeft + "px;'>";
                
                szPage += "<div id='snapshotButtonNA" + iSnapshotId + "' class='mixerSectionPopupSnapshotButtonNA' " + szSnapshotButtonNAStyle + "top: " + g_nElementsBorderWidth + "px; left: " + g_nElementsBorderWidth + "px;'>N/A</div>";

                szPage += "<div id='snapshotButtonNumber" + iSnapshotId + "' class='mixerSectionPopupSnapshotButtonNumber' " + szSnapshotButtonNumberStyle + "top: " + (g_nElementsBorderWidth) + "px; left: " + (bLowScreen ? (g_nElementsBorderWidth * 3) : (g_nElementsBorderWidth * 5)) + "px;'>" + (iSnapshotId + 1) + "</div>";

                szPage += "<div id='snapshotButtonComment" + iSnapshotId + "' class='mixerSectionPopupSnapshotButtonComment' " + szSnapshotButtonCommentStyle + "top: " + (g_nElementsBorderWidth) + "px; left: " + (nSnapshotButtonWidth / 8) + "px;'>COMMENT</div>";

                szPage += "<div id='snapshotButtonName" + iSnapshotId + "' class='mixerSectionPopupSnapshotButtonName' " + szSnapshotButtonNameStyle + "top: " + (bLowScreen ? (g_nElementsBorderWidth * 2 + (nSnapshotButtonHeight / 2)) : (g_nElementsBorderWidth * 4 + (nSnapshotButtonHeight / 2))) + "px; left: " + (bLowScreen ? (g_nElementsBorderWidth * 3) : (g_nElementsBorderWidth * 5)) + "px;'>NAME</div>";

                szPage += "</div>";

                nIndexY++;

                if (iSnapshotId == 5 || iSnapshotId == 11)
                {
                    nIndexX++;
                    nIndexY = 0;
                }
            }

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateSnapshots(bPresets, bSubsets, szSnapshotsCategory);


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseSnapshots(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseSnapshots(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseSnapshots(); }, true);
    }

    AddEvent("mixerSectionPopupSnapshots", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSnapshots", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSnapshots", "mousedown", function (event) { event.stopPropagation(); }, true);


    for (var iSnapshotId = 0; iSnapshotId < jsSnapshots.length; iSnapshotId++)
    {
        AddEvent("snapshotButton" + iSnapshotId, "click", (function _OpenSnapshotPopup(iId, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID) { return function () { return OpenSnapshotPopup(iId, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID); } })(iSnapshotId, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID));
    }


    ShowPopupContainer();

    g_bEQSnapshotsOpened = bEQ;
    g_bReverbSnapshotsOpened = bReverb;
    g_bDynamicsSnapshotsOpened = bDynamics;
    g_bDeesserSnapshotsOpened = bDeesser;
    g_bEventideBlackholeSnapshotsOpened = bEventideBlackhole;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSnapshots(bPresets, bSubsets, szSnapshotsCategory)
{
    var jsMusicEngine;
    if (RavennaDeviceCache && RavennaDeviceCache.document())
    {
        jsMusicEngine = RavennaDeviceCache.document();
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsSnapshots;
    if (bPresets)
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.presets;
    }        
    else if (bSubsets && szSnapshotsCategory == "eq")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eq;
    }
    else if (bSubsets && szSnapshotsCategory == "reverb")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.reverb;
    }
    else if (bSubsets && szSnapshotsCategory == "dynamics")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.dynamics;
    }
    else if (bSubsets && szSnapshotsCategory == "deesser")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.deesser;
    }
    else if (bSubsets && szSnapshotsCategory == "eventide_blackhole")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eventide_blackhole;
    }

    if (jsSnapshots == null)
    {
        return;
    }


    for (var iSnapshotId = 0; iSnapshotId < jsSnapshots.length; iSnapshotId++)
    {
        var eSnapshotButton = document.getElementById("snapshotButton" + iSnapshotId);
        if (eSnapshotButton)
        {
            var eSnapshotButtonNA = document.getElementById("snapshotButtonNA" + iSnapshotId);

            var eSnapshotButtonStyle = eSnapshotButton.style;

            if (jsSnapshots[iSnapshotId].empty)
            {
                if (eSnapshotButtonNA)
                {
                    eSnapshotButtonNA.innerText = "N/A";
                }

                eSnapshotButtonStyle.setProperty("background-color", bNeumannEdition ? "#343434" : "#000000");
                eSnapshotButtonStyle.setProperty("border-color", bNeumannEdition ? "#343434" : "#202020");
            }
            else
            {
                if (eSnapshotButtonNA)
                {
                    eSnapshotButtonNA.innerText = "";
                }

                eSnapshotButtonStyle.setProperty("background-color", bNeumannEdition && (jsSnapshots[iSnapshotId].color == "#000000" || jsSnapshots[iSnapshotId].color == "") ? "#343434" : jsSnapshots[iSnapshotId].color);
                eSnapshotButtonStyle.setProperty("border-color", bNeumannEdition ? ((jsSnapshots[iSnapshotId].color == "#000000" || jsSnapshots[iSnapshotId].color == "") ? "#343434" : jsSnapshots[iSnapshotId].color) : "#A9A9A9");
            }
        }


        var eSnapshotButtonNumber = document.getElementById("snapshotButtonNumber" + iSnapshotId);
        if (eSnapshotButtonNumber)
        {            
            eSnapshotButtonNumber.innerText = iSnapshotId + 1;

            if (jsSnapshots[iSnapshotId].empty)
                eSnapshotButtonNumber.style.setProperty("color", bNeumannEdition ? "#818181" : "#202020");
            else            
                eSnapshotButtonNumber.style.setProperty("color", (jsSnapshots[iSnapshotId].color == "#000000" || jsSnapshots[iSnapshotId].color == "") ? (bNeumannEdition ? "#f7f7f7" : "#A9A9A9") : "#000000");
        }


        var eSnapshotButtonName = document.getElementById("snapshotButtonName" + iSnapshotId);
        if (eSnapshotButtonName)
        {
            var eSnapshotButtonNameStyle = eSnapshotButtonName.style;

            if (jsSnapshots[iSnapshotId].empty)
            {
                eSnapshotButtonName.innerText = "";
            }
            else
            {
                eSnapshotButtonName.innerText = jsSnapshots[iSnapshotId].name;

                eSnapshotButtonNameStyle.setProperty("color", (jsSnapshots[iSnapshotId].color == "#000000" || jsSnapshots[iSnapshotId].color == "") ? (bNeumannEdition ? "#f7f7f7" : "#A9A9A9") : "#000000");
            }
        }


        var eSnapshotButtonComment = document.getElementById("snapshotButtonComment" + iSnapshotId);
        if (eSnapshotButtonComment)
        {
            var eSnapshotButtonCommentStyle = eSnapshotButtonComment.style;

            if (jsSnapshots[iSnapshotId].empty)
            {
                eSnapshotButtonComment.innerText = "";
            }
            else
            {
                eSnapshotButtonComment.innerText = jsSnapshots[iSnapshotId].comment;

                eSnapshotButtonCommentStyle.setProperty("color", (jsSnapshots[iSnapshotId].color == "#000000" || jsSnapshots[iSnapshotId].color == "") ? (bNeumannEdition ? "#f7f7f7" : "#A9A9A9") : "#000000");
            }
        }
    }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSnapshots()
{
    ClosePopupContainer();

    g_bPresets = false;
    g_bSubsets = false;
    g_szSnapshotsCategory = "";

    save_ToCookie(false);

    g_bEQSnapshotsOpened = false;
    g_bReverbSnapshotsOpened = false;
    g_bDynamicsSnapshotsOpened = false;
    g_bDeesserSnapshotsOpened = false;
    g_bEventideBlackholeSnapshotsOpened = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSnapshotPopup(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID)
{
    var jsMusicEngine;
    if (RavennaDeviceCache && RavennaDeviceCache.document())
    {
        jsMusicEngine = RavennaDeviceCache.document();
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }
    var bNeumannEdition = jsMixer.settings.neumann_edition;

    var jsSnapshots;
    if (bPresets)
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.presets;
    }
    else if (bSubsets && szSnapshotsCategory == "eq")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eq;
    }
    else if (bSubsets && szSnapshotsCategory == "reverb")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.reverb;
    }
    else if (bSubsets && szSnapshotsCategory == "dynamics")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.dynamics;
    }
    else if (bSubsets && szSnapshotsCategory == "deesser")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.deesser;
    }
    else if (bSubsets && szSnapshotsCategory == "eventide_blackhole")
    {
        jsSnapshots = jsMusicEngine._oem_ui_process_engine.subsets.eventide_blackhole;
    }

    if (jsSnapshots == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }


    var eMixer = document.getElementById("mixerSection");
    if (eMixer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainerZ1");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }
    

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

    var nWidth = 520;
    var nHeight = 400;    

    var bLowScreen = false;
    if (window.innerWidth <= 812 && (window.innerWidth > window.innerHeight))
    {
        nWidth = nStripsWidth * 2.3 / 3;
        nHeight = Number(eMixer.offsetHeight) - g_nMixerMargin * 2 - g_nElementsBorderWidth * 8;

        bLowScreen = true;
    }
    
    var nTop = Number(eMixer.offsetTop) + (Number(eMixer.offsetHeight) / 2) - (nHeight / 2);
    var nLeft = g_nMixerMargin + (nStripsWidth / 2) - (nWidth / 2);


    var bSnapshotReadOnly = jsSnapshots[nSnapshotID].read_only;
    var bSnapshotEmpty = jsSnapshots[nSnapshotID].empty;

    var tabSnapshotColors = new Array();
    tabSnapshotColors.push(bNeumannEdition ? "#de8c90" : "#ff3838");
    tabSnapshotColors.push(bNeumannEdition ? "#f6a589" : "#50eb64");
    tabSnapshotColors.push(bNeumannEdition ? "#fdb99c" : "#1e92e2");
    tabSnapshotColors.push(bNeumannEdition ? "#c1e1b7" : "#f05a28");
    tabSnapshotColors.push(bNeumannEdition ? "#b8e0d9" : "#ba247a");
    tabSnapshotColors.push(bNeumannEdition ? "#abcfed" : "#fbaf3f");
    tabSnapshotColors.push(bNeumannEdition ? "#dfb9db" : "#7650b2");
    tabSnapshotColors.push(bNeumannEdition ? "#ffe99a" : "#4be1a5");


    var nPopupMargin = g_nElementsBorderWidth * 8;

    var nButtonHeight = (nHeight - nPopupMargin * 2 - nPopupMargin * 6 - g_nElementsBorderWidth * 8) / 6;    
    var nBottomButtonWidth = (nWidth - nPopupMargin * 2 - g_nElementsBorderWidth * 14) / 3;
    var nColorButtonSide = ((nWidth - nPopupMargin * 2 - g_nElementsBorderWidth * 9) - (nBottomButtonWidth * 2 / 3) - g_nElementsBorderWidth * 25) / 8;


    var szRecallButtonFontColor = "";
    if (bSnapshotEmpty)
        szRecallButtonFontColor = bNeumannEdition ? "#8c8c8c" : "#000000";
    else if (bNeumannEdition || jsSnapshots[nSnapshotID].color == tabSnapshotColors[0] || jsSnapshots[nSnapshotID].color == tabSnapshotColors[1] || jsSnapshots[nSnapshotID].color == tabSnapshotColors[5] || jsSnapshots[nSnapshotID].color == tabSnapshotColors[7] || jsSnapshots[nSnapshotID].color == "#ffffff")
        szRecallButtonFontColor = "#000000";
    else
        szRecallButtonFontColor = "#ffffff";


    var szRecallButtonBackgroundColor = "";
    if (bSnapshotEmpty)
        szRecallButtonBackgroundColor = bNeumannEdition ? "transparent" : "#282828";
    else if (jsSnapshots[nSnapshotID].color == "#000000" || jsSnapshots[nSnapshotID].color == "")
        szRecallButtonBackgroundColor = bNeumannEdition ? "#343434" : "#202020";
    else
        szRecallButtonBackgroundColor = jsSnapshots[nSnapshotID].color;


    var szRecallButtonStyle = "style =' width: " + (nWidth - nPopupMargin * 2 - g_nElementsBorderWidth * 2) + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px; top: " + nPopupMargin + "px; left: " + nPopupMargin + "px; background-color: " + szRecallButtonBackgroundColor + "; color: " + szRecallButtonFontColor + ";";
    szRecallButtonStyle += !bSnapshotEmpty && bNeumannEdition ? "border-color: " + szRecallButtonBackgroundColor + ";'" : "'";

    var szLineStyle = "style =' width: " + (nWidth - nPopupMargin * 2 - g_nElementsBorderWidth * 2) + "px; height: " + g_nElementsBorderWidth + "px; top: " + (nPopupMargin * 3 - g_nElementsBorderWidth + nButtonHeight) + "px; left: " + (nPopupMargin + g_nElementsBorderWidth) + "px;'";

    var szTextStyle = "style =' width: " + (nBottomButtonWidth * 2 / 3) + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px; left: " + nPopupMargin + "px;";
    if (bLowScreen)
        szTextStyle += "font-size :" + (g_nStripButtonWidth / 3) + "px;";

    var szTextButtonStyle = "style =' width: " + ((nWidth - nPopupMargin * 2 - g_nElementsBorderWidth * 9) - (nBottomButtonWidth * 2 / 3)) + "px; height: " + (nButtonHeight - g_nElementsBorderWidth * 8) + "px; line-height: " + (nButtonHeight - g_nElementsBorderWidth * 8) + "px; left: " + (nPopupMargin + (nBottomButtonWidth * 2 / 3) + g_nElementsBorderWidth * 4) + "px;";

    var szColorButtonStyle = "style =' width: " + nColorButtonSide + "px; height: " + nColorButtonSide + "px;";

    var szBottomButtonStyle = "style =' width: " + nBottomButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px; top: " + (nHeight - nPopupMargin - nButtonHeight * 2 - g_nElementsBorderWidth * 12) + "px;";

    var szExportImportButtonStyle = "style =' width: " + nBottomButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px; top: " + (nHeight - nPopupMargin - nButtonHeight - g_nElementsBorderWidth * 2) + "px;";


    var szPage = "";

    szPage += "<div id='mixerSectionPopupZ1' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupSnapshotPopup' class='mixerSectionPopupSnapshotPopup' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div id='snapshotPopupButtonRecall" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonRecall " + (bSnapshotEmpty ? "mixerSectionPopupSnapshotPopupButtonRecallDisabled" : "") + "' " + szRecallButtonStyle + ">RECALL " + jsSnapshots[nSnapshotID].name + "</div>";

            szPage += "<div id='' class='mixerSectionPopupSnapshotPopupLine' " + szLineStyle + "></div>";

            szPage += "<div id='' class='mixerSectionPopupSnapshotPopupText " + (bSnapshotReadOnly ? "mixerSectionPopupSnapshotPopupTextReadOnly" : "") + "' " + szTextStyle + " top: " + (nPopupMargin * 5 - g_nElementsBorderWidth * 7 + nButtonHeight) + "px;'>NAME</div>";
            szPage += "<div id='snapshotPopupButtonName" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonText " + (bSnapshotReadOnly ? "mixerSectionPopupSnapshotPopupButtonTextReadOnly" : "") + "' " + szTextButtonStyle + " top: " + (nPopupMargin * 5 - g_nElementsBorderWidth * 3 + nButtonHeight) + "px;'>" + jsSnapshots[nSnapshotID].name + "</div>";

            szPage += "<div id='' class='mixerSectionPopupSnapshotPopupText " + (bSnapshotReadOnly ? "mixerSectionPopupSnapshotPopupTextReadOnly" : "") + "' " + szTextStyle + " top: " + (nPopupMargin * 5 - g_nElementsBorderWidth * 3 + nButtonHeight * 2) + "px;'>COMMENT</div>";
            szPage += "<div id='snapshotPopupButtonComment" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonText " + (bSnapshotReadOnly ? "mixerSectionPopupSnapshotPopupButtonTextReadOnly" : "") + "' " + szTextButtonStyle + " top: " + (nPopupMargin * 5 + g_nElementsBorderWidth + nButtonHeight * 2) + "px;'>" + jsSnapshots[nSnapshotID].comment + "</div>";

            if (!bSnapshotReadOnly)
            {
                szPage += "<div id='' class='mixerSectionPopupSnapshotPopupText' " + szTextStyle + " top: " + (nPopupMargin * 5 + g_nElementsBorderWidth * 4 + nButtonHeight * 3) + "px;'>COLOR</div>";

                for (var iColorId = 0; iColorId < tabSnapshotColors.length; iColorId++)
                {
                    szPage += "<div id='snapshotPopupButtonColor" + iColorId + "' class='mixerSectionPopupSnapshotPopupButtonColor " + (jsSnapshots[nSnapshotID].color == tabSnapshotColors[iColorId] ? "mixerSectionPopupSnapshotPopupButtonColorChecked" : "") + "' ";
                    szPage += szColorButtonStyle + " left: " + (nPopupMargin + (nBottomButtonWidth * 2 / 3) + g_nElementsBorderWidth * 4 + (nColorButtonSide + g_nElementsBorderWidth * 4) * iColorId - (jsSnapshots[nSnapshotID].color == tabSnapshotColors[iColorId] ? g_nElementsBorderWidth : 0)) + "px;  top: " + (nPopupMargin * 5 + g_nElementsBorderWidth * 5 + nButtonHeight * 3 - (jsSnapshots[nSnapshotID].color == tabSnapshotColors[iColorId] ? g_nElementsBorderWidth * (bNeumannEdition ? 2 : 1) : 0)) + "px; background-color: " + tabSnapshotColors[iColorId] + ";";
                    szPage += bNeumannEdition ? "border-color: " + tabSnapshotColors[iColorId] + "" : "";
                    szPage += "'></div>";
                }

                szPage += "<div id='snapshotPopupButtonStore" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonBottom' " + szBottomButtonStyle + " left: " + (nPopupMargin) + "px;'>STORE</div>";
                szPage += "<div id='snapshotPopupButtonUpdateInfo" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonBottom " + (bSnapshotEmpty ? "mixerSectionPopupSnapshotPopupButtonBottomDisabled" : "") + "' " + szBottomButtonStyle + " left: " + (nPopupMargin + nBottomButtonWidth + g_nElementsBorderWidth * 6) + "px;'>UPDATE INFO</div>";
                szPage += "<div id='snapshotPopupButtonDelete" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonBottom " + (bSnapshotEmpty ? "mixerSectionPopupSnapshotPopupButtonBottomDisabled" : "") + "' " + szBottomButtonStyle + " left: " + (nPopupMargin + nBottomButtonWidth * 2 + g_nElementsBorderWidth * 12) + "px;'>DELETE</div>";

                
                szPage += "<div id='snapshotPopupButtonImport" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonBottom' " + szExportImportButtonStyle + " left: " + (nPopupMargin + nBottomButtonWidth / 2) + "px;'>IMPORT";

						szPage += "<form id='importSnapshotForm' action='/upload' method='post' enctype='multipart/form-data'>";

                            var szDirectory = '';
                            var szFile = '';
                            var szExtension = jsMixer.settings.neumann_edition ? '.NeuMi' : '.MuMi';
                            if (bPresets)
                            {
                                szDirectory = 'Presets';
                                szFile = 'preset_' + (nSnapshotID).toString() + szExtension;
                            }
                            else if (bSubsets)
                            {
                                szDirectory = "Subsets_" + szSnapshotsCategory;
                                szFile += 'subset_' + szSnapshotsCategory + '_' + (nSnapshotID).toString() + szExtension;
                            }                                

                            szPage += "<input id='snapshotPopupInputImport" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupImport' name='directories_write_file:" + szDirectory + ":" + szFile + "' type='file' accept='" + szExtension + "' size='50' maxlength='10000000' accept='*/" + (jsMixer.settings.neumann_edition ? 'NeuMi' : 'MuMi') + "' onchange='ImportPreset()' tabIndex=-1>";
						    
                        szPage += "</form>";

                szPage += "</div>";

                szPage += "<div id='snapshotPopupButtonExport" + nSnapshotID + "' class='mixerSectionPopupSnapshotPopupButtonBottom " + (bSnapshotEmpty || bSnapshotReadOnly ? "mixerSectionPopupSnapshotPopupButtonBottomDisabled" : "") + "' " + szExportImportButtonStyle + "left: " + (nPopupMargin + nBottomButtonWidth * 1.5 + g_nElementsBorderWidth * 6) + "px;'>EXPORT</div>";
            }

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    if (bSnapshotReadOnly)
    {
        var ePopup = document.getElementById("mixerSectionPopupSnapshotPopup");
        var ePopupStyle = ePopup.style;

        var nPopupHeight = nHeight * 3.15 / 6;
        var nPopupTop = Number(eMixer.offsetTop) + (Number(eMixer.offsetHeight) / 2) - (nPopupHeight / 2);

        ePopupStyle.setProperty("height", nPopupHeight + "px");
        ePopupStyle.setProperty("top", nPopupTop + "px");
    }
        

    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopupZ1", "click", function (event) { CloseSnapshotPopup(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopupZ1", "touchstart", function (event) { CloseSnapshotPopup(); }, true);
        AddEvent("mixerSectionPopupZ1", "mousedown", function (event) { CloseSnapshotPopup(); }, true);
    }

    AddEvent("mixerSectionPopupSnapshotPopup", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSnapshotPopup", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSnapshotPopup", "mousedown", function (event) { event.stopPropagation(); }, true);


    AddEvent("snapshotPopupButtonName" + nSnapshotID, "click", function (event) { if (!bSnapshotReadOnly) UpdateSnapshotPopup(nSnapshotID, true, false, false, prompt("NAME", jsSnapshots[nSnapshotID].name)) });
    AddEvent("snapshotPopupButtonComment" + nSnapshotID, "click", function (event) { if (!bSnapshotReadOnly) UpdateSnapshotPopup(nSnapshotID, false, true, false, prompt("COMMENT", jsSnapshots[nSnapshotID].comment)) });


    for (var iColorId = 0; iColorId < tabSnapshotColors.length; iColorId++)
    {
        AddEvent("snapshotPopupButtonColor" + iColorId, "click", (function _UpdateSnapshotPopup(nID, bUpdateName, bUpdateComment, bUpdateColor, szString) { return function () { return UpdateSnapshotPopup(nID, bUpdateName, bUpdateComment, bUpdateColor, szString); } })(nSnapshotID, false, false, true, tabSnapshotColors[iColorId]));
    }

    if (bSnapshotEmpty)
        AddEvent("snapshotPopupButtonStore" + nSnapshotID, "click", function (event) { StoreSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID); });
    else
        AddEvent("snapshotPopupButtonStore" + nSnapshotID, "click", function (event)
        {
            var eMixerSectionPopupContainerZ2 = document.getElementById("mixerSectionPopupContainerZ2");
            if (eMixerSectionPopupContainerZ2 == null)
            {
                return;
            }
        
            var szTitle = "Overwite " + (jsSnapshots[nSnapshotID].name == "" ? "this snapshot ?" : jsSnapshots[nSnapshotID].name + " ?");
            eMixerSectionPopupContainerZ2.innerHTML = MakeValidationChoicePopup(szTitle);


            var ePopupValidationChoice = document.getElementById("mixerSectionPopupValidationChoice");
            var ePopupValidationChoiceStyle = ePopupValidationChoice.style;
            var nPopupHeight = ePopupValidationChoice.offsetHeight;
            var nPopupWidth = ePopupValidationChoice.offsetWidth;        

            var nPopupLeft = g_nMixerMargin + (nStripsWidth - nPopupWidth) / 2;
            var nPopupTop = nTop + nHeight - nPopupHeight - nPopupMargin + g_nElementsBorderWidth;

            ePopupValidationChoiceStyle.setProperty("left", nPopupLeft + "px");
            ePopupValidationChoiceStyle.setProperty("top", nPopupTop + "px");


            AddEvent("mixerSectionPopupValidationChoiceButtonNo", "click", function (event)
            {
                if (eMixerSectionPopupContainer.classList.contains("mixermixerSectionPopupContainerFiltered"))
                    eMixerSectionPopupContainer.classList.remove("mixermixerSectionPopupContainerFiltered");

                ClosePopupContainerZ2();
            });

        AddEvent("mixerSectionPopupValidationChoiceButtonYes", "click", function (event)
        {
            if (eMixerSectionPopupContainer.classList.contains("mixermixerSectionPopupContainerFiltered"))
                eMixerSectionPopupContainer.classList.remove("mixermixerSectionPopupContainerFiltered");

            StoreSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID);
            ClosePopupContainerZ2();
        });


        eMixerSectionPopupContainer.classList.add("mixermixerSectionPopupContainerFiltered");


        ShowPopupContainerZ2();
    });

    if (!bSnapshotEmpty)
    {
        AddEvent("snapshotPopupButtonRecall" + nSnapshotID, "click", function (event) { RecallSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID); });
        AddEvent("snapshotPopupButtonUpdateInfo" + nSnapshotID, "click", function (event) { UpdateInfoSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory); });
        AddEvent("snapshotPopupButtonDelete" + nSnapshotID, "click", function (event)
        {
            var eMixerSectionPopupContainerZ2 = document.getElementById("mixerSectionPopupContainerZ2");
            if (eMixerSectionPopupContainerZ2 == null)
            {
                return;
            }
        

            eMixerSectionPopupContainerZ2.innerHTML = MakeValidationChoicePopup("Are your sure ?");


            var ePopupValidationChoice = document.getElementById("mixerSectionPopupValidationChoice");
            var ePopupValidationChoiceStyle = ePopupValidationChoice.style;
            var nPopupHeight = ePopupValidationChoice.offsetHeight;
            var nPopupWidth = ePopupValidationChoice.offsetWidth;        

            var nPopupLeft = g_nMixerMargin + (nStripsWidth - nPopupWidth) / 2;
            var nPopupTop = nTop + nHeight - nPopupHeight - nPopupMargin + g_nElementsBorderWidth;

            ePopupValidationChoiceStyle.setProperty("left", nPopupLeft + "px");
            ePopupValidationChoiceStyle.setProperty("top", nPopupTop + "px");


            AddEvent("mixerSectionPopupValidationChoiceButtonNo", "click", function (event)
            {
                if (eMixerSectionPopupContainer.classList.contains("mixermixerSectionPopupContainerFiltered"))
                    eMixerSectionPopupContainer.classList.remove("mixermixerSectionPopupContainerFiltered");

                ClosePopupContainerZ2();
            });

            AddEvent("mixerSectionPopupValidationChoiceButtonYes", "click", function (event)
            {
                if (eMixerSectionPopupContainer.classList.contains("mixermixerSectionPopupContainerFiltered"))
                    eMixerSectionPopupContainer.classList.remove("mixermixerSectionPopupContainerFiltered");

                DeleteSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory);
                ClosePopupContainerZ2();
            });


            eMixerSectionPopupContainer.classList.add("mixermixerSectionPopupContainerFiltered");


            ShowPopupContainerZ2();
        });

        if (!bSnapshotReadOnly)
        {
            AddEvent("snapshotPopupButtonExport" + nSnapshotID, "click", function (event)
            {
                var szDirectory = "";
                var szFile = '';
                var szExtension = jsMixer.settings.neumann_edition ? '.NeuMi' : '.MuMi';
                if (bPresets)
                {
                    szDirectory = "Presets";
                    szFile = 'preset_' + (nSnapshotID).toString() + szExtension;
                }
                else if (bSubsets)
                {
                    szDirectory = "Subsets_" + szSnapshotsCategory;
                    szFile += "subset_" + szSnapshotsCategory + '_' + (nSnapshotID).toString() + szExtension;
                }

                window.open('/commands/directories_read_file:' + szDirectory + ':' + szFile + ':' + GetExportSnapshot_FileName(jsSnapshots[nSnapshotID].name, szSnapshotsCategory, nSnapshotID), '_blank');
            });
        }
    }

    if (!bSnapshotReadOnly)
        AddEvent("snapshotPopupButtonImport" + nSnapshotID, "click", function (event) { document.getElementById("snapshotPopupInputImport" + nSnapshotID).click(); return false; });

    ShowPopupContainerZ1();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ImportPreset()
{
    var form = document.getElementById("importSnapshotForm");
    if (form == null)
        return;

    save_ToCookie(true);

    form.submit();

    CloseSnapshotPopup();
    UpdateSnapshots(g_bPresets, g_bSubsets, g_szSnapshotsCategory);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSnapshotPopup(nSnapshotID, bUpdateName, bUpdateComment, bUpdateColor, szString)
{
    if (szString == null)
        return;

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eSnapshotPopup = document.getElementById("mixerSectionPopupSnapshotPopup");
    if (eSnapshotPopup == null)
    {
        return;
    }

    if (bUpdateName && !bUpdateComment && !bUpdateColor)
    {
        var eSnapshotPopupName = document.getElementById("snapshotPopupButtonName" + nSnapshotID);
        if (eSnapshotPopupName)
        {
            eSnapshotPopupName.innerText = szString;
        }
    }

    if (bUpdateComment && !bUpdateName && !bUpdateColor)
    {
        var eSnapshotPopupComment = document.getElementById("snapshotPopupButtonComment" + nSnapshotID);
        if (eSnapshotPopupComment)
        {
            eSnapshotPopupComment.innerText = szString;
        }
    }

    if (bUpdateColor && !bUpdateName && !bUpdateComment)
    {
        var eColorButtons = document.getElementsByClassName("mixerSectionPopupSnapshotPopupButtonColor");
        if (eColorButtons)
        {
            for (var iButtonId = 0; iButtonId < eColorButtons.length; iButtonId++)
            {
                var eColorButton = eColorButtons[iButtonId];
                if (eColorButton)
                {
                    var eColorButtonStyle = eColorButton.style;
                    var szColorButtonBackgroundColor = eColorButtonStyle.backgroundColor;

                    var szColorButtonTop = eColorButtonStyle.top;
                    var nTop = Number(szColorButtonTop.replace("px", ""));

                    var szColorButtonLeft = eColorButtonStyle.left;
                    var nLeft = Number(szColorButtonLeft.replace("px", ""));

                    var szColorHEX = ConvertRGBToHEX(szColorButtonBackgroundColor);
                    
                    if (eColorButton.classList.contains("mixerSectionPopupSnapshotPopupButtonColorChecked"))
                    {
                        eColorButton.classList.remove("mixerSectionPopupSnapshotPopupButtonColorChecked");
                        
                        eColorButtonStyle.setProperty("top", nTop + g_nElementsBorderWidth * (bNeumannEdition ? 2 : 1) + "px");
                        eColorButtonStyle.setProperty("left", nLeft + g_nElementsBorderWidth + "px");
                    }
                    else if (szColorHEX == szString)
                    {
                        eColorButton.classList.add("mixerSectionPopupSnapshotPopupButtonColorChecked");
                        
                        eColorButtonStyle.setProperty("top", nTop - g_nElementsBorderWidth * (bNeumannEdition ? 2 : 1) + "px");
                        eColorButtonStyle.setProperty("left", nLeft - g_nElementsBorderWidth + "px");
                    }
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ConvertRGBToHEX(szColorRGB)
{
    var szColorHEX = "";
    if (szColorRGB.indexOf('#') > -1)
    {
        szColorHEX = szColorRGB;
    }
    else
    {
        szColorRGB = szColorRGB.match(/\d+/g);
        szColorHEX = '#' + ('0' + parseInt(szColorRGB[0], 10).toString(16)).slice(-2) + ('0' + parseInt(szColorRGB[1], 10).toString(16)).slice(-2) + ('0' + parseInt(szColorRGB[2], 10).toString(16)).slice(-2);
    }

    return szColorHEX;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSnapshotPopup()
{
    ClosePopupContainerZ1();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RecallSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID)
{
    var eSnapshotPopup = document.getElementById("mixerSectionPopupSnapshotPopup");
    if (eSnapshotPopup == null)
    {
        return;
    }


    if (bPresets)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.load_from_preset", value: nSnapshotID });
    }
    else if (bSubsets)
    {
        var szTruncatedPath;
        if (bOnBus)
            szTruncatedPath = "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]";
        else if (bOnInput)
            szTruncatedPath = "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + nInputID + ")][0]";

        var jsValue = { "category": szSnapshotsCategory, "id": nSnapshotID, "path": szTruncatedPath + "." + (szSnapshotsCategory == "eventide_blackhole" ? "reverb" : szSnapshotsCategory) };

        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.recall_from_subset", value: jsValue });
    }
    

    CloseSnapshotPopup();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StoreSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory, bOnBus, nBusID, bOnInput, nInputID)
{
    var eSnapshotPopup = document.getElementById("mixerSectionPopupSnapshotPopup");
    if (eSnapshotPopup == null)
    {
        return;
    }

    var szName = "";
    var szComment = "";
    var szColor = "";

    var eSnapshotPopupName = document.getElementById("snapshotPopupButtonName" + nSnapshotID);
    if (eSnapshotPopupName)
    {
        szName = eSnapshotPopupName.innerText;
    }

    var eSnapshotPopupComment = document.getElementById("snapshotPopupButtonComment" + nSnapshotID);
    if (eSnapshotPopupComment)
    {
        szComment = eSnapshotPopupComment.innerText;
    }

    var eColorButtons = document.getElementsByClassName("mixerSectionPopupSnapshotPopupButtonColor");
    if (eColorButtons)
    {
        var szColorRGB = "";
        for (var iButtonId = 0; iButtonId < eColorButtons.length; iButtonId++)
        {
            var eColorButton = eColorButtons[iButtonId];
            if (eColorButton)
            {
                if (eColorButton.classList.contains("mixerSectionPopupSnapshotPopupButtonColorChecked"))
                {
                    var eColorButtonStyle = eColorButton.style;
                    szColorRGB = eColorButtonStyle.backgroundColor;
                    break;
                }
            }
        }

        if (szColorRGB != "")
        {
            szColor = ConvertRGBToHEX(szColorRGB);
        }
        else
        {
            szColor = "#000000";
        }
    }


    if (bPresets)
    {
        var jsValue = { "name": szName, "comment": szComment, "color": szColor };
        self.Communicator.publish("/service/ravenna/settings", { path: "$._config_properties", value: jsValue });

        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.save_to_preset", value: nSnapshotID });
    }
    else if (bSubsets)
    {       
        {
            var szTruncatedPath;
            if (bOnBus)
                szTruncatedPath = "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]";
            else if (bOnInput)
                szTruncatedPath = "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + nInputID + ")][0]";

            var jsValue = { "category": szSnapshotsCategory, "id": nSnapshotID, "path": szTruncatedPath + "." + (szSnapshotsCategory == "eventide_blackhole" ? "reverb" : szSnapshotsCategory) };

            self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.store_to_subset", value: jsValue });
        }

        // must be called last
        {
            var jsValue = { "category": szSnapshotsCategory, "id": nSnapshotID, "name": szName, "comment": szComment, "color": szColor };

            self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.update_subset", value: jsValue });
        }
    }


    CloseSnapshotPopup();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInfoSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory)
{
    var eSnapshotPopup = document.getElementById("mixerSectionPopupSnapshotPopup");
    if (eSnapshotPopup == null)
    {
        return;
    }

    var szName = "";
    var szComment = "";
    var szColor = "";

    var eSnapshotPopupName = document.getElementById("snapshotPopupButtonName" + nSnapshotID);
    if (eSnapshotPopupName)
    {
        szName = eSnapshotPopupName.innerText;
    }

    var eSnapshotPopupComment = document.getElementById("snapshotPopupButtonComment" + nSnapshotID);
    if (eSnapshotPopupComment)
    {
        szComment = eSnapshotPopupComment.innerText;
    }

    var eColorButtons = document.getElementsByClassName("mixerSectionPopupSnapshotPopupButtonColor");
    if (eColorButtons)
    {
        var szColorRGB = "";
        for (var iButtonId = 0; iButtonId < eColorButtons.length; iButtonId++)
        {
            var eColorButton = eColorButtons[iButtonId];
            if (eColorButton)
            {
                if (eColorButton.classList.contains("mixerSectionPopupSnapshotPopupButtonColorChecked"))
                {
                    var eColorButtonStyle = eColorButton.style;
                    szColorRGB = eColorButtonStyle.backgroundColor;
                    break;
                }
            }
        }

        if (szColorRGB != "")
        {
            szColor = ConvertRGBToHEX(szColorRGB);
        }
        else
        {
            szColor = "#000000";
        }
    }


    if (bPresets)
    {
        var jsValue = { "name": szName, "comment": szComment, "color": szColor };
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.presets[?(@.id==" + nSnapshotID + ")][0]", value: jsValue });
    }
    else if (bSubsets)
    {
        var jsValue = { "category": szSnapshotsCategory, "id": nSnapshotID, "name": szName, "comment": szComment, "color": szColor };

        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.update_subset", value: jsValue });
    }


    CloseSnapshotPopup();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeleteSnapshot(nSnapshotID, bPresets, bSubsets, szSnapshotsCategory)
{
    var eSnapshotPopup = document.getElementById("mixerSectionPopupSnapshotPopup");
    if (eSnapshotPopup == null)
    {
        return;
    }

    
    if (bPresets)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.delete_preset", value: nSnapshotID });
    }
    else if (bSubsets)
    {
        var jsValue = { "category": szSnapshotsCategory, "id": nSnapshotID };

        self.Communicator.publish("/service/ravenna/settings", { path: "$.actions.delete_subset", value: jsValue });
    }


    CloseSnapshotPopup();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusSelectorMenu()
{
    var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
    }
    bNeumannEdition = jsMixer.settings.neumann_edition;

    var jsSoundIDProfiles;
    if (!bNeumannEdition)
    {
        var jsMusicEngine;
        if (RavennaDeviceCache && RavennaDeviceCache.document())
        {
            jsMusicEngine = RavennaDeviceCache.document();
        }

        jsSoundIDProfiles = jsMusicEngine._oem_ui_process_engine.room_correction.profiles;
    }

	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
	    return;
	}

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eMasters = document.getElementById("masters");
	if (eMasters == null)
	{
		return;
	}

	var eMasterLeft = document.getElementById("master-left");
	if (eMasterLeft == null)
	{
		return;
	}

	var eMixSelector = document.getElementById("bus" + g_nCurrentBusID + "-selector");
	if (eMixSelector == null)
	{
		return;
	}


    var nTop = Number(eMasters.offsetTop) + Number(eMasterLeft.offsetTop) + Number(eMixSelector.offsetTop) - (bNeumannEdition ? 6 : 0);

	var szColumnWidth = (g_nStripWidth * 2) + "px";
	var nLastColumnGap = bNeumannEdition ? 0 : g_nStripWidth / 5;

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; grid-template-columns: " + szColumnWidth + (jsMixer.settings.expert_mode && !bNeumannEdition ? (" " + szColumnWidth) : "") + " " + (nLastColumnGap + (g_nStripWidth * 2)) + "px;'>";

            if (bNeumannEdition)
            {
                szPage += "<div class='mixerSectionPopupMenuColumn'>";
                    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix1'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS].name + "</div>";
                    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 1) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix2'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 1].name + (jsMixer.settings.mix2_follow_mix1 ? " (" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS].name + ")" : "") + "</div>";
                    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 2) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix3'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 2].name + (jsMixer.settings.mix3_follow_mix1 ? " (" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS].name + ")" : "") + "</div>";
                    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 3) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix4'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 3].name + (jsMixer.settings.mix4_follow_mix1 ? " (" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS].name + ")" : "") + "</div>";

                    szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";
                    szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorImport'>IMPORT</div>";
				szPage += "</div>";
            }
            else
            {            
                if (jsMixer.settings.expert_mode)
			    {
				    szPage += "<div class='mixerSectionPopupMenuColumn'>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_MONITOR_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix'>MIXER</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_REVERB_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorReverb'>REVERB</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_DYNAMICS_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorDynamics'>DYNAMICS</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_SEND_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorSend1'>" + jsBusses[MM_ID_FIRST_SEND_BUS].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_SEND_BUS + 1) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorSend2'>" + jsBusses[MM_ID_FIRST_SEND_BUS + 1].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_SEND_BUS + 2) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorSend3'>" + jsBusses[MM_ID_FIRST_SEND_BUS + 2].name + "</div>";

                        if (jsBusses[g_nCurrentBusID].type == BT_CUE)
                            szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";

				    szPage += "</div>";

				    szPage += "<div class='mixerSectionPopupMenuColumn'>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_ALT_MONITOR_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMixAlt'>MIXER-ALT</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue1'>" + jsBusses[MM_ID_FIRST_CUE_BUS].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS + 1) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue2'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 1].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS + 2) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue3'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 2].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS + 3) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue4'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 3].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS + 4) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue5'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 4].name + "</div>";

                        if (jsBusses[g_nCurrentBusID].type == BT_CUE)
                            szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";

				    szPage += "</div>";
			    }
			    else
			    {
				    szPage += "<div class='mixerSectionPopupMenuColumn'>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_MONITOR_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMix'>MIXER</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_ALT_MONITOR_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorMixAlt'>MIXER-ALT</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_CUE_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorCue1'>" + jsBusses[MM_ID_FIRST_CUE_BUS].name + "</div>";
					    szPage += "<div class='mixerSectionPopupMenuItem" + ((g_nCurrentBusID == MM_ID_FIRST_SEND_BUS) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='mixSelectorSend1'>" + jsBusses[MM_ID_FIRST_SEND_BUS].name + "</div>";
                        szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";
                        szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";

                        if (jsBusses[g_nCurrentBusID].type == BT_CUE)
                            szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent;'></div>";

				    szPage += "</div>";
                }
            }

			szPage += "<div class='mixerSectionPopupMenuColumn'>";
			    
			    szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusRouting' style='margin-left: " + nLastColumnGap + "px;'>BUS ROUTING</div>";
			    szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusEq' style='margin-left: " + nLastColumnGap + "px;'>BUS EQ</div>";

			    if (jsBusses[g_nCurrentBusID].type != BT_EFFECT)
			    {
			        szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusDynamics' style='margin-left: " + nLastColumnGap + "px;'>BUS DYNAMICS</div>";

			        if (jsBusses[g_nCurrentBusID].type == BT_INSERT)
			        {
			            szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusName' style='margin-left: " + nLastColumnGap + "px;'>NAME</div>";
			            szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusColor' style='margin-left: " + nLastColumnGap + "px;'>COLOR</div>";
			        }
			        else
                    {                     
                        if (!bNeumannEdition)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem mixerSectionPopupMenuItem2Lines" + (jsBusses[g_nCurrentBusID].soundid_profile != -1 /*&& g_nSampleRate < 352800)*/ ? " mixerSectionPopupMenuItemChecked" : "");

                            if (jsSoundIDProfiles == null)
                                szPage += " mixerSectionPopupMenuItemDisabled";
                            else if (jsSoundIDProfiles.length == 0 /*|| g_nSampleRate >= 352800*/)
                                szPage += " mixerSectionPopupMenuItemDisabled";

                            szPage += "' id='mixSelectorBusSoundID' style='margin-left: " + nLastColumnGap + "px; '>SOUNDID<br/>REFERENCE</div>";
                        }

                        if (jsBusses[g_nCurrentBusID].type == BT_CUE)
                            szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusName' style='margin-left: " + nLastColumnGap + "px;'>NAME</div>";

			            szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusColor' style='margin-left: " + nLastColumnGap + "px;'>COLOR</div>";
                    }
			    }
			    else
			    {
			        szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent; margin-left: " + nLastColumnGap + "px;'></div>";
			        szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent; margin-left: " + nLastColumnGap + "px;'></div>";
			        szPage += "<div class='mixerSectionPopupMenuItem' id='' style='background-color: transparent; margin-left: " + nLastColumnGap + "px;'></div>";
			    }

			    szPage += "<div class='mixerSectionPopupMenuItem' id='mixSelectorBusReset' style='margin-left: " + nLastColumnGap + "px;'>RESET</div>";			    

			szPage += "</div>";

		szPage += "</div>";

	szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;


	var ePopupMenu = document.getElementById("mixerSectionPopupMenu");
	var ePopupMenuStyle = ePopupMenu.style;
	var szPopupWidth = ePopupMenu.offsetWidth;

    ePopupMenuStyle.setProperty("left", Number(eMasters.offsetLeft) + Number(eMasterLeft.offsetLeft) + Number(eMixSelector.offsetLeft) - g_nElementsBorderWidth * 2 - Number(szPopupWidth) + (bNeumannEdition ? 5 : 0) + "px");



    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseBusSelectorMenu(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseBusSelectorMenu(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseBusSelectorMenu(); }, true);
    }

    AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);


	AddEvent("mixSelectorMix", "click", function (event) { SelectBus(MM_ID_MONITOR_BUS); });
	AddEvent("mixSelectorMixAlt", "click", function (event) { SelectBus(MM_ID_ALT_MONITOR_BUS); });
	AddEvent("mixSelectorCue1", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS); });
	AddEvent("mixSelectorSend1", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS); });

	AddEvent("mixSelectorBusEq", "click", function (event) { CloseBusSelectorMenu(); OpenEffectsSection(true, g_nCurrentBusID != MM_ID_REVERB_BUS, g_nCurrentBusID == MM_ID_REVERB_BUS, false, true, g_nCurrentBusID, false, -1, "eq"); });
    AddEvent("mixSelectorBusDynamics", "click", function (event) { CloseBusSelectorMenu(); OpenEffectsSection(true, true, false, false, true, g_nCurrentBusID, false, -1, "dynamics"); });

    if (bNeumannEdition)
    {
        AddEvent("mixSelectorMix1", "click", function (event) { SelectBus(MM_NEUMANN_ID_FIRST_MIX_BUS); });
        AddEvent("mixSelectorMix2", "click", function (event) { SelectBus(MM_NEUMANN_ID_FIRST_MIX_BUS + 1); });
        AddEvent("mixSelectorMix3", "click", function (event) { SelectBus(MM_NEUMANN_ID_FIRST_MIX_BUS + 2); });
        AddEvent("mixSelectorMix4", "click", function (event) { SelectBus(MM_NEUMANN_ID_FIRST_MIX_BUS + 3); });

        AddEvent("mixSelectorImport", "click", function (event) { OpenCopyBus(); });
    }
	else if (jsMixer.settings.expert_mode)
	{
	    AddEvent("mixSelectorCue2", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 1); });
	    AddEvent("mixSelectorCue3", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 2); });
	    AddEvent("mixSelectorCue4", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 3); });
	    AddEvent("mixSelectorCue5", "click", function (event) { SelectBus(MM_ID_FIRST_CUE_BUS + 4); });
	    AddEvent("mixSelectorReverb", "click", function (event) { SelectBus(MM_ID_REVERB_BUS); });
	    AddEvent("mixSelectorDynamics", "click", function (event) { SelectBus(MM_ID_DYNAMICS_BUS); });
	    AddEvent("mixSelectorSend2", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS + 1); });
	    AddEvent("mixSelectorSend3", "click", function (event) { SelectBus(MM_ID_FIRST_SEND_BUS + 2); });
	}

	AddEvent("mixSelectorBusRouting", "click", function (event) { OpenBusRouting(); });
	AddEvent("mixSelectorBusName", "click", function (event) { SetBusName(g_nCurrentBusID); CloseBusSelectorMenu(); });
    AddEvent("mixSelectorBusColor", "click", function (event) { OpenBusColorSelector(g_nCurrentBusID); });

    if (!bNeumannEdition)
        AddEvent("mixSelectorBusSoundID", "click", function (event) { OpenSoundIDProfiles(); });

    AddEvent("mixSelectorBusReset", "click", function (event)
	{
	    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	    if (eMixerSectionPopupContainer == null)
	    {
	        return;
	    }

	    var eStrips = document.getElementById("strips");
	    if (eStrips == null)
	    {
	        return;
	    }

	    var r = document.querySelector(':root');

	    var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
	    var nPanHeight = Number(szPanHeight.replace("px", ""));

	    eMixerSectionPopupContainer.innerHTML = MakeValidationChoicePopup("Reset " + jsBusses[g_nCurrentBusID].name + " bus ?");

	    var ePopupValidationChoice = document.getElementById("mixerSectionPopupValidationChoice");
	    var ePopupValidationChoiceStyle = ePopupValidationChoice.style;
	    var szPopupWidth = ePopupValidationChoice.offsetWidth;

	    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

	    var nLeft = g_nMixerMargin + (nStripsWidth - szPopupWidth) / 2;
	    if (nLeft + szPopupWidth > (nStripsWidth + g_nMixerMargin * 2))
	    {
	        nLeft = g_nMixerMargin;
	    }
        
	    var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

	    ePopupValidationChoiceStyle.setProperty("left", nLeft + "px");
	    ePopupValidationChoiceStyle.setProperty("top", nTop + "px");

	    AddEvent("mixerSectionPopupValidationChoiceButtonNo", "click", function (event) { ClosePopupContainer(); });
	    AddEvent("mixerSectionPopupValidationChoiceButtonYes", "click", function (event) { ResetBus(g_nCurrentBusID); ClosePopupContainer(); });
	});

	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseBusSelectorMenu()
{
	ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetBusName(nBusID)
{
    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    var szName = prompt("NAME", jsBus.name);

    if (szName != null)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]", value: { name: szName } });

        // update strip cue return name
        if (jsBus.type == BT_CUE)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + (nBusID * 2) + ")][0]", value: { name: szName + "-L" } });
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + (nBusID * 2 + 1) + ")][0]", value: { name: szName + "-R" } });
        }
    }        
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenCopyBus()
{
    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
   
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }


    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? g_nStripWidth * 5.5 : g_nStripWidth * 4.5;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < (jsSettings.expert_mode && !jsSettings.neumann_edition ? g_nStripWidth * 5.5 : g_nStripWidth * 4.5) - g_nMixerMargin * 2)
    {
        nWidth = (jsSettings.expert_mode && !jsSettings.neumann_edition ? g_nStripWidth * 5.5 : g_nStripWidth * 4.5) - g_nMixerMargin * 2;
    }

    var r = document.querySelector(':root');

    var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
    var nPanHeight = Number(szPanHeight.replace("px", ""));
    
    var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

    var nHeight = jsSettings.expert_mode && !jsSettings.neumann_edition ? nWidth * 5 / 4 : nWidth;
    if (nHeight > nStripsHeight)
    {
        nHeight = nStripsHeight;
        nTop = Number(eStrips.offsetTop);
    }

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }


    var nMargin = g_nElementsBorderWidth * 4;
    var nButtonWidth = jsSettings.expert_mode && !jsSettings.neumann_edition ? (nWidth - g_nElementsBorderWidth * 4 - nMargin * 3) / 2 : nWidth - g_nElementsBorderWidth * 2 - nMargin * 2;
    var nButtonHeight = jsSettings.expert_mode && !jsSettings.neumann_edition ? (nHeight - g_nElementsBorderWidth * 12 - nMargin * 7) / 7 : (nHeight - g_nElementsBorderWidth * 8 - nMargin * 5) / 5;


    var szTitleStyle = "style='top: " + (nMargin / 2) + "px; width: " + nWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;'";
    var szButtonStyle = "style='width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;";


    var szPage = "";

    szPage += "<div class='mixerSectionPopup' id='mixerSectionPopup'>";

        szPage += "<div class='mixerSectionPopupCopyBus' id='mixerSectionPopupCopyBus' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div id='' class='mixerSectionPopupCopyBusTitle' " + szTitleStyle + ">Import Mixer from</div>";
            
            if (jsSettings.neumann_edition)
            {
                szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_NEUMANN_ID_FIRST_MIX_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight + nMargin) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS].name + "</div>";
                szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_NEUMANN_ID_FIRST_MIX_BUS + 1) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 2 + nMargin * 2 + g_nElementsBorderWidth * 2) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 1].name + "</div>";
                szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_NEUMANN_ID_FIRST_MIX_BUS + 2) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 3 + nMargin * 3 + g_nElementsBorderWidth * 4) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 2].name + "</div>";
                szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_NEUMANN_ID_FIRST_MIX_BUS + 3) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 4 + nMargin * 4 + g_nElementsBorderWidth * 6) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_NEUMANN_ID_FIRST_MIX_BUS + 3].name + "</div>";
            }
            else
            {
                if (jsSettings.expert_mode)
                {
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_MONITOR_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight + nMargin) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_MONITOR_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_REVERB_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 2 + nMargin * 2 + g_nElementsBorderWidth * 2) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_REVERB_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_DYNAMICS_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 3 + nMargin * 3 + g_nElementsBorderWidth * 4) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_DYNAMICS_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_FIRST_SEND_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 4 + nMargin * 4 + g_nElementsBorderWidth * 6) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_FIRST_SEND_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_SEND_BUS + 1) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 5 + nMargin * 5 + g_nElementsBorderWidth * 8) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_FIRST_SEND_BUS + 1].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_SEND_BUS + 2) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 6 + nMargin * 6 + g_nElementsBorderWidth * 10) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_FIRST_SEND_BUS + 2].name + "</div>";

                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_ALT_MONITOR_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight + nMargin) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_ALT_MONITOR_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_FIRST_CUE_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 2 + nMargin * 2 + g_nElementsBorderWidth * 2) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_CUE_BUS + 1) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 3 + nMargin * 3 + g_nElementsBorderWidth * 4) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 1].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_CUE_BUS + 2) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 4 + nMargin * 4 + g_nElementsBorderWidth * 6) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 2].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_CUE_BUS + 3) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 5 + nMargin * 5 + g_nElementsBorderWidth * 8) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 3].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + (MM_ID_FIRST_CUE_BUS + 4) + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 6 + nMargin * 6 + g_nElementsBorderWidth * 10) + "px; left: " + (nMargin * 2 + nButtonWidth + g_nElementsBorderWidth * 2) + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS + 4].name + "</div>";
                }
                else
                {
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_MONITOR_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight + nMargin) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_MONITOR_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_FIRST_CUE_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 2 + nMargin * 2 + g_nElementsBorderWidth * 2) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_FIRST_CUE_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_ALT_MONITOR_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 3 + nMargin * 3 + g_nElementsBorderWidth * 4) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_ALT_MONITOR_BUS].name + "</div>";
                    szPage += "<div id='mixerSectionPopupCopyBusButton" + MM_ID_FIRST_SEND_BUS + "' class='mixerSectionPopupCopyBusButton'" + szButtonStyle + " top: " + (nButtonHeight * 4 + nMargin * 4 + g_nElementsBorderWidth * 6) + "px; left: " + nMargin + "px;'>" + jsBusses[MM_ID_FIRST_SEND_BUS].name + "</div>";
                }
            }
            

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    var eButtons = document.getElementsByClassName("mixerSectionPopupCopyBusButton");
    if (eButtons)
    {
        for (var iIdx = 0; iIdx < eButtons.length; iIdx++)
        {
            var nBusID = Number(eButtons[iIdx].id.replace("mixerSectionPopupCopyBusButton", ""));

            var bDisable = nBusID == g_nCurrentBusID;
            if (jsBusses[g_nCurrentBusID].type == BT_MONITOR)
            {
                bDisable ||= jsBusses[nBusID].type == BT_MONITOR;

                if (jsBusses[nBusID].type == BT_CUE)
                {
                    bDisable ||= jsBusses[nBusID].cue_mode == CM_MIXALT;
                }
            }
            else if (jsBusses[g_nCurrentBusID].type == BT_CUE)
            {            
                bDisable ||= jsBusses[g_nCurrentBusID].cue_mode == CM_MIXALT && jsBusses[nBusID].type == BT_MONITOR;

                if (jsBusses[nBusID].type == BT_CUE)
                    bDisable ||= (jsBusses[nBusID].cue_mode == CM_MIXALT) && (jsBusses[g_nCurrentBusID].cue_mode == CM_MIXALT);
            }

            if (bDisable)
                eButtons[iIdx].classList.add("mixerSectionPopupCopyBusButtonDisabled");
        }
    }


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseCopyBus(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseCopyBus(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseCopyBus(); }, true);
    }

    AddEvent("mixerSectionPopupCopyBus", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupCopyBus", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupCopyBus", "mousedown", function (event) { event.stopPropagation(); }, true);
    

    for (var iIdx = 0; iIdx < eButtons.length; iIdx++)
    {
        if (!eButtons[iIdx].classList.contains("mixerSectionPopupCopyBusButtonDisabled"))
        {
            AddEvent(eButtons[iIdx].id, "click", (function _CopyBusFrom(_iBusId) { return function () { CopyBusFrom(_iBusId); } })(Number(eButtons[iIdx].id.replace("mixerSectionPopupCopyBusButton", ""))));

            AddEvent(eButtons[iIdx].id, "touchstart", (function (_element) { return function () { _element.classList.add("mixerSectionPopupCopyBusButtonPressed"); } })(eButtons[iIdx]));
            AddEvent(eButtons[iIdx].id, "mousedown", (function (_element) { return function () { _element.classList.add("mixerSectionPopupCopyBusButtonPressed"); } })(eButtons[iIdx]));

            AddEvent("mixerSectionPopup", "touchend", (function (_element) { return function () { _element.classList.remove("mixerSectionPopupCopyBusButtonPressed"); } })(eButtons[iIdx]));
            AddEvent("mixerSectionPopup", "mouseup", (function (_element) { return function () { _element.classList.remove("mixerSectionPopupCopyBusButtonPressed"); } })(eButtons[iIdx]));
        }
    }


    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseCopyBus()
{
    ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CopyBusFrom(nBusID)
{
    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + g_nCurrentBusID + ")][0]", value: { _copy_from_bus: nBusID } });

    CloseCopyBus();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusColorSelector(nBusID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }

    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }
   
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }


    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = 500;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < 375 - g_nMixerMargin * 2)
    {
        nWidth = 375 - g_nMixerMargin * 2;
    }

    var r = document.querySelector(':root');

    var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
    var nPanHeight = Number(szPanHeight.replace("px", ""));

    var szButtonHeight = r.style.getPropertyValue("--strip-button-height");
    var nButtonHeight = Number(szButtonHeight.replace("px", ""));

    var nHeight = nWidth / 2;
    if (nHeight > nStripsHeight - nButtonHeight)
    {
        nHeight = nStripsHeight - nButtonHeight;
    }

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }
        

    var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

    var nButtonMarge = (g_nElementsBorderWidth * 4);
    var nButtonGap = (g_nElementsBorderWidth * 8);
    var nButtonWidth = (nWidth - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;
    var nButtonHeight = (nHeight - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;
    var nMarginTop = ((nButtonHeight / 3) - (g_nElementsBorderWidth * 2));

    var szPage = "";

    szPage += "<div class='mixerSectionPopup' id='mixerSectionPopup'>";

        szPage += "<div class='mixerSectionPopupGroupAndColorSelector' id='mixerSectionPopupBusColorSelector' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorHeader' id='mixerSectionPopupColorSelectorHeader' style='top: " + nButtonMarge + "px; left: " + nButtonMarge + "px; width: " + (4 * nButtonWidth + 3 * nButtonGap) + "px; height: " + nButtonHeight + "px;'>";
                szPage += "<div class='' id='' style='margin-top: " + nMarginTop + "px;'>" + jsBus.name + " : COLOR</div>";
            szPage += "</div>";

            for (idx = 0; idx < jsGroups.length; idx++)
            {
                var nPosX = idx < 4 ? idx : idx - 4;
                var nPosY = idx < 4 ? 1 : 2;

                var szStyle = "style='top: " + (nButtonMarge + nPosY * nButtonGap + nPosY * nButtonHeight) + "px; left: " + (nButtonMarge + nPosX * nButtonGap + nPosX * nButtonWidth) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; background-color: " + jsGroups[idx].color + ";";
                szStyle += jsSettings.neumann_edition ? "border-color: " + jsGroups[idx].color + ";'" : "'";

                szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton' id='mixerSectionPopupColorSelectorButton" + (idx + 1) + "' " + szStyle + "></div>";
            }

            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton mixerSectionPopupGroupAndColorSelectorButtonNone' id='mixerSectionPopupColorSelectorButtonNone' style='top: " + (nButtonMarge + 3 * nButtonGap + 3 * nButtonHeight) + "px; left: " + (nButtonMarge + 1 * nButtonGap + 1 * nButtonWidth) + "px; width: " + (2 * nButtonWidth + 1 * nButtonGap) + "px; height: " + nButtonHeight + "px;'>";
                szPage += "<div class='' id='' style='margin-top: " + nMarginTop + "px;'>NO COLOR</div>";
            szPage += "</div>";

        szPage += "</div>";

    szPage += "</div>";



    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateBusColorSelector(nBusID);


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseBusColorSelector(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseBusColorSelector(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseBusColorSelector(); }, true);
    }

    AddEvent("mixerSectionPopupBusColorSelector", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusColorSelector", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupBusColorSelector", "mousedown", function (event) { event.stopPropagation(); }, true);


    AddEvent("mixerSectionPopupColorSelectorButton1", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[0].color) ? "#000000" : jsGroups[0].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton2", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[1].color) ? "#000000" : jsGroups[1].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton3", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[2].color) ? "#000000" : jsGroups[2].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton4", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[3].color) ? "#000000" : jsGroups[3].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton5", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[4].color) ? "#000000" : jsGroups[4].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton6", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[5].color) ? "#000000" : jsGroups[5].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton7", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[6].color) ? "#000000" : jsGroups[6].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButton8", "click", function (event) { SetBusColor(((jsBus.color == jsGroups[7].color) ? "#000000" : jsGroups[7].color), nBusID); });
    AddEvent("mixerSectionPopupColorSelectorButtonNone", "click", function (event) { SetBusColor("#000000", nBusID); });


    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusColorSelector(nBusID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }

    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    var szColor = jsBus.color;

    var eButtonNone = document.getElementById("mixerSectionPopupColorSelectorButtonNone");
    if (eButtonNone)
    {
        eButtonNone.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");

        if (szColor == "#000000")
            eButtonNone.classList.add("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");
    }

    for (var i = 0; i < jsGroups.length; i++)
    {
        var eButton = document.getElementById("mixerSectionPopupColorSelectorButton" + [i + 1]);
        if (eButton)
        {
            var nTop = Number(eButton.style.top.replace("px", ""));
            var nLeft = Number(eButton.style.left.replace("px", ""));
            var szButtonColorHEX = ConvertRGBToHEX(eButton.style.backgroundColor);
                    
            if (eButton.classList.contains("mixerSectionPopupGroupAndColorSelectorButtonChecked"))
            {
                if (szButtonColorHEX == szColor)
                    continue;

                eButton.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop + g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft + g_nElementsBorderWidth * 1.5) + "px";
                }
            }
            else if (szButtonColorHEX == szColor)
            {
                eButton.classList.add("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop - g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft - g_nElementsBorderWidth * 1.5) + "px";
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseBusColorSelector()
{
    ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetBusColor(szColor, nBusID)
{
    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

    if (szColor != jsBus.color)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]", value: { color: szColor } });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenBusUnlinkPopup()
{
    var jsBusses = GetBusJSON(-1);
    if (jsBusses == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
	    return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
	    return;
    }

    var eMasters = document.getElementById("masters");
	if (eMasters == null)
	{
		return;
	}

	var r = document.querySelector(':root');

	var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
	var nPanHeight = Number(szPanHeight.replace("px", ""));

    var szMessage = jsBusses[g_nCurrentBusID].name + " pans are currently linked to the " + jsBusses[MM_ID_MONITOR_BUS].name + " pans. Would you like unlinking them? (Link options in Settings > Mixing)";

    eMixerSectionPopupContainer.innerHTML = MakeValidationChoicePopup(szMessage);

	var ePopupValidationChoice = document.getElementById("mixerSectionPopupValidationChoice");
	var ePopupValidationChoiceStyle = ePopupValidationChoice.style;
    var szPopupWidth = ePopupValidationChoice.offsetWidth;

	var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

	var nLeft = g_nMixerMargin + (nStripsWidth - szPopupWidth) / 2;
	if (nLeft + szPopupWidth > (nStripsWidth + g_nMixerMargin * 2))
	{
	    nLeft = g_nMixerMargin;
	}
        
	var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

	ePopupValidationChoiceStyle.setProperty("left", nLeft + "px");
	ePopupValidationChoiceStyle.setProperty("top", nTop + "px");

	AddEvent("mixerSectionPopupValidationChoiceButtonNo", "click", function (event) { ClosePopupContainer(); });
    AddEvent("mixerSectionPopupValidationChoiceButtonYes", "click", function (event) { UnlinkBusPan(); ClosePopupContainer(); });

    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UnlinkBusPan()
{
    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + g_nCurrentBusID + ")][0]", value: { pan_linked: false } });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSoundIDProfiles()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer == null || jsMixer.settings.neumann_edition)
    {
        return;
    }

    var jsMusicEngine;
    if (RavennaDeviceCache && RavennaDeviceCache.document())
    {
        jsMusicEngine = RavennaDeviceCache.document();
    }

    var jsSoundIDProfiles = jsMusicEngine._oem_ui_process_engine.room_correction.profiles;
    if (jsSoundIDProfiles == null)
    {
        return;
    }    

    var jsBus = GetBusJSON(g_nCurrentBusID);
    if (jsBus == null)
    {
        return;
    }

    var nNbProfiles = jsSoundIDProfiles.length;

    if (nNbProfiles == 0 /*|| g_nSampleRate >= 352800*/) // do not open the popup if any profiles are not available or sample rate is in DXD mode
        return;

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = 500;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < 375 - g_nMixerMargin * 2)
    {
        nWidth = 375 - g_nMixerMargin * 2;
    }

    var r = document.querySelector(':root');

    var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
    var nPanHeight = Number(szPanHeight.replace("px", "") - 10);

    var szButtonHeight = r.style.getPropertyValue("--strip-button-height");
    var nButtonHeight = Number(szButtonHeight.replace("px", "") * 1.1);

    var nHeight = (nButtonHeight + 1) * (nNbProfiles + 2);
    while (nHeight > nStripsHeight - nPanHeight)
    {
        nHeight -= (nButtonHeight + 1);
    }

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }        

    var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

    var nMargin = (g_nElementsBorderWidth * 4);
    var nScrollContainerHeight = nHeight - nButtonHeight * 2;

    var szButtonStyle = "style='left: " + (g_nElementsBorderWidth + nMargin) + "px; width: " + (nWidth - nMargin * 2 - g_nElementsBorderWidth * 2) + "px; height: " + (nButtonHeight - nMargin) + "px; line-height: " + (nButtonHeight - nMargin) + "px;";

    var nScrollPosY = 0;
    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupSoundIDProfiles' class='ScrollChoicePopup' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='ScrollChoicePopupTitle' id='' " + szButtonStyle + "top: " + (g_nElementsBorderWidth) + "px;'>SoundID Reference Profiles</div>";

            szPage += "<div id='SoundIDProfilesSection' class='ScrollChoicePopupSection' style='left: -1px; top: " + (nButtonHeight - g_nElementsBorderWidth * 3) + "px; width: " + (nWidth - g_nElementsBorderWidth * 2) + "px; height: " + nScrollContainerHeight + "px;'>";

                szPage += "<div id='SoundIDProfiles-scroll' class='ScrollChoicePopup-scroll'>";

                    for (var idx = 0; idx < nNbProfiles; ++idx)
                    {
                        szPage += "<div class='ScrollChoicePopupButton' id='SoundIDProfilesButton" + jsSoundIDProfiles[idx].id + "' " + szButtonStyle + "'>&nbsp;&nbsp;&nbsp;" + jsSoundIDProfiles[idx].name;

                        if (jsSoundIDProfiles[idx].target_mode != "")
                        {
                            var szTargetModeStyle = "style ='left: " + (nWidth - nMargin * 2 - g_nElementsBorderWidth * 4 - 10 - 38) + "px; top: " + ((idx * (nButtonHeight + 2)) + (nButtonHeight - g_nElementsBorderWidth * 2) / 2 - 12) + "px; width: 38px; height: 22px; line-height: 22px;'";

                            var szTargetModeText = "";
                            var szTargetModeClass = "";
                            if (jsSoundIDProfiles[idx].target_mode == "Flat")
                            {
                                szTargetModeText = "FLT";
                                szTargetModeClass = "SoundIDProfilesButtonTargetFLT";
                            }
                            else if (jsSoundIDProfiles[idx].target_mode == "Custom")
                            {
                                szTargetModeText = "CUS";
                                szTargetModeClass = "SoundIDProfilesButtonTargetCUS";
                            }
                            else if (jsSoundIDProfiles[idx].target_mode == "TranslationCheck")
                            {
                                szTargetModeText = "CHK";
                                szTargetModeClass = "SoundIDProfilesButtonTargetCHK";
                            }

                            szPage += "<div class='SoundIDProfilesButtonTarget " + szTargetModeClass + "' ";
                            szPage += "id='' " + szTargetModeStyle + "'>" + szTargetModeText + "</div >";
                        }

                        szPage += "</div>";

                        if (jsSoundIDProfiles[idx].id == jsBus.soundid_profile)
                            nScrollPosY = idx;
                    }                    

                szPage += "</div>";

            szPage += "</div>";

            szPage += "<div class='ScrollChoicePopupButtonNone' id='SoundIDProfilesButtonNone' " + szButtonStyle + "top: " + (nHeight - nButtonHeight) + "px;'>NONE</div>";

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateSoundIDProfiles();

    var isButtonsScroller = new iScroll("SoundIDProfilesSection", { hScroll: false, vScroll: true, bounce: false });

    var nNbProfileButtons = Math.round((nHeight - (2 * (nButtonHeight + 1))) / (nButtonHeight + 1));
    if (nScrollPosY >= nNbProfileButtons)
    {
        nScrollPosY = (nScrollPosY - Math.floor(nNbProfileButtons / 2)) * (nButtonHeight + 1);
        isButtonsScroller.scrollTo(0, -nScrollPosY, 0);
    }

    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function () { CloseSoundIDProfiles(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function () { CloseSoundIDProfiles(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function () { CloseSoundIDProfiles(); }, true);
    }

    AddEvent("mixerSectionPopupSoundIDProfiles", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSoundIDProfiles", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSoundIDProfiles", "mousedown", function (event) { event.stopPropagation(); }, true);


    var eButtons = document.getElementsByClassName("ScrollChoicePopupButton");
    if (eButtons)
    {
        for (var iIdx = 0; iIdx < eButtons.length; iIdx++)
        {
            AddEvent(eButtons[iIdx].id, "click", (function _SetSoundIDProfile(_iID) { return function () { SetSoundIDProfile(_iID); } })(Number(eButtons[iIdx].id.replace("SoundIDProfilesButton", ""))));
        }
    }

    AddEvent("SoundIDProfilesButtonNone", "click", function () { SetSoundIDProfile(-1); }, true);

    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSoundIDProfiles()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null || jsSettings.neumann_edition)
    {
        return;
    }

    var eSoundIDPRofiles = document.getElementById("mixerSectionPopupSoundIDProfiles");
    if (eSoundIDPRofiles == null)
    {
        return;
    }

    var jsBus = GetBusJSON(g_nCurrentBusID);
    if (jsBus == null)
    {
        return;
    }

    var eButtons = document.getElementsByClassName("ScrollChoicePopupButton");
    if (eButtons)
    {
        for (var idx = 0; idx < eButtons.length; ++idx)
        {
            eButtons[idx].id.includes(jsBus.soundid_profile) ? eButtons[idx].classList.add("ScrollChoicePopupButtonChecked") : eButtons[idx].classList.remove("ScrollChoicePopupButtonChecked");
        }
    }

    var eButtonNone = document.getElementById("SoundIDProfilesButtonNone")
    if (eButtonNone)
    {
        jsBus.soundid_profile == -1 ? eButtonNone.classList.add("ScrollChoicePopupButtonChecked") : eButtonNone.classList.remove("ScrollChoicePopupButtonChecked");
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSoundIDProfiles()
{
    ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetSoundIDProfile(nID)
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null || jsMixer.settings.neumann_edition)
    {
        return;
    }

    var jsBus = GetBusJSON(g_nCurrentBusID);
    if (jsBus == null)
    {
        return;
    }    

    var nMaxEQs = jsMixer.dsp_ressources.max_eqs;
    var nAllocatedEQs = jsMixer.dsp_ressources.allocated_eqs;

    if (jsBus.soundid_profile == -1 && (nMaxEQs - nAllocatedEQs < 10))
    {
        var eSoundIDPRofiles = document.getElementById("mixerSectionPopupSoundIDProfiles");
        if (eSoundIDPRofiles)
        {
            CloseSoundIDProfiles();
        }

        var nNbEQToDisable = 10 - (nMaxEQs - nAllocatedEQs);
        var szText = "<br/>Not enough EQ resources available for running a new instance of SoundID.";
        szText += "<br/>Please disable " + nNbEQToDisable + " Strip EQs or " + Math.round(nNbEQToDisable / 2.) + " Bus EQs.<br/>";

        OpenInfosPopup(szText, 600, 100);
    }
    else if (jsBus.soundid_profile != -1 || (jsBus.soundid_profile == -1 && nID != -1))
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + g_nCurrentBusID + ")][0]", value: { soundid_profile: (jsBus.soundid_profile == nID ? -1 : nID) } });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenInfosPopup(szText, nWidth, nHeight)
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var r = document.querySelector(':root');
    var szPanHeight = r.style.getPropertyValue("--strip-pan-height");
    var nPanHeight = Number(szPanHeight.replace("px", ""));

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }        

    var nTop = Number(eStrips.offsetTop) + g_nMixerMargin + nPanHeight;

    var nLineReturn = (szText.match(/<br/g) || []).length;

    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupInfos' class='InfosPopup' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px; line-height: " + (nHeight / (nLineReturn + 1)) + "px;'>" + szText + "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseInfosPopup(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseInfosPopup(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseInfosPopup(); }, true);
    }

    AddEvent("mixerSectionPopupInfos", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupInfos", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupInfos", "mousedown", function (event) { event.stopPropagation(); }, true);


    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseInfosPopup()
{
    ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResetBus(nBusID)
{
    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + nBusID + ")][0]", value: { reset: true } });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenMasterGainMenu()
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
    }
    var bNeumannEdition = jsMixer.settings.neumann_edition;

	var jsBus = GetBusJSON(g_nCurrentBusID);
	if (jsBus == null)
	{
		return;
	}

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eMasters = document.getElementById("masters");
	if (eMasters == null)
	{
		return;
	}

	var eMasterGain = document.getElementById("bus" + g_nCurrentBusID + "-mastergain");
	if (eMasterGain == null)
	{
		return;
	}


	var nWidth = eMasterGain.offsetWidth - g_nStripWidth / 4;

    var nLeft = Number(eMasters.offsetLeft) + Number(eMasterGain.offsetLeft) + (bNeumannEdition ? 5 : 0);
    var nTop = Number(eMasters.offsetTop) + Number(eMasterGain.offsetTop) + Number(eMasterGain.offsetHeight) + g_nElementsBorderWidth * 2 - (bNeumannEdition ? 5 : 0);

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px;'>";

			szPage += "<div class='mixerSectionPopupMenuItem' id='masterGainRef'>REF</div>";
			szPage += "<div class='mixerSectionPopupMenuItem' id='masterGain0'>-oo</div>";
			szPage += "<div class='mixerSectionPopupMenuItem " + (jsBus.mute ? "mixerSectionPopupMenuItemCheckedRed" : "") + "' id='masterGainMute'>MUTE</div>";

		szPage += "</div>";

	szPage += "</div>";

	eMixerSectionPopupContainer.innerHTML = szPage;


	AddEvent("mixerSectionPopup", "click", function(event) { CloseMasterGainMenu(); } );

	AddEvent("masterGainRef", "click", function(event)
	{
		Ref(g_nCurrentBusID);
	} );

	AddEvent("masterGain0", "click", function(event)
	{
		MinusInfinite(g_nCurrentBusID);
	} );

	AddEvent("masterGainMute", "click", function(event)
	{
		ToggleMute(g_nCurrentBusID);
	} );

	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseMasterGainMenu()
{
	ClosePopupContainer();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenStripGainMenu(nStripID, nBusID, nGroupID, nTop)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
		return;
	}

	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eStrip = document.getElementById((nGroupID != null) ? ("group" + nGroupID) : ("strip" + nStripID));
	if (eStrip == null)
	{
		return;
	}


	var nWidth = g_nStripWidth;

	var nLeft = Number(eStrips.offsetLeft) + Number(eStrip.offsetLeft) + g_isStripsScroller.x;

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px;'>";

			szPage += "<div class='mixerSectionPopupMenuItem' id='stripGainRef'>0 dB</div>";
			szPage += "<div class='mixerSectionPopupMenuItem' id='stripGain0'>-oo</div>";
			szPage += "<div class='mixerSectionPopupMenuItem' id='stripGainSet'>SET</div>";
			switch (jsStrip.type)
			{
				case 1:
				case 4:
				case 7:
					if (nGroupID)
					{
						szPage += "<div class='mixerSectionPopupMenuItem " + (jsSend.group_mute ? "mixerSectionPopupMenuItemCheckedRed" : "") + "' id='stripGainMute'>MUTE</div>";
					}
					else
					{
						szPage += "<div class='mixerSectionPopupMenuItem " + (jsSend.mute ? "mixerSectionPopupMenuItemCheckedRed" : "") + "' id='stripGainMute'>MUTE</div>";
					}
					break;
			}

		szPage += "</div>";

	szPage += "</div>";

	eMixerSectionPopupContainer.innerHTML = szPage;


	AddEvent("mixerSectionPopup", "click", function(event) { CloseStripGainMenu(); } );

	if (nGroupID != null)
	{
		AddEvent("stripGainRef", "click", function(event)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_gain: 0 } });
		} );

		AddEvent("stripGain0", "click", function(event)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_gain: -1445 } });
		} );

		AddEvent("stripGainSet", "click", function(event)
		{
			PromptFaderGain(nStripID, nBusID, nGroupID);
		} );

		AddEvent("stripGainMute", "click", function(event)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_mute: !jsSend.group_mute } });
		} );
	}
	else
	{
		AddEvent("stripGainRef", "click", function(event)
		{
			var jsInput = GetInputJSON(nStripID);
			if (jsInput == null)
			{
				return;
			}
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { link_gain: 0 } });
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { gain: 0 } });
			}
		} );

		AddEvent("stripGain0", "click", function(event)
		{
			var jsInput = GetInputJSON(nStripID);
			if (jsInput == null)
			{
				return;
			}
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { link_gain: -1445 } });
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { gain: -1445 } });
			}
		} );

		AddEvent("stripGainSet", "click", function(event)
		{
			PromptFaderGain(nStripID, nBusID);
		} );

		AddEvent("stripGainMute", "click", function(event)
		{
			var jsInput = GetInputJSON(nStripID);
			if (jsInput == null)
			{
				return;
			}
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { link_mute: !jsSend.link_mute } });
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { mute: !jsSend.mute } });
			}
		} );
	}



	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseStripGainMenu()
{
	ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPanControl(nStripID, nSendID)
{
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}
	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		return;
	}


	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eMasters = document.getElementById("masters");
	if (eMasters == null)
	{
		return;
	}

	var eStrip = document.getElementById("strip" + nStripID);
	if (eStrip == null)
	{
		return;
    }

    var eStripPan = document.getElementById("strip" + nStripID + "-send" + nSendID + "-pan");
	if (eStripPan == null)
	{
		return;
	}

    if (eStripPan.classList.contains("strip-pan-disabled"))
    {
        return;
    }

	var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

	var nWidth = 500;
	if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
	{
		nWidth = (nStripsWidth - g_nMixerMargin * 2);
	}
	if (nWidth < 375 - g_nMixerMargin * 2)
	{
		nWidth = 375 - g_nMixerMargin * 2;
	}
	var nHeight = g_nStripWidth * 2.2;

    var nLeft = Number(eStrips.offsetLeft) + Number(eStrip.offsetLeft) + g_isStripsScroller.x + Number(eStrip.offsetWidth) * .3 - nWidth * .5;
    if (nLeft < 0)
	{
        nLeft = Number(eStrips.offsetLeft);
    }
     if (nLeft + nWidth > nStripsWidth)
     {
         nLeft = Number(eStrips.offsetLeft) + Number(eStrips.offsetWidth) - nWidth - Number(eStrip.offsetWidth) * .24;
	}
	
	var nTop = Number(eStrips.offsetTop) + g_nStripPanHeight + g_nElementsBorderWidth * 4;

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupPanControl' class='mixerSectionPopupPanControl' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

			szPage += "<div class='mixerSectionPopupPanControlTextLeft' id='mixerSectionPopupPanControlTextLeft'>50L</div>";

			szPage += "<div id='mixerSectionPopupPanControlControls' class='mixerSectionPopupPanControlControls'>";

				szPage += "<div class='mixerSectionPopupPanControlHeader' id='mixerSectionPopupPanControlHeader'>HEADER</div>";

				szPage += "<div class='mixerSectionPopupPanControlSlider' id='mixerSectionPopupPanControlSlider'>";

					szPage += "<div class='mixerSectionPopupPanControlSliderKnobTrace' id='mixerSectionPopupPanControlSliderKnobTrace'>";
					szPage += "</div>";

					szPage += "<div class='mixerSectionPopupPanControlSliderKnob' id='mixerSectionPopupPanControlSliderKnob'>";
					szPage += "</div>";

				szPage += "</div>";

				szPage += "<div class='mixerSectionPopupPanControlButtonLeft' id='mixerSectionPopupPanControlButtonLeft'>LEFT</div>";
				szPage += "<div class='mixerSectionPopupPanControlButtonGap1' id='mixerSectionPopupPanControlButtonGap1'></div>";
				szPage += "<div class='mixerSectionPopupPanControlButtonCenter' id='mixerSectionPopupPanControlButtonCenter'>CENTER</div>";
				szPage += "<div class='mixerSectionPopupPanControlButtonGap2' id='mixerSectionPopupPanControlButtonGap2'></div>";
				szPage += "<div class='mixerSectionPopupPanControlButtonRight' id='mixerSectionPopupPanControlButtonRight'>RIGHT</div>";

			szPage += "</div>";
	
			szPage += "<div class='mixerSectionPopupPanControlTextRight' id='mixerSectionPopupPanControlTextRight'>50R</div>";

		szPage += "</div>";

	szPage += "</div>";

	eMixerSectionPopupContainer.innerHTML = szPage;
	

	var eStripPanKnob = document.getElementById("strip" + nStripID + "-send" + nSendID + "-pan-knob");
	if (eStripPanKnob == null)
	{
		return;
	}

	eStripPan.classList.add("strip-pan-highlighted");
	eStripPanKnob.classList.add("strip-pan-knob-highlighted");
	if (eStripPanKnob.classList.contains("strip-pan-knob-parked"))
	{
		eStripPanKnob.classList.add("strip-pan-knob-highlighted-parked");
	}

	UpdatePanControl(nStripID, nSendID);


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function(event) { ClosePanControl(nStripID, nSendID); }, true);
	}
	else
	{
		AddEvent("mixerSectionPopup", "touchstart", function(event) { ClosePanControl(nStripID, nSendID); }, true);
		AddEvent("mixerSectionPopup", "mousedown", function(event) { ClosePanControl(nStripID, nSendID); }, true);
	}

	AddEvent("mixerSectionPopupPanControl", "touchstart", function(event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPanControl", "mousedown", function(event) { event.stopPropagation(); }, true);

	AddEvent("mixerSectionPopupPanControlSlider", "touchstart", function(event) { PanControlMouseDown(event, nStripID, nSendID, true); } );
	AddEvent("mixerSectionPopupPanControlSlider", "touchmove", function(event) { PanControlMouseMove(event, true); } );
	AddEvent("mixerSectionPopupPanControlSlider", "touchend", function(event) { PanControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchend", function(event) { PanControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchcancel", function(event) { PanControlMouseUp(event); } );

	AddEvent("mixerSectionPopupPanControlSlider", "mousedown", function(event) { PanControlMouseDown(event, nStripID, nSendID, false); } );
	AddEvent("mixerSectionPopupPanControlSlider", "mousemove", function(event) { PanControlMouseMove(event, false); } );
	AddEvent("mixerSectionPopupPanControlSlider", "mouseup", function(event) { PanControlMouseUp(event); } );

	AddEvent("mixerSectionPopup", "mouseup", function(event) { PanControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "mouseleave", function(event) { PanControlMouseUp(event); } );

	AddEvent("mixerSectionPopupPanControlButtonLeft", "click", function(event)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { pan: -100 } });
		ClosePanControl(nStripID, nSendID);
	} );
	AddEvent("mixerSectionPopupPanControlButtonCenter", "click", function(event)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { pan: 0 } });
		ClosePanControl(nStripID, nSendID);
	} );
	AddEvent("mixerSectionPopupPanControlButtonRight", "click", function(event)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { pan: 100 } });
		ClosePanControl(nStripID, nSendID);
	} );


	SetPanControlAutoCloseTimer(nStripID, nSendID);


	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nPanControlAutoCloseTimer = 0;
var g_nPanControlAutoCloseTimerCount = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetPanControlAutoCloseTimer(nStripID, nSendID)
{
	//g_nPanControlAutoCloseTimerCount = 0;
	//g_nPanControlAutoCloseTimer = window.setInterval(function() { OnPanControlAutoCloseTimer(nStripID, nSendID); }, 1000)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StopPanControlAutoCloseTimer()
{
	clearTimeout(g_nPanControlAutoCloseTimer);
	g_nPanControlAutoCloseTimer = 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnPanControlAutoCloseTimer(nStripID, nSendID)
{
	g_nPanControlAutoCloseTimerCount++;

	if (g_nPanControlAutoCloseTimerCount > 5)
	{
		ClosePanControl(nStripID, nSendID);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nPanControlMouseDownKnobPan = 0;
var g_nPanControlMouseDownKnobPos = 0;
var g_nPanControlMouseDownClick = 0;

var g_nCapturedPanControlStripID = -1;
var g_nCapturedPanControlSendID = -1;

var g_nPanControlPanWidth = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PanControlMouseDown(event, nStripID, nSendID, bTouch)
{
	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
		return;
	}

	var jsSend = GetSendJSON(nStripID, nSendID);
	if (jsSend == null)
	{
		return;
	}


	g_nPanControlMouseDownKnobPan = jsSend.pan;

    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nPanControlMouseDownClick = event.targetTouches[0].clientX;
	}
	else
	{
		g_nPanControlMouseDownClick = event.pageX;
	}

	g_nCapturedPanControlStripID = nStripID;
	g_nCapturedPanControlSendID = nSendID;

	event.stopPropagation();

	StopPanControlAutoCloseTimer();

    g_nPublishPanTimer = window.setInterval(OnTimerPublishPanControl, 50);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PanControlMouseMove(event, bTouch)
{
	if (g_nCapturedPanControlStripID == -1 || g_nCapturedPanControlSendID == -1)
	{
		return;
	}

	var jsStrip = GetStripJSON(g_nCapturedPanControlStripID);
	if (jsStrip == null)
	{
		return;
	}

	var jsSend = GetSendJSON(g_nCapturedPanControlStripID, g_nCapturedPanControlSendID);
	if (jsSend == null)
	{
		return;
	}


	var nMove = 0;
    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		nMove = event.targetTouches[0].clientX - g_nPanControlMouseDownClick;
	}
	else
	{
		nMove = event.pageX - g_nPanControlMouseDownClick;
	}

	var nMovePan = nMove / g_nPanControlPanWidth * 200;

	var nNewPan = g_nPanControlMouseDownKnobPan + nMovePan;

	nNewPan = Math.trunc(nNewPan);
	
	if (nNewPan < -100)
	{
		nNewPan = -100;
	}
	if (nNewPan > 100)
	{
		nNewPan = 100;
	}
	
	nNewPan = Number(nNewPan);

	PublishPanControl(nNewPan)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PanControlMouseUp(event)
{
	if (g_nCapturedPanControlStripID == -1 || g_nCapturedPanControlSendID == -1)
	{
		return;
	}

	clearTimeout(g_nPublishPanTimer);
	g_nPublishPanTimer = null;
	g_nLastPublishedPan = null;
	g_nLastSendPan = null;

	SetPanControlAutoCloseTimer(g_nCapturedPanControlStripID, g_nCapturedPanControlSendID);

	g_nCapturedPanControlStripID = -1;
	g_nCapturedPanControlSendID = -1;

	event.stopPropagation();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedPan = null;
var g_nLastSendPan = null;
var g_nPublishPanTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishPanControl(nNewPan)
{
	g_nLastPublishedPan = nNewPan;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishPanControl()
{
	if (g_nCapturedPanControlStripID == -1 || g_nCapturedPanControlSendID == -1)
	{
		return;
	}

	if (g_nLastPublishedPan == g_nLastSendPan)
	{
		return;
	}

	if (g_nLastPublishedPan == null)
	{
		return;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedPanControlStripID +")][0].sends[?(@.id=="+ g_nCapturedPanControlSendID +")][0]", value: { pan: g_nLastPublishedPan } });

	g_nLastSendPan = g_nLastPublishedPan;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePanControl(nStripID, nSendID)
{
    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}

	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
		return;
	}

	var jsSend = GetSendJSON(nStripID, nSendID);
	if (jsSend == null)
	{
		return;
	}

	var nPanValue = jsSend.pan;


	var eHeader = document.getElementById("mixerSectionPopupPanControlHeader");
	if (eHeader)
	{
		eHeader.innerText = jsStrip.name;
	}


	var eTextLeft = document.getElementById("mixerSectionPopupPanControlTextLeft");
	var eTextRight = document.getElementById("mixerSectionPopupPanControlTextRight");
	if (eTextLeft && eTextRight)
	{
		var nPanValue2 = Math.trunc(nPanValue / 2);
		var szTextLeft = Math.abs(nPanValue2 - 50) + "L";
		var szTextRight = Math.abs(nPanValue2 + 50) + "R";

		eTextLeft.innerText = szTextLeft;
		eTextRight.innerText = szTextRight;
	}


	var eSlider = document.getElementById("mixerSectionPopupPanControlSlider");
	var eSliderKnob = document.getElementById("mixerSectionPopupPanControlSliderKnob");
	var eSliderKnobTrace = document.getElementById("mixerSectionPopupPanControlSliderKnobTrace");
	if (eSlider && eSliderKnob && eSliderKnobTrace)
	{
        var nPanValue2 = Math.trunc(nPanValue / 2) + 50;
        var nPanKnobWidth = eSlider.offsetWidth / (jsSettings.neumann_edition ? 35 : 25);
		g_nPanControlPanWidth = eSlider.offsetWidth - nPanKnobWidth - g_nElementsBorderWidth * 4 - 5;

		eSliderKnob.style.left = (nPanValue2 * g_nPanControlPanWidth / 100 + g_nElementsBorderWidth * 1 + 1) + "px";
		eSliderKnob.style.top = (g_nElementsBorderWidth) + "px";
		eSliderKnob.style.width = (nPanKnobWidth) + "px";
		eSliderKnob.style.height = (eSlider.offsetHeight - g_nElementsBorderWidth * 4 - 4) + "px";

		if (nPanValue < 0)
		{
			eSliderKnobTrace.style.left = ((nPanValue + 100) * g_nPanControlPanWidth / 200 + g_nElementsBorderWidth * 1 + 1 + 5) + "px";
			eSliderKnobTrace.style.width = (Math.abs(nPanValue) * g_nPanControlPanWidth / 200 + g_nElementsBorderWidth * 1 + 1 - 5) + "px";
		}
		else
		{
			eSliderKnobTrace.style.left = (g_nPanControlPanWidth / 2 + g_nElementsBorderWidth * 1 + 1) + "px";
			eSliderKnobTrace.style.width = (Math.abs(nPanValue) * g_nPanControlPanWidth / 200 + g_nElementsBorderWidth * 1 + 1) + "px";
		}
		eSliderKnobTrace.style.top = (g_nElementsBorderWidth + 3) + "px";
		eSliderKnobTrace.style.height = (eSlider.offsetHeight - g_nElementsBorderWidth * 4 - 4 - 2) + "px";
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClosePanControl(nStripID, nSendID)
{
	if (g_nCapturedPanControlStripID != -1 || g_nCapturedPanControlSendID != -1)
	{
		return;
	}


	ClosePopupContainer();

	StopPanControlAutoCloseTimer();


	var eStripPan = document.getElementById("strip" + nStripID + "-send" + nSendID + "-pan");
	if (eStripPan == null)
	{
		return;
	}

	var eStripPanKnob = document.getElementById("strip" + nStripID + "-send" + nSendID + "-pan-knob");
	if (eStripPanKnob == null)
	{
		return;
	}

	eStripPan.classList.remove("strip-pan-highlighted");
	eStripPanKnob.classList.remove("strip-pan-knob-highlighted");
	eStripPanKnob.classList.remove("strip-pan-knob-highlighted-parked");
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSendRotaryControl(nStripID, nSendID, nGroupID)
{
    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}



	var nWidth = g_nStripWidth * 2.1;
	var nHeight = g_nStripFaderHeight;// + 15;

	var nLeft = 0;
	var nTop = 0;
	if (nStripID != null)
	{
		var eStrip = document.getElementById((nGroupID != null) ? ("group" + nGroupID) : ("strip" + nStripID));
		var eRotary = document.getElementById(((nGroupID != null) ? ("group" + nGroupID) : ("strip" + nStripID)) + "-send" + nSendID + "-rotary");
		nLeft = Number(eStrips.offsetLeft) + Number(eStrip.offsetLeft) + g_isStripsScroller.x - g_nStripWidth * .2;
		nTop = Number(eStrips.offsetTop) + Number(eRotary.offsetTop) - g_nStripWidth * .2;
	}
	else
	{
		var eRotary = document.getElementById("bus" + g_nCurrentBusID + "-master" + nSendID + "-rotary");
		//nLeft = Number(eStrips.offsetLeft) + Number(eStrips.offsetWidth) - 20;
		nLeft = Number(eMixer.offsetLeft) + Number(eMixer.offsetWidth) - nWidth * 1.15;
		nTop = Number(eStrips.offsetTop) + Number(eRotary.offsetTop) - g_nStripWidth * .2;
	}

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupSendRotaryControl' class='mixerSectionPopupSendRotaryControl' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

			szPage += "<div id='mixerSectionPopupSendRotaryControlRotary' class='mixerSectionPopupSendRotaryControlRotary'>";

                if (bNeumannEdition)
                    szPage += "<canvas id='neumann-mixerSectionPopupSendRotaryControlRotaryCanvas' width='" + g_nStripsWidth + "' height='" + g_nStripsWidth + "' class='mixerSectionPopupSendRotaryControlRotaryCanvas' style='top: -5%;'></canvas>";

				szPage += "<canvas id='mixerSectionPopupSendRotaryControlRotaryCanvas' width='" + g_nStripsWidth + "' height='" + g_nStripsWidth + "' class='mixerSectionPopupSendRotaryControlRotaryCanvas'>";
				szPage += "</canvas>";

				szPage += "<div id='mixerSectionPopupSendRotaryControlRotaryTitle' class='mixerSectionPopupSendRotaryControlRotaryTitle'>";
					if (nSendID == MM_ID_REVERB_BUS)
					{
						szPage += "REV";
					}
					else if (nSendID == MM_ID_DYNAMICS_BUS)
					{
						szPage += "DYN";
                    }
                    else if (nSendID == g_nCurrentBusID && (jsStrip.type == ST_LOCAL_TALK_MIC || jsStrip.type == ST_PEERED_TALK_MIC))
					{
                        szPage += bNeumannEdition ? "TALK" : "Talk";
                    }
                    else if (nSendID != 0 && nSendID != 1 && nSendID != g_nCurrentBusID)
					{
						szPage += jsBus.name;
					}
				szPage += "</div>";

				szPage += "<div id='mixerSectionPopupSendRotaryControlRotaryValue' class='mixerSectionPopupSendRotaryControlRotaryValue'>";
					szPage += "0.0";
				szPage += "</div>";

			szPage += "</div>";



			szPage += "<div class='mixerSectionPopupSendRotaryControlMenuItem' id='stripGainRef'>0 dB</div>";
			szPage += "<div class='mixerSectionPopupSendRotaryControlMenuItem' id='stripGain0'>-oo</div>";
			szPage += "<div class='mixerSectionPopupSendRotaryControlMenuItem' id='stripGainSet'>SET</div>";


			szPage += "<div class='mixerSectionPopupSendRotaryControlSlider' id='mixerSectionPopupSendRotaryControlSlider'>";

				szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScale'>";

					for (var s = 0; s < g_nNbScaleSteps; s++)
                    {
                        if (bNeumannEdition && (s == 3 || s == 5))
                            continue;

						if (s % 4)
						{
							szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleStep' style='top: var(--strip-scale-top" + s + ");'>";
							szPage += "</div>";
						}
					}


					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top0);'>";
						szPage += "6";
					szPage += "</div>";
                    
					if (bNeumannEdition)
					{
                        szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) - var(--strip-scale-number-top1) / 4);'>";
							szPage += "+";
						szPage += "</div>";
					}

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top1);'>";
						szPage += "0";
					szPage += "</div>";

    				if (bNeumannEdition)
					{
                        szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) + var(--strip-scale-number-top1) / 4);'>";
							szPage += "-";
						szPage += "</div>";
					}

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top2);'>";
						szPage += "6";
					szPage += "</div>";

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top3);'>";
						szPage += "18";
					szPage += "</div>";

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top4);'>";
						szPage += "30";
					szPage += "</div>";

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top5);'>";
						szPage += "90";
					szPage += "</div>";

					szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScaleNumbers' style='top: var(--strip-scale-number-top6);'>";
						szPage += "oo";
					szPage += "</div>";


				szPage += "</div>";

                szPage += "<div class='mixerSectionPopupSendRotaryControlSliderKnobTrace' id='mixerSectionPopupSendRotaryControlSliderKnobTrace'>";
                szPage += "</div>";

                if (bNeumannEdition)
				{
                    szPage += "<div id='mixerSectionPopupSendRotaryControlSliderKnob' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
					szPage += "</div>";

                    szPage += "<div id='mixerSectionPopupSendRotaryControlSliderKnob2' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
					szPage += "</div>";

                    szPage += "<div id='mixerSectionPopupSendRotaryControlSliderKnob3' class='mixerSectionPopupSendRotaryControlSliderKnobLine'>";
					szPage += "</div>";
				}
				else
                {
                    szPage += "<div id='mixerSectionPopupSendRotaryControlSliderKnob' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
                    szPage += "</div>";
                }

			szPage += "</div>";

		szPage += "</div>";

	szPage += "</div>";

	eMixerSectionPopupContainer.innerHTML = szPage;



	UpdateSendRotaryControl(nStripID, nSendID, nGroupID);


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function(event) { CloseSendRotaryControl(nStripID, nSendID); }, true);
		//AddEvent("mixerSectionPopup", "touchstart", function(event) { CloseSendRotaryControl(nStripID, nSendID, nGroupID); }, true);
	}
	else
	{
		AddEvent("mixerSectionPopup", "touchstart", function(event) { CloseSendRotaryControl(nStripID, nSendID, nGroupID); }, true);
		AddEvent("mixerSectionPopup", "mousedown", function(event) { CloseSendRotaryControl(nStripID, nSendID, nGroupID); }, true);
	}

    AddEvent("mixerSectionPopupSendRotaryControl", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupSendRotaryControl", "touchstart", function(event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupSendRotaryControl", "mousedown", function(event) { event.stopPropagation(); }, true);

	AddEvent("mixerSectionPopupSendRotaryControlSlider", "touchstart", function(event) { SendRotaryControlMouseDown(event, nStripID, nSendID, nGroupID, true); } );
	AddEvent("mixerSectionPopupSendRotaryControlSlider", "touchmove", function(event) { SendRotaryControlMouseMove(event, true); } );
	AddEvent("mixerSection", "touchmove", function(event) { SendRotaryControlMouseMove(event, true); } );
	AddEvent("mixerSectionPopupSendRotaryControlSlider", "touchend", function(event) { SendRotaryControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchend", function(event) { SendRotaryControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchcancel", function(event) { SendRotaryControlMouseUp(event); } );

	AddEvent("mixerSectionPopupSendRotaryControlSlider", "mousedown", function(event) { SendRotaryControlMouseDown(event, nStripID, nSendID, nGroupID, false); } );
	AddEvent("mixerSectionPopupSendRotaryControlSlider", "mousemove", function(event) { SendRotaryControlMouseMove(event, false); } );
	AddEvent("mixerSectionPopup", "mousemove", function(event) { SendRotaryControlMouseMove(event, false); } );
	AddEvent("mixerSectionPopupSendRotaryControlSlider", "mouseup", function(event) { SendRotaryControlMouseUp(event); } );

	AddEvent("mixerSectionPopup", "mouseup", function(event) { SendRotaryControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "mouseleave", function(event) { SendRotaryControlMouseUp(event); } );


	if (nGroupID != null)
	{
		AddEvent("stripGainRef", "click", function(event)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { group_gain: 0 } });
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );

		AddEvent("stripGain0", "click", function(event)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { group_gain: -1445 } });
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );

		AddEvent("stripGainSet", "click", function(event)
		{
			PromptFaderGain(nStripID, nSendID, nGroupID);
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );
	}
	else
	{
		AddEvent("stripGainRef", "click", function(event)
		{
			if (nStripID)
			{
				var jsInput = GetInputJSON(nStripID);
				if (jsInput)
				{
					if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
					{
						self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { link_gain: 0 } });
					}
					else
					{
						self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { gain: 0 } });
					}
				}
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nSendID +")][0]", value: { master_gain: 0 } });
			}
			
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );

		AddEvent("stripGain0", "click", function(event)
		{
			if (nStripID)
			{
				var jsInput = GetInputJSON(nStripID);
				if (jsInput)
				{
					if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
					{
						self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { link_gain: -1445 } });
					}
					else
					{
						self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { gain: -1445 } });
					}
				}
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nSendID +")][0]", value: { master_gain: -1445 } });
			}
			
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );

		AddEvent("stripGainSet", "click", function(event)
		{
			PromptFaderGain(nStripID, nSendID);
			CloseSendRotaryControl(nStripID, nSendID, nGroupID);
		} );
	}


	SetSendRotaryControlAutoCloseTimer(nStripID, nSendID);

	if (nStripID)
	{
		if (nGroupID)
		{
			g_szSelectedRotaryID = "group" + nGroupID + "-send" + nSendID + "-rotary";
		}
		else
		{
			g_szSelectedRotaryID = "strip" + nStripID + "-send" + nSendID + "-rotary";
		}
	}
	else
	{
		g_szSelectedRotaryID = "bus" + g_nCurrentBusID + "-master" + nSendID + "-rotary";
	}

	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nSendRotaryControlAutoCloseTimer = 0;
var g_nSendRotaryControlAutoCloseTimerCount = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetSendRotaryControlAutoCloseTimer(nStripID, nSendID)
{
	//g_nSendRotaryControlAutoCloseTimerCount = 0;
	//g_nSendRotaryControlAutoCloseTimer = window.setInterval(function() { OnSendRotaryControlAutoCloseTimer(nStripID, nSendID); }, 1000)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function StopSendRotaryControlAutoCloseTimer()
{
	clearTimeout(g_nSendRotaryControlAutoCloseTimer);
	g_nSendRotaryControlAutoCloseTimer = 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnSendRotaryControlAutoCloseTimer(nStripID, nSendID)
{
	g_nSendRotaryControlAutoCloseTimerCount++;

	if (g_nSendRotaryControlAutoCloseTimerCount > 5)
	{
		CloseSendRotaryControl(nStripID, nSendID);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nSendRotaryControlMouseDownKnobGain = 0;
var g_nSendRotaryControlMouseDownKnobPos = 0;
var g_nSendRotaryControlMouseDownClick = 0;

var g_nCapturedSendRotaryControlStripID = -1;
var g_nCapturedSendRotaryControlSendID = -1;
var g_nCapturedSendRotaryControlGroupID = -1;

var g_nSendRotaryControlHeight = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SendRotaryControlMouseDown(event, nStripID, nSendID, nGroupID, bTouch)
{
	var nGain = 0;

	if (nStripID != null)
	{
		var jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
		{
			return;
		}

		var jsInput = GetInputJSON(nStripID);
		if (jsInput == null)
		{
			return;
		}

		if (nGroupID != null)
		{
			nGain = jsSend.group_gain;
		}
		else
		{
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				nGain = jsSend.link_gain;
			}
			else
			{
				nGain = jsSend.gain;
			}
		}
	}
	else
	{
		var jsBus = GetBusJSON(nSendID);
		if (jsBus == null)
		{
			return;
		}

		nGain = jsBus.master_gain;
	}

	
	g_nSendRotaryControlMouseDownKnobGain = nGain;


	var eSliderKnob = document.getElementById("mixerSectionPopupSendRotaryControlSliderKnob");
	if (eSliderKnob == null)
	{
		return;
    }
	g_nSendRotaryControlMouseDownKnobPos = Number(eSliderKnob.style.top.replace("px", "")) + g_nStripFaderKnobHeight / 2;


    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nSendRotaryControlMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
		g_nSendRotaryControlMouseDownClick = event.pageY;
	}

	if (nStripID != null)
	{
		g_nCapturedSendRotaryControlStripID = nStripID;
	}
	g_nCapturedSendRotaryControlSendID = nSendID;
	g_nCapturedSendRotaryControlGroupID = (nGroupID == null) ? -1 : nGroupID;


	event.stopPropagation();

	StopSendRotaryControlAutoCloseTimer();

    g_nPublishSendRotaryTimer = window.setInterval(OnTimerPublishSendRotaryControl, 50);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SendRotaryControlMouseMove(event, bTouch)
{
	if (g_nCapturedSendRotaryControlSendID == -1)
	{
		return;
	}


	var nMove = 0;
    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		nMove = event.targetTouches[0].clientY - g_nSendRotaryControlMouseDownClick;
	}
	else
	{
		nMove = event.pageY - g_nSendRotaryControlMouseDownClick;
	}


	var nNewPos = g_nSendRotaryControlMouseDownKnobPos + nMove;

	var nNewGain = PosToGain(nNewPos) * 10;

	nNewGain = Math.trunc(nNewGain);
	
	nNewGain = Number(nNewGain);

	PublishSendRotaryControl(nNewGain);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SendRotaryControlMouseUp(event)
{
	if (g_nCapturedSendRotaryControlSendID == -1)
	{
		return;
	}

	clearTimeout(g_nPublishSendRotaryTimer);
	g_nPublishSendRotaryTimer = null;
	g_nLastPublishedSendRotary = null;
	g_nLastSendSendRotary = null;

	SetSendRotaryControlAutoCloseTimer(g_nCapturedSendRotaryControlStripID, g_nCapturedSendRotaryControlSendID);

	g_nCapturedSendRotaryControlStripID = -1;
	g_nCapturedSendRotaryControlSendID = -1;
	g_nCapturedSendRotaryControlGroupID = -1;

	event.stopPropagation();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedSendRotary = null;
var g_nLastSendSendRotary = null;
var g_nPublishSendRotaryTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishSendRotaryControl(nNewGain)
{
	g_nLastPublishedSendRotary = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishSendRotaryControl()
{
	if (g_nCapturedSendRotaryControlSendID == -1)
	{
		return;
	}

	if (g_nLastPublishedSendRotary == g_nLastSendSendRotary)
	{
		return;
	}

	if (g_nLastPublishedSendRotary == null)
	{
		return;
	}

	if (g_nCapturedSendRotaryControlStripID != -1)
	{
		if (g_nCapturedSendRotaryControlGroupID != -1)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedSendRotaryControlStripID +")][0].sends[?(@.id=="+ g_nCapturedSendRotaryControlSendID +")][0]", value: { group_gain: g_nLastPublishedSendRotary } });
		}
		else
		{
			var jsInput = GetInputJSON(g_nCapturedSendRotaryControlStripID);
			if (jsInput == null)
			{
				return;
			}
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedSendRotaryControlStripID +")][0].sends[?(@.id=="+ g_nCapturedSendRotaryControlSendID +")][0]", value: { link_gain: g_nLastPublishedSendRotary } });
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedSendRotaryControlStripID +")][0].sends[?(@.id=="+ g_nCapturedSendRotaryControlSendID +")][0]", value: { gain: g_nLastPublishedSendRotary } });
			}
		}
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ g_nCapturedSendRotaryControlSendID +")][0]", value: { master_gain: g_nLastPublishedSendRotary } });
	}

	g_nLastSendSendRotary = g_nLastPublishedSendRotary;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendRotaryControl(nStripID, nSendID, nGroupID)
{
    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}

    var cColor = jsBus.color == "#000000" ? (jsSettings.neumann_edition ? "#cfcfcf" : "#ffffff") : jsBus.color;

	if (nSendID == 0 || nSendID == 1)
    {
        cColor = jsSettings.neumann_edition ? "#cfcfcf" : "#aaaaaa";
	}


	var nGain = 0;

	if (nStripID != null)
	{
		var jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
		{
			return;
		}

		var jsInput = GetInputJSON(nStripID);
		if (jsInput == null)
		{
			return;
		}

		if (nGroupID != null)
		{
			nGain = jsSend.group_gain;
		}
		else
		{
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				nGain = jsSend.link_gain;
			}
			else
			{
				nGain = jsSend.gain;
			}
		}
	}
	else
	{
		nGain = jsBus.master_gain;
	}


	var eStripSendRotaryCanvas = document.getElementById("mixerSectionPopupSendRotaryControlRotaryCanvas");
	if (eStripSendRotaryCanvas)
	{
		var nValue = 0;
		if (nGain >= -300)
		{
			nValue = .5 + ((nGain + 300) / (360 * 2));
		}
		else
		{
			nValue = (nGain + 1445) / ((1445 - 300) * 2);
		}

		DrawRotary(eStripSendRotaryCanvas, nValue, g_nStripWidth, cColor, "#303030", true);
	}


	var eStripSendRotaryValue = document.getElementById("mixerSectionPopupSendRotaryControlRotaryValue");
	if (eStripSendRotaryValue)
    {
        if (!jsSettings.neumann_edition || (jsSettings.neumann_edition && nSendID != MM_ID_REVERB_BUS))
		    eStripSendRotaryValue.classList.add("mixerSectionPopupSendRotaryControlRotaryValueSelected");
	
		var nRotaryGain = nGain;
		if (nRotaryGain <= -1445)
		{
			eStripSendRotaryValue.innerText = "-oo";
		}
		else
		{
			// Hack to match QT truncation
			// TODO: Try floor() instead of trunc()
			if (nRotaryGain < 0)
			{
				nRotaryGain -= 5;
			}
			else
			{
				nRotaryGain += 5;
			}
			eStripSendRotaryValue.innerText = Math.trunc(nRotaryGain / 10);
		}
	}


	var eStripSendRotaryTitle = document.getElementById("mixerSectionPopupSendRotaryControlRotaryTitle");
	if (eStripSendRotaryTitle)
	{
		var cColor = "#bbbbbb";

		if (nSendID != 0 && nSendID != 1)
		{
			var jsBus = GetBusJSON(nSendID);
			if (jsBus)
			{
				if (jsBus.color != "#000000")
				{
					cColor = jsBus.color;
				}
			}
		}

		eStripSendRotaryTitle.style.color = cColor;
	}


	var eSlider = document.getElementById("mixerSectionPopupSendRotaryControlSlider");
	var eSliderKnob = document.getElementById("mixerSectionPopupSendRotaryControlSliderKnob");
	var eSliderKnobTrace = document.getElementById("mixerSectionPopupSendRotaryControlSliderKnobTrace");
	if (eSlider && eSliderKnob && eSliderKnobTrace)
	{
		var nGainPos = GainToPos(nGain / 10) - g_nStripFaderKnobHeight / 2;

		eSliderKnob.style.borderColor = cColor;
		eSliderKnob.style.backgroundColor = ((nGain == 0) ? cColor : "#181818");	

		eSliderKnob.style.top = nGainPos + "px";	
		eSliderKnob.style.left = (g_nStripFaderWidth * .09) + "px";
		eSliderKnob.style.width = (g_nStripFaderWidth * .6) + "px";	
		eSliderKnob.style.height = (g_nStripFaderKnobHeight) + "px";	

		eSliderKnobTrace.style.top = nGainPos + "px";
		eSliderKnobTrace.style.left = (g_nStripFaderWidth * .42) + "px";
		eSliderKnobTrace.style.width = (g_nStripFaderWidth * .03) + "px";
        eSliderKnobTrace.style.height = (g_nStripFaderHeight - nGainPos - g_nStripFaderKnobHeight) + "px";

        if (jsSettings.neumann_edition)
        {
            var eSliderKnob2 = document.getElementById("mixerSectionPopupSendRotaryControlSliderKnob2");
            var eSliderKnob3 = document.getElementById("mixerSectionPopupSendRotaryControlSliderKnob3");

            if (eSliderKnob2 && eSliderKnob3)
            {
                eSliderKnob.style.top = (nGainPos - g_nStripFaderKnobHeight - 1) + "px";

                eSliderKnob2.style.top = (nGainPos + g_nStripFaderKnobHeight + 1) + "px";
                eSliderKnob2.style.left = (g_nStripFaderWidth * .09) + "px";
                eSliderKnob2.style.width = (g_nStripFaderWidth * .6) + "px";
                eSliderKnob2.style.height = (g_nStripFaderKnobHeight) + "px";

                eSliderKnob3.style.top = (nGainPos + g_nStripFaderKnobHeight / 2 + 2) + "px";
                eSliderKnob3.style.left = (g_nStripFaderWidth * .12) + "px";
                eSliderKnob3.style.width = (g_nStripFaderWidth * .67) + "px";

                eSliderKnob.style.backgroundColor = cColor;

                eSliderKnob2.style.borderColor = cColor;
                eSliderKnob2.style.backgroundColor = cColor;

                eSliderKnobTrace.style.top = 0 + "px";
                eSliderKnobTrace.style.left = (g_nStripFaderWidth / 2 - 4) + "px";
                eSliderKnobTrace.style.width = 3 + "px";
                eSliderKnobTrace.style.height = (g_nStripFaderHeight) + "px";
            }
        }
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSendRotaryControl(nStripID, nSendID, nGroupID)
{
	if (g_nCapturedSendRotaryControlStripID != -1 || g_nCapturedSendRotaryControlSendID != -1)
	{
		return;
	}

	g_szSelectedRotaryID = "";
	UpdateAllSendRotaries();

	ClosePopupContainer();

	StopSendRotaryControlAutoCloseTimer();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenOutputMenu()
{
    var jsSettings = GetSettingsJSON()
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eMasterOutputButton = document.getElementById("master-center-button-foot");
    if (eMasterOutputButton == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }


    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='grid-template-columns: " + (g_nStripWidth * 2) + "px;'>";

            szPage += "<div class='mixerSectionPopupMenuItem' id='OpenBusRouting'>BUS ROUTING</div>";

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    var ePopupMenu = document.getElementById("mixerSectionPopupMenu");
	var ePopupMenuStyle = ePopupMenu.style;
	var szPopupHeight = ePopupMenu.offsetHeight;
	var szPopupWidth = ePopupMenu.offsetWidth;

    ePopupMenuStyle.setProperty("top", Number(eMasters.offsetTop) + Number(eMasters.offsetHeight) - Number(eMasterOutputButton.offsetHeight) - Number(szPopupHeight) - g_nElementsBorderWidth * 4.5 - (bNeumannEdition ? 5 : 6) + "px");
    ePopupMenuStyle.setProperty("left", Number(eMasters.offsetLeft) + Number(eMasters.offsetWidth) - (Number(eMasterOutputButton.offsetWidth) / 2) + g_nElementsBorderWidth - Number(szPopupWidth) + (bNeumannEdition ? 6.5 : 1) + "px");


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
	    AddEvent("mixerSectionPopup", "click", function (event) { CloseOutputMenu(); }, true);
	}
	else
	{
	    AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseOutputMenu(); }, true);
	    AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseOutputMenu(); }, true);
	}

	AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);


	AddEvent("OpenBusRouting", "click", function (event) { OpenBusRouting(); });


	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseOutputMenu()
{
    ClosePopupContainer();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenStripMenu(nStripID)
{
    var r = document.querySelector(':root');

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
	    return;
	}

	var jsBus = GetBusJSON(g_nCurrentBusID);
	if (jsBus == null)
	{
	    return;
	}

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eStrip = document.getElementById("strip" + nStripID);
	if (eStrip == null)
	{
		return;
	}

	var eStripButtonFoot = document.getElementById("strip" + nStripID + "-button-foot");
	if (eStripButtonFoot == null)
	{
		return;
	}


	var nItemWidth = g_nStripWidth * 2;
	        
	var nLeft = 0;
	var nTop = 0;

	var szPage = "";

    var nNbItemsColumn1, nNbItemsColumn2, nNbItemsColumn3;
    nNbItemsColumn1 = nNbItemsColumn2 = nNbItemsColumn3 = 0;

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

    // LINK MENU
    if (jsInput.linked_input_id != -1 && jsInput.id < jsInput.linked_input_id && jsInput.collapsed_link)
    {
        if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu3columns' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px " + nItemWidth + "px " + nItemWidth + "px;'>";
        /*else if (jsStrip.type == ST_DAW_INPUT)
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu2columns' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px " + nItemWidth + "px;'>";*/
        else
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px;'>";

                szPage += "<div id='mixerSectionPopupMenuColumn1' class='mixerSectionPopupMenuColumn'>";

                    if (jsStrip.type == ST_CUE_RETURN)
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem' id='linkGoToCue'>GO TO CUE</div>";
                        //szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].link_mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='linkMute'>MUTE</div>";
                        nNbItemsColumn1++;
                    }

                    if (jsStrip.type == ST_EFFECT_RETURN /*|| jsStrip.type == ST_DAW_INPUT*/)
                    {
                        if (jsStrip.type == ST_EFFECT_RETURN)
                        {

                            if (jsStrip.id == MM_ID_FIRST_REVERB_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_REVERB_STRIP_RETURN)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkEditReverb'>EDIT REV</div>";
                                szPage += "<div class='mixerSectionPopupMenuItem' id='busEQ'>BUS EQ</div>";
                                nNbItemsColumn1 += 2;

                                if (jsMixer.settings.expert_mode && !jsMixer.settings.neumann_edition)
                                {
                                    szPage += "<div class='mixerSectionPopupMenuItem' id='linkGoToReverbBus'>GO TO REV BUS</div>";
                                    nNbItemsColumn1++;
                                }
                            }

                            if (jsStrip.id == MM_ID_FIRST_DYNAMICS_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_DYNAMICS_STRIP_RETURN)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkEditDynamics'>EDIT DYN</div>";
                                szPage += "<div class='mixerSectionPopupMenuItem' id='busEQ'>BUS EQ</div>";
                                nNbItemsColumn1 += 2;

                                if (jsMixer.settings.expert_mode)
                                {
                                    szPage += "<div class='mixerSectionPopupMenuItem' id='linkGoToDynamicsBus'>GO TO DYN BUS</div>";
                                    nNbItemsColumn1++;
                                }
                            }
                        }

                        if (jsInput.linked_input_id != -1)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkExpandLink'>EXPAND LINK</div>";
                            nNbItemsColumn1++;
                        }
                    }

                    if (jsStrip.type != ST_EFFECT_RETURN /*&& jsStrip.type != ST_DAW_INPUT*/ && jsStrip.type != ST_CUE_RETURN)
                    {
                        if (jsInput.analog)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem" + (g_bDisplayPreamps ? " mixerSectionPopupMenuItemChecked" : "") + "' id='linkPreamp'>PREAMP</div>";
                            nNbItemsColumn1++;
                        }

                        if (jsMixer.deesser_authorized /*&& jsStrip.type != ST_DAW_INPUT*/)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkDeesser'>DEESSER</div>";
                            nNbItemsColumn1++;
                        }

                        szPage += "<div class='mixerSectionPopupMenuItem' id='linkEq'>EQ</div>";
                        szPage += "<div class='mixerSectionPopupMenuItem' id='linkDynamics'>DYNAMICS</div>";
                        nNbItemsColumn1 += 2;
                    }

                    if (jsStrip.type == ST_MUSIC_INPUT /*|| jsStrip.type == ST_DAW_INPUT*/ || jsStrip.type == ST_EFFECT_RETURN)
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].link_mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='linkMute'>MUTE</div>";
                        nNbItemsColumn1++;
                    }                    

                szPage += "</div>";               

                if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
                {
                    szPage += "<div id='mixerSectionPopupMenuColumn2' class='mixerSectionPopupMenuColumn'>";

                        if (jsStrip.type == ST_DAW_INPUT)
                        {
                            if (jsInput.linked_input_id != -1)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkExpandLink'>EXPAND LINK</div>";
                                nNbItemsColumn2++;
                            }

                            szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].link_mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='linkMute'>MUTE</div>";
                            nNbItemsColumn2++;
                        }
                        else
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkName'>NAME</div>";
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkColor'>COLOR</div>";
                            nNbItemsColumn2 += 2;

                            if (jsStrip.type == ST_MUSIC_INPUT && (jsBus.type == BT_CUE || jsBus.type == BT_MONITOR))
                            {
                                if (!jsMixer.settings.neumann_edition)
                                {
                                    szPage += "<div class='mixerSectionPopupMenuItem" + ((jsStrip.self_cue_id == g_nCurrentBusID) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='linkMyInput'>MY INPUT</div>";
                                    nNbItemsColumn2++;
                                }

                                if (jsBus.type == BT_MONITOR && jsStrip.self_cue_id != -1 && jsStrip.self_cue_id != g_nCurrentBusID)
                                {
                                    szPage += "<div class='mixerSectionPopupMenuItem' id='linkGoToMyCue'>GO TO MY CUE</div>";
                                    nNbItemsColumn2++;
                                }
                            }
                        }                        

                    szPage += "</div>";
                }                        
              
                if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
                {
                    szPage += "<div  id='mixerSectionPopupMenuColumn3' class='mixerSectionPopupMenuColumn'>";

                        if (jsStrip.type == ST_DAW_INPUT)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkName'>NAME</div>";
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkColor'>COLOR</div>";
                            nNbItemsColumn3 += 2;
                        }
                        else if (jsStrip.type == ST_MUSIC_INPUT)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='linkGroup'>GROUP</div>";
                            nNbItemsColumn3++;

                            if (jsStrip.group_id != -1)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkUngroup'>UNGROUP</div>";
                                nNbItemsColumn3++;
                            }

                            if (jsInput.linked_input_id != -1 && jsInput._unlink != null && !jsInput._unlink)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkUnlink'>UNLINK</div>";
                                nNbItemsColumn3++;
                            }

                            if (jsInput.linked_input_id != -1)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='linkExpandLink'>EXPAND LINK</div>";
                                nNbItemsColumn3++;
                            }
                        }                       

                    szPage += "</div>";
                }
    
            szPage += "</div>";
    }
    else // STRIP MENU
    {
        if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu3columns' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px " + nItemWidth + "px " + nItemWidth + "px;'>";
        /*else if (jsStrip.type == ST_DAW_INPUT)
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu2columns' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px " + nItemWidth + "px;'>";*/
        else
            szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: " + nItemWidth + "px;'>";

                szPage += "<div id='mixerSectionPopupMenuColumn1' class='mixerSectionPopupMenuColumn'>";

                if (jsStrip.type == ST_EFFECT_RETURN /*|| jsStrip.type == ST_DAW_INPUT*/ || jsStrip.type == ST_CUE_RETURN)
                {
                    if (jsStrip.type == ST_EFFECT_RETURN)
                    {
                        if (jsStrip.id == MM_ID_FIRST_REVERB_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_REVERB_STRIP_RETURN)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='stripEditReverb'>EDIT REV</div>";
                            szPage += "<div class='mixerSectionPopupMenuItem' id='busEQ'>BUS EQ</div>";
                            nNbItemsColumn1 += 2;

                            if (jsMixer.settings.expert_mode && !jsMixer.settings.neumann_edition)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripGoToReverbBus'>GO TO REV BUS</div>";
                                nNbItemsColumn1++;
                            }
                        }

                        if (jsStrip.id == MM_ID_FIRST_DYNAMICS_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_DYNAMICS_STRIP_RETURN)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='stripEditDynamics'>EDIT DYN</div>";
                            szPage += "<div class='mixerSectionPopupMenuItem' id='busEQ'>BUS EQ</div>";
                            nNbItemsColumn1 += 2;

                            if (jsMixer.settings.expert_mode)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripGoToDynamicsBus'>GO TO DYN BUS</div>";
                                nNbItemsColumn1++;
                            }
                        }
                    }

                    if (jsInput.linked_input_id != -1)
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem' id='stripCollapseLink'>COLLAPSE LINK</div>";
                        nNbItemsColumn1++;
                    }

                    szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='stripMute'>MUTE</div>";
                    nNbItemsColumn1++;
                }
                else
                {
                    if (jsInput.analog)
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem" + (g_bDisplayPreamps ? " mixerSectionPopupMenuItemChecked" : "") + "' id='stripPreamp'>PREAMP</div>";
                        nNbItemsColumn1++;
                    }

                    if (jsStrip.type != ST_EFFECT_RETURN /*&& jsStrip.type != ST_DAW_INPUT*/)
                    {
                        if (jsMixer.deesser_authorized /*&& jsStrip.type != ST_DAW_INPUT*/)
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='stripDeesser'>DEESSER</div>";
                            nNbItemsColumn1++;
                        }

                        szPage += "<div class='mixerSectionPopupMenuItem' id='stripEq'>EQ</div>";
                        szPage += "<div class='mixerSectionPopupMenuItem' id='stripDynamics'>DYNAMICS</div>";
                        nNbItemsColumn1 += 2;
                    }

                    if (jsStrip.type != ST_EFFECT_RETURN && jsStrip.type != ST_DAW_INPUT && jsBus.type == BT_MONITOR && (jsStrip.type == ST_LOCAL_TALK_MIC || jsStrip.type == ST_PEERED_TALK_MIC))
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem" + ((jsMixer.settings.talk_input == jsInput.id) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='stripTalkInput'>TALK INPUT</div>";
                        nNbItemsColumn1++;
                    }

                    if (jsStrip.type != ST_LOCAL_TALK_MIC && jsStrip.type != ST_PEERED_TALK_MIC && jsStrip.type != ST_DAW_INPUT)
                    {
                        szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='stripMute'>MUTE</div>";
                        nNbItemsColumn1++;
                    }
                }

		        szPage += "</div>";
            
		        if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
		        {
                    szPage += "<div id='mixerSectionPopupMenuColumn2' class='mixerSectionPopupMenuColumn'>";

                        if (jsStrip.type == ST_DAW_INPUT)
                        {
                            if (jsInput.linked_input_id != -1)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripCollapseLink'>COLLAPSE LINK</div>";
                                nNbItemsColumn2++;
                            }

                            szPage += "<div class='mixerSectionPopupMenuItem" + (jsStrip.sends[g_nCurrentBusID].mute ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='stripMute'>MUTE</div>";
                            nNbItemsColumn2++;
                        }
                        else
                        {
                            szPage += "<div class='mixerSectionPopupMenuItem' id='stripName'>NAME</div>";
		                    szPage += "<div class='mixerSectionPopupMenuItem' id='stripColor'>COLOR</div>";
		                    nNbItemsColumn2 += 2;		                

		                    if (jsStrip.type == ST_MUSIC_INPUT)
		                    {
		                        if (jsBus.type == BT_CUE || jsBus.type == BT_MONITOR)
		                        {
                                    if (!jsMixer.settings.neumann_edition)
                                    {
                                        szPage += "<div class='mixerSectionPopupMenuItem" + ((jsStrip.self_cue_id == g_nCurrentBusID) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='stripMyInput'>MY INPUT</div>";
                                        nNbItemsColumn2++;
                                    }

		                            if (jsBus.type == BT_MONITOR)
		                            {
		                                if (jsStrip.self_cue_id != -1 && jsStrip.self_cue_id != g_nCurrentBusID)
		                                {
		                                    szPage += "<div class='mixerSectionPopupMenuItem' id='stripGoToMyCue'>GO TO MY CUE</div>";
		                                    nNbItemsColumn2++;
		                                }

		                                szPage += "<div class='mixerSectionPopupMenuItem" + ((jsMixer.settings.talk_input == jsInput.id) ? " mixerSectionPopupMenuItemChecked" : "") + "' id='stripTalkInput'>TALK INPUT</div>";
		                                nNbItemsColumn2++;
		                            }
		                        }
		                    }
                        }		                
		            
		                szPage += "</div>";
                    }

    	            if (jsStrip.type == ST_MUSIC_INPUT || jsStrip.type == ST_DAW_INPUT)
    	            {
                        szPage += "<div id='mixerSectionPopupMenuColumn3' class='mixerSectionPopupMenuColumn'>";

                            if (jsStrip.type == ST_DAW_INPUT)
                            {
                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripName'>NAME</div>";
                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripColor'>COLOR</div>";
                                nNbItemsColumn3 += 2;
                            }
                            else if (jsStrip.type == ST_MUSIC_INPUT)
                            {
    	                        szPage += "<div class='mixerSectionPopupMenuItem' id='stripGroup'>GROUP</div>";
    	                        nNbItemsColumn3++;

    	                        if (jsStrip.group_id != -1)
    	                        {
    	                            szPage += "<div class='mixerSectionPopupMenuItem' id='stripUngroup'>UNGROUP</div>";
    	                            nNbItemsColumn3++;
    	                        }

    	                        if (jsInput.linked_input_id == -1)
    	                        {
    	                            if (jsInput._link_with_left != null && !jsInput._link_with_left)
    	                            {
    	                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripLinkWithLeft'>LINK WITH LEFT</div>";
    	                                nNbItemsColumn3++;
    	                            }

    	                            if (jsInput._link_with_right != null && !jsInput._link_with_right)
    	                            {
                                        szPage += "<div class='mixerSectionPopupMenuItem' id='stripLinkWithRight'>LINK WITH RIGHT</div>";
                                        nNbItemsColumn3++;
    	                            }
    	                        }
    	                        else
    	                        {
    	                            if (jsInput._unlink != null && !jsInput._unlink)
    	                            {
    	                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripUnlink'>UNLINK</div>";
    	                                nNbItemsColumn3++;
    	                            }

    	                            if (jsStrip.type != ST_EFFECT_RETURN/* && jsStrip.type != ST_DAW_INPUT*/ && jsStrip.type != ST_CUE_RETURN)
    	                            {
    	                                szPage += "<div class='mixerSectionPopupMenuItem' id='stripCollapseLink'>COLLAPSE LINK</div>";
    	                                nNbItemsColumn3++;
    	                            }
                                }
                            }

    	                szPage += "</div>";
    	            }  	             	        
    }

		szPage += "</div>";

	szPage += "</div>";

	var nNbItemsMaxByColumns = Math.max(nNbItemsColumn1, nNbItemsColumn2, nNbItemsColumn3);

    if (nNbItemsMaxByColumns == 0)
    {
        return;
    }

    eMixerSectionPopupContainer.innerHTML = szPage;


    if (nNbItemsColumn1 != nNbItemsColumn2 || nNbItemsColumn1 != nNbItemsColumn3 || nNbItemsColumn2 != nNbItemsColumn3)
    {
        if (nNbItemsMaxByColumns > nNbItemsColumn1)
        {
            CompleteMenuColumn("mixerSectionPopupMenuColumn1", nNbItemsMaxByColumns - nNbItemsColumn1);
        }

        if (nNbItemsMaxByColumns > nNbItemsColumn2)
        {
            CompleteMenuColumn("mixerSectionPopupMenuColumn2", nNbItemsMaxByColumns - nNbItemsColumn2);
        }

        if (nNbItemsMaxByColumns > nNbItemsColumn3)
        {
            CompleteMenuColumn("mixerSectionPopupMenuColumn3", nNbItemsMaxByColumns - nNbItemsColumn3);
        }
    }


    var ePopupMenu = document.getElementById("mixerSectionPopupMenu");
	var ePopupMenuStyle = ePopupMenu.style;
    var nPopupHeight = ePopupMenu.offsetHeight;
    var nPopupWidth = ePopupMenu.offsetWidth;

    ePopupMenuStyle.setProperty("top", eStrips.offsetTop + eStrip.offsetTop + eStrip.offsetHeight - eStripButtonFoot.offsetHeight - nPopupHeight - g_nElementsBorderWidth * 8.5 + "px");

    var nLeft = eStrips.offsetLeft + eStrip.offsetLeft + eStripButtonFoot.parentElement.parentElement.offsetParent.offsetLeft + g_isStripsScroller.x;

    if (nLeft + nPopupWidth > window.innerWidth)
        nLeft = nLeft + eStripButtonFoot.offsetWidth - nPopupWidth;

    ePopupMenuStyle.setProperty("left", nLeft + "px");

  
    
	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
	    AddEvent("mixerSectionPopup", "click", function (event) { CloseStripMenu(); }, true);
	}
	else
	{
	    AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseStripMenu(); }, true);
	    AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseStripMenu(); }, true);
	}

	AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);



    // LINK EVENT
	AddEvent("linkCollapseLink", "click", function (event) { CloseStripMenu(); CollapseLink(nStripID) });
	AddEvent("linkExpandLink", "click", function (event) { CloseStripMenu(); CollapseLink(nStripID) });
	AddEvent("linkMute", "click", function (event) { CloseStripMenu(); SetMute(nStripID, true) });
	AddEvent("linkUnlink", "click", function (event) { CloseStripMenu(); Unlink(nStripID) });
	AddEvent("linkUngroup", "click", function (event) { CloseStripMenu(); SetGroup(-1, nStripID) });
	AddEvent("linkGoToCue", "click", function (event) { CloseStripMenu(); SelectBus(nStripID / 2); });
	AddEvent("linkGoToMyCue", "click", function (event) { CloseStripMenu(); SelectBus(jsStrip.self_cue_id); });
	AddEvent("linkGoToReverbBus", "click", function (event) { CloseStripMenu(); SelectBus(MM_ID_REVERB_BUS); });
	AddEvent("linkGoToDynamicsBus", "click", function (event) { CloseStripMenu(); SelectBus(MM_ID_DYNAMICS_BUS); });
	AddEvent("linkMyInput", "click", function (event) { CloseStripMenu(); SetMyInput(nStripID) });
    AddEvent("linkPreamp", "click", function (event) { CloseStripMenu(); ShowPreamps(); });
	AddEvent("linkName", "click", function (event) { CloseStripMenu(); SetName(nStripID, false, true); });
	AddEvent("linkGroup", "click", function (event) { OpenGroupSelector(nStripID); });
	AddEvent("linkColor", "click", function (event) { OpenStripColorSelector(nStripID); });
	AddEvent("linkEditReverb", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, false, true, false, true, MM_ID_REVERB_BUS, false, -1, "reverb"); });
    AddEvent("linkEditDynamics", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, false, true, MM_ID_DYNAMICS_BUS, false, -1, "dynamics"); });
	AddEvent("linkEq", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "eq"); });
    AddEvent("linkDynamics", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "dynamics"); });
    AddEvent("linkDeesser", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "deesser"); });
	

    // STRIP EVENT
	AddEvent("stripCollapseLink", "click", function (event) { CloseStripMenu(); CollapseLink(nStripID) });
	AddEvent("stripExpandLink", "click", function (event) { CloseStripMenu(); CollapseLink(nStripID) });
	AddEvent("stripMute", "click", function (event) { CloseStripMenu(); SetMute(nStripID, false) });
	AddEvent("stripLinkWithLeft", "click", function (event) { CloseStripMenu(); LinkWithLeft(nStripID) });
	AddEvent("stripLinkWithRight", "click", function (event) { CloseStripMenu(); LinkWithRight(nStripID) });
	AddEvent("stripUnlink", "click", function (event) { CloseStripMenu(); Unlink(nStripID) });
	AddEvent("stripUngroup", "click", function (event) { CloseStripMenu(); SetGroup(-1, nStripID) });
	AddEvent("stripTalkInput", "click", function (event) { CloseStripMenu(); SetTalkInput(nStripID) });
	AddEvent("stripGoToMyCue", "click", function (event) { CloseStripMenu(); SelectBus(jsStrip.self_cue_id); });
	AddEvent("stripGoToReverbBus", "click", function (event) { CloseStripMenu(); SelectBus(MM_ID_REVERB_BUS); });
	AddEvent("stripGoToDynamicsBus", "click", function (event) { CloseStripMenu(); SelectBus(MM_ID_DYNAMICS_BUS); });
	AddEvent("stripMyInput", "click", function (event) { CloseStripMenu(); SetMyInput(nStripID) });
    AddEvent("stripPreamp", "click", function (event) { CloseStripMenu(); ShowPreamps(); });
	AddEvent("stripName", "click", function (event) { CloseStripMenu(); SetName(nStripID, false, false); });
	AddEvent("stripGroup", "click", function (event) { OpenGroupSelector(nStripID); });
	AddEvent("stripColor", "click", function (event) { OpenStripColorSelector(nStripID); });
	AddEvent("stripEditReverb", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, false, true, false, true, MM_ID_REVERB_BUS, false, -1, "reverb"); })
    AddEvent("stripEditDynamics", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, false, true, MM_ID_DYNAMICS_BUS, false, -1, "dynamics"); });
    AddEvent("stripEq", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "eq"); });
    AddEvent("stripDynamics", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "dynamics"); });
    AddEvent("stripDeesser", "click", function (event) { CloseStripMenu(); OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "deesser"); });

    AddEvent("busEQ", "click", function (event)
    {
        CloseStripMenu();

        var bBuildRev = jsStrip.id == MM_ID_FIRST_REVERB_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_REVERB_STRIP_RETURN;
        var bBuildDyn = jsStrip.id == MM_ID_FIRST_DYNAMICS_STRIP_RETURN || jsStrip.id == MM_ID_SECOND_DYNAMICS_STRIP_RETURN;

        var nBusID = -1;
        if (bBuildRev)
            nBusID = MM_ID_REVERB_BUS;
        else if (bBuildDyn)
            nBusID = MM_ID_DYNAMICS_BUS;

        OpenEffectsSection(true, bBuildDyn, bBuildRev, false, true, nBusID, false, -1, "eq");
    }
    );


	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CompleteMenuColumn(szColumnId, nNumberItem)
{  
    var eColumn = document.getElementById(szColumnId);
    if (eColumn)
    {
        for (var i = 0; i < nNumberItem; i++)
        {
            var eMenuItemTransparent = document.createElement("div");
            eMenuItemTransparent.classList.add("mixerSectionPopupMenuItem");
            eMenuItemTransparent.style.backgroundColor = "transparent";

            eColumn.appendChild(eMenuItemTransparent);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseStripMenu()
{
	ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CollapseLink(nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    if (jsInput.linked_input_id != -1)
    {
        var bCollapse = !jsInput.collapsed_link;
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + jsInput.id + ")][0]", value: { collapsed_link: bCollapse } });
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + jsInput.linked_input_id + ")][0]", value: { collapsed_link: bCollapse } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetMute(nStripID, bLink)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    if (bLink && jsInput.linked_input_id != -1)
    {
        var bMuteLink = !jsStrip.sends[g_nCurrentBusID].link_mute;
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0].sends[?(@.id==" + g_nCurrentBusID + ")][0]", value: { link_mute: bMuteLink } });
    }
    else
    {
        var bMuteStrip = !jsStrip.sends[g_nCurrentBusID].mute;
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0].sends[?(@.id==" + g_nCurrentBusID + ")][0]", value: { mute: bMuteStrip } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkWithLeft(nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    if (jsInput.linked_input_id == -1)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + nStripID + ")][0]", value: { _link_with_left: true } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkWithRight(nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    if (jsInput.linked_input_id == -1)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + nStripID + ")][0]", value: { _link_with_right: true } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Unlink(nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    if (jsInput.linked_input_id != -1)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + nStripID + ")][0]", value: { _unlink: true } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetGroup(nGroupID, nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    if (nGroupID != jsStrip.group_id)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0]", value: { group_id: nGroupID } });

        if (jsInput.linked_input_id != -1)
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + jsInput.linked_input_id + ")][0]", value: { group_id: nGroupID } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetStripColor(szColor, nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    if (szColor != jsStrip.color)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0]", value: { color: szColor } });

        if (jsInput.linked_input_id != -1)
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + jsInput.linked_input_id + ")][0]", value: { color: szColor } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetTalkInput(nStripID)
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.settings", value: { talk_input: ((jsMixer.settings.talk_input == nStripID) ? MM_ID_1ST_BUILTIN_MIC : nStripID) } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetMyInput(nStripID)
{
    var jsInput = GetInputJSON(nStripID);
    if (jsInput == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    var nSelfCueID = (jsStrip.self_cue_id != g_nCurrentBusID) ? g_nCurrentBusID : -1;

    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0]", value: { self_cue_id: nSelfCueID } });

    if (jsInput.linked_input_id != -1)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + jsInput.linked_input_id + ")][0]", value: { self_cue_id: nSelfCueID } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetName(nID, bGroup, bLink)
{
    if (bGroup & bLink)
    {
        return;
    }

    if (bGroup)
    {
        var jsGroup = GetGroupJSON(nID);
        if (jsGroup == null)
        {
            return;
        }

        var szName = prompt("NAME", jsGroup.name);

        if (szName != null)
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.groups[?(@.id==" + nID + ")][0]", value: { name: szName } });
    }
    else
    {        
        var jsStrip = GetStripJSON(nID);
        if (jsStrip == null)
        {
            return;
        }

        var szName = prompt("NAME", jsStrip.name);

        if (szName != null)
        {
            if (bLink)
            {
                var jsInput = GetInputJSON(nID);
                if (jsInput == null)
                {
                    return;
                }

                self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nID + ")][0]", value: { name: szName + "-L" } });

                if (jsInput.linked_input_id != -1)
                    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + jsInput.linked_input_id + ")][0]", value: { name: szName + "-R" } });
            }
            else
                self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nID + ")][0]", value: { name: szName } });
        }
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenGroupSelector(nStripID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }
   
    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eStrip = document.getElementById("strip" + nStripID);
    if (eStrip == null)
    {
        return;
    }

    var eStripButtonFoot = document.getElementById("strip" + nStripID + "-button-foot");
	if (eStripButtonFoot == null)
	{
		return;
	}

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }


    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = 500;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < 375 - g_nMixerMargin * 2)
    {
        nWidth = 375 - g_nMixerMargin * 2;
    }

    var nHeight = nWidth / 2;
    if (nHeight > nStripsHeight - Number(eStripButtonFoot.offsetHeight))
    {
        nHeight = nStripsHeight - Number(eStripButtonFoot.offsetHeight);
    }

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }

    var nTop = Number(eStrips.offsetTop) + Number(eStrip.offsetTop) + Number(eStrip.offsetHeight) - Number(eStripButtonFoot.offsetHeight) - g_nMixerMargin - nHeight;

    var nButtonMarge = (g_nElementsBorderWidth * 4);
    var nButtonGap = (g_nElementsBorderWidth * 8);
    var nButtonWidth = (nWidth - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;
    var nButtonHeight = (nHeight - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;

    var szPage = "";

    szPage += "<div class='mixerSectionPopup' id='mixerSectionPopup'>";

        szPage += "<div class='mixerSectionPopupGroupAndColorSelector' id='mixerSectionPopupGroupSelector' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorHeader' id='mixerSectionPopupGroupSelectorHeader' style='top: " + nButtonMarge + "px; left: " + nButtonMarge + "px; width: " + (4 * nButtonWidth + 3 * nButtonGap) + "px; height: " + nButtonHeight + "px; line-height: " + (nButtonHeight + g_nElementsBorderWidth) + "px;'>" + jsStrip.name + " : GROUP</div>";

            for (idx = 0; idx < jsGroups.length; idx++)
            {
                var nPosX = idx < 4 ? idx : idx - 4;
                var nPosY = idx < 4 ? 1 : 2;

                var szStyle = "style = 'top: " + (nButtonMarge + nPosY * nButtonGap + nPosY * nButtonHeight) + "px; left: " + (nButtonMarge + nPosX * nButtonGap + nPosX * nButtonWidth) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + (nButtonHeight + g_nElementsBorderWidth) + "px; background-color:" + jsGroups[idx].color + ";";
                szStyle += jsSettings.neumann_edition ? "border-color: " + jsGroups[idx].color + ";'" : "'";

                szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton' id='mixerSectionPopupGroupSelectorButton" + (idx + 1) + "' " + szStyle + ">" + jsGroups[idx].name + "</div>";
            }

            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton mixerSectionPopupGroupAndColorSelectorButtonNone' id='mixerSectionPopupGroupSelectorButtonNone' style='top: " + (nButtonMarge + 3 * nButtonGap + 3 * nButtonHeight) + "px; left: " + (nButtonMarge + 1 * nButtonGap + 1 * nButtonWidth) + "px; width: " + (2 * nButtonWidth + 1 * nButtonGap) + "px; height: " + nButtonHeight + "px; line-height: " + (nButtonHeight + g_nElementsBorderWidth * 2) + "px;'>NO GROUP</div>";

        szPage += "</div>";

    szPage += "</div>";



    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateGroupSelector(nStripID);


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseGroupSelector(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseGroupSelector(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseGroupSelector(); }, true);
    }

    AddEvent("mixerSectionPopupGroupSelector", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupGroupSelector", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupGroupSelector", "mousedown", function (event) { event.stopPropagation(); }, true);


    AddEvent("mixerSectionPopupGroupSelectorButton1", "click", function (event) { SetGroup(((jsStrip.group_id == 0) ? -1 : 0), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton2", "click", function (event) { SetGroup(((jsStrip.group_id == 1) ? -1 : 1), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton3", "click", function (event) { SetGroup(((jsStrip.group_id == 2) ? -1 : 2), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton4", "click", function (event) { SetGroup(((jsStrip.group_id == 3) ? -1 : 3), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton5", "click", function (event) { SetGroup(((jsStrip.group_id == 4) ? -1 : 4), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton6", "click", function (event) { SetGroup(((jsStrip.group_id == 5) ? -1 : 5), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton7", "click", function (event) { SetGroup(((jsStrip.group_id == 6) ? -1 : 6), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButton8", "click", function (event) { SetGroup(((jsStrip.group_id == 7) ? -1 : 7), nStripID); });
    AddEvent("mixerSectionPopupGroupSelectorButtonNone", "click", function (event) { SetGroup(-1, nStripID); });


    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroupSelector(nStripID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    var nGroupID = jsStrip.group_id;

    var eButtonNone = document.getElementById("mixerSectionPopupGroupSelectorButtonNone");
    if (eButtonNone)
    {
        eButtonNone.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");

        if (nGroupID == -1)
            eButtonNone.classList.add("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");
    }

    for (var i = 0; i < jsGroups.length; i++)
    {
        var eButton = document.getElementById("mixerSectionPopupGroupSelectorButton" + [i + 1]);
        if (eButton)
        {
            var nTop = Number(eButton.style.top.replace("px", ""));
            var nLeft = Number(eButton.style.left.replace("px", ""));
                    
            if (eButton.classList.contains("mixerSectionPopupGroupAndColorSelectorButtonChecked"))
            {
                if (i == nGroupID)
                    continue;

                eButton.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop + g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft + g_nElementsBorderWidth * 1.5) + "px";
                }
            }
            else if (i == nGroupID)
            {
                eButton.classList.add("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop - g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft - g_nElementsBorderWidth * 1.5) + "px";
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseGroupSelector()
{
    ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenStripColorSelector(nStripID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }
   
    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eStrip = document.getElementById("strip" + nStripID);
    if (eStrip == null)
    {
        return;
    }

    var eStripButtonFoot = document.getElementById("strip" + nStripID + "-button-foot");
	if (eStripButtonFoot == null)
	{
		return;
	}

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }


    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = 500;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < 375 - g_nMixerMargin * 2)
    {
        nWidth = 375 - g_nMixerMargin * 2;
    }

    var nHeight = nWidth / 2;
    if (nHeight > nStripsHeight - Number(eStripButtonFoot.offsetHeight))
    {
        nHeight = nStripsHeight - Number(eStripButtonFoot.offsetHeight);
    }

    var nLeft = g_nMixerMargin + (nStripsWidth - nWidth) / 2;
    if (nLeft + nWidth > (nStripsWidth + g_nMixerMargin * 2))
    {
        nLeft = g_nMixerMargin;
    }

    var nTop = Number(eStrips.offsetTop) + Number(eStrip.offsetTop) + Number(eStrip.offsetHeight) - Number(eStripButtonFoot.offsetHeight) - g_nMixerMargin - nHeight;

    var nButtonMarge = (g_nElementsBorderWidth * 4);
    var nButtonGap = (g_nElementsBorderWidth * 8);
    var nButtonWidth = (nWidth - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;
    var nButtonHeight = (nHeight - (g_nElementsBorderWidth * 2) - (2 * nButtonMarge) - (nButtonGap * 3)) / 4;
    var nMarginTop = ((nButtonHeight / 3) - (g_nElementsBorderWidth * 2));

    var szPage = "";

    szPage += "<div class='mixerSectionPopup' id='mixerSectionPopup'>";

        szPage += "<div class='mixerSectionPopupGroupAndColorSelector' id='mixerSectionPopupStripColorSelector' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorHeader' id='mixerSectionPopupColorSelectorHeader' style='top: " + nButtonMarge + "px; left: " + nButtonMarge + "px; width: " + (4 * nButtonWidth + 3 * nButtonGap) + "px; height: " + nButtonHeight + "px;'>";
                szPage += "<div class='' id='' style='margin-top: " + nMarginTop + "px;'>" + jsStrip.name + " : COLOR</div>";
            szPage += "</div>";

            for (idx = 0; idx < jsGroups.length; idx++)
            {
                var nPosX = idx < 4 ? idx : idx - 4;
                var nPosY = idx < 4 ? 1 : 2;

                var szStyle = "style='top: " + (nButtonMarge + nPosY * nButtonGap + nPosY * nButtonHeight) + "px; left: " + (nButtonMarge + nPosX * nButtonGap + nPosX * nButtonWidth) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; background-color: " + jsGroups[idx].color + ";";
                szStyle += jsSettings.neumann_edition ? "border-color: " + jsGroups[idx].color + ";'" : "'";

                szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton' id='mixerSectionPopupColorSelectorButton" + (idx + 1) + "' " + szStyle + "></div>";
            }
            
            szPage += "<div class='mixerSectionPopupGroupAndColorSelectorButton mixerSectionPopupGroupAndColorSelectorButtonNone' id='mixerSectionPopupColorSelectorButtonNone' style='top: " + (nButtonMarge + 3 * nButtonGap + 3 * nButtonHeight) + "px; left: " + (nButtonMarge + 1 * nButtonGap + 1 * nButtonWidth) + "px; width: " + (2 * nButtonWidth + 1 * nButtonGap) + "px; height: " + nButtonHeight + "px;'>";
                szPage += "<div class='' id='' style='margin-top: " + nMarginTop + "px;'>NO COLOR</div>";
            szPage += "</div>";

        szPage += "</div>";

    szPage += "</div>";



    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateStripColorSelector(nStripID);


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseStripColorSelector(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseStripColorSelector(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseStripColorSelector(); }, true);
    }

    AddEvent("mixerSectionPopupStripColorSelector", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupStripColorSelector", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupStripColorSelector", "mousedown", function (event) { event.stopPropagation(); }, true);


    AddEvent("mixerSectionPopupColorSelectorButton1", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[0].color) ? "#000000" : jsGroups[0].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton2", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[1].color) ? "#000000" : jsGroups[1].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton3", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[2].color) ? "#000000" : jsGroups[2].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton4", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[3].color) ? "#000000" : jsGroups[3].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton5", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[4].color) ? "#000000" : jsGroups[4].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton6", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[5].color) ? "#000000" : jsGroups[5].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton7", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[6].color) ? "#000000" : jsGroups[6].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButton8", "click", function (event) { SetStripColor(((jsStrip.color == jsGroups[7].color) ? "#000000" : jsGroups[7].color), nStripID); });
    AddEvent("mixerSectionPopupColorSelectorButtonNone", "click", function (event) { SetStripColor("#000000", nStripID); });


    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripColorSelector(nStripID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsGroups = GetGroupJSON(-1);
    if (jsGroups == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nStripID);
    if (jsStrip == null)
    {
        return;
    }

    var szColor = jsStrip.color;

    var eButtonNone = document.getElementById("mixerSectionPopupColorSelectorButtonNone");
    if (eButtonNone)
    {
        eButtonNone.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");

        if (szColor == "#000000" || szColor == "#343434")
            eButtonNone.classList.add("mixerSectionPopupGroupAndColorSelectorButtonNoneChecked");
    }

    for (var i = 0; i < jsGroups.length; i++)
    {
        var eButton = document.getElementById("mixerSectionPopupColorSelectorButton" + [i + 1]);
        if (eButton)
        {
            var nTop = Number(eButton.style.top.replace("px", ""));
            var nLeft = Number(eButton.style.left.replace("px", ""));
            var szButtonColorHEX = ConvertRGBToHEX(eButton.style.backgroundColor);
                    
            if (eButton.classList.contains("mixerSectionPopupGroupAndColorSelectorButtonChecked"))
            {
                if (szButtonColorHEX == szColor)
                    continue;

                eButton.classList.remove("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop + g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft + g_nElementsBorderWidth * 1.5) + "px";
                }
            }
            else if (szButtonColorHEX == szColor)
            {
                eButton.classList.add("mixerSectionPopupGroupAndColorSelectorButtonChecked");

                if (jsSettings.neumann_edition)
                {
                    eButton.style.top = Number(nTop - g_nElementsBorderWidth * 2) + "px";
                    eButton.style.left = Number(nLeft - g_nElementsBorderWidth * 1.5) + "px";
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseStripColorSelector()
{
    ClosePopupContainer();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenGroupMenu(nGroupID)
{
	var jsGroup = GetGroupJSON(nGroupID);
	if (jsGroup == null)
	{
		return;
	}

	var jsStrips = GetStripJSON(-1);
	if (jsStrips == null)
	{
	    return;
	}

	var bGroupMuted = false;
	for (var i = 0; i < jsStrips.length; i++)
	{
	    var eStrip = jsStrips[i];

	    if (eStrip.group_id != -1 && eStrip.group_id == nGroupID)
	    {
	        bGroupMuted = eStrip.sends[g_nCurrentBusID].group_mute;
	        break;
	    }
	}

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eMasters = document.getElementById("masters");
	if (eMasters == null)
	{
	    return;
	}

	var eStrip = document.getElementById("group" + nGroupID);
	if (eStrip == null)
	{
		return;
	}

	var eStripButtonFoot = document.getElementById("group" + nGroupID + "-button-foot");
	if (eStripButtonFoot == null)
	{
		return;
	}


	var nWidth = g_nStripWidth * 2;

	var nLeft = Number(eStrips.offsetLeft) + Number(eStrip.offsetLeft) + g_isStripsScroller.x;
	var nTop = Number(eStrips.offsetTop) + Number(eStrip.offsetTop) + Number(eStrip.offsetHeight) - Number(eStripButtonFoot.offsetHeight) - (g_nStripWidth / 1.2);

	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px;'>";

		    szPage += "<div class='mixerSectionPopupMenuItem' id='groupClear'>CLEAR GROUP</div>";
		    szPage += "<div class='mixerSectionPopupMenuItem' id='groupName'>NAME</div>";
		    szPage += "<div class='mixerSectionPopupMenuItem' id='groupCollapse'>";

			    if (jsGroup.collapsed_on_bus[g_nCurrentBusID])
			    {
				    szPage += "EXPAND";
			    }
			    else
			    {
				    szPage += "COLLAPSE";
			    }

		    szPage += "</div>";
		    szPage += "<div class='mixerSectionPopupMenuItem" + (bGroupMuted ? " mixerSectionPopupMenuItemCheckedRed" : "") + "' id='groupMute'>MUTE</div>";

		szPage += "</div>";

	szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;


	var ePopupMenu = document.getElementById("mixerSectionPopupMenu");
	var ePopupMenuStyle = ePopupMenu.style;
	var szPopupHeight = ePopupMenu.offsetHeight;

    ePopupMenuStyle.setProperty("top", Number(eStrips.offsetTop) + Number(eStrip.offsetTop) + Number(eStrip.offsetHeight) - Number(eStripButtonFoot.offsetHeight) - g_nElementsBorderWidth * 8.5 - Number(szPopupHeight) + "px");


	
    var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
	    AddEvent("mixerSectionPopup", "click", function (event) { CloseGroupMenu(); }, true);
	}
	else
	{
	    AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseGroupMenu(); }, true);
	    AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseGroupMenu(); }, true);
	}

	AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);


	AddEvent("groupCollapse", "click", function (event) { CloseGroupMenu(); CollapseGroup(nGroupID) });
	AddEvent("groupMute", "click", function (event) { CloseGroupMenu(); MuteGroup(nGroupID) });
	AddEvent("groupName", "click", function (event) { CloseGroupMenu(); SetName(nGroupID, true, false); });

	AddEvent("groupClear", "click", function (event)
	{
	    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	    if (eMixerSectionPopupContainer == null)
	    {
	        return;
	    }

	    eMixerSectionPopupContainer.innerHTML = MakeValidationChoicePopup("Remove all strips from " + jsGroup.name + " ?");

	    var ePopupValidationChoice = document.getElementById("mixerSectionPopupValidationChoice");
	    var ePopupValidationChoiceStyle = ePopupValidationChoice.style;
	    var szPopupHeight = ePopupValidationChoice.offsetHeight;
	    var szPopupWidth = ePopupValidationChoice.offsetWidth;

	    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;

	    var nLeft = g_nMixerMargin + (nStripsWidth - szPopupWidth) / 2;
	    if (nLeft + szPopupWidth > (nStripsWidth + g_nMixerMargin * 2))
	    {
	        nLeft = g_nMixerMargin;
	    }
        
	    var nTop = Number(eStrips.offsetTop) + Number(eStrip.offsetTop) + Number(eStrip.offsetHeight) - Number(eStripButtonFoot.offsetHeight) - g_nMixerMargin - Number(szPopupHeight);

	    ePopupValidationChoiceStyle.setProperty("left", nLeft + "px");
	    ePopupValidationChoiceStyle.setProperty("top", nTop + "px");

	    AddEvent("mixerSectionPopupValidationChoiceButtonNo", "click", function (event) { ClosePopupContainer(); });
	    AddEvent("mixerSectionPopupValidationChoiceButtonYes", "click", function (event) { ClearGroup(nGroupID); ClosePopupContainer(); });
	});

    
	ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseGroupMenu()
{
	ClosePopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CollapseGroup(nGroupID)
{
    var jsGroup = GetGroupJSON(nGroupID);
    if (jsGroup == null)
    {
        return;
    }

    var jsCollapsed_on_bus = new Array(12);
    for (var i = 0; i < 12; i++)
    {
        jsCollapsed_on_bus[i] = jsGroup.collapsed_on_bus[i];
    }
    jsCollapsed_on_bus[g_nCurrentBusID] = !jsCollapsed_on_bus[g_nCurrentBusID];

    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.groups[?(@.id==" + nGroupID + ")][0]", value: { collapsed_on_bus: jsCollapsed_on_bus } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MuteGroup(nGroupID)
{
    var jsStrips = GetStripJSON(-1);
    if (jsStrips == null)
    {
        return;
    }

    var nStripID = -1;
    var bGroupMuted = false;
    for (var i = 0; i < jsStrips.length; i++)
    {
        var eStrip = jsStrips[i];

        if (eStrip.group_id !=-1 && eStrip.group_id == nGroupID)
        {
            nStripID = eStrip.id;
            bGroupMuted = eStrip.sends[g_nCurrentBusID].group_mute;
            break;
        }
    }

    if (nStripID != -1)
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + nStripID + ")][0].sends[?(@.id==" + g_nCurrentBusID + ")][0]", value: { group_mute: !bGroupMuted } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClearGroup(nGroupID)
{
    var jsStrips = GetStripJSON(-1);
    if (jsStrips == null)
    {
        return;
    }

    for (var i = 0; i < jsStrips.length; i++)
    {
        if (jsStrips[i].group_id == nGroupID)
            self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id==" + jsStrips[i].id + ")][0]", value: { group_id: -1 } });
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MakeValidationChoicePopup(szTitle)
{
    var eStrips = document.getElementById("strips");
    if (eStrips == null)
    {
        return;
    }

    var eMasters = document.getElementById("masters");
    if (eMasters == null)
    {
        return;
    }

    var nStripsWidth = window.innerWidth - eMasters.offsetWidth - g_nMixerMargin * 2;
    var nStripsHeight = window.innerHeight - Number(eStrips.offsetTop) - g_nMixerMargin * 2;

    var nWidth = 415;
    if (nWidth > (nStripsWidth - g_nMixerMargin * 2))
    {
        nWidth = (nStripsWidth - g_nMixerMargin * 2);
    }
    if (nWidth < 375 - g_nMixerMargin * 2)
    {
        nWidth = 375 - g_nMixerMargin * 2;
    }

    var r = document.querySelector(':root');
    var szButtonHeight = r.style.getPropertyValue("--strip-button-height");
    var nButtonHeight = Number(szButtonHeight.replace("px", ""));

    var nHeight = nWidth / 2.5;
    if (nHeight > nStripsHeight - nButtonHeight)
    {
        nHeight = nStripsHeight - nButtonHeight;
    }
    
    var nButtonWidth = (nWidth - (g_nElementsBorderWidth * 2)) / 3.5;
    var nButtonMarge = (nButtonWidth / 4);
    var nButtonHeight = (nHeight - (g_nElementsBorderWidth * 2) - (nButtonMarge * 2.5)) / 2;
    var nButtonGap = nButtonWidth;
    var nMarginTopHeader = (((nButtonHeight + nButtonMarge) / 3) - (g_nElementsBorderWidth * 2));

    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";
        
        szPage += "<div id='mixerSectionPopupValidationChoice' class='mixerSectionPopupValidationChoice' style='top: " + 0 + "px; left: " + 0 + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='mixerSectionPopupValidationChoiceHeader' id='mixerSectionPopupValidationChoiceHeader' style='left: " + nButtonMarge + "px; width: " + (3 * nButtonWidth) + "px; height: " + (nButtonHeight + nButtonMarge) + "px;'>";
                szPage += "<div class='' id='' style='margin-top: " + nMarginTopHeader + "px;'>" + szTitle + "</div>";
            szPage += "</div>";
            
            szPage += "<div class='mixerSectionPopupValidationChoice mixerSectionPopupValidationChoiceButton' id='mixerSectionPopupValidationChoiceButtonYes' style='top: " + (nButtonHeight * 1.5 + nButtonMarge) + "px; left: " + nButtonMarge + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight + (nButtonMarge / 4)) + "px; line-height: " + (nButtonHeight + (nButtonMarge / 4)) + "px;'>YES</div>";

            szPage += "<div class='mixerSectionPopupValidationChoice mixerSectionPopupValidationChoiceButton' id='mixerSectionPopupValidationChoiceButtonNo' style='top: " + (nButtonHeight * 1.5 + nButtonMarge) + "px; left: " + (nButtonMarge + nButtonWidth + nButtonGap) + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight + (nButtonMarge / 4)) + "px; line-height: " + (nButtonHeight + (nButtonMarge / 4)) + "px;'>NO</div>";

        szPage += "</div>";

    szPage += "</div>";
   
    return szPage;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetExportSnapshot_FileName(szName, szCategory, nID)
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var szFileName = (szName == "" ? "" : szName + "_");
    if (szCategory == "preset")
    {
        szFileName += "Preset";
    }
    else if (szCategory == "eq")
    {
        szFileName += "EQ";
    }
    else if (szCategory == "reverb")
    {
        szFileName += "Reverb";
    }
    else if (szCategory == "dynamics")
    {
        szFileName += "Dynamics";
    }
    else if (szCategory == "deesser")
    {
        szFileName += "Deesser";
    }
    else if (szCategory == "eventide_blackhole")
    {
        szFileName += "Eventide_Blackhole";
    }    

    szFileName += "_" + (nID + 1).toString();
    szFileName += (jsMixer.settings.neumann_edition ? '.NeuMi' : '.MuMi');

    return szFileName;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nPreampPopupGainScaleHeight = 0;
var g_nPreampPopupGainScaleMin = 0;
var g_nPreampPopupGainScaleMax = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPreampRotaryControl(eGain, nStripID, nModuleID, nChannelID)
{
    var eGainRotaryValue = document.getElementById(eGain.id + "-value");
    if (eGainRotaryValue && eGainRotaryValue.classList.contains("strip-send-rotary-value-disabled"))
    {
        return;
    }

    var ePadButton = document.getElementById("strip" + nStripID + "-module" + nModuleID + "-channel" + nChannelID + "-preamp-pad");
    if (ePadButton == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
	}

    var jsChannels;
    var szModuleName;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
        if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null && jsModules[nIdx].custom.ins.channels[nChannelID] != null)
        {
            jsChannels = jsModules[nIdx].custom.ins.channels;
            szModuleName = jsModules[nIdx].name;
			break;
        }
    }
    var jsChannel = jsChannels[nChannelID];
    if (jsChannel == null)
    {
        return;
    }

    var bAddPadButtons = jsChannel.inputMode == 0 && !ePadButton.classList.contains("strip-button-preamp-disabled");


	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eMixer = document.getElementById("mixer");
	if (eMixer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}


	var nWidth = g_nStripWidth * 2.1;
    var nHeight = 350;

    var eStrip = document.getElementById("strip" + nStripID);
	var nLeft = Number(eStrips.offsetLeft) + Number(eStrip.offsetLeft) + g_isStripsScroller.x - g_nStripWidth * .2;
    var nTop = Number(eMixer.offsetTop) + Number(eStrips.offsetTop) + Number(eGain.offsetTop) - g_nStripWidth * .2;

    if (nTop + nHeight > eStrip.offsetHeight)
        nTop = eStrip.offsetHeight - nHeight;

    var nScaleMargin = 20;
    g_nPreampPopupGainScaleMin = eGain.min;
    g_nPreampPopupGainScaleMax = eGain.max;
    g_nPreampPopupGainScaleHeight = nHeight + 23 - 2 * nScaleMargin;


	var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

		szPage += "<div id='mixerSectionPopupPreampRotaryControl' class='mixerSectionPopupSendRotaryControl' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div id='mixerSectionPopupPreampRotaryControlRotary' class='mixerSectionPopupPreampRotaryControlRotary' style='margin-bottom: calc(" + nHeight + "px - var(--strip-width) - var(--strip-button-width) * " + (bAddPadButtons ? "4" : "1") + " + " + (bAddPadButtons ? "30" : "12") + "px);'>";

                if (bNeumannEdition)
                    szPage += "<canvas id='neumann-mixerSectionPopupPreampRotaryControlRotaryCanvas' width='" + g_nStripsWidth + "' height='" + g_nStripsWidth + "' class='mixerSectionPopupSendRotaryControlRotaryCanvas' style='top: -5%;'></canvas>";

				szPage += "<canvas id='mixerSectionPopupPreampRotaryControlRotaryCanvas' width='" + g_nStripsWidth + "' height='" + g_nStripsWidth + "' class='mixerSectionPopupSendRotaryControlRotaryCanvas'>";
				szPage += "</canvas>";

				szPage += "<div id='mixerSectionPopupPreampRotaryControlRotaryTitle' class='mixerSectionPopupPreampRotaryControlRotaryTitle'>";
					szPage += "GAIN 1";
				szPage += "</div>";

				szPage += "<div id='mixerSectionPopupPreampRotaryControlRotaryValue' class='mixerSectionPopupSendRotaryControlRotaryValue'>";
					szPage += "0.0";
				szPage += "</div>";

			szPage += "</div>";    


            if (bAddPadButtons) // mic
            {
                szPage += "<div id='preampSetPadMode0' class='mixerSectionPopupPreampRotaryControlMenuItem" + (bNeumannEdition ? " mixerSectionPopupPreampRotaryControlMenuItem2Lines" : "") + "'></div>";
                szPage += "<div id='preampSetPadMode1' class='mixerSectionPopupPreampRotaryControlMenuItem" + (bNeumannEdition ? " mixerSectionPopupPreampRotaryControlMenuItem2Lines" : "") + "'></div>";
                szPage += "<div id='preampSetPadMode2' class='mixerSectionPopupPreampRotaryControlMenuItem" + (bNeumannEdition ? " mixerSectionPopupPreampRotaryControlMenuItem2Lines" : "") + "'></div>";
            }
			szPage += "<div class='mixerSectionPopupPreampRotaryControlMenuItem' id='preampGainSet'>SET</div>";


			szPage += "<div class='mixerSectionPopupSendRotaryControlSlider' id='mixerSectionPopupPreampRotaryControlSlider' style='top: " + nScaleMargin + "px;'>";

				szPage += "<div class='mixerSectionPopupSendRotaryControlSliderScale' style='height: " + g_nPreampPopupGainScaleHeight + "px;'>";

					for (var s = 0; s <= 6; s++)
                    {
                        var nTop = (6 + s * 12) * g_nPreampPopupGainScaleHeight / ((g_nPreampPopupGainScaleMax - g_nPreampPopupGainScaleMin) / 10.) - ((g_nPreampPopupGainScaleHeight / 5) / 7) + 2;
                        szPage += "<div id='mixerSectionPopupPreampRotaryControlSliderScaleNumber" + s + "' class='mixerSectionPopupPreampRotaryControlSliderScaleNumbers' style='top: " + nTop + "px; height: " + (g_nPreampPopupGainScaleHeight / 5) / 3 + "px; line-height: " + (g_nPreampPopupGainScaleHeight / 5) / 3 + "px;'></div>";
                    }

    				for (var s = 0; s < 22;  s++)
                    {
                        if (s != 2 && s != 6 && s != 10 && s != 14 && s != 18)
                        {
                            var nTop = s * 3 * (g_nPreampPopupGainScaleHeight / ((g_nPreampPopupGainScaleMax - g_nPreampPopupGainScaleMin) / 10.)) - 3;

                            szPage += "<div class='mixerSectionPopupPreampRotaryControlSliderScaleStep' style='top: " + nTop + "px; height: " + (g_nPreampPopupGainScaleHeight / 6) / 12 + "px;'>";
						    szPage += "</div>";
                        }
					}

				szPage += "</div>";

                szPage += "<div class='mixerSectionPopupSendRotaryControlSliderKnobTrace' id='mixerSectionPopupPreampRotaryControlSliderKnobTrace'>";
                szPage += "</div>";

                if (bNeumannEdition)
				{
                    szPage += "<div id='mixerSectionPopupPreampRotaryControlSliderKnob' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
					szPage += "</div>";

                    szPage += "<div id='mixerSectionPopupPreampRotaryControlSliderKnob2' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
					szPage += "</div>";

                    szPage += "<div id='mixerSectionPopupPreampRotaryControlSliderKnob3' class='mixerSectionPopupSendRotaryControlSliderKnobLine'>";
					szPage += "</div>";
				}
				else
                {
                    szPage += "<div id='mixerSectionPopupPreampRotaryControlSliderKnob' class='mixerSectionPopupSendRotaryControlSliderKnob'>";
                    szPage += "</div>";
                }

			szPage += "</div>";

		szPage += "</div>";

	szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;


    var ePopupGain0 = document.getElementById("mixerSectionPopupPreampRotaryControlRotary");
    if (ePopupGain0)
    {
        ePopupGain0.min = eGain.min;
        ePopupGain0.max = eGain.max;
    }

    UpdatePreampRotaryControl(jsChannels, nChannelID, szModuleName);


	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function(event) { ClosePreampRotaryControl(); }, true);
	}
	else
	{
        AddEvent("mixerSectionPopup", "touchstart", function (event) { ClosePreampRotaryControl(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { ClosePreampRotaryControl(); }, true);
	}

    AddEvent("mixerSectionPopupPreampRotaryControl", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupPreampRotaryControl", "touchstart", function(event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupPreampRotaryControl", "mousedown", function(event) { event.stopPropagation(); }, true);

	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "touchstart", function(event) { PreampRotaryControlMouseDown(event, nModuleID, nChannelID, true); } );
	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "touchmove", function(event) { PreampRotaryControlMouseMove(event, true); } );
	AddEvent("mixerSection", "touchmove", function(event) { PreampRotaryControlMouseMove(event, true); } );
	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "touchend", function(event) { PreampRotaryControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchend", function(event) { PreampRotaryControlMouseUp(event); } );
	AddEvent("mixerSectionPopup", "touchcancel", function(event) { PreampRotaryControlMouseUp(event); } );

	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "mousedown", function(event) { PreampRotaryControlMouseDown(event, nModuleID, nChannelID, false); } );
	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "mousemove", function(event) { PreampRotaryControlMouseMove(event, false); } );
	AddEvent("mixerSectionPopup", "mousemove", function(event) { PreampRotaryControlMouseMove(event, false); } );
	AddEvent("mixerSectionPopupPreampRotaryControlSlider", "mouseup", function(event) { PreampRotaryControlMouseUp(event); } );

	AddEvent("mixerSectionPopup", "mouseup", function(event) { PreampRotaryControlMouseUp(event); } );
    AddEvent("mixerSectionPopup", "mouseleave", function (event) { PreampRotaryControlMouseUp(event); });


    if (bAddPadButtons) // mic
    {
        AddEvent("preampSetPadMode0", "click", function () { SetPadMode(0, nModuleID, nChannelID); });
        AddEvent("preampSetPadMode1", "click", function () { SetPadMode(1, nModuleID, nChannelID); });
        AddEvent("preampSetPadMode2", "click", function () { SetPadMode(2, nModuleID, nChannelID);});
    }

    AddEvent("preampGainSet", "click", function(event)
    {
        var nGain = eGain.min;
        if (jsChannel.inputMode == 0) // mic
        {
            nGain = jsChannel.micGain;
        }
        else if (jsChannel.inputMode == 1) // line
        {
            nGain = jsChannel.lineGain;
		}
        else if (jsChannel.inputMode == 2) // instrument
        {
            nGain = jsChannel.instrumentGain;
        }

        var nPadMode = 1;
        if (jsChannel.hasOwnProperty("lift") && jsChannel.lift)
        {
	        nPadMode = 0;
        }
        else if (jsChannel.hasOwnProperty("pad") && jsChannel.pad)
        {
	        nPadMode = 2;
        }

        PromptPreampGain(nModuleID, nChannelID, jsChannel.inputMode, nPadMode, nGain, eGain.min, eGain.max);
        ClosePreampRotaryControl();
	} );	

    g_szSelectedRotaryID = eGain.id;

    ShowPopupContainer();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nPreampRotaryControlMouseDownKnobGain = 0;
var g_nPreampRotaryControlMouseDownKnobPos = 0;
var g_nPreampRotaryControlMouseDownClick = 0;

var g_nCapturedPreampRotaryControlModuleID = -1;
var g_nCapturedPreampRotaryControlChannelID = -1;
var g_nCapturedPreampRotaryControlInputMode = -1;

var g_nPreampRotaryControlHeight = 0;

var g_tPreampRotaryControlGroupGainOffsets = new Array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampRotaryControlMouseDown(event, nModuleID, nChannelID, bTouch)
{
    var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
	}

	var jsChannel;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
        if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null && jsModules[nIdx].custom.ins.channels[nChannelID] != null)
        {
            jsChannel = jsModules[nIdx].custom.ins.channels[nChannelID];
			break;
        }
    }

    var nGain = 0;
    if (jsChannel.inputMode == 0) // mic
    {
        nGain = jsChannel.micGain;
    }
    else if (jsChannel.inputMode == 1) // line
    {
        nGain = jsChannel.lineGain;
    }
    else if (jsChannel.inputMode == 2) // instrument
    {
        nGain = jsChannel.instrumentGain;
    }

	
    g_nPreampRotaryControlMouseDownKnobGain = nGain;

    FillPreampGroupGainOffsetsArray(nModuleID, nChannelID, nGain);

	var eSliderKnob = document.getElementById("mixerSectionPopupPreampRotaryControlSliderKnob");
	if (eSliderKnob == null)
	{
		return;
    }
	g_nPreampRotaryControlMouseDownKnobPos = Number(eSliderKnob.style.top.replace("px", "")) + g_nStripFaderKnobHeight / 2;


    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nPreampRotaryControlMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
		g_nPreampRotaryControlMouseDownClick = event.pageY;
	}

    g_nCapturedPreampRotaryControlModuleID = nModuleID;
    g_nCapturedPreampRotaryControlChannelID = nChannelID;
    g_nCapturedPreampRotaryControlInputMode = jsChannel.inputMode;

	event.stopPropagation();

    g_nPublishPreampRotaryTimer = window.setInterval(OnTimerPublishPreampRotaryControl, 50);
}

var g_bPreampRotaryControlMouseMove = false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampRotaryControlMouseMove(event, bTouch)
{
    if (g_nCapturedPreampRotaryControlModuleID == -1 || g_nCapturedPreampRotaryControlChannelID == -1 || g_nCapturedPreampRotaryControlInputMode == -1)
	{
		return;
    }

	var nMove = 0;
    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		nMove = event.targetTouches[0].clientY - g_nPreampRotaryControlMouseDownClick;
	}
	else
	{
		nMove = event.pageY - g_nPreampRotaryControlMouseDownClick;
    }

    nMove /= 2;

	var nNewPos = g_nPreampRotaryControlMouseDownKnobPos + nMove;

    var nNewGain = PreampRotaryControlPosToGain(nNewPos) * 10;

	nNewGain = Math.trunc(nNewGain);
	
    nNewGain = Number(nNewGain);

    if (nNewGain % 5 == 0 || nNewGain % 5 == 5)
    {
        g_bPreampRotaryControlMouseMove = true;

        UpdatePreampRotaryControlSlider(nNewGain);
        PublishPreampRotaryControl(nNewGain);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampRotaryControlMouseUp(event)
{
    if (g_nCapturedPreampRotaryControlModuleID == -1 || g_nCapturedPreampRotaryControlChannelID == -1 || g_nCapturedPreampRotaryControlInputMode == -1)
	{
		return;
    }

    g_bPreampRotaryControlMouseMove = false;

	clearTimeout(g_nPublishPreampRotaryTimer);
	g_nPublishPreampRotaryTimer = null;
	g_nLastPublishedPreampRotary = null;
	g_nLastSendPreampRotary = null;

	g_nCapturedPreampRotaryControlModuleID = -1;
	g_nCapturedPreampRotaryControlChannelID = -1;
    g_nCapturedPreampRotaryControlInputMode = -1;

	event.stopPropagation();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedPreampRotary = null;
var g_nLastSendPreampRotary = null;
var g_nPublishPreampRotaryTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishPreampRotaryControl(nNewGain)
{
	g_nLastPublishedPreampRotary = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishPreampRotaryControl()
{
    if (g_nCapturedPreampRotaryControlModuleID == -1 || g_nCapturedPreampRotaryControlChannelID == -1 || g_nCapturedPreampRotaryControlInputMode == -1)
	{
		return;
	}

	if (g_nLastPublishedPreampRotary == g_nLastSendPreampRotary)
	{
		return;
	}

	if (g_nLastPublishedPreampRotary == null)
	{
		return;
    }

    SetPreampGain(g_nCapturedPreampRotaryControlModuleID, g_nCapturedPreampRotaryControlChannelID, g_nCapturedPreampRotaryControlInputMode, g_nLastPublishedPreampRotary, g_nPreampPopupGainScaleMin, g_nPreampPopupGainScaleMax, false);

	g_nLastSendPreampRotary = g_nLastPublishedPreampRotary;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampRotaryControl(jsChannels, nCurrentChannelID, szModuleName)
{
    var eRotaryControl = document.getElementById("mixerSectionPopupPreampRotaryControl");
	if (eRotaryControl == null)
    {
        return;
	}

    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsChannel = jsChannels[nCurrentChannelID];
    if (jsChannel == null)
    {
        return;
    }

    var nGain = 0;
    var nGainOffset = 0;
    var nPadMode = 1;

    if (jsChannel.hasOwnProperty("lift") && jsChannel.lift)
	{
		nPadMode = 0;
    }
	else if (jsChannel.hasOwnProperty("pad") && jsChannel.pad)
	{
		nPadMode = 2;
    }

    if (bNeumannEdition)
    {
		switch (nPadMode)
		{
			case 0: // lift
			{
				nGainOffset = 120;
				break;
			}

			case 1: // neutral
			{
				break;
			}

			case 2: // pad
			{
				nGainOffset = -120;
				break;
			}
		}
    }

	var nInputMode = 0;
	if (jsChannel.hasOwnProperty("inputMode"))
		nInputMode = jsChannel.inputMode;

	switch (nInputMode)
	{
		case 0: // mic
		{
			if (jsChannel.hasOwnProperty("micGain"))
				nGain = jsChannel.micGain;
			break;
		}

		case 1: // line
		{
			if (jsChannel.hasOwnProperty("lineGain"))
				nGain = jsChannel.lineGain;
			break;
		}

		case 2: // instrument
		{
			if (jsChannel.hasOwnProperty("instrumentGain"))
				nGain = jsChannel.instrumentGain;
			break;
		}
    }

    var eGainRotaryValue = document.getElementById("mixerSectionPopupPreampRotaryControlRotaryValue");
	if (eGainRotaryValue)
    {	
        eGainRotaryValue.innerText = Number((nGain + (nInputMode == 0 ? nGainOffset : 0)) / 10.).toFixed(1);
	}

    var cColor = "";
    var eGainRotaryTitle = document.getElementById("mixerSectionPopupPreampRotaryControlRotaryTitle");
	if (eGainRotaryTitle)
    {
        var szTitle = szModuleName;
        if (jsChannels.length > 1)
        {
            if (bNeumannEdition)
            {
                szTitle = szTitle.toUpperCase() + "\n" + (nCurrentChannelID + 1);
            }
            else
            {
                if (jsChannels.length == 2)
                {
                    szTitle += "\n" + (nCurrentChannelID == 0 ? "Left" : "Right");
                }
                else
                {
                    szTitle += "\n" + (nCurrentChannelID + 1);
                }
            }
        }            
        eGainRotaryTitle.innerText = szTitle;

        cColor = bNeumannEdition ? "#ae262f" : "#ad4006";

        eGainRotaryTitle.style.color = bNeumannEdition ? "#e3e3e3" : cColor;
    }

    if (!g_bPreampRotaryControlMouseMove)
        UpdatePreampRotaryControlSlider(nGain);

    if (nInputMode == 0)
    {
        var ePadMod0 = document.getElementById("preampSetPadMode0");
        var ePadMod1 = document.getElementById("preampSetPadMode1");
        var ePadMod2 = document.getElementById("preampSetPadMode2");
        if (ePadMod0 && ePadMod1 && ePadMod2)
        {
            ePadMod0.innerText = (bNeumannEdition ? "PAD\nOFF" : "Boost");
            ePadMod1.innerText = (bNeumannEdition ? "PAD\n-12dB" : "None");
            ePadMod2.innerText = (bNeumannEdition ? "PAD\n-24dB" : "Pad");

            nPadMode == 0 ? ePadMod0.classList.add("mixerSectionPopupPreampRotaryControlMenuItemChecked") : ePadMod0.classList.remove("mixerSectionPopupPreampRotaryControlMenuItemChecked");
            nPadMode == 1 ? ePadMod1.classList.add("mixerSectionPopupPreampRotaryControlMenuItemChecked") : ePadMod1.classList.remove("mixerSectionPopupPreampRotaryControlMenuItemChecked");
            nPadMode == 2 ? ePadMod2.classList.add("mixerSectionPopupPreampRotaryControlMenuItemChecked") : ePadMod2.classList.remove("mixerSectionPopupPreampRotaryControlMenuItemChecked");
        }
    }

    for (var s = 0; s <= 6; s++)
    {
        var eScale = document.getElementById("mixerSectionPopupPreampRotaryControlSliderScaleNumber" + s);
        if (eScale)
        {
            var nNumber = (g_nPreampPopupGainScaleMax + nGainOffset - 60) / 10. - s * 12;

            eScale.innerText = nNumber;
        }
    }    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampRotaryControlSlider(nGain)
{
    var eRotaryControl = document.getElementById("mixerSectionPopupPreampRotaryControl");
	if (eRotaryControl == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;


    var nGainOffsetMin = 0;
    var nGainOffsetMax = 0;
    for (nIdx = 0; nIdx < g_tPreampRotaryControlGroupGainOffsets.length; nIdx++)
    {
        nGainOffsetMin = Math.min(nGainOffsetMin, g_tPreampRotaryControlGroupGainOffsets[nIdx][3]);
        nGainOffsetMax = Math.max(nGainOffsetMax, g_tPreampRotaryControlGroupGainOffsets[nIdx][3]);
    }

    if (nGain - nGainOffsetMin > g_nPreampPopupGainScaleMax)
    {        
        return;
    }
    if (nGain - nGainOffsetMax < g_nPreampPopupGainScaleMin)
    {
        return;
    }

    DrawPreampRotary("mixerSectionPopupPreampRotaryControlRotary", "mixerSectionPopupPreampRotaryControlRotaryCanvas", nGain, true, false, jsSettings.neumann_edition);

    cColor = bNeumannEdition ? "#ae262f" : "#ad4006";

    var eSlider = document.getElementById("mixerSectionPopupPreampRotaryControlSlider");
    var eSliderKnob = document.getElementById("mixerSectionPopupPreampRotaryControlSliderKnob");
    var eSliderKnobTrace = document.getElementById("mixerSectionPopupPreampRotaryControlSliderKnobTrace");
	if (eSlider && eSliderKnob && eSliderKnobTrace)
    {
        var nGainPos = PreampRotaryControlGainToPos(nGain / 10.) - g_nStripFaderKnobHeight / 2;

		eSliderKnob.style.borderColor = cColor;
		eSliderKnob.style.backgroundColor = ((nGain == 0) ? cColor : "#181818");	

		eSliderKnob.style.top = nGainPos + "px";	
		eSliderKnob.style.left = (g_nStripFaderWidth * .09) + "px";
		eSliderKnob.style.width = (g_nStripFaderWidth * .6) + "px";	
		eSliderKnob.style.height = (g_nStripFaderKnobHeight) + "px";	

		eSliderKnobTrace.style.top = nGainPos + "px";
		eSliderKnobTrace.style.left = (g_nStripFaderWidth * .42) + "px";
        eSliderKnobTrace.style.width = (g_nStripFaderWidth * .03) + "px";
        eSliderKnobTrace.style.height = (eRotaryControl.offsetHeight - 40 - nGainPos - g_nStripFaderKnobHeight) + "px";

        if (jsSettings.neumann_edition)
        {
            var eSliderKnob2 = document.getElementById("mixerSectionPopupPreampRotaryControlSliderKnob2");
            var eSliderKnob3 = document.getElementById("mixerSectionPopupPreampRotaryControlSliderKnob3");

            if (eSliderKnob2 && eSliderKnob3)
            {
                eSliderKnob.style.top = (nGainPos - g_nStripFaderKnobHeight - 1) + "px";

                eSliderKnob2.style.top = (nGainPos + g_nStripFaderKnobHeight + 1) + "px";
                eSliderKnob2.style.left = (g_nStripFaderWidth * .09) + "px";
                eSliderKnob2.style.width = (g_nStripFaderWidth * .6) + "px";
                eSliderKnob2.style.height = (g_nStripFaderKnobHeight) + "px";

                eSliderKnob3.style.top = (nGainPos + g_nStripFaderKnobHeight / 2 + 2) + "px";
                eSliderKnob3.style.left = (g_nStripFaderWidth * .12) + "px";
                eSliderKnob3.style.width = (g_nStripFaderWidth * .67) + "px";

                eSliderKnob.style.backgroundColor = cColor;

                eSliderKnob2.style.borderColor = cColor;
                eSliderKnob2.style.backgroundColor = cColor;

                eSliderKnobTrace.style.top = 0 + "px";
                eSliderKnobTrace.style.left = (g_nStripFaderWidth / 2 - 4) + "px";
                eSliderKnobTrace.style.width = 3 + "px";
                eSliderKnobTrace.style.height = (eRotaryControl.offsetHeight - 40) + "px";
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ClosePreampRotaryControl()
{
	if (g_nCapturedPreampRotaryControlModuleID != -1 || g_nCapturedPreampRotaryControlChannelID != -1)
	{
		return;
    }

    g_tPreampRotaryControlGroupGainOffsets = [];

	g_szSelectedRotaryID = "";
	UpdateAllSendRotaries();

	ClosePopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PromptPreampGain(nModuleID, nChannelID, nInputMode, nPadMode, nGain, nGainMin, nGainMax)
{
    var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    FillPreampGroupGainOffsetsArray(nModuleID, nChannelID, nGain);

    var nDisplayedGain = nGain;

    if (bNeumannEdition)
    {
        if (nPadMode == 0)
        {
            nDisplayedGain += 120;
        }
        else if (nPadMode == 2)
        {
            nDisplayedGain -= 120;
        }   
    }            

    nDisplayedGain = nDisplayedGain / 10;
	
    var nNewGain = prompt("Set Preamp Gain", nDisplayedGain);
    if (nNewGain == null || nNewGain == nDisplayedGain)
	{
		return;
	}
        
    nNewGain = Number(nNewGain);
    if (nNewGain % 0.5 != 0)
    {
        var nNewGainDecimal = nNewGain - Math.trunc(nNewGain);

        if (nNewGainDecimal < 0.25)
            nNewGain = Math.trunc(nNewGain);
        else if (nNewGainDecimal < 0.75)
            nNewGain = Math.trunc(nNewGain) + 0.5;
        else
            nNewGain = Math.trunc(nNewGain) + 1;
    }

    nNewGain = nNewGain * 10;

    if (bNeumannEdition)
    {
        if (nPadMode == 0)
        {
            nNewGain -= 120;
        }
        else if (nPadMode == 2)
        {
            nNewGain += 120;
        }
    }

    if (nNewGain > nGainMax)
	{
        nNewGain = nGainMax;
	}
    if (nNewGain < nGainMin)
	{
        nNewGain = nGainMin;
    }

    SetPreampGain(nModuleID, nChannelID, nInputMode, nNewGain, nGainMin, nGainMax, true);

    g_tPreampRotaryControlGroupGainOffsets = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPreampPadPopup(eButton, nStripID, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

	var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
	}

	var jsChannels;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null)
		{
			jsChannels = jsModules[nIdx].custom.ins.channels;
			break;
        }
	}

	var jsChannel;
	if (jsChannels)
	{
		jsChannel = jsChannels[nChannelID];
	}

	if (jsChannel == null)
	{
		return;
	}
	

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eStrip = document.getElementById("strip" + nStripID);
	if (eStrip == null)
	{
		return;
	}

	var nButtonHeight = eButton.offsetHeight;
	var nButtonMarge = (nButtonHeight / 8);
	var nButtonWidth = eButton.offsetWidth + nButtonMarge;


    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";
        
		szPage += "<div id='mixerSectionPopupPreampPad' class='mixerSectionPopupPreamp' style='width: " + (nButtonWidth  + nButtonMarge * (bNeumannEdition ? 1 : 2)) + "px; height: " + (nButtonHeight * 3 + nButtonMarge * (bNeumannEdition ? 3 : 4)) + "px;'>";

            szPage += "<div class='mixerSectionPopupPreampButton " + ((jsChannel.lift && !jsChannel.pad) ? "mixerSectionPopupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampPadButton0' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + (bNeumannEdition ? nButtonHeight / 1.92 : nButtonHeight) + "px;'></div>";
	        szPage += "<div class='mixerSectionPopupPreampButton " + ((!jsChannel.lift && !jsChannel.pad) ? "mixerSectionPopupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampPadButton1' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * (bNeumannEdition ? 1.5 : 2) + nButtonHeight) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + (bNeumannEdition ? nButtonHeight / 1.92 : nButtonHeight) + "px;'>" + (bNeumannEdition ? "PAD\n-12dB" : "None") + "</div>";
			szPage += "<div class='mixerSectionPopupPreampButton " + ((!jsChannel.lift && jsChannel.pad) ? "mixerSectionPopupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampPadButton2' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * (bNeumannEdition ? 2.5 : 3) + nButtonHeight * 2) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + (bNeumannEdition ? nButtonHeight / 1.92 : nButtonHeight) + "px;'>" + (bNeumannEdition ? "PAD\n-24dB" : "Pad") + "</div>";

        szPage += "</div>";

    szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;

	var ePopupButton0 = document.getElementById("mixerSectionPopupPreampPadButton0")
	if (ePopupButton0)
		ePopupButton0.innerText = bNeumannEdition ? "PAD\nOFF" : "Boost";


	var ePopup = document.getElementById("mixerSectionPopupPreampPad");

	ePopup.style.setProperty("top", (eStrips.offsetTop + eStrip.offsetTop + eButton.offsetTop + eButton.offsetHeight / 2 - ePopup.offsetHeight / 2 + 33.5) + "px");
	ePopup.style.setProperty("left", (eStrips.offsetLeft + eStrip.offsetLeft + eButton.offsetLeft + g_isStripsScroller.x + (bNeumannEdition ? 2 : 0)) + "px");

	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function (event) { ClosePopupContainer(); }, true);
	}
	else
	{
		AddEvent("mixerSectionPopup", "touchstart", function (event) { ClosePopupContainer(); }, true);
		AddEvent("mixerSectionPopup", "mousedown", function (event) { ClosePopupContainer(); }, true);
	}

	AddEvent("mixerSectionPopupPreampPad", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampPad", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampPad", "mousedown", function (event) { event.stopPropagation(); }, true);

	AddEvent("mixerSectionPopupPreampPadButton0", "click", function () { SetPadMode(0, nModuleID, nChannelID); ClosePopupContainer(); });
	AddEvent("mixerSectionPopupPreampPadButton1", "click", function () { SetPadMode(1, nModuleID, nChannelID); ClosePopupContainer(); });
	AddEvent("mixerSectionPopupPreampPadButton2", "click", function () { SetPadMode(2, nModuleID, nChannelID); ClosePopupContainer(); });

	ShowPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPreampLowCutPopup(eButton, nStripID, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

	var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
	}

    var jsChannels;
    var jsLowCutInfos;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null)
		{
            jsChannels = jsModules[nIdx].custom.ins.channels;

            if (jsModules[nIdx].custom.ins.capabilities != null && jsModules[nIdx].custom.ins.capabilities.channel != null && jsModules[nIdx].custom.ins.capabilities.channel.lowCut_info != null)
            {
                jsLowCutInfos = jsModules[nIdx].custom.ins.capabilities.channel.lowCut_info;
            }

			break;
        }
	}

	var jsChannel;
	if (jsChannels)
	{
		jsChannel = jsChannels[nChannelID];
	}

	if (jsChannel == null)
	{
		return;
	}
	

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eStrip = document.getElementById("strip" + nStripID);
	if (eStrip == null)
	{
		return;
	}

	var nButtonHeight = eButton.offsetHeight;
	var nButtonMarge = (nButtonHeight / 8);
    var nButtonWidth = eButton.offsetWidth + nButtonMarge;

    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";
        
		szPage += "<div id='mixerSectionPopupPreampLowCut' class='mixerSectionPopupPreamp' style='width: " + (nButtonWidth  + nButtonMarge * (bNeumannEdition ? 1 : 2)) + "px; height: " + (nButtonHeight * (jsLowCutInfos.length + 1) + nButtonMarge * ((jsLowCutInfos.length + 1) + (bNeumannEdition ? 0 : 1))) + "px;'>";

            szPage += "<div class='mixerSectionPopupPreampButton " + ((!jsChannel.lowCut) ? "mixerSectionPopupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampLowCutButtonOff' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;'>OFF</div>";
            for (var nIdx = 0; nIdx < jsLowCutInfos.length; nIdx++)
            {
                szPage += "<div class='mixerSectionPopupPreampButton " + ((jsChannel.lowCut && jsChannel.lowCut_freq == jsLowCutInfos[nIdx]) ? "mixerSectionPopupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampLowCutButton" + nIdx + "' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * ((bNeumannEdition ? 1.5 : 2) + nIdx) + nButtonHeight * (nIdx + 1)) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px;'>" + jsLowCutInfos[nIdx] + "Hz</div>";
            }

        szPage += "</div>";

    szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;


	var ePopup = document.getElementById("mixerSectionPopupPreampLowCut");

	ePopup.style.setProperty("top", (eStrips.offsetTop + eStrip.offsetTop + eButton.offsetTop + eButton.offsetHeight / 2 - ePopup.offsetHeight / 2 + 33.5) + "px");
	ePopup.style.setProperty("left", (eStrips.offsetLeft + eStrip.offsetLeft + eButton.offsetLeft + g_isStripsScroller.x + (bNeumannEdition ? 2 : 0)) + "px");

	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function (event) { ClosePopupContainer(); }, true);
	}
	else
	{
		AddEvent("mixerSectionPopup", "touchstart", function (event) { ClosePopupContainer(); }, true);
		AddEvent("mixerSectionPopup", "mousedown", function (event) { ClosePopupContainer(); }, true);
	}

	AddEvent("mixerSectionPopupPreampLowCut", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampLowCut", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampLowCut", "mousedown", function (event) { event.stopPropagation(); }, true);

    AddEvent("mixerSectionPopupPreampLowCutButtonOff", "click", function () { SetLowCut(false, 0, nModuleID, nChannelID); });
    for (var nIdx = 0; nIdx < jsLowCutInfos.length; nIdx++)
    {
        AddEvent("mixerSectionPopupPreampLowCutButton" + nIdx, "click", (function _SetLowCut(_bLowCut, _nLowCutFreq, _nModuleID, _nChannelID) { return function () { return SetLowCut(_bLowCut, _nLowCutFreq, _nModuleID, _nChannelID); } })(true, jsLowCutInfos[nIdx], nModuleID, nChannelID));
    }

	ShowPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_tPreampGroup = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
var g_tPreampGroupColor = ["#aa3366", "#aa66aa", "#e98652", "#aaaa66", "#66aa66", "#66aa33", "#66aaaa", "#6666aa"];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenPreampGroupPopup(eButton, nStripID, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

	var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
	}

	var jsChannels;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null)
		{
			jsChannels = jsModules[nIdx].custom.ins.channels;
			break;
        }
	}

	var jsChannel;
	if (jsChannels)
	{
		jsChannel = jsChannels[nChannelID];
	}

	if (jsChannel == null)
	{
		return;
	}
	

	var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
	if (eMixerSectionPopupContainer == null)
	{
		return;
	}

	var eStrips = document.getElementById("strips");
	if (eStrips == null)
	{
		return;
	}

	var eStrip = document.getElementById("strip" + nStripID);
	if (eStrip == null)
	{
		return;
	}

    var nButtonHeight = eButton.offsetHeight - g_nElementsBorderWidth * 2;
    var nButtonMarge = (nButtonHeight / 8);
    var nButtonWidth = eButton.offsetWidth + nButtonMarge * 6 - g_nElementsBorderWidth * 2;

    var nCurrentGroupID = -1;
    for (var nGroupID = 0; nGroupID < g_tPreampGroup.length; nGroupID++)
    {
        if (g_tPreampGroup[nGroupID].length > 0)
        {
            for (var nIdx = 0; nIdx < g_tPreampGroup[nGroupID].length; nIdx++)
            {
                if (g_tPreampGroup[nGroupID][nIdx][0] == nModuleID && g_tPreampGroup[nGroupID][nIdx][1] == nChannelID)
                {
                    nCurrentGroupID = nGroupID;
                    break;
                }
            }
        }
    }


    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";
        
		szPage += "<div id='mixerSectionPopupPreampGroup' class='mixerSectionPopupPreamp' style='width: " + (nButtonWidth + nButtonMarge * (bNeumannEdition ? 1 : 2) + g_nElementsBorderWidth * 2) + "px; height: " + (nButtonHeight * (bNeumannEdition ? 10.25 : 9.5) + nButtonMarge * (bNeumannEdition ? 9.5 : 10.5) + g_nElementsBorderWidth * 17) + "px;'>";

            szPage += "<div class='mixerSectionPopupPreampTitle' id='' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * (bNeumannEdition ? 0.5 : 1)) + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight * 0.75) + "px; line-height: " + (nButtonHeight * 0.75) + "px;'>PREAMP</div>";
            if (bNeumannEdition)
            {
                szPage += "<div class='mixerSectionPopupPreampTitle' id='' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * 0.5 + nButtonHeight * 0.75) + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight * 0.75) + "px; line-height: " + (nButtonHeight * 0.75) + "px;'>LINK</div>";
                szPage += "<div class='mixerSectionPopupPreampTitle' id='' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * 0.5 + nButtonHeight * 1.5) + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight * 0.75) + "px; line-height: " + (nButtonHeight * 0.75) + "px;'>GROUP</div>";
            }
            else
            {
                szPage += "<div class='mixerSectionPopupPreampTitle' id='' style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * (bNeumannEdition ? 0.5 : 1) + nButtonHeight * 0.75) + "px; width: " + nButtonWidth + "px; height: " + (nButtonHeight * 0.75) + "px; line-height: " + (nButtonHeight * 0.75) + "px;'>GROUP</div>";
            }

            for (var i = 0; i < 8; i++)
            {
                var szStyle = "style='left: " + (nButtonMarge / (bNeumannEdition ? 2 : 1)) + "px; top: " + (nButtonMarge * (bNeumannEdition ? 1.5 : 2) + nButtonHeight * (bNeumannEdition ? 2.25 : 1.5) + nButtonMarge * (i + (bNeumannEdition ? 0.5 : 1)) + (nButtonHeight + g_nElementsBorderWidth * 2) * i) + "px; width: " + nButtonWidth + "px; height: " + nButtonHeight + "px; line-height: " + nButtonHeight + "px; background-color: " + g_tPreampGroupColor[i] + ";" + (nCurrentGroupID == i ? "" : " color: #000000; border-color: " + g_tPreampGroupColor[i] + ";") + "'";
                szPage += "<div class='mixerSectionPopupGroupPreampButton " + ((nCurrentGroupID == i) ? "mixerSectionPopupGroupPreampButtonChecked" : "") + "' id='mixerSectionPopupPreampGroupButton" + i + "' " + szStyle + ">" + (bNeumannEdition ? "PLG " : "GRP ") + (i + 1) + "</div>";
            }

        szPage += "</div>";

    szPage += "</div>";


	eMixerSectionPopupContainer.innerHTML = szPage;

	var ePopup = document.getElementById("mixerSectionPopupPreampGroup");

	ePopup.style.setProperty("top", (eStrips.offsetTop + eStrip.offsetTop + eButton.offsetTop + eButton.offsetHeight / 2 - ePopup.offsetHeight / 2 + 33.5) + "px");
	ePopup.style.setProperty("left", (eStrips.offsetLeft + eStrip.offsetLeft + eButton.offsetLeft + g_isStripsScroller.x + (bNeumannEdition ? 2 : 0)) + "px");

	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if (isTouchDevice)
	{
		AddEvent("mixerSectionPopup", "click", function (event) { ClosePopupContainer(); }, true);
	}
	else
	{
		AddEvent("mixerSectionPopup", "touchstart", function (event) { ClosePopupContainer(); }, true);
		AddEvent("mixerSectionPopup", "mousedown", function (event) { ClosePopupContainer(); }, true);
	}

	AddEvent("mixerSectionPopupPreampGroup", "click", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampGroup", "touchstart", function (event) { event.stopPropagation(); }, true);
	AddEvent("mixerSectionPopupPreampGroup", "mousedown", function (event) { event.stopPropagation(); }, true);

    AddEvent("mixerSectionPopupPreampGroupButton0", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 0 ? -1 : 0, nModuleID, nChannelID); ClosePopupContainer(); });
	AddEvent("mixerSectionPopupPreampGroupButton1", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 1 ? -1 : 1, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton2", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 2 ? -1 : 2, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton3", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 3 ? -1 : 3, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton4", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 4 ? -1 : 4, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton5", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 5 ? -1 : 5, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton6", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 6 ? -1 : 6, nModuleID, nChannelID); ClosePopupContainer(); });
    AddEvent("mixerSectionPopupPreampGroupButton7", "click", function () { SetPreampGroupInfo(eButton, nCurrentGroupID == 7 ? -1 : 7, nModuleID, nChannelID); ClosePopupContainer(); });

	ShowPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetPreampGroupID(nModuleID, nChannelID)
{
    var nCurrentGroupID = -1;

    for (var nGroupID = 0; nGroupID < g_tPreampGroup.length; nGroupID++)
    {
        if (g_tPreampGroup[nGroupID].length > 0)
        {
            for (var nIdx = 0; nIdx < g_tPreampGroup[nGroupID].length; nIdx++)
            {
                if (g_tPreampGroup[nGroupID][nIdx][0] == nModuleID && g_tPreampGroup[nGroupID][nIdx][1] == nChannelID)
                {
                    nCurrentGroupID = nGroupID;
                    break;
                }
            }
        }
    }

    return nCurrentGroupID;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetPreampGroupInfo(eButton, nNewGroupID, nModuleID, nChannelID)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    for (var nGroupID = 0; nGroupID < g_tPreampGroup.length; nGroupID++)
    {
        if (g_tPreampGroup[nGroupID].length > 0)
        {
            for (var nIdx = 0; nIdx < g_tPreampGroup[nGroupID].length; nIdx++)
            {
                if (g_tPreampGroup[nGroupID][nIdx][0] == nModuleID && g_tPreampGroup[nGroupID][nIdx][1] == nChannelID)
                {
                    g_tPreampGroup[nGroupID].splice(nIdx, 1);
                    break;
                }
            }
        }
    }

    if (nNewGroupID >= 0 && nNewGroupID < g_tPreampGroup.length)
        g_tPreampGroup[nNewGroupID].push([nModuleID, nChannelID]);

    nNewGroupID == -1 ? eButton.classList.remove("strip-button-preamp-checked") : eButton.classList.add("strip-button-preamp-checked");
    if (bNeumannEdition)
    {
        var eGroupLine = document.getElementById(eButton.id + "-line")
        if (eGroupLine)
        {
            eButton.style.borderColor = (nNewGroupID == -1 ? "" : g_tPreampGroupColor[nNewGroupID]);
            eGroupLine.style.backgroundColor = (nNewGroupID == -1 ? "" : g_tPreampGroupColor[nNewGroupID]);            
        }
    }

    eButton.style.backgroundColor = (nNewGroupID == -1 ? "" : g_tPreampGroupColor[nNewGroupID]);

    var szText = bNeumannEdition ? "PLG" : "GRP";
    if (nNewGroupID != -1)
        szText += " " + (nNewGroupID + 1);

    eButton.innerText = szText;

    save_ToCookie(false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FillPreampGroupGainOffsetsArray(nModuleID, nChannelID, nGain)
{
    var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		if (jsModules._modules)
			jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return;
    }

    g_tPreampRotaryControlGroupGainOffsets = [];

    var nCurrentGroupID = GetPreampGroupID(nModuleID, nChannelID);

    if (nCurrentGroupID != -1)
    {
        for (var nIdx = 0; nIdx < g_tPreampGroup[nCurrentGroupID].length; nIdx++)
	    {
		    var nTmpModuleID = g_tPreampGroup[nCurrentGroupID][nIdx][0];
            var nTmpChannelID = g_tPreampGroup[nCurrentGroupID][nIdx][1];

            if (nTmpModuleID == nModuleID && nTmpChannelID == nChannelID)
                continue;

            for (var nModuleIdx = 0; nModuleIdx < jsModules.length; nModuleIdx++)
	        {
                if (jsModules[nModuleIdx].id == nTmpModuleID && jsModules[nModuleIdx].custom != null && jsModules[nModuleIdx].custom.ins != null && jsModules[nModuleIdx].custom.ins.channels != null && jsModules[nModuleIdx].custom.ins.channels[nTmpChannelID] != null)
                {
                    var jsTmpChannel = jsModules[nModuleIdx].custom.ins.channels[nTmpChannelID];
                    if (jsTmpChannel)
                    {
                        var nTmpGain = 0;
                        var nTmpInputMode = 0;
                        if (jsTmpChannel.hasOwnProperty("inputMode"))
                        {
                            nTmpInputMode = jsTmpChannel.inputMode;

                            if (nTmpInputMode == 0 && jsTmpChannel.hasOwnProperty("micGain")) // mic
                            {
                                nTmpGain = jsTmpChannel.micGain;
                            }
                            else if (nTmpInputMode == 1 && jsTmpChannel.hasOwnProperty("lineGain")) // line
                            {
                                nTmpGain = jsTmpChannel.lineGain;
                            }
                            else if (nTmpInputMode == 2 && jsTmpChannel.hasOwnProperty("instrumentGain")) // instrument
                            {
                                nTmpGain = jsTmpChannel.instrumentGain;
                            }
                        }

                        g_tPreampRotaryControlGroupGainOffsets.push([nTmpModuleID, nTmpChannelID, nTmpInputMode, nGain - nTmpGain]);
                    }
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetPreampGain(nModuleID, nChannelID, nInputMode, nGain, nGainMin, nGainMax, bFromPrompt)
{
    var nGainOffsetMin = 0;
    var nGainOffsetMax = 0;
    for (nIdx = 0; nIdx < g_tPreampRotaryControlGroupGainOffsets.length; nIdx++)
    {
        nGainOffsetMin = Math.min(nGainOffsetMin, g_tPreampRotaryControlGroupGainOffsets[nIdx][3]);
        nGainOffsetMax = Math.max(nGainOffsetMax, g_tPreampRotaryControlGroupGainOffsets[nIdx][3]);
    }

    if (nGain - nGainOffsetMin > nGainMax)
    {
        if (!bFromPrompt)
            return;
        
        nGain = nGain + nGainOffsetMin;
    }
    if (nGain - nGainOffsetMax < nGainMin)
    {
        if (!bFromPrompt)
            return;

        nGain = nGain + nGainOffsetMax;
    }

    if (nInputMode == 0) // mic
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { micGain: nGain } });
    }
    else if (nInputMode == 1) // line
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lineGain: nGain } });
    }
    else if (nInputMode == 2) // instrument
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { instrumentGain: nGain } });
    }

    for (nIdx = 0; nIdx < g_tPreampRotaryControlGroupGainOffsets.length; nIdx++)
    {
        var nTmpModuleID = g_tPreampRotaryControlGroupGainOffsets[nIdx][0];
        var nTmpChannelID = g_tPreampRotaryControlGroupGainOffsets[nIdx][1];
        var nTmpInputModeID = g_tPreampRotaryControlGroupGainOffsets[nIdx][2];
        var nTmpGainOffset = g_tPreampRotaryControlGroupGainOffsets[nIdx][3];

        var nTmpGain = nGain - nTmpGainOffset;

        if (nTmpInputModeID == 0) // mic
        {
            self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nTmpModuleID + ")][0].custom.ins.channels[" + nTmpChannelID + "]", value: { micGain: nTmpGain } });
        }
        else if (nTmpInputModeID == 1) // line
        {
            self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nTmpModuleID + ")][0].custom.ins.channels[" + nTmpChannelID + "]", value: { lineGain: nTmpGain } });
        }
        else if (nTmpInputModeID == 2) // instrument
        {
            self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nTmpModuleID + ")][0].custom.ins.channels[" + nTmpChannelID + "]", value: { instrumentGain: nTmpGain } });
        }
    }
}