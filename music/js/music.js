////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Music Mission Web App
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_bDisplayPreamps = false;
var g_bDisplaySettings = false;
var g_nSettingsGoToIndex = -1;

var g_szSnapshotsCategory = "";
var g_szScrollToEffectName = "";


var e_popUpMenuUserManual = document.getElementById('showUserManual');

var e_sampleRateDisplay = document.getElementById('sampleRateDisplay');
var e_slaveMasterInfo = document.getElementById('slaveMasterInfo');
var e_expertMode = document.getElementById('expertMode');
var e_DanteLogo = document.getElementById('danteLogo');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_cInitFunctions = []; // array containing functions to be called upon initialization with the root JSON "$"
var g_bUseNotifier = false;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_bind = function()
{
	var bNeumannEdition = false;
	RouterApp.notifyMe_on_channel("/ravenna/settings", "$._oem_ui_process_engine.music.mixer.settings.neumann_edition", function(data)
	{
		bNeumannEdition = data.value;
	});

	// To reload index.html if current_mission_id does not match with the current WebApp
	RouterApp.notifyMe_on_channel("/ravenna/settings", "$._oem_ui_process_engine.anubis_settings.missions", function(data)
	{
		if ((!bNeumannEdition && data.value.current_mission_id != 3) || (bNeumannEdition && data.value.current_mission_id != 8))
		{
			var szURL = data.value.current_url;
			location.replace(szURL);
		}		
	});

	// $.xxx updates dispatcher
	let initId = RouterApp.notifyMe_on_channel("/ravenna/settings", "$", function(data)
	{
		_dispatch(data.path, data.value);
	});

	RouterApp.notifyMe_on_channel("/ravenna/settings", "$._oem_ui_process_engine", function(data)
	{
		_dispatch(data.path, data.value);
	});
	
	// $.xxx updates dispatcher
	RouterApp.notifyMe_on_channel("/ravenna/monitoring_meters", "$", function(data)
	{
		_dispatch_meters(data.path, data.value);
	});


	// Meters
	RouterApp.notifyMe("$._modules[?(@.id==" + ZMI_ROUTERVUMETER + ")][0]", function (data)
	{
		let value = data.value;
		//_updatePreampMeters(value);
		UpdatePreampMeters(value);
	});


	// Sampling Rate
	RouterApp.notifyMe("$.ios[0].configuration",function (data)
	{
		let path = data.path;
		let value = data.value;
		if(value.sampleRate != undefined)
		{
			e_sampleRateDisplay.innerHTML = convertSampleRateToString(value.sampleRate);
		}
	});


	// Network status
	RouterApp.notifyMe("$.network.PTP.Status",function (data)
	{
		let path = data.path;
		let value = data.value;
		let ptpMaster = value.Master;
		if(ptpMaster != undefined){
			if (ptpMaster){
				e_slaveMasterInfo.innerHTML = 'M';
			}
			else{
				e_slaveMasterInfo.innerHTML = 'S';
			}
		}
		
		switch (value.LockStatus){
			default:
				e_slaveMasterInfo.style.color = "#7F7F7F";
				break;
			case 1: // unlocked
				e_slaveMasterInfo.style.color = "#ff0000";
				break;
			case 2: // locking
				e_slaveMasterInfo.style.color = "#aaaa00";
				break;
			case 3: // locked
				e_slaveMasterInfo.style.color = "#00aa00";
				break;
		}
	});

	load_FromCookie();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function _dispatch(path, value)
{
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path == "$")
	{
		if (g_bInitialized && value.identity)
		{
			//location.reload();
			BuildMixerUI();
			return;
		}

		_init(value);
		return;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._modules[?(@.id=="))
	{
		let result = path.match(/\$\._modules\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);
		if (result != null)
		{
			let nModuleID = result[2];

			UpdatePreampChannels(nModuleID);
		}
	}


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._oem_ui_process_engine.presets"))
	{
	    UpdatePresets();
	    return;
	}


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._oem_ui_process_engine.subsets"))
	{
	    UpdateSubsets();
	    return;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._oem_ui_process_engine.usb_mapping") || path.startsWith("$._oem_ui_process_engine.dante_mapping"))
	{
		if (document.getElementById("mixerSectionPopupBusRouting_Low") || document.getElementById("mixerSectionPopupBusRouting_Large"))
		{
			CloseBusRouting();
			OpenBusRouting();
		}
		return;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._oem_ui_process_engine.music.mixer"))
	{
		if (value.hasOwnProperty("reverb_type_id"))
		{
			if (g_nEffectSectionControlBusID == MM_ID_REVERB_BUS)
			{
				location.reload();
				return;
				//CloseEffects();
				//EditFX(MM_ID_REVERB_BUS);
			}
		}

		if (value.hasOwnProperty("sample_rate"))
		{
			BuildMixerUI();
			UpdatePreampMeters(undefined, true);
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.dsp_ressources")
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
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.settings")
		{
			UpdateSettings(path, value);
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.inputs")
		{
			UpdateInputs(path, value);
			return;
		}

		if (path.startsWith("$._oem_ui_process_engine.music.mixer.inputs[?(@.id=="))
		{
			let result = path.match(/\$\._oem_ui_process_engine\.music\.mixer\.inputs\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
			if (result != null)
			{
				let nID = result[2];

				var subpath = "";
				var sep = path.indexOf("][0]");
				if (sep != -1)
				{
					subpath = path.substr(sep + 4);
				}

				if (subpath.startsWith(".eq"))
				{
					UpdateInputEQ(nID, subpath, value);
				}
				else if (subpath.startsWith(".dynamics"))
				{
					UpdateInputDynamics(nID, subpath, value);
				}
				else if (subpath.startsWith(".deesser"))
				{
					UpdateInputDeesser(nID, subpath, value);
				}
				else
				{
					UpdateInput(nID, subpath, value);
				}
			}
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.outputs")
		{
			UpdateOutputs(path, value);
			return;
		}

		if (path.startsWith("$._oem_ui_process_engine.music.mixer.outputs[?(@.id=="))
		{
			let result = path.match(/\$\._oem_ui_process_engine\.music\.mixer\.outputs\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
			if (result != null)
			{
				let nID = result[2];

				UpdateOutput(nID);
			}
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.busses")
		{
			UpdateBusses(path, value);
			return;
		}

		if (path.startsWith("$._oem_ui_process_engine.music.mixer.busses[?(@.id=="))
		{
			let result = path.match(/\$\._oem_ui_process_engine\.music\.mixer\.busses\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
			if (result != null)
			{
				let nID = result[2];

				var subpath = "";
				var sep = path.indexOf("][0]");
				if (sep != -1)
				{
					subpath = path.substr(sep + 4);
				}

				if (subpath.startsWith(".eq"))
				{
					UpdateBusEQ(nID, subpath, value);
				}
				else if (subpath.startsWith(".dynamics"))
				{
					UpdateBusDynamics(nID, subpath, value);
				}
				else if (subpath.startsWith(".reverb"))
				{
					UpdateBusReverb(nID, subpath, value);
				}
				else
				{
					UpdateBus(nID, subpath, value);
				}
			}
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.strips")
		{
			UpdateStrips(path, value);
			return;
		}

		if (path.startsWith("$._oem_ui_process_engine.music.mixer.strips[?(@.id=="))
		{
			let result = path.match(/\$\._oem_ui_process_engine\.music\.mixer\.strips\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
			if (result != null)
			{
				let nStripID = result[2];

				var subpath = "";
				var sep = path.indexOf("][0]");
				if (sep != -1)
				{
					subpath = path.substr(sep + 4);
				}

				if (subpath.startsWith(".sends"))
				{
					let result2 = subpath.match(/.sends\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
					if (result2 != null)
					{
						let nSendID = result2[2];

						var subpath2 = "";
						var sep2 = path.indexOf("][0]");
						if (sep2 != -1)
						{
							subpath2 = subpath.substr(sep2 + 4);
						}

						UpdateSend(nStripID, nSendID, subpath2, value);
					}
				}
				else
				{
					UpdateStrip(nStripID, subpath, value);
				}
			}
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.displayed_strips")
		{
			BuildMixerUI();
			//location.reload();
			return;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if (path == "$._oem_ui_process_engine.music.mixer.groups")
		{
			UpdateGroups(path, value);
			return;
		}

		if (path.startsWith("$._oem_ui_process_engine.music.mixer.groups[?(@.id=="))
		{
			let result = path.match(/\$\._oem_ui_process_engine\.music\.mixer\.groups\[\?\(\@\.(\w+)==(\d+)\)\]\[0\]/);			
			if (result != null)
			{
				let nGroupID = result[2];

				var subpath = "";
				var sep = path.indexOf("][0]");
				if (sep != -1)
				{
					subpath = path.substr(sep + 4);
				}

				if (subpath.startsWith(".collapsed_on_bus"))
				{
					let result2 = subpath.match(/.collapsed_on_bus\[(\d+)\]/);			
					if (result2 != null)
					{
						let nBusID = result2[1];

						UpdateGroupCollapsed(nGroupID, nBusID);
					}
				}
				else
				{
					UpdateGroup(nGroupID, subpath, value);
				}
			}
			return;
		}
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function _dispatch_meters(path, value)
{
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if (path.startsWith("$._oem_ui_process_engine.music_meters"))
	{
		UpdateMeters(path, value);
		return;
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_initMusicWebApp = function()
{
	return BuildMixerUI();
}

g_cInitFunctions.push(_initMusicWebApp);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_bInitialized = false;

function _init(value)	// global initialization can be done from here
{
/*
	if (g_bInitialized)
	{
		g_bInitialized = false;
		location.reload();
		return;
	}
*/

	for (initFunctionIndex = 0; initFunctionIndex < g_cInitFunctions.length; initFunctionIndex++)
	{
		if (g_cInitFunctions[initFunctionIndex] != null)
		{
			if (g_cInitFunctions[initFunctionIndex](value))
			{
				g_cInitFunctions[initFunctionIndex] = null;
			}
		}
	}

	g_bInitialized = true;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_toggleSettings = function ()
{
	if (!g_bDisplaySettings)
	{
		if (!GetAccessControl("_SettingsRoot"))
			return;

		if (g_nEffectSectionControlInputID != -1)
			g_nEffectSectionControlInputID = -1;

		if (g_nEffectSectionControlBusID != -1)
			g_nEffectSectionControlBusID = -1;
	}

	g_bDisplaySettings = !g_bDisplaySettings;

	_updateView();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_updateView = function ()
{
	if (g_bDisplaySettings)
	{
		CloseEffects();
		OpenSettingsSection();
	}
	else
	{
		CloseSettingsSection();
	}

	if (g_nEffectSectionControlBusID != -1)
	{
		if (g_nEffectSectionControlBusID == MM_ID_DYNAMICS_BUS || g_nEffectSectionControlBusID == MM_ID_REVERB_BUS)
		{
			OpenEffectsSection(true, g_nEffectSectionControlBusID == MM_ID_DYNAMICS_BUS, g_nEffectSectionControlBusID == MM_ID_REVERB_BUS, false, true, g_nEffectSectionControlBusID, false, -1, g_szScrollToEffectName);
        }
		else if (g_szScrollToEffectName == "eq")
		{
			OpenEffectsSection(true, g_nCurrentBusID != MM_ID_REVERB_BUS, g_nCurrentBusID == MM_ID_REVERB_BUS, false, true, g_nCurrentBusID, false, -1, "eq");
		}
		else if (g_szScrollToEffectName == "dynamics")
		{
			OpenEffectsSection(true, true, false, false, true, g_nCurrentBusID, false, -1, "dynamics");
        }		
	}
	else if (g_nEffectSectionControlInputID != -1)
	{
		if (g_nEffectSectionControlInputID == MM_ID_REVERB_BUS || g_nEffectSectionControlInputID == MM_ID_REVERB_BUS + 1)
		{
			OpenEffectsSection(true, false, true, false, true, MM_ID_REVERB_BUS, false, -1, "reverb");
		}
		else if (g_nEffectSectionControlInputID == MM_ID_DYNAMICS_BUS || g_nEffectSectionControlInputID == MM_ID_DYNAMICS_BUS + 1)
		{
			OpenEffectsSection(true, true, false, false, true, MM_ID_DYNAMICS_BUS, false, -1, "dynamics");
		}
		else
		{
			OpenEffectsSection(true, true, false, true, false, -1, true, g_nEffectSectionControlInputID, g_szScrollToEffectName);
        }
	}
    

	if (g_szSnapshotsCategory != "")
	{
		OpenSnapshots(g_szSnapshotsCategory == "preset", g_szSnapshotsCategory != "preset", g_szSnapshotsCategory, g_nEffectSectionControlBusID != -1, g_nEffectSectionControlBusID, g_nEffectSectionControlInputID != -1, g_nEffectSectionControlInputID);
    }

	save_ToCookie(true);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function save_ToCookie(bOnSubmit)
{
	try
	{		 
		let oSettings =
		{
			"ShowSettings": g_bDisplaySettings,
			"SettingsGoToIndex": g_nSettingsGoToIndex,

			"ShowPreamps": g_bDisplayPreamps,
			"CurrentBusID": g_nCurrentBusID,
			"ShowSendRotaries": g_bShowSendRotaries,
			"FirstShownRotary": g_nFirstShownRotary,
			"FirstDisplayedStrip": g_nOnRefreshStripsScrollerX,

			"EffectSectionControlBusID": (bOnSubmit ? g_nEffectSectionControlBusID : -1),
			"EffectSectionControlInputID": (bOnSubmit ? g_nEffectSectionControlInputID : -1),
			"ScrollToEffectName": (bOnSubmit ? g_szScrollToEffectName : ""),

			"SnapshotsCategory": (bOnSubmit ? g_szSnapshotsCategory : ""),

			"PreampGroup": g_tPreampGroup
		};

		CreateCookie('AnubisDesk_Music', JSON.stringify(oSettings), 365); // expired in 365 days
	}
	catch (err)
	{
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function load_FromCookie()
{
	var jsSettings = ReadCookie('AnubisDesk_Music');
   
	var oSettings = {};
	if (jsSettings != undefined)
	{
		oSettings = JSON.parse(jsSettings);
	}

	if (oSettings.ShowSettings == undefined)
	{
		oSettings.ShowSettings = false;
	}
	g_bDisplaySettings = oSettings.ShowSettings;

	if (oSettings.SettingsGoToIndex == undefined)
	{
		oSettings.SettingsGoToIndex = -1;
	}
	g_nSettingsGoToIndex = oSettings.SettingsGoToIndex;
	

	if (oSettings.ShowPreamps == undefined)
	{
		oSettings.ShowPreamps = false;
	}
	g_bDisplayPreamps = oSettings.ShowPreamps;


	if (oSettings.CurrentBusID == undefined)
	{
	    var jsBusses = GetBusJSON(-1);
	    if (jsBusses)
	    {
	        for (var i = 0; i < jsBusses.length; i++)
	        {
	            if (jsBusses[i].enabled)
	            {
	                oSettings.CurrentBusID = i;
	                break;
	            }
	        }
	    }
	    else
	    {
	        oSettings.CurrentBusID = MM_ID_MONITOR_BUS;
	    }
	}
	g_nCurrentBusID = oSettings.CurrentBusID;


	if (oSettings.ShowSendRotaries == undefined)
	{
		oSettings.ShowSendRotaries = false;
	}
	g_bShowSendRotaries = oSettings.ShowSendRotaries;


	if (oSettings.FirstShownRotary == undefined)
	{
		oSettings.FirstShownRotary = false;
	}
	g_nFirstShownRotary = oSettings.FirstShownRotary;


	if (oSettings.FirstDisplayedStrip == undefined)
	{
		oSettings.FirstDisplayedStrip = -1;
	}
	g_nOnRefreshStripsScrollerX = oSettings.FirstDisplayedStrip;

	if (oSettings.EffectSectionControlBusID == undefined)
	{
		oSettings.EffectSectionControlBusID = -1;
	}
	g_nEffectSectionControlBusID = oSettings.EffectSectionControlBusID;

	if (oSettings.EffectSectionControlInputID == undefined)
	{
		oSettings.EffectSectionControlInputID = -1;
	}
	g_nEffectSectionControlInputID = oSettings.EffectSectionControlInputID;

	if (oSettings.SnapshotsCategory == undefined)
	{
		oSettings.SnapshotsCategory = "";
	}
	g_szSnapshotsCategory = oSettings.SnapshotsCategory;

	if (oSettings.ScrollToEffectName == undefined)
	{
		oSettings.ScrollToEffectName = "";
	}
	g_szScrollToEffectName = oSettings.ScrollToEffectName;

	if (oSettings.PreampGroup == undefined)
	{
		oSettings.PreampGroup = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
	}
	g_tPreampGroup = oSettings.PreampGroup;

	_updateView();
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ConvertLinearTodB(usLinear) {
	if (usLinear == 0) {
		return -96.33;
	}
	return 20 * Math.log10(usLinear / 65535);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ConvertLinearToScale(usLinear) {
	if (usLinear == 0) {
		return 0;
	}
	res = (Math.log(usLinear / 65535) / Math.log(8) * 0.26) + 1;
	if (res < 0)
		return 0;
	else
		return res;
}

/////////////////////////////////////////////////////////////////////
function ConvertLinearToSteppedScale(usLinear) {
	var dbValue = ConvertLinearTodB(usLinear);

	if (dbValue > -6) {
		return Math.min(0.6 + 0.4 * (dbValue + 6) / 6, 1);
	}
	else if (dbValue > -18) {
		return 0.3 + 0.3 * (dbValue + 18) / 12;
	}
	else if (dbValue > -60) {
		return 0.3 * (dbValue + 60) / 42;
	}
	return 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function value_limit(min, num, max) { //value limit setter
  if (num < min) return min
  else if ( num > max) return max
  else return num;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function roundHalf(num) {
	return Math.round(num*2)/2;
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ReadCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EraseCookie(name) {
	CreateCookie(name, "", -1);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sampleRateStrings = ["44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", "DXD/DSD", "384kHz"];
var sampleRates = [44100, 48000, 88200, 96000, 176400, 192000, 352800, 384000];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function convertSampleRateToString(sampleRate)
{
	var index = sampleRates.findIndex(value => value==sampleRate);
	if (index == -1)
	{
		return "";
	}
	else
	{
		return sampleRateStrings[index];
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function convertStringToSampleRate(sampleRateString)
{
	var index = sampleRateStrings.findIndex(value => value==sampleRateString);
	return sampleRates[index];
}





  