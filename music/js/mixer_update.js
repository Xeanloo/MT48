////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Music Mission Mixer Updates
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetModulesJSON()
{
	var jsModules;
	if (RavennaDeviceCache && RavennaDeviceCache.document())
	{
		jsModules = RavennaDeviceCache.document();
	}

	if (jsModules)
	{
		jsModules = jsModules._modules;
	}

	if (jsModules == null)
	{
		return null;
	}

	return jsModules;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Settings
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetSettingsJSON()
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.settings == null)
	{
		return null;
	}

	return jsMixer.settings;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePresets()
{
    if (document.getElementById("mixerSectionPopupSnapshots"))
    {
        UpdateSnapshots(true, false, "");
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSubsets()
{
    if (document.getElementById("mixerSectionPopupSnapshots"))
	{
		var szSnapshotsName = "";
		if (g_bEQSnapshotsOpened)
		{
			szSnapshotsName = "eq";
		}
		else if (g_bReverbSnapshotsOpened)
		{
			szSnapshotsName = "reverb";
		}
		else if (g_bDynamicsSnapshotsOpened)
		{
			szSnapshotsName = "dynamics";
		}
		else if (g_bDeesserSnapshotsOpened)
		{
			szSnapshotsName = "deesser";
		}
		else if (g_bEventideBlackholeSnapshotsOpened)
		{
			szSnapshotsName = "eventide_blackhole";
		}

		UpdateSnapshots(false, true, szSnapshotsName);
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSettings(path, value)
{
	if (path != null && value != null)
	{
		//if (path == "")
		{
			if (value.hasOwnProperty("expert_mode"))
			{
				//location.reload();
				//UpdateExpertMode();
				BuildMixerUI();
				return;
			}

			if (value.hasOwnProperty("talk_input"))
			{
				BuildMixerUI();
				return;
			}

			if (value.hasOwnProperty("cue_monitoring_disabled"))
			{
			    UpdateCueMonitoringDisabled();
			}
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateExpertMode()
{
	if (e_expertMode)
	{
		var jsMixer = GetMixerJSON();
		if (jsMixer)
		{
			if (jsMixer.settings.expert_mode)
			{
				e_expertMode.innerHTML = "Ex";
			}
			else
			{
				e_expertMode.innerHTML = "";
			}
		}
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateCueMonitoringDisabled()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var bCueMonitoringDisabled = jsSettings.cue_monitoring_disabled;

    var eStripCuetoMonButtons = document.getElementsByClassName("strip-button-cue-to-mon")
    for(var i = 0; i < eStripCuetoMonButtons.length; i++)
    {
        bCueMonitoringDisabled ? eStripCuetoMonButtons[i].classList.add("button-disabled") : eStripCuetoMonButtons[i].classList.remove("button-disabled");
    }

    var eStripMontoCueButtons = document.getElementsByClassName("strip-button-mon-to-cue")
    for (var i = 0; i < eStripMontoCueButtons.length; i++)
    {
        bCueMonitoringDisabled ? eStripMontoCueButtons[i].classList.add("button-disabled") : eStripMontoCueButtons[i].classList.remove("button-disabled");
    }

    /*var eStripTalktoCueButtons = document.getElementsByClassName("strip-button-talk-to-cue")
    for (var i = 0; i < eStripTalktoCueButtons.length; i++)
    {
        bCueMonitoringDisabled ? eStripTalktoCueButtons[i].classList.add("button-disabled") : eStripTalktoCueButtons[i].classList.remove("button-disabled");
    }*/

    var eMasterCueToMonClearlButton = document.getElementById("bus" + g_nCurrentBusID + "-cue-to-monitoring-clear")
    if (eMasterCueToMonClearlButton)
    {
        bCueMonitoringDisabled ? eMasterCueToMonClearlButton.classList.add("button-disabled") : eMasterCueToMonClearlButton.classList.remove("button-disabled");
    }

    var eMasterMonToCueAllButton = document.getElementById("bus" + g_nCurrentBusID + "-mon-to-cue-all")
    if (eMasterMonToCueAllButton)
    {
        bCueMonitoringDisabled ? eMasterMonToCueAllButton.classList.add("button-disabled") : eMasterMonToCueAllButton.classList.remove("button-disabled");
    }

    var eMasterCueToMonButton = document.getElementById("bus" + g_nCurrentBusID + "-cue-to-mon")
    if (eMasterCueToMonButton)
    {
        bCueMonitoringDisabled ? eMasterCueToMonButton.classList.add("button-disabled") : eMasterCueToMonButton.classList.remove("button-disabled");
    }

    /*var eMasterTalkButton = document.getElementById("bus" + g_nCurrentBusID + "-talk")
    if (eMasterTalkButton)
    {
        bCueMonitoringDisabled ? eMasterTalkButton.classList.add("button-disabled") : eMasterTalkButton.classList.remove("button-disabled");
    }

    var eMasterTalkAllButton = document.getElementById("bus" + g_nCurrentBusID + "-talk-all")
    if (eMasterTalkAllButton)
    {
        bCueMonitoringDisabled ? eMasterTalkAllButton.classList.add("button-disabled") : eMasterTalkAllButton.classList.remove("button-disabled");
    }*/
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inputs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetInputJSON(nInputID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.inputs == null)
	{
		return null;
	}

	if (nInputID == -1)
	{
		return jsMixer.inputs;
	}

	for (var i = 0; i < jsMixer.inputs.length; i++)
	{
		if (jsMixer.inputs[i].id == nInputID)
		{
			return jsMixer.inputs[i];
		}
	}

	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInputs(path, value)
{
	var jsInputs = GetInputJSON(-1);
	if (jsInputs == null)
	{
		return;
	}
	
	for (var i = 0; i < jsInputs.length; i++)
	{
		UpdateInput(jsInputs[i].id);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInput(nInputID, subpath, value)
{
	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			if (value.hasOwnProperty("linked_input_id"))
			{
				UpdateStripLink(nInputID, g_nCurrentBusID);

				if (g_bInputEffect && (nInputID == g_nOnInputID || value.linked_input_id == g_nOnInputID))
				{
					if (document.getElementById("EQEffectContainer"))
					{
						UpdateEQ(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);
					}

					if (document.getElementById("DynamicsEffectContainer"))
					{
						UpdateDynamics(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);
					}

					if (document.getElementById("DeesserEffectContainer"))
					{
						UpdateDeesser(g_nOnInputID);
					}
                }				
			}

			if (value.hasOwnProperty("_link_changed"))
			{
				BuildMixerUI();
				return;
			}

			if (value.hasOwnProperty("connected") || value.hasOwnProperty("connection_state"))
			{
				var jsStrip = GetStripJSON(nInputID);
				if (jsStrip)
				{
					UpdateSendGain(nInputID, g_nCurrentBusID, null, jsStrip.gain);
					UpdateStripColor(nInputID);
				}
				UpdateStripLink(nInputID, g_nCurrentBusID);
				UpdateSendPan(nInputID, g_nCurrentBusID);
				UpdateStripButtons(nInputID, g_nCurrentBusID);
			}

			return;
		}
	}

	// Fallback: read from cache
	{
		UpdateInputEQ(nInputID);
		UpdateInputDynamics(nInputID);
		UpdateInputDeesser(nInputID);
		UpdateInputTalkInput(nInputID);

		var jsStrip = GetStripJSON(nInputID);
		if (jsStrip)
		{
			UpdateSendGain(nInputID, g_nCurrentBusID, null, jsStrip.gain);
			UpdateStripColor(nInputID);
		}
		UpdateStripLink(nInputID, g_nCurrentBusID);
		UpdateSendPan(nInputID, g_nCurrentBusID);
		UpdateStripButtons(nInputID, g_nCurrentBusID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInputEQ(nInputID, subpath, value)
{
	var jsInput = GetInputJSON(nInputID);
	if (jsInput == null)
	{
		return;
	}

	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }

	var szEQ = "strip" + nInputID + "-input-eq";

	var eEQ = document.getElementById(szEQ);
	if (eEQ)
	{
	    if (jsInput.eq.enabled)
	    {
	        eEQ.classList.add("strip-button-foot-1st-row-1st-col-eq-enabled");
	    }
	    else
	    {
	        eEQ.classList.remove("strip-button-foot-1st-row-1st-col-eq-enabled");
	    }
	}

	if (jsSettings.neumann_edition)
	{
		var eButtonEQ = document.getElementById("strip" + nInputID + "-eq");
		if (eButtonEQ)
		{
			if (jsInput.eq.enabled)
			{
				eButtonEQ.classList.add("strip-button-eq-checked");
			}
			else
			{
				eButtonEQ.classList.remove("strip-button-eq-checked");
			}
		}
	}
	

	if (document.getElementById("EQEffectContainer") && nInputID == g_nEffectSectionControlInputID)
	{
	    UpdateEQ(false, -1, true, nInputID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInputDynamics(nInputID, subpath, value)
{
	var jsInput = GetInputJSON(nInputID);
	if (jsInput == null)
	{
		return;
	}

	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
    }

	var szDyn = "strip" + nInputID + "-input-dyn";

	var eDyn = document.getElementById(szDyn);
	if (eDyn == null)
	{
		return;
	}

	if (jsInput.dynamics.enabled)
	{
		eDyn.classList.add("strip-button-foot-1st-row-3rd-col-dyn-enabled");
	}
	else
	{
		eDyn.classList.remove("strip-button-foot-1st-row-3rd-col-dyn-enabled");
	}   


	if (jsSettings.neumann_edition)
	{
		var eButtonDYN = document.getElementById("strip" + nInputID + "-dynamics");
		if (eButtonDYN)
		{
			if (jsInput.dynamics.enabled)
			{
				eButtonDYN.classList.add("strip-button-dyn-checked");
			}
			else
			{
				eButtonDYN.classList.remove("strip-button-dyn-checked");
			}
		}
	}


	if (document.getElementById("DynamicsEffectContainer") && nInputID == g_nEffectSectionControlInputID)
	{
	    UpdateDynamics(false, -1, true, nInputID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInputDeesser(nInputID, subpath, value)
{
	var jsInput = GetInputJSON(nInputID);
	if (jsInput == null)
	{
		return;
	}

	var szDsr = "strip" + nInputID + "-input-dsr";
	var eDsr = document.getElementById(szDsr);
	if (eDsr == null)
	{
		return;
	}

	if (jsInput.deesser.enabled)
	{
		eDsr.classList.add("strip-button-foot-2nd-row-3rd-col-dsr-enabled");
	}
	else
	{
		eDsr.classList.remove("strip-button-foot-2nd-row-3rd-col-dsr-enabled");
	}

	var sz2ndRow3rdCol = "strip" + nInputID + "-button-foot-2nd-row-3rd-col";
	var e2ndRow3rdCol = document.getElementById(sz2ndRow3rdCol);
	if (e2ndRow3rdCol == null)
	{
		return;
	}
	e2ndRow3rdCol.style.width = jsInput.deesser.enabled ? "20%" : "0%";

	UpdateStripSelfCue(nInputID);

	if (document.getElementById("DeesserEffectContainer") && nInputID == g_nEffectSectionControlInputID)
	{
	    UpdateDeesser(nInputID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateInputTalkInput(nInputID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.settings == null)
	{
		return null;
	}

	var szTalkInput = "strip"+ nInputID + "-number";

	var eTalkInput = document.getElementById(szTalkInput);
	if (eTalkInput == null)
	{
		return;
	}

	if (!jsMixer.settings.neumann_edition && jsMixer.settings.talk_input == nInputID)
	{
		eTalkInput.classList.add("strip-button-foot-1st-row-2nd-col-talk-input-on");
	}
	else
	{
		eTalkInput.classList.remove("strip-button-foot-1st-row-2nd-col-talk-input-on");
	}
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Outputs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetOutputJSON(nOutputID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.outputs == null)
	{
		return null;
	}

	if (nOutputID == -1)
	{
		return jsMixer.outputs;
	}

	return jsMixer.outputs[nOutputID]; // Output IDs == Indexes
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateOutputs(path, value)
{
	//BuildMixerUI();
	//location.reload();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateOutput(nOutputID, subpath, value)
{
	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			//return;
		}
	}

	// Fallback: read from cache
	{
	}
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bus
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetBusJSON(nBusID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.busses == null)
	{
		return null;
	}

	if (nBusID == -1)
	{
		return jsMixer.busses;
	}

	return jsMixer.busses[nBusID]; // Bus IDs == Indexes
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusses(path, value)
{
	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
		return;
	}
	
	for (var i = 0; i < jsBusses.length; i++)
	{
		UpdateBus(jsBusses[i].id);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDisplayedBus()
{
	UpdateBus(g_nCurrentBusID);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBus(nBusID, subpath, value)
{
	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			if (value.hasOwnProperty("name"))
			{
			    UpdateBusName(nBusID, value.name);
			    
			    if (document.getElementById("mixerSectionPopupBusRouting_Low"))
			    {
			        CloseBusRouting();
			        OpenBusRouting();
			    }
			    if (document.getElementById("mixerSectionPopupBusRouting_Large"))
			    {
			        UpdateBusRouting();
			    }
			}

			if (value.hasOwnProperty("color"))
			{
			    UpdateBusColor(nBusID, value.color);
			    UpdateBusOutput(nBusID);

			    var eBusColorSelector = document.getElementById("mixerSectionPopupBusColorSelector");
			    if (eBusColorSelector)
			    {
			        UpdateBusColorSelector(nBusID);
				}
			}

			if (value.hasOwnProperty("master_gain"))
			{
				if (nBusID == g_nCurrentBusID)
				{
					UpdateBusMasterGainValue(nBusID, value.master_gain);
					UpdateBusMasterGain(nBusID, value.master_gain);
				}
				else
				{
					switch (g_nCurrentBusID)
					{
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
							UpdateMasterRotary(nBusID);
							break;
					}
				}
			}

			if (value.hasOwnProperty("mute"))
			{
				UpdateBusMute(nBusID, value.mute);
			}

			if (value.hasOwnProperty("has_solo"))
			{
				UpdateBusSolo(nBusID, value.has_solo);
			}

			if (value.hasOwnProperty("dim"))
			{
				UpdateBusDim(nBusID, value.dim);
			}

			if (value.hasOwnProperty("downmix"))
			{
				UpdateBusDownMix(nBusID, value.downmix);
			}

			if (value.hasOwnProperty("monitoring_to_cue"))
			{
				UpdateBusMonToCue(nBusID, value.monitoring_to_cue);
			}

			if (value.hasOwnProperty("talking_to_cue"))
			{
				UpdateBusTalkToCue(nBusID, value.talking_to_cue);
			}

			if (value.hasOwnProperty("cue_to_monitoring"))
			{
				for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
				{
					UpdateBusCueToMon(i);
					UpdateSendRotary(i * 2, 0);
					UpdateSendRotary(i * 2, 1);
				}
			}

			if (value.hasOwnProperty("left_output_id") || value.hasOwnProperty("right_output_id"))
			{
			    UpdateBusOutput(nBusID);

			    if (document.getElementById("mixerSectionPopupBusRouting_Low"))
			    {
			        CloseBusRouting();
			        OpenBusRouting();
			    }
				if (document.getElementById("mixerSectionPopupBusRouting_Large") && g_nUpdateBusRoutingTimer == null)
			    {
					g_nUpdateBusRoutingTimer = window.setTimeout(function () { UpdateBusRouting(); }, 250); // to avoid multiple flash updates
			    }
			}

			if (value.hasOwnProperty("soundid_profile"))
			{
				if (document.getElementById("mixerSectionPopupSoundIDProfiles"))
				{
					UpdateSoundIDProfiles();
				}

				UpdateBusSoundID(nBusID);

				if (document.getElementById("mixerSectionPopupBusRouting_Large"))
				{
					UpdateBusRouting();
				}
			}

			if (value.hasOwnProperty("pan_linked"))
			{
				UpdateBusPanLink(nBusID);
			}

			if (value.hasOwnProperty("muted_daws_shown"))
			{
				//BuildMixerUI();
				location.reload();
				return;
			}

			if (value.hasOwnProperty("cue_mode"))
			{
				BuildMixerUI();
				//location.reload();
				return;
			}

			return;
		}
	}

	// Fallback: read from cache
	{
		UpdateBusOutput(nBusID);

		UpdateBusName(nBusID);

		UpdateBusEQ(nBusID);
		UpdateBusDynamics(nBusID);
		UpdateBusSoundID(nBusID);
		UpdateBusPanLink(nBusID);

		UpdateBusColor(nBusID);

		if (nBusID == g_nCurrentBusID)
		{
			UpdateBusMasterGainValue(nBusID);
			UpdateBusMasterGain(nBusID);
		}
		else
		{
			switch (g_nCurrentBusID)
			{
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					UpdateMasterRotary(nBusID);
					break;
			}
		}

		UpdateBusMute(nBusID);
		UpdateBusSolo(nBusID);

		for (var i = MM_ID_MONITOR_BUS; i < MM_ID_MONITOR_BUS + MM_NB_MONITOR_BUS; i++)
		{
			UpdateBusDim(i);
			UpdateBusDownMix(i);
		}

		for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
		{
			UpdateBusMonToCue(i);
			UpdateBusTalkToCue(i);
			UpdateBusCueToMon(i);

			UpdateBusDim(i);
			UpdateBusDownMix(i);
		}

		UpdateMasterRotaries();
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusOutput(nBusID)
{
	var eButton = document.getElementById("master-center-button-foot");
	if (eButton == null)
	{
		return;
	}

	var eButtonNameLine1 = document.getElementById("master-center-button-name-line1");
	var eButtonNameLine2 = document.getElementById("master-center-button-name-line2");
	if (eButtonNameLine1 == null || eButtonNameLine2 == null)
	{
		return;
	}

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

	var nOutputID = jsBus.left_output_id;
	if (nOutputID == -1)
	{
		nOutputID = jsBus.right_output_id;
	}

	if (nBusID == g_nCurrentBusID)
	{
	    var szOutput = "";

	    var jsOutput = GetOutputJSON(nOutputID);
		if (jsOutput && jsOutput.name)
		{
	        szOutput = jsOutput.name;
	        szOutput = szOutput.replace("-L", "");
	        szOutput = szOutput.replace("-R", "");
		}

		var szName = jsBus.name;
		if (szName == "MIXER-ALT")
		{
			szName = "MIX ALT";	
		}

		eButtonNameLine1.innerText = szName;
	    eButtonNameLine2.innerText = szOutput.replace(" OUT", "").replace("Headphone", "HP");


	    var szColor = jsBus.color;
		eButton.style.backgroundColor = jsSettings.neumann_edition && szColor == "#000000" ? "var(--button-background-color)" : szColor;

		if (szColor != "#000000")
		{
			eButtonNameLine1.classList.add("master-button-text-color-black");
			eButtonNameLine2.classList.add("master-button-text-color-black");
		}
		else
		{
			eButtonNameLine1.classList.remove("master-button-text-color-black");
			eButtonNameLine2.classList.remove("master-button-text-color-black");
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusEQ(nBusID, subpath, value)
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
	var bEnabled = jsBus.eq.enabled;

	if (nBusID == g_nCurrentBusID)
	{
		var szEQ = "bus" + nBusID + "-eq";

		var eEQ = document.getElementById(szEQ);
		if (eEQ)
		{
			if (bEnabled)
			{
				eEQ.classList.add("master-button-eq-enabled");
			}
			else
			{
				eEQ.classList.remove("master-button-eq-enabled");
			}
		}
    }
	
	var nInputID = -1;
	if (nBusID == MM_ID_REVERB_BUS)
		nInputID = MM_ID_FIRST_REVERB_STRIP_RETURN;
	else if (nBusID == MM_ID_DYNAMICS_BUS)
		nInputID = MM_ID_FIRST_DYNAMICS_STRIP_RETURN;

	for (var i = 0; i < 2; i++)
	{
		var szEQ = "strip" + (nInputID + i) + "-input-eq";

		var eEQ = document.getElementById(szEQ);
		if (eEQ)
		{
			if (bEnabled)
			{
				eEQ.classList.add("strip-button-foot-1st-row-1st-col-eq-enabled");
			}
			else
			{
				eEQ.classList.remove("strip-button-foot-1st-row-1st-col-eq-enabled");
			}
		}

		if (jsSettings.neumann_edition)
		{
			var eButtonEQ = document.getElementById("strip" + (nInputID + i) + "-eq");
			if (eButtonEQ)
			{
				if (bEnabled)
				{
					eButtonEQ.classList.add("strip-button-eq-checked");
				}
				else
				{
					eButtonEQ.classList.remove("strip-button-eq-checked");
				}
			}
		}
    }

	
	if (document.getElementById("EQEffectContainer") && nBusID == g_nEffectSectionControlBusID)
	{
	    UpdateEQ(true, nBusID, false, -1);
	} 
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusDynamics(nBusID, subpath, value)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	var szDyn = "bus" + nBusID + "-dyn";

	var eDyn = document.getElementById(szDyn);
	if (eDyn)
	{
	    if (jsBus.dynamics.enabled)
	    {
	        eDyn.classList.add("master-button-dyn-enabled");
	    }
	    else
	    {
	        eDyn.classList.remove("master-button-dyn-enabled");
	    }
	}
	

	if (document.getElementById("DynamicsEffectContainer") && nBusID == g_nEffectSectionControlBusID)
	{
	    UpdateDynamics(true, nBusID, false, -1);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusSoundID(nBusID, subpath, value)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null || jsMixer.settings.neumann_edition)
	{
		return;
	}

	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	var nSoundIDProfile = jsBus.soundid_profile;

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

	var szTargetMode = "";
	for (var idx = 0; idx < jsSoundIDProfiles.length; ++idx)
	{
		if (jsSoundIDProfiles[idx].id == nSoundIDProfile)
		{
			szTargetMode = jsSoundIDProfiles[idx].target_mode;
			break;
        }
	}

	var szSoundID = "bus" + nBusID + "-SoundID";

	var eSoundID = document.getElementById(szSoundID);
	if (eSoundID)
	{
		eSoundID.classList.remove("master-button-SoundID-enabled-black");
		eSoundID.classList.remove("master-button-SoundID-enabled-white");

		if (/*g_nSampleRate < 352800 && */(nSoundIDProfile != -1 && (jsBus.type == BT_MONITOR || jsBus.type == BT_CUE)))
		{
			if (jsBus.color != "#303030" && jsBus.color != "#000000" && jsBus.color != "")
			{
				eSoundID.classList.add("master-button-SoundID-enabled-black");
			}
			else
			{
				eSoundID.classList.add("master-button-SoundID-enabled-white");
			}

			var szBusButtonName = "bus" + nBusID + "-name";
			var eBusButtonName = document.getElementById(szBusButtonName);
			if (eBusButtonName)
			{
				if (eBusButtonName.classList.contains("master-button-name-vcenter-2-lines"))
				{
					eSoundID.classList.add("master-button-SoundID-enabled-2-lines");
				}
				else
				{
					eSoundID.classList.remove("master-button-SoundID-enabled-2-lines");
				}
			}
	    }
	}

	var eSoundIDTargetMode = document.getElementById(szSoundID + "-TargetMode");
	if (eSoundIDTargetMode)
	{
		eSoundIDTargetMode.innerText = "";

		eSoundIDTargetMode.classList.remove("master-button-SoundID-TargetMode-FLT");
		eSoundIDTargetMode.classList.remove("master-button-SoundID-TargetMode-CUS");
		eSoundIDTargetMode.classList.remove("master-button-SoundID-TargetMode-CHK");

		if (/*g_nSampleRate < 352800 &&*/ szTargetMode != "")
		{
			var szTargetModeText = "";
			if (szTargetMode == "Flat")
            {
                szTargetModeText = "FLT";
				eSoundIDTargetMode.classList.add("master-button-SoundID-TargetMode-FLT");
            }
			else if (szTargetMode == "Custom")
            {
                szTargetModeText = "CUS";
				eSoundIDTargetMode.classList.add("master-button-SoundID-TargetMode-CUS");
            }
			else if (szTargetMode == "TranslationCheck")
            {
                szTargetModeText = "CHK";
				eSoundIDTargetMode.classList.add("master-button-SoundID-TargetMode-CHK");
			}

			eSoundIDTargetMode.innerText = szTargetModeText;
        }
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusReverb(nBusID, subpath, value)
{
    if (document.getElementById("ReverbEffectContainer") && nBusID == g_nEffectSectionControlBusID)
    {
        UpdateReverb(true, nBusID, false, -1);
	}
	else if (document.getElementById("EventideBlackholeEffectContainer") && nBusID == g_nEffectSectionControlBusID)
	{
		UpdateEventideBlackhole(true, nBusID, false, -1);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusName(nBusID, name)
{	
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
	}

	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	var szName = jsBus.name;	


	// Special
	if (szName == "MIXER")
	{
		szName = "MIX";	
	}

	if (szName == "MIXER-ALT")
	{
		szName = "MIX ALT";	
	}

	if (szName == "REVERB")
	{
		szName = "REV";	
	}

	if (szName == "DYNAMICS")
	{
		szName = "DYN";	
	}

	var szBusButtonName = "bus" + nBusID + "-name";

	var eBusButtonName = document.getElementById(szBusButtonName);
	if (eBusButtonName)
	{
		eBusButtonName.innerText = szName;

		if (szName == "MIX ALT")
		{
			eBusButtonName.classList.add("master-button-name-vcenter-2-lines");
		}
		else
		{
			eBusButtonName.classList.remove("master-button-name-vcenter-2-lines");
		}


		if (nBusID == MM_ID_FIRST_SEND_BUS || nBusID == MM_ID_FIRST_SEND_BUS + 1 || nBusID == MM_ID_FIRST_SEND_BUS + 2)
		{
			eBusButtonName.classList.add("master-button-text-sends");
		}
		else
		{
			eBusButtonName.classList.remove("master-button-text-sends");
		}
	}
	

	var eTitle = document.getElementById("centralSection");
	if (eTitle && nBusID == g_nCurrentBusID)
	{			
		eTitle.innerText = (jsMixer.settings.neumann_edition ? "MT 48 " : "ANUBIS ") + g_szSerialNumber + " - " + jsBus.name;
	}

	var eEffects = document.getElementById("effectsSection");
	if (eEffects && nBusID == g_nEffectSectionControlBusID)
	{
	    UpdateEffectsTitle(true, g_nEffectSectionControlBusID, false, -1);
	}

	UpdateAllSendRotaries();
	UpdateMasterRotaries();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusColor(nBusID, color)
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var jsBus = GetBusJSON(nBusID);
    if (jsBus == null)
    {
        return;
    }

	var szColor = "#000000";
	if (color != null)
	{
		szColor = color;
	}
	else
	{
		szColor = jsBus.color;
	}


	var szBusButtonColor = "bus" + nBusID + "-selector";

	var eBusButtonColor = document.getElementById(szBusButtonColor);
	if (eBusButtonColor)
	{
		if (!jsMixer.settings.neumann_edition && jsBus.type == BT_CUE && (szColor == "" || szColor == "#000000"))
		{
			eBusButtonColor.style.backgroundColor = "#303030";
		}
		else
		{
			if (jsMixer.settings.neumann_edition)
			{
				szColor = (szColor == "#000000" ? "#343434" : szColor);
				eBusButtonColor.style.borderColor = szColor;
			}
			eBusButtonColor.style.backgroundColor = szColor;			
		}
	}

	var szBusButtonName = "bus" + nBusID + "-name";

	var eBusButtonName = document.getElementById(szBusButtonName);
	if (eBusButtonName)
	{
		if (szColor != "#000000" && szColor != "#343434")
		{
			eBusButtonName.classList.add("master-button-text-color-black");
		}
		else
		{
			eBusButtonName.classList.remove("master-button-text-color-black");
		}
	}	

	UpdateBusSoundID(nBusID);

	UpdateAllSendRotaries();
	UpdateMasterRotaries();

	var eEffects = document.getElementById("effectsSection");
	if (eEffects && nBusID == g_nEffectSectionControlBusID)
	{
	    UpdateEffectsTitle(true, g_nEffectSectionControlBusID, false, -1);
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusPanLink(nBusID)
{
	if (nBusID != g_nCurrentBusID)
		return;

	var bBusPanLinked = false;
	var jsBus = GetBusJSON(nBusID);
	if (jsBus)
	{
		if (jsBus.pan_linked)
			bBusPanLinked = jsBus.pan_linked;

		if (jsBus.type == BT_MONITOR || (jsBus.type == BT_CUE && jsBus.cue_mode == CM_MIXALT))
			bBusPanLinked = false;
	}

	var jsStrips = GetStripJSON(-1);
	if (jsStrips == null)
	{
		return;
	}


	for (var idx = 0; idx < jsStrips.length; ++idx)
	{
		var jsStrip = jsStrips[idx];
		if (jsStrip)
		{
			var nStripID = jsStrip.id;

			var jsInput = GetInputJSON(nStripID);
			if (jsInput)
			{
				if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
					continue;

				var eStripPan = document.getElementById("strip" + nStripID + "-send" + nBusID + "-pan");
				if (eStripPan)
				{
					bBusPanLinked || !jsInput.connected || jsInput.connection_state == 0 ? eStripPan.classList.add("strip-pan-disabled") : eStripPan.classList.remove("strip-pan-disabled");
				}

				var eStripPanKnob = document.getElementById("strip" + nStripID + "-send" + nBusID + "-pan-knob");
				if (eStripPanKnob)
				{
					bBusPanLinked || !jsInput.connected || jsInput.connection_state == 0 ? eStripPanKnob.classList.add("strip-pan-knob-parked-disabled") : eStripPanKnob.classList.remove("strip-pan-knob-parked-disabled");
				}

				if (bBusPanLinked)
				{
					RemoveEvent("strip" + nStripID + "-send" + nBusID + "-pan", "click", (function _OpenPanControl(_nStripID, _nBusID) { return function () { OpenPanControl(_nStripID, _nBusID); } })(nStripID, nBusID));
					AddEvent("strip" + nStripID + "-send" + nBusID + "-pan", "click", (function _OpenBusUnlinkPopup() { return function () { OpenBusUnlinkPopup(); } })())
				}
				else
				{
					RemoveEvent("strip" + nStripID + "-send" + nBusID + "-pan", "click", (function _OpenBusUnlinkPopup() { return function () { OpenBusUnlinkPopup(); } })())

					if (jsInput.connected && jsInput.connection_state == 1)
						AddEvent("strip" + nStripID + "-send" + nBusID + "-pan", "click", (function _OpenPanControl(_nStripID, _nBusID) { return function () { OpenPanControl(_nStripID, _nBusID); } })(nStripID, nBusID));
                }
            }
        }
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusMasterGainValue(nBusID, gain)
{
	var nGain;
	if (gain != null)
	{
		nGain = (gain / 10);
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		nGain = (jsBus.master_gain / 10);
	}


	var nIntegerGain = Math.trunc(nGain);
	var nDecimalGain = Math.abs(nGain) - Math.abs(nIntegerGain);
	nDecimalGain = Math.round(nDecimalGain * 10);


	var szBusMasterGain = "bus" + nBusID + "-mastergain-value";
	var eBusMasterGain = document.getElementById(szBusMasterGain);
	if (eBusMasterGain == null)
	{
		return;
	}

	var szBusMasterGainDecimal = "bus" + nBusID + "-mastergain-decimal";
	var eBusMasterGainDecimal = document.getElementById(szBusMasterGainDecimal);
	if (eBusMasterGainDecimal == null)
	{
		return;
	}


	if (nGain <= -144)
	{
		eBusMasterGain.innerText = "-oo";
		eBusMasterGainDecimal.innerText = "";
	}
	else
	{
		eBusMasterGain.innerText = nIntegerGain;
		eBusMasterGainDecimal.innerText = "." + nDecimalGain;
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusMasterGain(nBusID, gain)
{
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

	var nGain = 0;
	if (gain != null)
	{
		nGain = gain;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		nGain = jsBus.master_gain;
	}


	var nGainPos = GainToPos(nGain / 10) - g_nStripFaderKnobHeight;


	var szGainID = "--bus" + nBusID + "-fader-slider-knob-top";

	var r = document.querySelector(':root');
	r.style.setProperty(szGainID, nGainPos + "px");



	var szGainKnobID = "bus" + nBusID + "-fader-slider-knob";
	var eGainKnob = document.getElementById(szGainKnobID);
	if (eGainKnob == null)
	{
		return;
	}

	var szGainKnobID2 = "bus" + nBusID + "-fader-slider-knob-2";
	var eGainKnob2 = document.getElementById(szGainKnobID2);
	if (bNeumannEdition && eGainKnob2 == null)
	{
		return;
	}

	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}

	if (nGain == jsSettings.ref_level)
	{
		eGainKnob.style.backgroundColor = bNeumannEdition ? "#e2d9bf" : "#eeeeee";

		if (bNeumannEdition)
			eGainKnob2.style.backgroundColor = bNeumannEdition ? "#e2d9bf" : "#eeeeee";
	}
	else if (!bNeumannEdition)
	{
		eGainKnob.style.backgroundColor = "#000000";
	}

	UpdateMasterFaderHidden(nBusID);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateMasterFaderHidden(nBusID, gain)
{
	var nGain = 0;
	if (gain != null)
	{
		nGain = gain;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		nGain = jsBus.master_gain;
	}


	var nGainPos = GainToPos(nGain / 10) - g_nStripFaderKnobHeight;


	var eKnobHiddenID = document.getElementById("master-center-buttons-fader-hidden");
	if (eKnobHiddenID)
	{
	    if (g_bButtonsHideFaders && (nGainPos > g_nStripFaderHeight - g_nMasterButtonsContainerHeight + g_nStripButtonsGapHeight * 3) && g_nCapturedMasterFader != nBusID)
		{
			if (nGain <= -1445)
			{
				eKnobHiddenID.innerText = "-oo";
			}
			else
			{
				eKnobHiddenID.innerText = "V";
			}
		}
		else
		{
			eKnobHiddenID.innerText = "";
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusMute(nBusID, mute)
{
	var bMute;
	if (mute != null)
	{
		bMute = mute;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bMute = jsBus.mute;
	}



	var szBusButtonMute = "bus" + nBusID + "-mastergain";

	var eBusButtonMute = document.getElementById(szBusButtonMute);
	if (eBusButtonMute == null)
	{
		return;
	}

	var eMeterL = document.getElementById("bus" + nBusID + "-meter-left");
	var eMeterR = document.getElementById("bus" + nBusID + "-meter-right");
	if (eMeterL == null || eMeterR == null)
	{
		return;
	}

	bMute ? eBusButtonMute.classList.add("master-gain-text-mute-on") : eBusButtonMute.classList.remove("master-gain-text-mute-on");
	bMute ? eMeterL.classList.add("master-meter-muted") : eMeterL.classList.remove("master-meter-muted");
	bMute ? eMeterR.classList.add("master-meter-muted") : eMeterR.classList.remove("master-meter-muted");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusSolo(nBusID, solo)
{
	var bSolo;
	if (solo != null)
	{
		bSolo = solo;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bSolo = jsBus.has_solo;
	}



	var szBusButtonSolo = "bus" + nBusID + "-solo-clear";

	var eBusButtonSolo = document.getElementById(szBusButtonSolo);
	if (eBusButtonSolo == null)
	{
		return;
	}

	if (bSolo)
	{
		eBusButtonSolo.classList.add("master-button-text-solo-on");
	}
	else
	{
		eBusButtonSolo.classList.remove("master-button-text-solo-on");
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusDim(nBusID, dim)
{
	var bDim;
	if (dim != null)
	{
		bDim = dim;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bDim = jsBus.dim;
	}



	var szBusButtonDim = "bus" + nBusID + "-dim";

	var eBusButtonDim = document.getElementById(szBusButtonDim);
	if (eBusButtonDim == null)
	{
		return;
	}

	if (bDim)
	{
		eBusButtonDim.classList.add("master-button-text-dim-on");
	}
	else
	{
		eBusButtonDim.classList.remove("master-button-text-dim-on");
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusDownMix(nBusID, downmix)
{
	var bDownMix;
	if (downmix != null)
	{
		bDownMix = downmix;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bDownMix = jsBus.downmix;
	}



	var szBusButtonDownMix = "bus" + nBusID + "-downmix";

	var eBusButtonDownMix = document.getElementById(szBusButtonDownMix);
	if (eBusButtonDownMix == null)
	{
		return;
	}

	if (bDownMix)
	{
		eBusButtonDownMix.classList.add("master-button-text-downmix-on");
	}
	else
	{
		eBusButtonDownMix.classList.remove("master-button-text-downmix-on");
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusMonToCue(nBusID, monitoring_to_cue)
{
	var bMonToCue;
	if (monitoring_to_cue != null)
	{
		bMonToCue = monitoring_to_cue;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bMonToCue = jsBus.monitoring_to_cue;
	}



	var szStripButtonMonToCue = "strip" + nBusID * 2 + "-send" + g_nCurrentBusID + "-mon-to-cue";
	var eStripButtonMonToCue = document.getElementById(szStripButtonMonToCue);
	if (eStripButtonMonToCue)
	{
		if (bMonToCue)
		{
			eStripButtonMonToCue.classList.add("strip-button-mon-to-cue-on");
		}
		else
		{
			eStripButtonMonToCue.classList.remove("strip-button-mon-to-cue-on");
		}
	}



	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
		return;
	}

	var bMonToCueAll = false;
	for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
	{
		if (jsBusses[i].monitoring_to_cue)
		{
			bMonToCueAll = true;
			break;
		}
	}

	var eMonToCueAll = document.getElementById("bus" + g_nCurrentBusID + "-mon-to-cue-all");
	var eMonToCueAllText = document.getElementById("bus" + g_nCurrentBusID + "-mon-to-cue-all-text");
	if (eMonToCueAll && eMonToCueAllText)
	{
		if (bMonToCueAll)
		{
			eMonToCueAll.classList.add("master-button-mon-to-cue-on");
			eMonToCueAllText.innerText = "M > C\nCLEAR";
		}
		else
		{
			eMonToCueAll.classList.remove("master-button-mon-to-cue-on");
			eMonToCueAllText.innerText = "M > C\nALL";
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusTalkToCue(nBusID, talking_to_cue)
{
	var bTalk;
	if (talking_to_cue != null)
	{
		bTalk = talking_to_cue;
	}
	else
	{
		var jsBus = GetBusJSON(nBusID);
		if (jsBus == null)
		{
			return;
		}

		bTalk = jsBus.talking_to_cue;
	}



	if (nBusID >= 2 && nBusID <= 6)
	{
		var szBusButtonTalk = "bus" + nBusID + "-talk";
		var eBusButtonTalk = document.getElementById(szBusButtonTalk);
		if (eBusButtonTalk)
		{
			if (bTalk)
			{
				eBusButtonTalk.classList.add("master-button-text-talk-on");
			}
			else
			{
				eBusButtonTalk.classList.remove("master-button-text-talk-on");
			}
		}
	}


	var szStripButtonTalk = "strip" + nBusID * 2 + "-send" + g_nCurrentBusID + "-talk-to-cue";
	var eStripButtonTalk = document.getElementById(szStripButtonTalk);
	if (eStripButtonTalk)
	{
		if (bTalk)
		{
			eStripButtonTalk.classList.add("strip-button-talk-to-cue-on");
		}
		else
		{
			eStripButtonTalk.classList.remove("strip-button-talk-to-cue-on");
		}
	}



	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
		return;
	}

	var bTalkAll = false;
	for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
	{
		if (jsBusses[i].talking_to_cue)
		{
			bTalkAll = true;
			break;
		}
	}

	var eTalkAll = document.getElementById("bus" + g_nCurrentBusID + "-talk-all");
	var eTalkAllText = document.getElementById("bus" + g_nCurrentBusID + "-talk-all-text");
	if (eTalkAll && eTalkAllText)
	{
		if (bTalkAll)
		{
			eTalkAll.classList.add("master-button-text-talk-on");
			eTalkAllText.innerText = "TALK\nCLEAR";
		}
		else
		{
			eTalkAll.classList.remove("master-button-text-talk-on");
			eTalkAllText.innerText = "TALK\nALL";
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateBusCueToMon(nBusID)
{
	var jsBus = GetBusJSON(0);
	if (jsBus == null)
	{
		return;
	}

	var bCueToMon = (jsBus.cue_to_monitoring == nBusID);

	if (nBusID >= MM_ID_FIRST_CUE_BUS && nBusID < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS)
	{
		var szBusButtonCueToMon = "bus" + nBusID + "-cue-to-mon";
		var eBusButtonCueToMon = document.getElementById(szBusButtonCueToMon);
		if (eBusButtonCueToMon)
		{
			if (bCueToMon)
			{
				eBusButtonCueToMon.classList.add("master-button-text-cue-to-mon-on");
			}
			else
			{
				eBusButtonCueToMon.classList.remove("master-button-text-cue-to-mon-on");
			}
		}
	}


	var szStripButtonCueToMon = "strip" + nBusID * 2 + "-send" + g_nCurrentBusID + "-cue-to-mon";
	var eStripButtonCueToMon = document.getElementById(szStripButtonCueToMon);
	if (eStripButtonCueToMon)
	{
		if (bCueToMon)
		{
			eStripButtonCueToMon.classList.add("strip-button-cue-to-mon-on");
		}
		else
		{
			eStripButtonCueToMon.classList.remove("strip-button-cue-to-mon-on");
		}
	}


	var szBusButtonCueToMonClear = "bus" + g_nCurrentBusID + "-cue-to-monitoring-clear";
	var eBusButtonCueToMonClear = document.getElementById(szBusButtonCueToMonClear);
	if (eBusButtonCueToMonClear)
	{
		if (jsBus.cue_to_monitoring != -1)
		{
			eBusButtonCueToMonClear.classList.add("master-button-text-cue-to-mon-on");
		}
		else
		{
			eBusButtonCueToMonClear.classList.remove("master-button-text-cue-to-mon-on");
		}
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strips
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetStripJSON(nStripID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
	}

	if (jsMixer.strips == null)
	{
		return;
	}

	if (nStripID == -1)
	{
		return jsMixer.strips;
	}

	for (var i = 0; i < jsMixer.strips.length; i++)
	{
		if (jsMixer.strips[i].id == nStripID)
		{
			return jsMixer.strips[i];
		}
	}

	return null;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetDisplayedStripJSON()
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
	}

	return jsMixer.displayed_strips;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStrips(path, value)
{
	var jsStrips = GetStripJSON(-1);
	if (jsStrips == null)
	{
		return;
	}
	
	for (var i = 0; i < jsStrips.length; i++)
	{
		UpdateStrip(jsStrips[i].id);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDisplayedStrips(path, value)
{
	var jsDisplayedStrips = GetDisplayedStripJSON();
	if (jsDisplayedStrips == null)
	{
		return;
	}

	for (var i = 0; i < jsDisplayedStrips.length; i++)
	{
		UpdateStrip(jsDisplayedStrips[i].id);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStrip(nStripID, subpath, value)
{
	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			if (value.hasOwnProperty("name"))
			{
			    UpdateStripName(nStripID, value.name);

			    //_updatePreampAdditionalControls(nStripID);
			}

			if (value.hasOwnProperty("color"))
			{
				UpdateStripColor(nStripID, value.color);
				UpdateStripLink(nStripID, g_nCurrentBusID);
				UpdateStripMeter(nStripID, g_nCurrentBusID);

				var eStripColorSelector = document.getElementById("mixerSectionPopupStripColorSelector");
				if (eStripColorSelector)
				{
				    UpdateStripColorSelector(nStripID);
				}				

				//_updatePreampAdditionalControls(nStripID);
			}

			if (value.hasOwnProperty("self_cue_id"))
			{
				UpdateStripSelfCue(nStripID, value.self_cue_id);
			}

			if (value.hasOwnProperty("group_id"))
			{
			    var eGroupSelector = document.getElementById("mixerSectionPopupGroupSelector");
			    if (eGroupSelector)
			    {
			        UpdateGroupSelector(nStripID);
			    }

			    //_updatePreampAdditionalControls(nStripID);
			}

			if (value.hasOwnProperty("sends"))
			{
				UpdateSend(nStripID, g_nCurrentBusID);
			}

			return;
		}
	}

	// Fallback: read from cache
	{
		UpdateStripNumber(nStripID);
		UpdateStripLink(nStripID, g_nCurrentBusID);
		UpdateStripMeter(nStripID, g_nCurrentBusID);

		UpdateSend(nStripID, g_nCurrentBusID);

		UpdateSendRotaries(nStripID);

		UpdateStripName(nStripID);
		UpdateStripColor(nStripID);
		UpdateStripSelfCue(nStripID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripButtons(nStripID, nSendID)
{
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var eSolo = document.getElementById("strip" + nStripID + "-send" + nSendID + "-solo");
	if (eSolo)
	{
		jsInput.connected && jsInput.connection_state == 1 ? eSolo.classList.remove("strip-button-disabled") : eSolo.classList.add("strip-button-disabled");
	}

	var eMute = document.getElementById("strip" + nStripID + "-send" + nSendID + "-mute");
	if (eMute)
	{
		jsInput.connected && jsInput.connection_state == 1 ? eMute.classList.remove("strip-button-disabled") : eMute.classList.add("strip-button-disabled");
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripNumber(nStripID)
{
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

	var jsDisplayedStrips = GetDisplayedStripJSON();
	if (jsDisplayedStrips == null)
	{
		return;
	}

	var nDisplayNumber = -1;
	for (var i = 0; i < jsDisplayedStrips.length; i++)
	{
		if (jsDisplayedStrips[i].id == nStripID)
		{
			nDisplayNumber = jsDisplayedStrips[i].display_number;
			break;
		}
	}

	if (nDisplayNumber == -1)
	{
		return;
	}


	var szNumber = (nDisplayNumber + 1);
	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link && jsInput.id < jsInput.linked_input_id)
	{
		szNumber += "/";
		szNumber += (nDisplayNumber + 2);
	}


	var szStripButtonNumber = "strip" + nStripID + "-number";

	var eStripButtonNumber = document.getElementById(szStripButtonNumber);
	if (eStripButtonNumber == null)
	{
		return;
	}

	eStripButtonNumber.innerText = szNumber;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripLink(nStripID, nSendID)
{
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

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
	var szStripLink = "strip" + nStripID + "-link";
	var eStripLink = document.getElementById(szStripLink);
	if (eStripLink == null)
	{
		return;
	}

	var szStripLinkBorder = "strip" + nStripID + "-link-border";
	var eStripLinkBorder = document.getElementById(szStripLinkBorder);
	if (eStripLinkBorder == null)
	{
		return;
	}

	var szStripPanLink = "strip" + nStripID + "-pan-link";
	var eStripPanLink = document.getElementById(szStripPanLink);


	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link == false && jsInput.id < jsInput.linked_input_id)
	{
		eStripLinkBorder.classList.add("strips-link-border-visible");

		if (eStripPanLink)		
			eStripPanLink.classList.add("strips-pan-link-visible");        

		if (!bNeumannEdition || (bNeumannEdition && jsStrip.type == ST_DAW_INPUT))
		{
			jsInput.connected && jsInput.connection_state == 1 ? eStripLinkBorder.classList.remove("strip-button-foot-filtered") : eStripLinkBorder.classList.add("strip-button-foot-filtered");
		}

		if (jsStrip.group_id != -1)
		{
			var jsGroups = GetGroupJSON(jsStrip.group_id);
			if (jsGroups)
			{
				eStripLink.style.backgroundColor = jsGroups.color;

				if (bNeumannEdition)
					eStripLinkBorder.style.borderColor = jsGroups.color;
			}
		}
		else if (jsStrip.color != "#000000")
		{
			eStripLink.style.backgroundColor = jsStrip.color;
			if (bNeumannEdition)
				eStripLinkBorder.style.borderColor = jsStrip.color;

			if (!bNeumannEdition || (bNeumannEdition && jsStrip.type == ST_DAW_INPUT))
			{
				jsInput.connected && jsInput.connection_state == 1 ? eStripLink.classList.remove("strip-button-foot-filtered") : eStripLink.classList.add("strip-button-foot-filtered");
			}
		}
		else
		{
			eStripLink.style.backgroundColor = "var(--strip-background-color)";
		}
	}
	else
	{
		eStripLinkBorder.classList.remove("strips-link-border-visible");
		eStripLink.style.backgroundColor = "transparent";

		if (eStripPanLink)
			eStripPanLink.classList.remove("strips-pan-link-visible");        
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripMeter(nStripID, nSendID)
{
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

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


	var szStripFaderSection = "strip" + nStripID + "-fader-section";
	var eStripFaderSection = document.getElementById(szStripFaderSection);
	if (eStripFaderSection == null)
	{
		return;
	}

	var szStripMeterSection = "strip" + nStripID + "-meter-section";
	var eStripMeterSection = document.getElementById(szStripMeterSection);
	if (eStripMeterSection == null)
	{
		return;
	}

	var szStripOverload = "strip" + nStripID + "-overload";
	var eStripOverload = document.getElementById(szStripOverload);
	if (eStripOverload == null)
	{
		return;
	}

	var szStripOverload2 = "strip" + nStripID + "-overload-2";
	var eStripOverload2 = document.getElementById(szStripOverload2);
	if (eStripOverload2 == null)
	{
		return;
	}

	var szStripMeter = "strip" + nStripID + "-meter";
	var eStripMeter = document.getElementById(szStripMeter);
	if (eStripMeter == null)
	{
		return;
	}

	var szStripMeter2 = "strip" + nStripID + "-meter-2";
	var eStripMeter2 = document.getElementById(szStripMeter2);
	if (eStripMeter2 == null)
	{
		return;
	}

	var szStripSeparator = "strip" + nStripID + "-separator";
	var eStripSeparator = document.getElementById(szStripSeparator);
	if (eStripSeparator == null)
	{
		return;
	}

	var szStripPreampButtons = "strip" + nStripID + "-preamp-buttons";
	var eStripPreampButtons = document.getElementById(szStripPreampButtons);

	var szStripPreampMeter = "strip" + nStripID + "-preamp-meter-section";
	var eStripPreampMeter = document.getElementById(szStripPreampMeter);

	var szStripPreampMeterScale = "strip" + nStripID + "-preamp-meter-scale";
	var eStripPreampMeterScale = document.getElementById(szStripPreampMeterScale);

	var eRotaries = document.getElementsByClassName("strip-send-rotary");
	var ePreampGain = null;
	for (var nIdx = 0; nIdx < eRotaries.length; nIdx++)
	{
		if (eRotaries[nIdx].id.includes("strip" + nStripID))
		{
			ePreampGain = eRotaries[nIdx];
			break;
		}
    }


	// Default
	eStripFaderSection.style.left = "0px";
	eStripMeterSection.style.left = (g_nStripWidth - g_nStripMeterWidth) + "px";
	eStripMeterSection.style.width = g_nStripMeterWidth + "px";

	eStripOverload.style.width = g_nStripMeterWidth + "px";
	eStripOverload2.style.width = "0px";

	eStripMeter.style.width = g_nStripMeterWidth + "px";
	eStripMeter2.style.width = "0px";

	eStripSeparator.style.left = g_nStripWidth + "px";

	if (eStripPreampButtons && eStripPreampMeter && eStripPreampMeterScale && ePreampGain)
	{
		eStripPreampButtons.style.left = (bNeumannEdition ? 0 : 2) + "px";
		eStripPreampMeter.style.left = (g_nStripWidth - (bNeumannEdition ? 1 : 3)) + "px";
		eStripPreampMeterScale.style.left = (g_nStripWidth - 14) + "px";
		ePreampGain.style.left = -2 + "px";
    }


	if (jsInput.linked_input_id != -1)
	{
		if (jsInput.collapsed_link)
		{
			eStripOverload.style.width = g_nStripLinkedMeterWidth + "px";
			eStripOverload.style.left = (bNeumannEdition ? 0 : 1) + "px";

			eStripOverload2.style.width = g_nStripLinkedMeterWidth + "px";
			eStripOverload2.style.left = (g_nStripLinkedMeterWidth + (bNeumannEdition ? 1 : 2)) + "px";

			eStripMeter.style.width = g_nStripLinkedMeterWidth + "px";
			eStripMeter.style.left = (bNeumannEdition ? 0 : 1) + "px";

			eStripMeter2.style.width = g_nStripLinkedMeterWidth + "px";
			eStripMeter2.style.left = (g_nStripLinkedMeterWidth + (bNeumannEdition ? 1 : 2)) + "px";

			if (bNeumannEdition)
			{
				eStripMeterSection.style.width = (g_nStripMeterWidth * 2) + "px";
				eStripMeterSection.style.left = (g_nStripWidth - (g_nStripMeterWidth * 2 + 1)) + "px";
            }
		}
		else
		{
			if (jsInput.id < jsInput.linked_input_id)
			{
				eStripMeterSection.style.left = (g_nStripWidth - (g_nStripMeterWidth - 2)) + "px";

				eStripMeter.style.width = (g_nStripMeterWidth * 0.8) + "px";

				eStripOverload.style.width = (g_nStripMeterWidth * 0.8) + "px";

				eStripSeparator.style.left = (g_nStripWidth * 1.02) + "px";
			}
			else
			{
				eStripFaderSection.style.left = g_nStripMeterSectionWidth + "px";
				eStripMeterSection.style.left = (g_nStripWidth * -0.03) + "px";

				eStripOverload.style.width = (g_nStripMeterWidth * 0.8) + "px";

				eStripMeter.style.width = (g_nStripMeterWidth * 0.8) + "px";

				eStripSeparator.style.left = (g_nStripWidth * 1.04) + "px";

				if (eStripPreampButtons && eStripPreampMeter && eStripPreampMeterScale && ePreampGain)
				{
					eStripPreampButtons.style.left = (bNeumannEdition ? 14 : 12) + "px";
					eStripPreampMeter.style.left = -1 + "px";
					eStripPreampMeterScale.style.left = (bNeumannEdition ? 4.5 : 3.5) + "px";
					ePreampGain.style.left = -8 + "px";
				}
			}
		}
	}
	else
	{
		// Default
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripName(nStripID, name)
{
	var szName;
	if (name != null)
	{
		szName = name;
	}
	else
	{
		var jsStrip = GetStripJSON(nStripID);
		if (jsStrip == null)
		{
			return;
		}

		szName = jsStrip.name;
	}


	var szStripButtonName = "strip" + nStripID + "-name";

	var eStripButtonName = document.getElementById(szStripButtonName);
	if (eStripButtonName == null)
	{
		return;
	}


	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}
	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link && jsInput.id < jsInput.linked_input_id)
	{
		if (szName.endsWith("-L"))
		{
			szName = szName.substr(0, szName.length - 2);
		}
	}

	eStripButtonName.innerText = szName;


    var eEffects = document.getElementById("effectsSection");
    if (eEffects && nStripID == g_nEffectSectionControlInputID)
	{
        UpdateEffectsTitle(false, -1, true, g_nEffectSectionControlInputID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripColor(nStripID, color)
{
	// Always read JSON cache for simplicty
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

	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	// TODO: Read defaults from root property strip-background-color
	var szBackgroundColor = "#000000";

	if (jsStrip.group_id != -1)
	{
		var jsGroup = GetGroupJSON(jsStrip.group_id);
		if (jsGroup && jsGroup.color != "#000000")
		{
			szBackgroundColor = jsGroup.color;
		}
	}
	else if (jsStrip.color != "#000000")
	{
		szBackgroundColor = jsStrip.color;
	}


	var szStripButtonFoot = "strip" + nStripID + "-button-foot";

	var eStripButtonFoot = document.getElementById(szStripButtonFoot);
	if (eStripButtonFoot == null)
	{
		return;
	}

	eStripButtonFoot.style.backgroundColor = szBackgroundColor;
	if (jsSettings.neumann_edition)
		eStripButtonFoot.style.borderColor = szBackgroundColor;

	if (jsSettings.neumann_edition)
	{
		if (jsStrip.type == ST_DAW_INPUT)
		{
			jsInput.connected && jsInput.connection_state == 1 ? eStripButtonFoot.classList.remove("strip-button-foot-filtered") : eStripButtonFoot.classList.add("strip-button-foot-filtered");
		}
		else
		{
			jsInput.connected && jsInput.connection_state == 1 ? eStripButtonFoot.classList.remove("strip-button-foot-not-connected") : eStripButtonFoot.classList.add("strip-button-foot-not-connected");
        }
	}
	else
	{
		jsInput.connected && jsInput.connection_state == 1 ? eStripButtonFoot.classList.remove("strip-button-foot-filtered") : eStripButtonFoot.classList.add("strip-button-foot-filtered");
    }
	

	if ((!jsSettings.neumann_edition && szBackgroundColor != "#000000") || (jsSettings.neumann_edition && (szBackgroundColor != "#343434" && szBackgroundColor != "#266496" && szBackgroundColor != "#5ea24a")))
	{
		eStripButtonFoot.classList.add("strip-button-text-color-black");
	}
	else
	{
		eStripButtonFoot.classList.remove("strip-button-text-color-black");
	}

    var eEffects = document.getElementById("effectsSection");
    if (eEffects && nStripID == g_nEffectSectionControlInputID)
    {
        UpdateEffectsTitle(false, -1, true, g_nEffectSectionControlInputID);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateStripSelfCue(nStripID, self_cue_id)
{
	// Always read JSON cache for simplicty

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


	var szStripButtonSelfCue = "strip" + nStripID + "-self-cue";

	var eStripButtonSelfCue = document.getElementById(szStripButtonSelfCue);
	if (eStripButtonSelfCue == null)
	{
		return;
	}


	if (jsStrip.self_cue_id != null && jsStrip.self_cue_id != -1)
	{
		var szName;
		if (jsStrip.self_cue_id == g_nCurrentBusID)
		{
			szName = jsInput.deesser.enabled ? "MY INP" : "MY INPUT";
		}
		else
		{
			var jsBus = GetBusJSON(jsStrip.self_cue_id);
			if (jsBus == null)
			{
				return;
			}

			szName = jsBus.name; 
		}

		eStripButtonSelfCue.innerText = szName; 
		eStripButtonSelfCue.classList.add("strip-button-foot-2nd-row-text-outline");
	}
	else
	{
		eStripButtonSelfCue.innerText = "";
		eStripButtonSelfCue.classList.remove("strip-button-foot-2nd-row-text-outline");
	}


	var sz2ndRow1st2ndCol = "strip" + nStripID + "-button-foot-2nd-row-1st-2nd-col";
	var e2ndRow1st2ndCol = document.getElementById(sz2ndRow1st2ndCol);
	if (e2ndRow1st2ndCol == null)
	{
		return;
	}
	e2ndRow1st2ndCol.style.width = jsInput.deesser.enabled ? "79%" : "100%";

	var szSelfCue = "strip" + nStripID + "-self-cue";
	var eSelfCue = document.getElementById(szSelfCue);
	if (eSelfCue == null)
	{
		return;
	}
	eSelfCue.style.width = jsInput.deesser.enabled ? "91%" : "95%";
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sends
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetSendJSON(nStripID, nSendID)
{
	if (nStripID == -1)
	{
		return null;
	}

	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
		return null;
	}

	if (nSendID == -1)
	{
		return jsStrip.sends;
	}

	return jsStrip.sends[nSendID]; // Send IDs == Bus IDs == Indexes
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSend(nStripID, nSendID, subpath, value)
{
	if (g_bShowSendRotaries)
	{
		switch (g_nCurrentBusID)
		{
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			{
				if (nSendID >= FIRST_SEND_ROTARY_ID() && nSendID < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES())
				{
					if (value != null && value.hasOwnProperty("group_gain"))
					{
						var jsStrip = GetStripJSON(nStripID);
						if (jsStrip == null)
						{
							return;
						}

						if (jsStrip.group_id != -1)
							UpdateSendRotary(nStripID, nSendID, jsStrip.group_id);						
					}

					UpdateSendRotary(nStripID, nSendID);                    
				}
			}
		}
	}


	if (nSendID != g_nCurrentBusID)
	{
		return;
	}


	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			if (value.hasOwnProperty("gain"))
			{
				UpdateSendGainValue(nStripID, nSendID, null, value.gain);
				UpdateSendGain(nStripID, nSendID, null, value.gain);
			}

			if (value.hasOwnProperty("group_gain"))
			{
				var jsStrip = GetStripJSON(nStripID);
				if (jsStrip && jsStrip.group_id != -1)
				{
					UpdateSendGainValue(nStripID, nSendID, jsStrip.group_id, value.group_gain);
					UpdateSendGain(nStripID, nSendID, jsStrip.group_id, value.group_gain);
				}
			}

			if (value.hasOwnProperty("link_gain"))
			{
				// Nothing to do
			}


			if (value.hasOwnProperty("solo"))
			{
				UpdateSendSolo(nStripID, nSendID, null, value.solo);
			}

			if (value.hasOwnProperty("group_solo"))
			{
				var jsStrip = GetStripJSON(nStripID);
				if (jsStrip && jsStrip.group_id != -1)
				{
					UpdateSendSolo(nStripID, nSendID, jsStrip.group_id, value.group_solo);
				}
			}

			if (value.hasOwnProperty("link_solo"))
			{
				// Nothing to do
			}


			if (value.hasOwnProperty("mute"))
			{
				UpdateSendMute(nStripID, nSendID, null, value.mute);
			}


			if (value.hasOwnProperty("group_mute"))
			{
				var jsStrip = GetStripJSON(nStripID);
				if (jsStrip && jsStrip.group_id != -1)
				{
					UpdateSendMute(nStripID, nSendID, jsStrip.group_id, value.group_mute);
				}
			}

			if (value.hasOwnProperty("link_mute"))
			{
				// Nothing to do
			}


			if (value.hasOwnProperty("pan"))
			{
				UpdateSendPan(nStripID, nSendID, null, value.pan);
			}

			return;
		}
	}

	// Fallback: read from cache
	{
		UpdateSendPan(nStripID, nSendID);

		UpdateSendGainValue(nStripID, nSendID);
		UpdateSendGain(nStripID, nSendID);

		UpdateSendSolo(nStripID, nSendID);
		UpdateSendMute(nStripID, nSendID);


		var jsStrip = GetStripJSON(nStripID);
		if (jsStrip && jsStrip.group_id)
		{
			UpdateSendGainValue(nStripID, nSendID, jsStrip.group_id);
			UpdateSendGain(nStripID, nSendID, jsStrip.group_id);

			UpdateSendSolo(nStripID, nSendID, jsStrip.group_id);
			UpdateSendMute(nStripID, nSendID, jsStrip.group_id);
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendPan(nStripID, nSendID, nGroupID, pan)
{
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var szPan = "";
	if (nGroupID != null)
	{
		szPan = "group" + nGroupID;
	}
	else
	{
		szPan = "strip" + nStripID;
	}
	szPan += "-send" + nSendID + "-pan";

	var ePan = document.getElementById(szPan);
	if (ePan == null)
	{
		return;
	}

	var ePanKnob = document.getElementById(szPan + "-knob");
	if (ePanKnob == null)
	{
		return;
	}

	var ePanKnob2 = document.getElementById(szPan + "-knob2");
	if (ePanKnob2 == null)
	{
		return;
	}


	if (nGroupID != null)
	{
		ePan.classList.add("strip-pan-disabled");
		ePanKnob.classList.add("strip-pan-knob-hidden");
		ePanKnob2.classList.add("strip-pan-knob-hidden");
	}
	else
	{
		ePan.classList.remove("strip-pan-disabled");

		ePanKnob.classList.remove("strip-pan-knob-hidden");
		ePanKnob.classList.remove("strip-pan-knob-disabled");
		ePanKnob.classList.remove("strip-pan-knob-parked");
		ePanKnob.classList.remove("strip-pan-knob-parked-disabled");

		ePanKnob2.classList.remove("strip-pan-knob-hidden");
		ePanKnob2.classList.remove("strip-pan-knob-disabled");
		ePanKnob2.classList.remove("strip-pan-knob-parked");
		ePanKnob2.classList.remove("strip-pan-knob-parked-disabled");


		var nPanValue = 0;
		if (pan != null)
		{
			nPanValue = pan;
		}
		else
		{
			var jsSend = GetSendJSON(nStripID, nSendID);
			if (jsSend == null)
			{
				return;
			}

			nPanValue = jsSend.pan;
		}

		var szPanValue = (((nPanValue + 100) / 200) * (g_nStripPanWidth - g_nStripPanKnobWidth - (g_nElementsBorderWidth * 5))) + g_nElementsBorderWidth;
		ePanKnob.style.left = szPanValue + "px";


		var jsInput = GetInputJSON(nStripID);
		if (jsInput == null)
		{
			return;
		}

		if (jsInput.linked_input_id == -1 || jsInput.collapsed_link == false)
		{
			ePanKnob2.classList.add("strip-pan-knob-hidden");

			if (!jsInput.connected || jsInput.connection_state == 0)
			{
				ePan.classList.add("strip-pan-disabled");
				ePanKnob.classList.add("strip-pan-knob-parked");
				ePanKnob.classList.add("strip-pan-knob-parked-disabled");
            }
			else if (nPanValue == -100 || nPanValue == 0 || nPanValue == 100)
			{
				ePanKnob.classList.add("strip-pan-knob-parked");

				if (ePanKnob.classList.contains("strip-pan-knob-highlighted"))
				{
					ePanKnob.classList.add("strip-pan-knob-highlighted-parked");
				}
			}
			else
			{
				ePanKnob.classList.remove("strip-pan-knob-parked");
				ePanKnob.classList.remove("strip-pan-knob-highlighted-parked");
			}
		}
		else
		{
			ePan.classList.add("strip-pan-disabled");


			var nPanValue2 = 0;
			var jsSend2 = GetSendJSON(jsInput.linked_input_id, nSendID);
			if (jsSend2 == null)
			{
				return;
			}

			nPanValue2 = jsSend2.pan;

			var szPanValue2 = (((nPanValue2 + 100) / 200) * (g_nStripPanWidth - g_nStripPanKnobWidth - g_nElementsBorderWidth * 5)) + g_nElementsBorderWidth;
			ePanKnob2.style.left = szPanValue2 + "px";


			ePanKnob.classList.add("strip-pan-knob-parked-disabled");
			ePanKnob2.classList.add("strip-pan-knob-parked-disabled");
/*
			if (nPanValue == -100 || nPanValue == 0 || nPanValue == 100)
			{
				ePanKnob.classList.add("strip-pan-knob-parked-disabled");
			}
			else
			{
				ePanKnob.classList.add("strip-pan-knob-disabled");
			}


			if (nPanValue2 == -100 || nPanValue2 == 0 || nPanValue2 == 100)
			{
				ePanKnob2.classList.add("strip-pan-knob-parked-disabled");
			}
			else
			{
				ePanKnob2.classList.add("strip-pan-knob-disabled");
			}
*/
		}
	}


	UpdatePanControl(nStripID, nSendID);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateAllSendRotaries()
{
	var jsStrips = GetStripJSON(-1);
	if (jsStrips == null)
	{
		return;
	}

	for (var i = 0; i < jsStrips.length; i++)
	{
		if (jsStrips[i].type == ST_MUSIC_INPUT)
		{
			UpdateSendRotaries(jsStrips[i].id);
			if (jsStrips[i].group_id != -1)
			{
				UpdateSendRotaries(jsStrips[i].id, jsStrips[i].group_id);
			}
		}

		if (jsStrips[i].type == ST_CUE_RETURN || jsStrips[i].type == ST_LOCAL_TALK_MIC || jsStrips[i].type == ST_PEERED_TALK_MIC)
		{
			UpdateSendRotary(jsStrips[i].id, g_nCurrentBusID);
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendRotaries(nStripID, nGroupID)
{
	if (g_bShowSendRotaries == false)
	{
		return;
	}

	for (var i = FIRST_SEND_ROTARY_ID(); i < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); i++)
	{
		UpdateSendRotary(nStripID, i, nGroupID);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendRotary(nStripID, nSendID, nGroupID)
{
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var szStripSendRotary = "";
	if (nGroupID != null)
	{
		szStripSendRotary = "group" + nGroupID;
	}
	else
	{
		szStripSendRotary = "strip" + nStripID;
	}
	szStripSendRotary += "-send" + nSendID + "-rotary";


	var eStripSendRotary = document.getElementById(szStripSendRotary);
	if (eStripSendRotary == null)
	{
		return;
	}


	var bSelected = (g_szSelectedRotaryID == szStripSendRotary);

	var bDisabled = false;
	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip)
	{
		if (jsStrip.type == ST_CUE_RETURN)
		{
			var jsMixBus = GetBusJSON(0);
			if (jsMixBus)
			{
				if (jsMixBus.cue_to_monitoring != nStripID / 2)
				{
					bDisabled = true;
				}
			}
		}
	}


	var nGain = 0;
	var jsSend = GetSendJSON(nStripID, nSendID);
	if (jsSend == null)
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
			
	DrawSendRotary(nStripID, nSendID, nGroupID, nGain, bSelected, bDisabled);



	var eStripSendRotaryValue = document.getElementById(szStripSendRotary + "-value");
	if (eStripSendRotaryValue == null)
	{
		return;
	}

	if (bSelected)
	{
		eStripSendRotaryValue.classList.add("strip-send-rotary-value-selected");
	}
	else
	{
		eStripSendRotaryValue.classList.remove("strip-send-rotary-value-selected");
	}

	if (bDisabled)
	{
		eStripSendRotaryValue.classList.add("strip-send-rotary-value-disabled");
	}
	else
	{
		eStripSendRotaryValue.classList.remove("strip-send-rotary-value-disabled");
	}

	
	if (nGain <= -1445)
	{
		eStripSendRotaryValue.innerText = "";
	}
	else
	{
		// Hack to match QT truncation
		if (nGain < 0)
		{
			nGain -= 5;
		}
		else
		{
			nGain += 5;
		}
		eStripSendRotaryValue.innerText = Math.trunc(nGain / 10);
	}

	var eStripSendRotaryTitle = document.getElementById(szStripSendRotary + "-title");
	if (eStripSendRotaryTitle == null)
	{
		return;
	}

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}

	var cColor = "#bbbbbb";
	if (jsBus.color != "#000000")
	{
		cColor = jsBus.color;
	}

	eStripSendRotaryTitle.style.color = cColor;

	if (nSendID == MM_ID_FIRST_SEND_BUS || nSendID == MM_ID_FIRST_SEND_BUS + 1 || nSendID == MM_ID_FIRST_SEND_BUS + 2)
		eStripSendRotaryTitle.innerText = jsBus.name;



	if (nGroupID == null)
	{
		var jsStrip = GetStripJSON(nStripID);
		if (jsStrip && jsStrip.group_id != -1)
		{
			UpdateSendRotary(nStripID, nSendID, jsStrip.group_id);
		}
	}


	if (g_szSelectedRotaryID == "strip" + nStripID + "-send" + nSendID + "-rotary")
	{
		UpdateSendRotaryControl(nStripID, nSendID, nGroupID);
	}

	if (nGroupID && g_szSelectedRotaryID == "group" + nGroupID + "-send" + nSendID + "-rotary")
	{
		UpdateSendRotaryControl(nStripID, nSendID, nGroupID);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawSendRotary(nStripID, nSendID, nGroupID, gain, bSelected, bDisabled)
{
	var szStripSendRotary = "";
	if (nGroupID != null)
	{
		szStripSendRotary = "group" + nGroupID;
	}
	else
	{
		szStripSendRotary = "strip" + nStripID;
	}
	szStripSendRotary += "-send" + nSendID + "-rotary";


	var eStripSendRotaryCanvas = document.getElementById(szStripSendRotary + "-canvas");
	if (eStripSendRotaryCanvas == null)
	{
		return;
	}

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}

	var cRotaryColor = "#282828";
	var cRingColor = "#dddddd";
	if (jsBus.color != "#000000")
	{
		cRingColor = jsBus.color;
	}

	if (nSendID == 0 || nSendID == 1)
	{
		cRingColor = "#aaaaaa";
	}

	if (bDisabled)
	{
		cRingColor = cRotaryColor;
	}


	var nValue = 0;
	if (gain >= -300)
	{
		nValue = .5 + ((gain + 300) / (360 * 2));
	}
	else
	{
		nValue = (gain + 1445) / ((1445 - 300) * 2);
	}

	DrawRotary(eStripSendRotaryCanvas, nValue, g_nStripWidth, cRingColor, cRotaryColor, bSelected, bDisabled);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawRotary(eCanvas, nValue, nSize, cRingColor, cRotaryColor, bSelected, bDisabled)
{	
	var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
	var bNeumannEdition = jsSettings.neumann_edition;

	if (bNeumannEdition)
	{
		var eNeumannCanvas = document.getElementById("neumann-" + eCanvas.id);
		if (eNeumannCanvas)
		{
			eNeumannCanvas.style.rotate = (-150 + 300 * nValue) + "deg";
		}
	}

	var ctx = eCanvas.getContext("2d");
	if (ctx == null)
	{
		return;
	}


	// Let's deal with the screen high dpi properly to avoid blurry drawing
	// TODO: Do this once only after creation
	let dpi = window.devicePixelRatio;
	eCanvas.setAttribute('height', nSize * dpi);
	eCanvas.setAttribute('width', nSize * dpi);
	ctx.scale(dpi, dpi);

	if (nValue > 1)
		nValue = 1;
	else if (nValue < 0)
		nValue = 0;

	var alpha = (Math.PI * 4 / 6) + ((nValue * 2 * Math.PI * 5) / 6);
	if (alpha > Math.PI * 2)
	{
		alpha -= Math.PI * 2;
	}

	var nRadius = nSize / 2;
	var nRingStrokeWidth = nRadius / 8;
	var nBallSize = nRadius / 5;

	var nRingRadius = nRadius * .9 - nRingStrokeWidth;
	var nCenterRadius = nRingRadius - nBallSize;
	var nBallRadius = nRingRadius - nBallSize * .7;


	var nLeft = nRadius;
	var nTop = nRadius * .9;

	if (bNeumannEdition)
	{
		DrawNeumannKnob(eCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled);
	}
	else
	{
		ctx.beginPath();
		ctx.arc(nLeft, nTop, nCenterRadius, 0, Math.PI * 2);
		ctx.fillStyle = bSelected ? cRingColor : cRotaryColor;
		ctx.fill();
	}


	ctx.beginPath();
	ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, Math.PI * 2 / 6);
	ctx.strokeStyle = cRotaryColor;
	ctx.lineWidth = nRingStrokeWidth;
	ctx.stroke();

	
	ctx.beginPath();
	ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, alpha);
	ctx.strokeStyle = cRingColor;
	ctx.lineWidth = nRingStrokeWidth;
	ctx.stroke();

	if (!bNeumannEdition)
	{
		ctx.beginPath();
		ctx.arc(nLeft + Math.cos(alpha) * nBallRadius, nTop + Math.sin(alpha) * nBallRadius, nBallSize / 2, 0, Math.PI * 2);
		ctx.fillStyle = cRingColor;
		ctx.fill();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawNeumannKnob(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled)
{
    var eCanvas = document.getElementById("neumann-" + eRotaryCanvas.id);
    if (eCanvas == null)
    {
        return;
    }

    var ctx = eCanvas.getContext("2d");
	if (ctx == null)
	{
		return;
    }

	var nSize = eCanvas.offsetWidth;

	// Let's deal with the screen high dpi properly to avoid blurry drawing
	// TODO: Do this once only after creation
	let dpi = window.devicePixelRatio;
	eCanvas.setAttribute('height', nSize * dpi);
	eCanvas.setAttribute('width', nSize * dpi);
	ctx.scale(dpi, dpi);

    ctx.imageSmoothingEnabled = true;

    if (nValue > 1)
        nValue = 1;
    else if (nValue < 0)
        nValue = 0;

	var nRadius = nSize / 2;

	var nLeft = nRadius;
	var nTop = nRadius * .9;

    var tPolygonPointsX = [];
    var tPolygonPointsY = [];

    var fMul = 1.13;
    var fLongLength1 = (nSize / 6.26) / fMul;
    var fLongLength2 = (nSize / 9.14) / fMul;

    var fShortLength1 = (nSize / 14.88) / fMul;
    var fShortLength2 = (nSize / 21.64) / fMul;

    var fStartX = 0;
    var fStartY = 0;

    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fLongLength1; // A
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fShortLength2;
    fStartY += fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fShortLength1; // D
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fLongLength2;
    fStartY += fLongLength2; // C
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += fShortLength1; // E
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);;

    fStartX += fShortLength2;
    fStartY += fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += fLongLength1; // B
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength2;
    fStartY += fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += fShortLength1; // E
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fLongLength2;
    fStartY += fLongLength2; // C
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength1; // D
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength2;
    fStartY += fShortLength2; // F
    fExtremityPointX = fStartX;
    fExtremityPointY = fStartY;
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fLongLength1; // A
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength2;
    fStartY += -fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength1; // D
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fLongLength2;
    fStartY += -fLongLength2; // C
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += -fShortLength1; // E
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += -fShortLength2;
    fStartY += -fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += -fLongLength1; // B
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fShortLength2;
    fStartY += -fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartY += -fShortLength1; // E
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fLongLength2;
    fStartY += -fLongLength2; // C
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fShortLength1; // D
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    fStartX += fShortLength2;
    fStartY += -fShortLength2; // F
    tPolygonPointsX.push(fStartX);
    tPolygonPointsY.push(fStartY);

    for (nPoint = 0; nPoint < tPolygonPointsX.length; nPoint++)
    {
        tPolygonPointsX[nPoint] += (nSize / 2 - (fExtremityPointX) / 2.);
        tPolygonPointsY[nPoint] += (nSize / 2 - (fExtremityPointY) / 2.);
    }

    {
        ctx.beginPath();
        ctx.fillStyle = "#656565";
        ctx.moveTo(tPolygonPointsX[0], tPolygonPointsY[0]);
        for (nPoint = 1; nPoint < tPolygonPointsX.length; nPoint++)
        {
            ctx.lineTo(tPolygonPointsX[nPoint], tPolygonPointsY[nPoint]);
        }
        ctx.closePath();
        ctx.fill();
    }

    // inside disc
    {
        ctx.beginPath();
        ctx.arc(nLeft, nTop + (nSize / 10.) / 2., nSize / 3.7, 0, Math.PI * 2);
        ctx.fillStyle = bSelected ? cRingColor : cRotaryColor;
        ctx.fill();
    }

    // white line
    if (!bDisabled && nValue > 0)
    {
        const nPenWeight = nSize > 170 ? 3 : 1;

        var nCenter1X = nSize / 2.;
        var nCenter1Y = nSize / 2. - (nSize / 3.7) + 1;

        var nCenter2X = nCenter1X;
        var nCenter2Y = nCenter1Y + nSize / 11.;

        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = nPenWeight;

        ctx.moveTo(nCenter1X, nCenter1Y);
        ctx.lineTo(nCenter2X, nCenter2Y);
        ctx.stroke();
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateMasterRotaries()
{
	if (g_bShowSendRotaries == false)
	{
		return;
	}

	for (var i = MM_ID_FIRST_SEND_BUS; i < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); i++)
	//for (var i = FIRST_SEND_ROTARY_ID(); i < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); i++)
	{
		UpdateMasterRotary(i);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateMasterRotary(nSendID)
{
	if (g_bShowSendRotaries == false)
	{
		return;
	}

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}


	var szMasterRotary = "bus" + g_nCurrentBusID + "-master" + nSendID + "-rotary";


	var eMasterRotary = document.getElementById(szMasterRotary);
	if (eMasterRotary == null)
	{
		return;
	}


	var bSelected = false;
	var bDisabled = false;


	var nGain = jsBus.master_gain;
			
	DrawMasterRotary(nSendID, nGain, bSelected, bDisabled);



	var eMasterRotaryValue = document.getElementById(szMasterRotary + "-value");
	if (eMasterRotaryValue == null)
	{
		return;
	}

	if (bSelected)
	{
		eMasterRotaryValue.classList.add("strip-send-rotary-value-selected");
	}
	else
	{
		eMasterRotaryValue.classList.remove("strip-send-rotary-value-selected");
	}

	if (bDisabled)
	{
		eMasterRotaryValue.classList.add("strip-send-rotary-value-disabled");
	}
	else
	{
		eMasterRotaryValue.classList.remove("strip-send-rotary-value-disabled");
	}

	
	if (nGain <= -1445)
	{
		eMasterRotaryValue.innerText = "";
	}
	else
	{
		// Hack to match QT truncation
		if (nGain < 0)
		{
			nGain -= 5;
		}
		else
		{
			nGain += 5;
		}
		eMasterRotaryValue.innerText = Math.trunc(nGain / 10);
	}

	var eMasterRotaryTitle = document.getElementById(szMasterRotary + "-title");
	if (eMasterRotaryTitle == null)
	{
		return;
	}

	var cColor = "#bbbbbb";
	if (jsBus.color != "#000000")
	{
		cColor = jsBus.color;
	}

	eMasterRotaryTitle.style.color = cColor;

	if (nSendID == MM_ID_FIRST_SEND_BUS || nSendID == MM_ID_FIRST_SEND_BUS + 1 || nSendID == MM_ID_FIRST_SEND_BUS + 2)
		eMasterRotaryTitle.innerText = jsBus.name;


	if (g_szSelectedRotaryID == "bus" + g_nCurrentBusID + "-master" + nSendID + "-rotary")
	{
		UpdateSendRotaryControl(null, nSendID);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawMasterRotary(nSendID, gain, bSelected, bDisabled)
{
	var szMasterRotary = "bus" + g_nCurrentBusID + "-master" + nSendID + "-rotary";


	var eMasterRotaryCanvas = document.getElementById(szMasterRotary + "-canvas");
	if (eMasterRotaryCanvas == null)
	{
		return;
	}

	var jsBus = GetBusJSON(nSendID);
	if (jsBus == null)
	{
		return;
	}

	var cRotaryColor = "#282828";
	var cRingColor = "#dddddd";
	if (jsBus.color != "#000000")
	{
		cRingColor = jsBus.color;
	}

	if (nSendID == 0 || nSendID == 1)
	{
		cRingColor = "#aaaaaa";
	}

	if (bDisabled)
	{
		cRingColor = cRotaryColor;
	}


	var nValue = 0;
	if (gain >= -300)
	{
		nValue = .5 + ((gain + 300) / (360 * 2));
	}
	else
	{
		nValue = (gain + 1445) / ((1445 - 300) * 2);
	}

	DrawRotary(eMasterRotaryCanvas, nValue, g_nStripWidth, cRingColor, cRotaryColor, bSelected, bDisabled);
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendGainValue(nStripID, nSendID, nGroupID, gain)
{
	var szGainValueID = "";
	if (nGroupID != null)
	{
		szGainValueID = "group" + nGroupID;
	}
	else
	{
		szGainValueID = "strip" + nStripID;
	}
	szGainValueID += "-send" + nSendID + "-gain-value";

	var eGainValue = document.getElementById(szGainValueID);
	if (eGainValue == null)
	{
		return; // Not found may mean that very strip is the hidden leg of a collapsed link, not an error
	}

	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}


	var nGain = 0;
	var jsSend;

	// We always use the JSON value instead of notification value to ensure we always use the collapsed linked value if applicable
/*
	if (gain != null)
	{
		nGain = gain;
	}
	else
*/
	{
		jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
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


	nGain = Number(nGain / 10.).toFixed(nGain == 0 ? 0 : 1);
	if (nGain < -30)
	{
		nGain = Math.trunc(nGain);
	}

	var szGainValue = (nGain > 0 ? "+" : "") + nGain;
	if (nGain <= -144)
	{
		szGainValue = "-oo";
	}



	eGainValue.innerText = szGainValue;


	if (nGain > 0)
	{
		eGainValue.classList.add("strip-button-text-color-positive");
	}
	else
	{
		eGainValue.classList.remove("strip-button-text-color-positive");
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GainToPos(nGain)
{
	var nScaleStepPerdB1 = g_nStripScaleStepHeight * 8 / 12;
	var nScaleStepPerdB2 = g_nStripScaleStepHeight * 8 / 24;
	var nScaleStepPerdB3 = g_nStripScaleStepHeight * 4 / 60;
	var nScaleStepPerdB4 = g_nStripScaleStepHeight * 4 / 54.5;
	var n0dB = (nScaleStepPerdB1 * 6);
	var n144dB = (nScaleStepPerdB1 * 12) + (nScaleStepPerdB2 * 24) + (nScaleStepPerdB3 * 60) + (nScaleStepPerdB4 * 54.5);

	var nPos = n0dB;
	
	if (nGain >= -6)
	{
		nPos -= (nGain * nScaleStepPerdB1);
	}
	else if (nGain >= -30)
	{
		nPos -= (-6 * nScaleStepPerdB1) + ((nGain + 6) * nScaleStepPerdB2);
	}
	else if (nGain >= -90)
	{
		nPos -= (-6 * nScaleStepPerdB1) + (-24 * nScaleStepPerdB2) + ((nGain + 30) * nScaleStepPerdB3);
	}
	else
	{
		nPos -= (-6 * nScaleStepPerdB1) + (-24 * nScaleStepPerdB2) + (-60 * nScaleStepPerdB3) + ((nGain + 90) * nScaleStepPerdB4);
	}

	if (nPos < 0)
	{
		nPos = 0;
	}

	if (nPos > n144dB)
	{
		nPos = n144dB;
	}

	return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PosToGain(nPos)
{
	var nScaleStepPerdB1 = g_nStripScaleStepHeight * 8 / 12;
	var nScaleStepPerdB2 = g_nStripScaleStepHeight * 8 / 24;
	var nScaleStepPerdB3 = g_nStripScaleStepHeight * 4 / 60;
	var nScaleStepPerdB4 = g_nStripScaleStepHeight * 4 / 54.5;
	var n0dB = (nScaleStepPerdB1 * 6);
	var n_6dB = (nScaleStepPerdB1 * 12);
	var n_30dB = (nScaleStepPerdB1 * 12) + (nScaleStepPerdB2 * 24);
	var n_90dB = (nScaleStepPerdB1 * 12) + (nScaleStepPerdB2 * 24) + (nScaleStepPerdB3 * 60);

	var nGain = 0;

	if (nPos <= n0dB)
	{
		nGain -= (nPos - n0dB) / nScaleStepPerdB1;
	}
	else if (nPos <= n_6dB)
	{
		nGain -= (nPos - n0dB) / nScaleStepPerdB1;
	}
	else if (nPos <= n_30dB)
	{
		nGain -= 6 + (nPos - n_6dB) / nScaleStepPerdB2;
	}
	else if (nPos <= n_90dB)
	{
		nGain -= 30 + (nPos - n_30dB) / nScaleStepPerdB3;
	}
	else
	{
		nGain -= 90 + (nPos - n_90dB) / nScaleStepPerdB4;
	}

	if (nGain > 6)
	{
		nGain = 6;
	}

	if (nGain < MM_MUTE_DB)
	{
		nGain = MM_MUTE_DB;
	}

	return nGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampMeterGainToPos(nGain)
{
	var bDXDDSDMode = g_nSampleRate == 352800;

	var nScaleStepPerdB1 = g_nStripPreampMeterHeight * (4 / (g_bPreampCapabilityZInAvailable ? 9.55 : 8.55)) / 12;
	var nScaleStepPerdB2 = g_nStripPreampMeterHeight * (2 / (g_bPreampCapabilityZInAvailable ? 9.55 : 8.55)) / (bDXDDSDMode ? 12 : 6);
	var nScaleStepPerdB3 = g_nStripPreampMeterHeight * ((g_bPreampCapabilityZInAvailable ? 2.04 : 1.04) / (g_bPreampCapabilityZInAvailable ? 9.55 : 8.55)) / 18;
	var nScaleStepPerdB4 = g_nStripPreampMeterHeight * (1.52 / (g_bPreampCapabilityZInAvailable ? 9.55 : 8.55)) / 36;
	var n0dB = bDXDDSDMode ? nScaleStepPerdB1 * 6 : 0;

	var nPos = n0dB;
	
	if (nGain >= (bDXDDSDMode ? -6 : -12))
	{
		nPos -= (nGain * nScaleStepPerdB1);
	}
	else if (nGain >= -18)
	{
		nPos -= ((bDXDDSDMode ? -6 : -12) * nScaleStepPerdB1) + ((nGain + (bDXDDSDMode ? 6 : 12)) * nScaleStepPerdB2);
	}
	else if (nGain >= -36)
	{
		nPos -= ((bDXDDSDMode ? -6 : -12) * nScaleStepPerdB1) + ((bDXDDSDMode ? -12 : -6) * nScaleStepPerdB2) + ((nGain + 18) * nScaleStepPerdB3);
	}
	else
	{
		nPos -= ((bDXDDSDMode ? -6 : -12) * nScaleStepPerdB1) + ((bDXDDSDMode ? -12 : -6) * nScaleStepPerdB2) + (-18 * nScaleStepPerdB3) + ((nGain + 36) * nScaleStepPerdB4);
	}

	return nPos;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampRotaryControlGainToPos(nGain)
{
	var nPos = g_nPreampPopupGainScaleHeight - nGain * g_nPreampPopupGainScaleHeight / ((g_nPreampPopupGainScaleMax - g_nPreampPopupGainScaleMin) / 10.);

	if (nPos < 0)
		nPos = 0;

	if (nPos > g_nPreampPopupGainScaleHeight)
		nPos = g_nPreampPopupGainScaleHeight;


	return nPos;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PreampRotaryControlPosToGain(nPos)
{
	var nGain = (g_nPreampPopupGainScaleHeight - nPos) * ((g_nPreampPopupGainScaleMax - g_nPreampPopupGainScaleMin) / 10.) / g_nPreampPopupGainScaleHeight;

	var nDecimal = nGain - Math.trunc(nGain);

	if (nDecimal < 0.25)
		nGain = Math.trunc(nGain);
	else if (nDecimal >= 0.25 && nDecimal < 0.75)
		nGain = Math.trunc(nGain) + 0.5;
	else //if (nDecimal >= 0.75)
		nGain = Math.trunc(nGain) + 1;

	if (nGain < g_nPreampPopupGainScaleMin / 10.)
		nGain = g_nPreampPopupGainScaleMin / 10.;

	if (nGain > g_nPreampPopupGainScaleMax / 10.)
		nGain = g_nPreampPopupGainScaleMax / 10.;

	return nGain;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendGain(nStripID, nSendID, nGroupID, gain)
{
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}
	var bNeumannEdition = jsSettings.neumann_edition;

	var jsStrip = GetStripJSON(nStripID);
	if (jsStrip == null)
	{
		return;
	}

	if (jsStrip.type == ST_CUE_RETURN || jsStrip.type == ST_LOCAL_TALK_MIC || jsStrip.type == ST_PEERED_TALK_MIC)
	{
		UpdateSendRotary(nStripID, nSendID, nGroupID);
		return;
	}


	var szStripGainID = "";
	if (nGroupID != null)
	{
		szStripGainID = "group" + nGroupID;
	}
	else
	{
		szStripGainID = "strip" + nStripID;
	}

	var szGainKnobSliderID = szStripGainID + "-send" + nSendID + "-fader-slider";
	var eGainKnobSlider = document.getElementById(szGainKnobSliderID);
	if (eGainKnobSlider == null)
	{
		return; // Not found may mean that very strip is the hidden leg of a collapsed link, not an error
	}

	var szGainKnobID = szStripGainID + "-send" + nSendID + "-fader-slider-knob";
	var eGainKnob = document.getElementById(szGainKnobID);
	if (eGainKnob == null)
	{
		return;
	}

	var szGainKnobID2 = szStripGainID + "-send" + nSendID + "-fader-slider-knob-2";
	var eGainKnob2 = document.getElementById(szGainKnobID2);
	if (bNeumannEdition && eGainKnob2 == null)
	{
		return;
	}

	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}


	var nGain = 0;
	var jsSend;

	// We always use the JSON value instead of notification value to ensure we always use the collapsed linked value if applicable
/*
	if (gain != null)
	{
		nGain = gain;
	}
	else
*/
	{
		jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
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


	var nGainPos = GainToPos(nGain / 10) - g_nStripFaderKnobHeight;


	var szGainID = "";
	if (nGroupID != null)
	{
		szGainID = "--group" + nGroupID;
	}
	else
	{
		szGainID = "--strip" + nStripID;
	}
	szGainID += "-send" + nSendID + "-fader-slider-knob-top";

	var r = document.querySelector(':root');
	r.style.setProperty(szGainID, nGainPos + "px");



	var szBorderColor = bNeumannEdition ? "#e2d9bf" : "#eeeeee";
	var szColorDisabled = bNeumannEdition ? "#7e796a" : "#444444";

	if (jsStrip.group_id != -1)
	{
		var jsGroups = GetGroupJSON(jsStrip.group_id);
		if (jsGroups)
		{
			szBorderColor = jsGroups.color;
		}
	}

	if (nGroupID != null)
	{
		eGainKnobSlider.style.backgroundColor = szBorderColor;
	}

	eGainKnob.style.borderColor = jsInput.connected && jsInput.connection_state == 1 ? szBorderColor : szColorDisabled;

	if (eGainKnob2)
	{
		eGainKnob2.style.borderColor = jsInput.connected && jsInput.connection_state == 1 ? szBorderColor : szColorDisabled;
		eGainKnob2.style.backgroundColor = jsInput.connected && jsInput.connection_state == 1 ? szBorderColor : szColorDisabled;
	}

	if (nGain == 0 || bNeumannEdition)
	{
		eGainKnob.style.backgroundColor = jsInput.connected && jsInput.connection_state == 1 ? szBorderColor : szColorDisabled;
	}
	else if (!bNeumannEdition)
	{
		eGainKnob.style.backgroundColor = "#000000";
	}


	UpdateSendGainFaderHidden(nStripID, nSendID, nGroupID, gain);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendGainFaderHidden(nStripID, nSendID, nGroupID, gain)
{
	var szStripID = "";
	if (nGroupID != null)
	{
		szStripID = "group" + nGroupID;
	}
	else
	{
		szStripID = "strip" + nStripID;
	}


	var nGain = 0;
	var jsSend;

	if (gain != null)
	{
		nGain = gain;
	}
	else
	{
		jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
		{
			return;
		}

		if (nGroupID != null)
		{
			nGain = jsSend.group_gain;
		}
		else
		{
			nGain = jsSend.gain;
		}
	}


	var nGainPos = GainToPos(nGain / 10) - g_nStripFaderKnobHeight;


	var szKnobHiddenID = szStripID + "-send" + nSendID + "-fader-hidden";
	var eKnobHiddenID = document.getElementById(szKnobHiddenID);
	if (eKnobHiddenID)
	{
	    if (g_bButtonsHideFaders && (nGainPos > g_nStripFaderHeight - g_nStripButtonsContainerHeight + g_nStripButtonsGapHeight * 2) && g_nCapturedFaderStrip != nStripID && g_nCapturedFaderGroupStrip != nStripID)
		{
			if (nGain <= -1445)
			{
				eKnobHiddenID.innerText = "-oo";
			}
			else
			{
				eKnobHiddenID.innerText = "V";
			}
		}
		else
		{
			eKnobHiddenID.innerText = "";
		}
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendSolo(nStripID, nSendID, nGroupID, solo)
{
	var bSolo = false;
	if (solo != null)
	{
		bSolo = solo;
	}
	else
	{
		var jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
		{
			return;
		}

		bSolo = (nGroupID != null && jsSend.group_solo) || jsSend.solo;
	}


	var szSolo = "";
	if (nGroupID != null)
	{
		szSolo = "group" + nGroupID;
	}
	else
	{
		szSolo = "strip" + nStripID;
	}
	szSolo += "-send" + nSendID + "-solo";

	var eSolo = document.getElementById(szSolo);
	if (eSolo == null)
	{
		return;
	}

	if (bSolo)
	{
		eSolo.classList.add("strip-button-solo-on");
	}
	else
	{
		eSolo.classList.remove("strip-button-solo-on");
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSendMute(nStripID, nSendID, nGroupID, mute)
{
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var bMute = false;
	if (mute != null)
	{
		bMute = mute;
	}
	else
	{
		var jsSend = GetSendJSON(nStripID, nSendID);
		if (jsSend == null)
		{
			return;
		}

		bMute = (nGroupID != null && jsSend.group_mute) || jsSend.mute;
	}


	var szMute = "";
	if (nGroupID != null)
	{
		szMute = "group" + nGroupID;
	}
	else
	{
		szMute = "strip" + nStripID;
	}
	szMute += "-send" + nSendID + "-mute";

	var eMute = document.getElementById(szMute);
	if (eMute == null)
	{
		return;
	}

	var eMeter = document.getElementById((nGroupID != null ? "group" + nGroupID : "strip" + nStripID) + "-meter");
	if (eMeter == null)
	{
		return;
	}
	
	bMute ? eMute.classList.add("strip-button-mute-on") : eMute.classList.remove("strip-button-mute-on");
	bMute ? eMeter.classList.add("strip-meter-muted") : eMeter.classList.remove("strip-meter-muted");

	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		var eMeter = document.getElementById("strip" + nStripID + "-meter-2");
		if (eMeter == null)
		{
			return;
		}

		bMute ? eMeter.classList.add("strip-meter-muted") : eMeter.classList.remove("strip-meter-muted");		
    }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Groups
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetGroupJSON(nGroupID)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return null;
	}

	if (jsMixer.groups == null)
	{
		return null;
	}

	if (nGroupID == -1)
	{
		return jsMixer.groups;
	}

	return jsMixer.groups[nGroupID]; // Group IDs == Indexes
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroups(path, value)
{
	var jsGroups = GetGroupJSON(-1);
	if (jsGroups == null)
	{
		return;
	}
	
	for (var i = 0; i < jsGroups.length; i++)
	{
		UpdateGroup(jsGroups[i].id);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroup(nGroupID, subpath, value)
{
	if (subpath != null && value != null)
	{
		if (subpath == "")
		{
			if (value.hasOwnProperty("collapsed_on_bus"))
			{
				BuildMixerUI();
				return;
			}

			// Always read JSON cache for simplicty (group name and color never change)
			//return;
		}
	}

	// Fallback: read from cache
	{
		UpdateGroupColor(nGroupID);
		UpdateGroupName(nGroupID);

		UpdateGroupSend(nGroupID, g_nCurrentBusID);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroupCollapsed(nGroupID, nBusID)
{
	if (nBusID == g_nCurrentBusID)
	{
		BuildMixerUI();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroupSend(nGroupID, nSendID)
{
	var jsStrips = GetStripJSON(-1);
	if (jsStrips == null)
	{
		return;
	}

	for (var i = 0; i < jsStrips.length; i++)
	{
		if (jsStrips[i].group_id == nGroupID)
		{
			UpdateSendPan(jsStrips[i].id, nSendID, nGroupID);
			UpdateSendGainValue(jsStrips[i].id, nSendID, nGroupID);
			UpdateSendGain(jsStrips[i].id, nSendID, nGroupID);
			UpdateSendSolo(jsStrips[i].id, nSendID, nGroupID);
			UpdateSendMute(jsStrips[i].id, nSendID, nGroupID);

			UpdateSendRotaries(jsStrips[i].id, nGroupID);
			return;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroupColor(nGroupID)
{
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null)
	{
		return;
	}

	var jsGroups = GetGroupJSON(nGroupID);
	if (jsGroups == null)
	{
		return;
	}

	// TODO: Read defaults from root property strip-background-color
	var szBackgroundColor = "#000000";

	if (jsGroups.color != "#000000")
	{
		szBackgroundColor = jsGroups.color;
	}


	var szStripButtonFoot = "group" + nGroupID + "-button-foot";

	var eStripButtonFoot = document.getElementById(szStripButtonFoot);
	if (eStripButtonFoot == null)
	{
		return;
	}

	eStripButtonFoot.style.backgroundColor = szBackgroundColor;
	if (jsSettings.neumann_edition)
		eStripButtonFoot.style.borderColor = szBackgroundColor;

	if (szBackgroundColor != "#000000")
	{
		eStripButtonFoot.classList.add("strip-button-text-color-black");
	}
	else
	{
		eStripButtonFoot.classList.remove("strip-button-text-color-black");
	}



	var szGroupStripKnobID = "group" + nGroupID + "-send" + g_nCurrentBusID + "-fader-slider-knob";

	var eGroupStripKnobID = document.getElementById(szGroupStripKnobID);
	if (eGroupStripKnobID == null)
	{
		return;
	}

	eGroupStripKnobID.style.borderColor = szBackgroundColor;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateGroupName(nGroupID)
{
	var jsGroups = GetGroupJSON(nGroupID);
	if (jsGroups == null)
	{
		return;
	}


	var szStripButtonName = "group" + nGroupID + "-name";
	var eStripButtonName = document.getElementById(szStripButtonName);
	if (eStripButtonName == null)
	{
		return;
	}

	eStripButtonName.innerText = jsGroups.name;
}


  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Meters
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MeterTodB(meter)
{
	return Linear2dB(meter / 65536);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateMeters(path, value)
{
	//return;

	var r = document.querySelector(':root');

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Decay
	var nDecay = 4;
	// (2 = 25ms/dB with a current refresh period of 50ms)
	// (4 = 25ms/dB with a current refresh period of 100ms)
	// TODO: Adjust with proper period and decay integration time settings value


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Strips
	if (value.strips)
	{
		for (var i = 0; i < value.strips.length; i++)
		{
			if (value.strips[i].levels == null)
			{
				continue;
			}

			var nMeter = MeterTodB(value.strips[i].levels[0]);
			if (nMeter <= -72)
			{
				nMeter = -144.5;
			}

			var jsSend = GetSendJSON(value.strips[i].id, g_nCurrentBusID);
			if (jsSend == null)
			{
				continue;
			}

			nMeter += (jsSend.gain / 10);


			// Decay integration 
			var nLastMeter = r.style.getPropertyValue("--strip" + value.strips[i].id + "-meter-last");
			if (nMeter < nLastMeter - nDecay)
			{
				nMeter = nLastMeter - nDecay;
			}
			r.style.setProperty("--strip" + value.strips[i].id + "-meter-last", nMeter);



			var nGainPos = GainToPos(nMeter);


			var szStripMeterID = "--strip" + value.strips[i].id + "-meter";
			var szOverloadID = "strip" + value.strips[i].id + "-overload";
			
			var jsInput = GetInputJSON(value.strips[i].id);
			if (jsInput == null)
			{
				continue;
			}

			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link && jsInput.id > jsInput.linked_input_id)
			{
				szStripMeterID = "--strip" + jsInput.linked_input_id + "-meter-2";
				szOverloadID = "strip" + jsInput.linked_input_id + "-overload-2";
			}


			r.style.setProperty(szStripMeterID, nGainPos + "px");


			if (nGainPos < g_n0dB)
			{
				var eOverload = document.getElementById(szOverloadID);
				if (eOverload)
				{
					eOverload.classList.add("strip-overloaded");
				}
			}



			if (value.strips[i].ov_clips == null || value.strips[i].ov_clips_hold == null)
			{
				continue;
			}

			var szPreampPeak = "strip" + value.strips[i].id + "-preamp-peak";
			var ePreampPeak = document.getElementById(szPreampPeak);
			if (ePreampPeak)
			{
				if (value.strips[i].ov_clips & 2)
				{
					ePreampPeak.classList.add("strip-preamp-peak-clip");
				}
				else
				{
					ePreampPeak.classList.remove("strip-preamp-peak-clip");
				}

				if (value.strips[i].ov_clips_hold & 2)
				{
					ePreampPeak.classList.add("strip-preamp-peak-clip-hold");
				}
				else
				{
					ePreampPeak.classList.remove("strip-preamp-peak-clip-hold");
				}
			}
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Groups
	var jsGroups = GetGroupJSON(-1);
	var jsStrips = GetStripJSON(-1);
	if (jsGroups && jsStrips)
	{
		for (var i = 0; i < jsGroups.length; i++)
		{
			var szGroupMeter = "group" + jsGroups[i].id + "-meter";
			var eGroupMeter = document.getElementById(szGroupMeter);
			if (eGroupMeter)
			{
/*
				var nLevel = 0;
				var nGain = 0;
				for (var j = 0; j < jsStrips.length; j++)
				{
					if (jsStrips[j].group_id == jsGroups[i].id)
					{
						if (value.strips[j].levels[0] > nLevel)
						{
							nLevel = value.strips[j].levels[0];
							nGain = jsStrips[j].sends[g_nCurrentBusID].gain;
						}
					}
				}


				var nMeter = MeterTodB(nLevel);
				if (nMeter <= -72)
				{
					nMeter = -144.5;
				}

				nMeter += (nGain / 10);
*/

				var nMeter = MM_MUTE_DB;
				for (var j = 0; j < jsStrips.length; j++)
				{
					if (jsStrips[j].group_id == jsGroups[i].id)
					{
						if (value.strips[j])
						{
							var nStripMeter = MeterTodB(value.strips[j].levels[0]);
							nStripMeter += (jsStrips[j].sends[g_nCurrentBusID].gain / 10);
							if (nStripMeter > nMeter)
							{
								nMeter = nStripMeter;
							}
						}
					}
				}


				// Decay integration 
				var nLastMeter = r.style.getPropertyValue("--group" + jsGroups[i].id + "-meter-last");
				if (nMeter < nLastMeter - nDecay)
				{
					nMeter = nLastMeter - nDecay;
				}
				r.style.setProperty("--group" + jsGroups[i].id + "-meter-last", nMeter);


				var nGainPos = GainToPos(nMeter);


				r.style.setProperty("--" + szGroupMeter, nGainPos + "px");


				if (nGainPos < g_n0dB)
				{
					var eOverload = document.getElementById("group" + jsGroups[i].id + "-overload");
					if (eOverload)
					{
						eOverload.classList.add("strip-overloaded");
					}
				}
			}
		}
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master
	var nMeterLeft = -144.5;
	var nMeterRight = -144.5;

	if (value.busses && value.busses[g_nCurrentBusID] && value.busses[g_nCurrentBusID].levels)
	{
		nMeterLeft = MeterTodB(value.busses[g_nCurrentBusID].levels[0]);

		// Decay integration 
		var nLastMeter = r.style.getPropertyValue("--bus" + g_nCurrentBusID + "-meter-left-last");
		if (nMeterLeft < nLastMeter - nDecay)
		{
			nMeterLeft = nLastMeter - nDecay;
		}
		r.style.setProperty("--bus" + g_nCurrentBusID + "-meter-left-last", nMeterLeft);


		nMeterRight = MeterTodB(value.busses[g_nCurrentBusID].levels[1]);

		// Decay integration 
		var nLastMeter = r.style.getPropertyValue("--bus" + g_nCurrentBusID + "-meter-right-last");
		if (nMeterRight < nLastMeter - nDecay)
		{
			nMeterRight = nLastMeter - nDecay;
		}
		r.style.setProperty("--bus" + g_nCurrentBusID + "-meter-right-last", nMeterRight);
	}

	var nGainPos = GainToPos(nMeterLeft);
	var szBusMeterID = "--bus" + g_nCurrentBusID + "-meter-left";
	r.style.setProperty(szBusMeterID, nGainPos + "px");

	var nGainPos = GainToPos(nMeterRight);
	var szBusMeterID = "--bus" + g_nCurrentBusID + "-meter-right";
	r.style.setProperty(szBusMeterID, nGainPos + "px");



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Dynamics
	if (value.dyn_in)
	{
	    if (document.getElementById("DynamicsEffectContainer"))
	    {
	        UpdateDynamicsInputMeters(value.dyn_in);
	    }
	}

    if (value.dyn_out)
	{
	    if (document.getElementById("DynamicsEffectContainer"))
	    {
	        UpdateDynamicsOutputMeters(value.dyn_out);
	    }
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Deesser
	if (value.deesser_in)
	{
	    if (document.getElementById("DeesserEffectContainer"))
	    {
			UpdateDeesserInputMeters(value.deesser_in);
	    }
	}

	if (value.deesser_out)
	{
	    if (document.getElementById("DeesserEffectContainer"))
	    {
			UpdateDeesserOutputMeters(value.deesser_out);
	    }
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreamps()
{
	var jsModules = GetModulesJSON();
	if (jsModules == null)
	{
		return;
	}

	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].custom == null || jsModules[nIdx].custom.ins == null || jsModules[nIdx].custom.ins.channels == null || jsModules[nIdx].custom.ins.capabilities == null)
			continue;

		UpdatePreampCapabilities(jsModules[nIdx].id, jsModules[nIdx].custom.ins.channels, jsModules[nIdx].custom.ins.capabilities);
		UpdatePreampChannels(jsModules[nIdx].id);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetPreampCapabilityZInAvailable()
{
	var jsModules = GetModulesJSON();
	if (jsModules == null)
	{
		return;
	}

	var bZInAvailable = false;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].custom == null || jsModules[nIdx].custom.ins == null || jsModules[nIdx].custom.ins.channels == null || jsModules[nIdx].custom.ins.capabilities == null || jsModules[nIdx].custom.ins.capabilities.channel == null)
			continue;

		bZInAvailable |= jsModules[nIdx].custom.ins.capabilities.channel["z_in"];
	}

	return bZInAvailable;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampCapabilities(nModuleID, jsChannels, jsCapabilities)
{
	var jsCapabilities = jsCapabilities.channel;

	var b48VAvailable = jsCapabilities["48V"];
	var bMicAvailable = jsCapabilities["mic"];
	var bLineAvailable = jsCapabilities["line"];
	var bInstrumentAvailable = jsCapabilities["instrument"];
	var bBoostAvailable = jsCapabilities["lift"];
	var bPadAvailable = jsCapabilities["pad"];
	var bPhaseAvailable = jsCapabilities["phase"];
	var bLowCutAvailable = jsCapabilities["lowCut"];
	var bZInAvailable = jsCapabilities["z_in"];
	var bCutAvailable = jsCapabilities["cut"];
	var bLockAvailable = jsCapabilities["lock"];

	for (var nChannelID = 0; nChannelID < jsChannels.length; nChannelID++)
	{
		var ePreampButtons = document.getElementsByClassName("strip-button-preamp");
		var szPreamp = "module" + nModuleID + "-channel" + nChannelID + "-preamp";
		var nStripID;
		for (var nIdx = 0; nIdx < ePreampButtons.length; nIdx++)
		{
			if (ePreampButtons[nIdx].id.includes(szPreamp))
			{
				var szButtonId = ePreampButtons[nIdx].id;
				var szButtonIdTruncated = szButtonId.slice(0, szButtonId.indexOf(szPreamp) - 1);

				szPreamp = szButtonIdTruncated + "-" + szPreamp;

				nStripID = Number(szButtonIdTruncated.replace("strip", ""));
				break;
            }
		}

		var eInputMode = document.getElementById(szPreamp + "-inputMode");
		if (eInputMode)
		{
			if (bMicAvailable && bLineAvailable && bInstrumentAvailable)
			{
				AddEvent(eInputMode.id, "click", (function _ToggleMicLineInstrument(_eInputMode, _nModuleID, _nChannelID) { return function () { return ToggleMicLineInstrument(_eInputMode, _nModuleID, _nChannelID); } })(eInputMode, nModuleID, nChannelID));
			}
			else if (bLineAvailable && bMicAvailable)
			{
				AddEvent(eInputMode.id, "click", (function _ToggleMicLine(_eInputMode, _nModuleID, _nChannelID) { return function () { return ToggleMicLine(_eInputMode, _nModuleID, _nChannelID); } })(eInputMode, nModuleID, nChannelID));
			}
			else if (bLineAvailable && bInstrumentAvailable)
			{
				AddEvent(eInputMode.id, "click", (function _ToggleLineInstrument(_eInputMode, _nModuleID, _nChannelID) { return function () { return ToggleLineInstrument(_eInputMode, _nModuleID, _nChannelID); } })(eInputMode, nModuleID, nChannelID));
			}
		}

		var eLock = document.getElementById(szPreamp + "-lock");
		if (eLock)
		{
			bLockAvailable ? eLock.classList.remove("strip-button-preamp-lock-disabled") : eLock.classList.add("strip-button-preamp-lock-disabled");

			if (bLockAvailable)
				AddEvent(eLock.id, "click", (function _ToggleLock(_eLock, _nModuleID, _nChannelID) { return function () { return ToggleLock(_eLock, _nModuleID, _nChannelID); } })(eLock, nModuleID, nChannelID));
		}

		var e48V = document.getElementById(szPreamp + "-48V");
		if (e48V)
		{
			b48VAvailable ? e48V.classList.remove("strip-button-preamp-disabled") : e48V.classList.add("strip-button-preamp-disabled");

			if (b48VAvailable)
				AddEvent(e48V.id, "click", (function _Toggle48V(_e48V, _nModuleID, _nChannelID) { return function () { return Toggle48V(_e48V, _nModuleID, _nChannelID); } })(e48V, nModuleID, nChannelID));
		}

		var eZIn = document.getElementById(szPreamp + "-zIn");
		if (eZIn)
		{
			bZInAvailable ? eZIn.classList.remove("strip-button-preamp-disabled") : eZIn.classList.add("strip-button-preamp-disabled");

			if (bZInAvailable)
				AddEvent(eZIn.id, "click", (function _ToggleZIn(_eZIn, _nModuleID, _nChannelID) { return function () { return ToggleZIn(_eZIn, _nModuleID, _nChannelID); } })(eZIn, nModuleID, nChannelID));
		}

		var ePad = document.getElementById(szPreamp + "-pad");
		if (ePad)
		{
			bBoostAvailable && bPadAvailable ? ePad.classList.remove("strip-button-preamp-disabled") : ePad.classList.add("strip-button-preamp-disabled");

			if (bBoostAvailable)
				AddEvent(ePad.id, "click", (function _OpenPreampPadPopup(_ePad, _nStripID, _nModuleID, _nChannelID) { return function () { return OpenPreampPadPopup(_ePad, _nStripID, _nModuleID, _nChannelID); } })(ePad, nStripID, nModuleID, nChannelID));
		}

		var ePhase = document.getElementById(szPreamp + "-phase");
		if (ePhase)
		{
			bPhaseAvailable ? ePhase.classList.remove("strip-button-preamp-disabled") : ePhase.classList.add("strip-button-preamp-disabled");

			if (bPhaseAvailable)
				AddEvent(ePhase.id, "click", (function _TogglePhase(_ePhase, _nModuleID, _nChannelID) { return function () { return TogglePhase(_ePhase, _nModuleID, _nChannelID); } })(ePhase, nModuleID, nChannelID));
		}

		var eLowCut = document.getElementById(szPreamp + "-lowCut");
		if (eLowCut)
		{
			bLowCutAvailable ? eLowCut.classList.remove("strip-button-preamp-disabled") : eLowCut.classList.add("strip-button-preamp-disabled");

			if (bLowCutAvailable)
				AddEvent(eLowCut.id, "click", (function _OpenPreampLowCutPopup(_eLowCut, _nStripID, _nModuleID, _nChannelID) { return function () { return OpenPreampLowCutPopup(_eLowCut, _nStripID, _nModuleID, _nChannelID); } })(eLowCut, nStripID, nModuleID, nChannelID));
		}

		var eCut = document.getElementById(szPreamp + "-cut");
		if (eCut)
		{
			bCutAvailable ? eCut.classList.remove("strip-button-preamp-disabled") : eCut.classList.add("strip-button-preamp-disabled");

			if (bCutAvailable)
				AddEvent(eCut.id, "click", (function _ToggleCut(_eCut, _nModuleID, _nChannelID) { return function () { return ToggleCut(_eCut, _nModuleID, _nChannelID); } })(eCut, nModuleID, nChannelID));
		}

		var eGroup = document.getElementById(szPreamp + "-group");
		if (eGroup)
		{
			AddEvent(eGroup.id, "click", (function _OpenPreampGroupPopup(_ePad, _nStripID, _nModuleID, _nChannelID) { return function () { return OpenPreampGroupPopup(_ePad, _nStripID, _nModuleID, _nChannelID); } })(eGroup, nStripID, nModuleID, nChannelID));
		}

		var eGain = document.getElementById(szPreamp + "-gain-rotary");
		if (eGain)
		{
			if (jsCapabilities.hasOwnProperty("micGain") && jsCapabilities.micGain && jsCapabilities.hasOwnProperty("micGain_info"))
			{
				eGain.min = jsCapabilities.micGain_info.min;
				eGain.max = jsCapabilities.micGain_info.max;
			}
			else if (jsCapabilities.hasOwnProperty("lineGain") && jsCapabilities.lineGain && jsCapabilities.hasOwnProperty("lineGain_info"))
			{
				eGain.min = jsCapabilities.lineGain_info.min;
				eGain.max = jsCapabilities.lineGain_info.max;
			}
			else if (jsCapabilities.hasOwnProperty("instrumentGain") && jsCapabilities.instrumentGain && jsCapabilities.hasOwnProperty("instrumentGain_info"))
			{
				eGain.min = jsCapabilities.instrumentGain_info.min;
				eGain.max = jsCapabilities.instrumentGain_info.max;
            }

			AddEvent(eGain.id, "click", (function _OpenPreampRotaryControl(_eGain, _nStripID, _nModuleID, _nChannelID) { return function () { return OpenPreampRotaryControl(_eGain, _nStripID, _nModuleID, _nChannelID); } })(eGain, nStripID, nModuleID, nChannelID));
        }
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampChannels(nModuleID)
{
	var jsSetting = GetSettingsJSON();
	if (jsSetting == null)
	{
		return;
	}
	var bNeumannEdition = jsSetting.neumann_edition;

	var jsModules = GetModulesJSON();
	if (jsModules == null)
	{
		return;
	}

	var jsChannels;
	var szModuleName;
	for (var nIdx = 0; nIdx < jsModules.length; nIdx++)
	{
		if (jsModules[nIdx].id == nModuleID && jsModules[nIdx].custom != null && jsModules[nIdx].custom.ins != null && jsModules[nIdx].custom.ins.channels != null)
		{
			jsChannels = jsModules[nIdx].custom.ins.channels;
			szModuleName = jsModules[nIdx].name;
			break;
        }
	}
	 

	for (var nChannelID = 0; nChannelID < jsChannels.length; nChannelID++)
	{
		var ePreampButtons = document.getElementsByClassName("strip-button-preamp");
		var szPreamp = "module" + nModuleID + "-channel" + nChannelID + "-preamp";
		for (var nIdx = 0; nIdx < ePreampButtons.length; nIdx++)
		{
			if (ePreampButtons[nIdx].id.includes(szPreamp))
			{
				var szButtonId = ePreampButtons[nIdx].id;
				var szButtonIdTruncated = szButtonId.slice(0, szButtonId.indexOf(szPreamp) - 1);

				szPreamp = szButtonIdTruncated + "-" + szPreamp;			
				break;
            }
		}

		var jsChannel = jsChannels[nChannelID];

		var eLock = document.getElementById(szPreamp + "-lock");
		var ePhase = document.getElementById(szPreamp + "-phase");
		var eGain = document.getElementById(szPreamp + "-gain-rotary");
		var eInputMode = document.getElementById(szPreamp + "-inputMode");
		var e48V = document.getElementById(szPreamp + "-48V");
		var eZIn = document.getElementById(szPreamp + "-zIn");
		var ePad = document.getElementById(szPreamp + "-pad");
		var eLowCut = document.getElementById(szPreamp + "-lowCut");
		var eCut = document.getElementById(szPreamp + "-cut");
		var eGroup = document.getElementById(szPreamp + "-group");

		// Lock
		var bLocked = false;
		if (jsChannel.hasOwnProperty("lock"))
		{
			bLocked = jsChannel.lock;
			if (eLock)
			{
				eLock.classList.remove("strip-button-preamp-lock-disabled");
				eLock.classList.remove("strip-button-preamp-disabled");

				if (bLocked)
				{
					eLock.classList.remove("strip-button-preamp-lock");
					eLock.classList.add("strip-button-preamp-lock-checked");
				}
				else
				{
					eLock.classList.remove("strip-button-preamp-lock-checked");
					eLock.classList.add("strip-button-preamp-lock");
                }
			}
		}


		// InputMode
		var bUpdateGain = false;
		var bOffline = false;
		if (jsChannel.hasOwnProperty("inputMode"))
		{
			if (jsChannel.inputMode == null && eInputMode)
			{
				bOffline = true;
				eInputMode.classList.add("strip-button-preamp-2lines");
				eInputMode.innerText = bNeumannEdition ? "OFF\nLINE" : "Off\nLine";
			}
			else
			{
				if (eInputMode)
				{
					eInputMode.classList.remove("strip-button-preamp-2lines");

					bLocked ? eInputMode.classList.add("strip-button-preamp-disabled") : eInputMode.classList.remove("strip-button-preamp-disabled");

					var nInputMode = jsChannel.inputMode;
					switch (nInputMode)
					{
						case 0: // mic
						{						
							bUpdateGain = true;
							eInputMode.innerText = bNeumannEdition ? "MIC" : "Mic";
							break;
						}

						case 1: // line
						{
							bUpdateGain = true;
							eInputMode.innerText = bNeumannEdition ? "LINE" : "Line";
							break;
						}

						case 2: // instrument
						{
							bUpdateGain = true;
							eInputMode.innerText = bNeumannEdition ? "INST" : "Inst";
							break;
						}
					}
				}		
            }	
		}

		// 48V
		if (jsChannel.hasOwnProperty("m48V"))
		{
			if (e48V && eGain)
			{
				e48V.classList.remove("strip-button-preamp-disabled");
				e48V.classList.remove("strip-button-preamp-red-checked-disabled");
				e48V.classList.remove("strip-button-preamp-red-checked");

				if (jsChannel.hasOwnProperty("inputMode") && jsChannel.inputMode != 0)
				{
					e48V.classList.add("strip-button-preamp-disabled");
				}
				else if (jsChannel.m48V)
				{
					bLocked ? e48V.classList.add("strip-button-preamp-red-checked-disabled") : e48V.classList.add("strip-button-preamp-red-checked");
				}
				else if (bLocked)
				{
					e48V.classList.add("strip-button-preamp-disabled");
                }
			}
		}

		// ZIn
		if (jsChannel.hasOwnProperty("z_in"))
		{
			if (eZIn)
			{
				eZIn.classList.remove("strip-button-preamp-disabled");
				eZIn.classList.remove("strip-button-preamp-checked-disabled");
				eZIn.classList.remove("strip-button-preamp-checked");

				eZIn.innerText = (jsChannel.z_in ? (bNeumannEdition ? "Z LO" : "Z Lo") : (bNeumannEdition ? "Z HI" : "Z Hi"));

				if (jsChannel.z_in)
				{
					bLocked ? eZIn.classList.add("strip-button-preamp-checked-disabled") : eZIn.classList.add("strip-button-preamp-checked");
				}
				else if (bLocked)
				{
					eZIn.classList.add("strip-button-preamp-disabled");
                }
			}
		}

		// Pad
		if (jsChannel.hasOwnProperty("lift") || jsChannel.hasOwnProperty("pad"))
		{			
			if (ePad && eGain)
			{				
				ePad.classList.remove("strip-button-preamp-disabled");
				ePad.classList.remove("strip-button-preamp-checked-disabled");
				ePad.classList.remove("strip-button-preamp-checked");

				if (bNeumannEdition)
					ePad.classList.add("strip-button-preamp-2lines");

				if (jsChannel.hasOwnProperty("inputMode") && jsChannel.inputMode != 0)
				{
					ePad.innerText = bNeumannEdition ? "PAD\nOFF" : "None";
					ePad.classList.add("strip-button-preamp-disabled");
				}
				else
				{
					var nPadMode = 1;
					if (jsChannel.lift)
					{
						nPadMode = 0;
                    }
					else if (jsChannel.pad)
					{
						nPadMode = 2;
                    }

					switch (nPadMode)
					{
						case 0: // lift
						{
							ePad.innerText = bNeumannEdition ? "PAD\nOFF" : "Boost";
							break;
						}

						case 1: // neutral
						{
							ePad.innerText = bNeumannEdition ? "PAD\n-12dB" : "None";
							break;
						}

						case 2: // pad
						{
							ePad.innerText = bNeumannEdition ? "PAD\n-24dB" : "Pad";
							break;
						}
					}
					
					if ((bNeumannEdition && nPadMode == 0) || (!bNeumannEdition && nPadMode == 1))
					{
						if (bLocked)
							ePad.classList.add("strip-button-preamp-disabled");
					}
					else
					{
						bLocked ? ePad.classList.add("strip-button-preamp-checked-disabled") : ePad.classList.add("strip-button-preamp-checked");
					}					
                }				
			}			
		}
		else
		{
			if (ePad)
			{
				if (bNeumannEdition)
					ePad.classList.add("strip-button-preamp-2lines");

				ePad.innerText = bNeumannEdition ? "PAD\nOFF" : "None";
				ePad.classList.add("strip-button-preamp-disabled");
            }
        }

		// Phase
		if (jsChannel.hasOwnProperty("phase"))
		{
			if (ePhase)
			{
				ePhase.classList.remove("strip-button-preamp-disabled");
				ePhase.classList.remove("strip-button-preamp-checked-disabled");
				ePhase.classList.remove("strip-button-preamp-checked");

				if (jsChannel.phase)
				{
					bLocked ? ePhase.classList.add("strip-button-preamp-checked-disabled") : ePhase.classList.add("strip-button-preamp-checked");
				}
				else if (bLocked)
				{
					ePhase.classList.add("strip-button-preamp-disabled");
                }
			}
		}

		// 80Hz
		if (jsChannel.hasOwnProperty("lowCut"))
		{
			if (eLowCut)
			{
				eLowCut.classList.remove("strip-button-preamp-disabled");
				eLowCut.classList.remove("strip-button-preamp-checked-disabled");
				eLowCut.classList.remove("strip-button-preamp-checked");

				eLowCut.innerText = "LOWCUT\nOFF";

				if (jsChannel.lowCut)
				{
					bLocked ? eLowCut.classList.add("strip-button-preamp-checked-disabled") : eLowCut.classList.add("strip-button-preamp-checked");
					eLowCut.innerText = "LOWCUT\n" + jsChannel.lowCut_freq + "Hz";
				}

				if (bLocked)
				{
					eLowCut.classList.add("strip-button-preamp-disabled");
                }
			}
		}

		// Cut
		if (jsChannel.hasOwnProperty("cut"))
		{
			if (eCut)
			{
				eCut.classList.remove("strip-button-preamp-disabled");

				if (bNeumannEdition)
				{					
					eCut.classList.remove("strip-button-preamp-red-checked-disabled");
					eCut.classList.remove("strip-button-preamp-red-checked");
				}
				else
				{
					eCut.classList.remove("strip-button-preamp-cut");
					eCut.classList.remove("strip-button-preamp-cut-disabled");
					eCut.classList.remove("strip-button-preamp-cut-checked");
					eCut.classList.remove("strip-button-preamp-cut-checked-disabled");
                }				

				if (jsChannel.cut)
				{
					if (bLocked)
					{
						eCut.classList.add("strip-button-preamp-disabled");
						eCut.classList.add("strip-button-preamp-" + (bNeumannEdition ? "red" : "cut") + "-checked-disabled");
					}
					else
					{
						eCut.classList.add("strip-button-preamp-" + (bNeumannEdition ? "red" : "cut") + "-checked");
                    }
					
				}
				else if (bLocked)
				{
					eCut.classList.add("strip-button-preamp-disabled");

					if (!bNeumannEdition)
						eCut.classList.add("strip-button-preamp-cut-disabled");
				}
				else if (!bNeumannEdition)
				{
					eCut.classList.add("strip-button-preamp-cut");
				}
			}
		}

		if (eGroup)
		{
			bLocked ? eGroup.classList.add("strip-button-preamp-disabled") : eGroup.classList.remove("strip-button-preamp-disabled");
		}

		// Gain
		if (jsChannel.hasOwnProperty("micGain") || jsChannel.hasOwnProperty("lineGain") || jsChannel.hasOwnProperty("instrumentGain"))
			bUpdateGain = true;

		if (eGain && ePad && (bUpdateGain || bOffline))
		{
			var nGain = 0;
			var nGainOffset = 0;
			if (bNeumannEdition)
			{
				var nPadMode = 1;
				if (jsChannel.hasOwnProperty("lift") && jsChannel.lift)
				{
					nPadMode = 0;
                }
				else if (jsChannel.hasOwnProperty("pad") && jsChannel.pad)
				{
					nPadMode = 2;
                }

				switch (nPadMode)
				{
					case 0: // lift
					{
						nGainOffset += 120;
						break;
					}

					case 1: // neutral
					{
						break;
					}

					case 2: // pad
					{
						nGainOffset -= 120;
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

			var eGainValue = document.getElementById(szPreamp + "-gain-rotary-value")
			if (eGainValue)
			{
				eGainValue.innerText = bOffline || bLocked && bNeumannEdition ? "" : Number((nGain + (nInputMode == 0 ? nGainOffset : 0)) / 10.).toFixed(1);

				if (bLocked || bOffline)
				{
					eGainValue.classList.add("strip-send-rotary-value-disabled");
                }					
				else
				{
					eGainValue.classList.remove("strip-send-rotary-value-disabled");
                }
            }

			DrawPreampRotary(szPreamp + "-gain-rotary", szPreamp + "-gain-rotary-canvas", bOffline ? 0 : nGain, false, bOffline || bLocked, bNeumannEdition);

			if (g_szSelectedRotaryID == szPreamp + "-gain-rotary")
			{
				UpdatePreampRotaryControl(jsChannels, nChannelID, szModuleName);
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawPreampRotary(szRotaryId, szRotaryCanvasId, nGain, bSelected, bDisabled, bNeumannEdition)
{
	var eRotary = document.getElementById(szRotaryId);
	if (eRotary == null)
	{
		return;
	}

	var eRotaryCanvas = document.getElementById(szRotaryCanvasId);
	if (eRotaryCanvas == null)
	{
		return;
	}

	var cRotaryColor = "#282828";
	var cRingColor = bNeumannEdition ? "#ae262f" : "#ad4006";

	if (bDisabled)
	{
		cRingColor = bNeumannEdition ? "#460f13" : "#564003";
	}


	var nValue = (nGain) / (eRotary.max - eRotary.min);

	DrawRotary(eRotaryCanvas, nValue, g_nStripWidth, cRingColor, cRotaryColor, bSelected, bDisabled);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nPreampMeter_LevelHotdB = 0;
var g_nPreampMeter_LevelAlignmentdB = 0;
var g_nPreampMeter_DecaydB = 0;
var g_bPreampMeter_PeakHold = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampMeters(value, bUpdateHotAlignment)
{
	var r = document.querySelector(':root');
	
	if (value)
	{
		if (value.vumeter)
		{
			var jsVuMeter = value.vumeter;
			var nPreampMeter_LevelHotdB = 0;
			if (g_nSampleRate == 352800 && jsVuMeter.hasOwnProperty("level_dxddsd_hot"))
			{
				nPreampMeter_LevelHotdB = jsVuMeter.level_dxddsd_hot;
			}
			else if (jsVuMeter.hasOwnProperty("level_hot"))
			{
				nPreampMeter_LevelHotdB = jsVuMeter.level_hot;
			}

			var nPreampMeter_LevelAlignmentdB = 0;
			if (jsVuMeter.hasOwnProperty("level_alignment"))
			{
				nPreampMeter_LevelAlignmentdB = jsVuMeter.level_alignment;
			}

			if (nPreampMeter_LevelHotdB != g_nPreampMeter_LevelHotdB || nPreampMeter_LevelAlignmentdB != g_nPreampMeter_LevelAlignmentdB)
			{
				g_nPreampMeter_LevelHotdB = nPreampMeter_LevelHotdB;
				g_nPreampMeter_LevelAlignmentdB = nPreampMeter_LevelAlignmentdB; 

				bUpdateHotAlignment = true;
			}

			if (jsVuMeter.hasOwnProperty("update_period") && jsVuMeter.hasOwnProperty("decay_integration_time"))
			{
				if (jsVuMeter.update_period > 0)
				{
					g_nPreampMeter_DecaydB = jsVuMeter.update_period / jsVuMeter.decay_integration_time;
				}
				else
				{
					g_nPreampMeter_DecaydB = -MM_MUTE_DB;
				}
			}

			if (jsVuMeter.hasOwnProperty("peak_hold"))
			{
				g_bPreampMeter_PeakHold = jsVuMeter.peak_hold;
			}
		}
		else if (value.state._modules)
		{
			var jsModules = value.state._modules;
			for (var i = 0; i < jsModules.length; i++)
			{
				var jsModule = jsModules[i];
				var nModuleID = jsModule.id;

				if (jsModule.hasOwnProperty("meters"))
				{
					if (jsModule.meters.hasOwnProperty("ins"))
					{
						var jsIns = jsModule.meters.ins;

						if (jsIns.hasOwnProperty("ov_clips"))
						{
							var jsOvClips = jsIns.ov_clips;
							for (var idx = 0; idx < jsOvClips.length; idx++)
							{
								UpdatePreampMeter("ov_clip", jsOvClips[idx], nModuleID, idx);
							}
						}

						if (jsIns.hasOwnProperty("ov_clips_hold"))
						{
							var jsOvClipsHold = jsIns.ov_clips_hold;
							for (var idx = 0; idx < jsOvClipsHold.length; idx++)
							{
								UpdatePreampMeter("ov_clip_hold", jsOvClipsHold[idx], nModuleID, idx);
							}
						}

						if (jsIns.hasOwnProperty("levels"))
						{
							var jsLevels = jsIns.levels;
							for (var idx = 0; idx < jsLevels.length; idx++)
							{
								UpdatePreampMeter("level", jsLevels[idx], nModuleID, idx);
							}
						}

						if (jsIns.hasOwnProperty("levels_hold"))
						{
							var jsLevelsHold = jsIns.levels_hold;
							for (var idx = 0; idx < jsLevelsHold.length; idx++)
							{
								UpdatePreampMeter("level_hold", jsLevelsHold[idx], nModuleID, idx);
							}
						}
					}
				}			
			}
		}
	}

	if (bUpdateHotAlignment)
	{
		r.style.setProperty("--preamp-meter-hotdB", PreampMeterGainToPos(g_nPreampMeter_LevelHotdB) + "px");
		r.style.setProperty("--preamp-meter-alignmentdB", PreampMeterGainToPos(g_nPreampMeter_LevelAlignmentdB) + "px");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdatePreampMeter(szPropertyToUpdate, value, nModuleID, nChannelID)
{
	var r = document.querySelector(':root');

	var ePreampMeters = document.getElementsByClassName("preamp-meter");
	var szPreamp = "module" + nModuleID + "-channel" + nChannelID + "-preamp";
	for (var nIdx = 0; nIdx < ePreampMeters.length; nIdx++)
	{
		if (ePreampMeters[nIdx].id.includes(szPreamp))
		{
			var szMeterId = ePreampMeters[nIdx].id;
			var szMeterIdTruncated = szMeterId.slice(0, szMeterId.indexOf(szPreamp) - 1);

			szPreamp = szMeterIdTruncated + "-" + szPreamp;
			break;
		}
	}

	var eMeter = document.getElementById(szPreamp + "-meter");
	if (eMeter)
	{
		if (szPropertyToUpdate == "level")
		{
			var nMeterdB = MeterTodB(value);

			if (nMeterdB < -72)
			{
				nMeterdB = -72;
			}

			var nLastMeterdB = r.style.getPropertyValue("--" + szPreamp + "-meter-last");
			if (nMeterdB < nLastMeterdB - g_nPreampMeter_DecaydB)
			{
				nMeterdB = nLastMeterdB - g_nPreampMeter_DecaydB;
			}
			r.style.setProperty("--" + szPreamp + "-preamp-meter-last", nMeterdB + "px");

			var nGainPos = PreampMeterGainToPos(nMeterdB);

			var szPreampMeterID = "--" + szPreamp + "-meter";
			r.style.setProperty(szPreampMeterID, nGainPos + "px");
		}

		var ePreampClip = document.getElementById(szPreamp + "-clip");
		if (ePreampClip)
		{
			if (!g_bPreampMeter_PeakHold && szPropertyToUpdate == "ov_clip")
			{
				value & 2 ? ePreampClip.classList.add("preamp-clipped") : ePreampClip.classList.remove("preamp-clipped");
			}

			if (g_bPreampMeter_PeakHold && szPropertyToUpdate == "ov_clip_hold")
			{
				value & 2 ? ePreampClip.classList.add("preamp-clipped") : ePreampClip.classList.remove("preamp-clipped");
			}
		}				
	}
}
