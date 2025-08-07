////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Music Mission Mixer Events
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddEvents(visibleStrips, visibleStripsGroup, visibleStripsInput)
{
	var jsMixer = GetMixerJSON();
	if (jsMixer == null)
	{
		return;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Strips events
	for (var i = 0; i < g_nNbVisibleStrips; i++)
	{
		let nGroupID = visibleStripsGroup[i];
		let nStripID = jsMixer.strips[visibleStrips[i]].id;
		let nSendID = g_nCurrentBusID;


		var szStripID = "";
		if (visibleStripsGroup[i] != -1)
		{
			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "touchstart", function(event) { FaderGroupMouseDown(event, nGroupID, nStripID, nSendID, true); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "touchmove", function(event) { FaderGroupMouseMove(event, true); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "touchend", function(event) { FaderGroupMouseUp(false); } );

			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "mousedown", function(event) { FaderGroupMouseDown(event, nGroupID, nStripID, nSendID, false); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "mousemove", function(event) { FaderGroupMouseMove(event, false); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "mouseup", function(event) { FaderGroupMouseUp(false); } );

			AddEvent("group" + nGroupID + "-send" + nSendID + "-fader", "dblclick", function(event) { FaderGroupReset(nGroupID, nStripID, nSendID); } );

			AddEvent("group" + nGroupID + "-send" + nSendID + "-gain-value", "click", function() { PromptFaderGain(nStripID, nSendID, nGroupID); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-solo", "click", function() { SoloGroup(nGroupID, nStripID, nSendID); } );
			AddEvent("group" + nGroupID + "-send" + nSendID + "-mute", "click", function() { MuteGroup(nGroupID, nStripID, nSendID); } );

			AddEvent("group" + nGroupID + "-button-foot", "click", function() { OpenGroupMenu(nGroupID); } );

			if (g_bShowSendRotaries)
			{
				for (var j = FIRST_SEND_ROTARY_ID(); j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); j++)
				{
					AddEvent("group" + nGroupID + "-send" + j + "-rotary", "click", ( function(_nStripID, _nSendID, _nGroupID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID, _nGroupID); } } )(nStripID, j, nGroupID) );
				}
			}
		}
		else
		{
		    //AddEvent("strip" + nStripID + "-send" + nSendID + "-pan", "click", function() { OpenPanControl(nStripID, nSendID); }); // managed in UpdateBusPanLink()

			AddEvent("strip" + nStripID + "-expand", "click", function () { CollapseLink(nStripID); });

			/*AddEvent("strip" + nStripID + "-preamp", "click", function (event)
			{
				var jsInput = GetInputJSON(nStripID);
				if (jsInput && jsInput.analog)
				{
					ShowPreamps();
                }				
			});*/

		    AddEvent("strip" + nStripID + "-eq", "click", function() { OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "eq"); });
		    AddEvent("strip" + nStripID + "-dynamics", "click", function() { OpenEffectsSection(true, true, false, true, false, -1, true, nStripID, "dynamics"); });

			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "touchstart", function(event) { FaderMouseDown(event, nStripID, nSendID, true); } );
			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "touchmove", function(event) { FaderMouseMove(event, true); } );
			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "touchend", function(event) { FaderMouseUp(false); } );

			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "mousedown", function(event) { FaderMouseDown(event, nStripID, nSendID, false); } );
			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "mousemove", function(event) { FaderMouseMove(event, false); } );
			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "mouseup", function(event) { FaderMouseUp(false); } );

			AddEvent("strip" + nStripID + "-send" + nSendID + "-fader", "dblclick", function(event) { FaderReset(nStripID, nSendID); } );

			AddEvent("strip" + nStripID + "-send" + nSendID + "-gain-value", "click", function () { PromptFaderGain(nStripID, nSendID); });

			AddEvent("strip" + nStripID + "-send" + nSendID + "-solo", "click", function () { Solo(nStripID, nSendID); });
			AddEvent("strip" + nStripID + "-send" + nSendID + "-mute", "click", function () { Mute(nStripID, nSendID); });

			AddEvent("strip" + nStripID + "-button-foot", "click", function() { OpenStripMenu(nStripID); } );

			if (g_bShowSendRotaries)
			{
				for (var j = FIRST_SEND_ROTARY_ID(); j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); j++)
				{
					AddEvent("strip" + nStripID + "-send" + j + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(nStripID, j) );
				}
			}
		}
	}

	AddEvent("strips", "mousemove", function(event)
	{
		FaderMouseMove(event, false);
		FaderGroupMouseMove(event, false);
	} );
	
	AddEvent("mixer", "mouseup", function(event)
	{
		FaderMouseUp(false);
		FaderGroupMouseUp(false);
		MasterFaderMouseUp();
	} );

	AddEvent("mixer", "mouseleave", function(event)
	{
		FaderMouseUp(false);
		FaderGroupMouseUp(false);
		MasterFaderMouseUp();
	} );

	AddEvent("mixer", "touchcancel", function(event)
	{
		FaderMouseUp(false);
		FaderGroupMouseUp(false);
		MasterFaderMouseUp();
	} );



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Bus events
	let nBusID = g_nCurrentBusID;

	switch (g_nCurrentBusID)
	{
		case 0:
		case 1:
			AddEvent("bus" + nBusID + "-send-rotaries-page", "click", function() { return SendRotariesTogglePage(nBusID); } );
			AddEvent("bus" + nBusID + "-dim", "click", function() { return Dim(nBusID); } );
			AddEvent("bus" + nBusID + "-downmix", "click", function() { return DownMix(nBusID); } );

			for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
			{
				AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(i * 2, g_nCurrentBusID) );

				AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-mon-to-cue", "click", ( function _MonToCue(nBusID) { return function() { return MonToCue(nBusID); } } )(i) );
				AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-talk-to-cue", "click", ( function _TalkToCue(nBusID) { return function() { return TalkToCue(nBusID); } } )(i) );
				AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-cue-to-mon", "click", ( function _CueToMon(nBusID) { return function() { return CueToMon(nBusID); } } )(i) );
			}

			AddEvent("strip" + MM_ID_1ST_BUILTIN_MIC + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(MM_ID_1ST_BUILTIN_MIC, g_nCurrentBusID) );
			//AddEvent("strip" + MM_ID_1ST_PEERED_TALK_MIC + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(MM_ID_1ST_PEERED_TALK_MIC, g_nCurrentBusID) );

			if (g_bShowSendRotaries)
			{
				for (var j = MM_ID_FIRST_SEND_BUS; j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); j++)
				//for (var j = FIRST_SEND_ROTARY_ID(); j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); j++)
				{
					AddEvent("bus" + g_nCurrentBusID + "-master" + j + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(null, j) );
				}
			}
			break;			

		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			AddEvent("bus" + nBusID + "-send-rotaries-page", "click", function() { return SendRotariesTogglePage(nBusID); } );
			if (jsMixer.busses[g_nCurrentBusID].cue_mode == 1 || jsMixer.settings.neumann_edition)
			{
				AddEvent("bus" + nBusID + "-dim", "click", function() { return Dim(nBusID); } );
				AddEvent("bus" + nBusID + "-downmix", "click", function() { return DownMix(nBusID); } );

				for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
				{
					AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(i * 2, g_nCurrentBusID) );

					AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-mon-to-cue", "click", ( function _MonToCue(nBusID) { return function() { return MonToCue(nBusID); } } )(i) );
					AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-talk-to-cue", "click", ( function _TalkToCue(nBusID) { return function() { return TalkToCue(nBusID); } } )(i) );
					AddEvent("strip" + i * 2 + "-send" + g_nCurrentBusID + "-cue-to-mon", "click", ( function _CueToMon(nBusID) { return function() { return CueToMon(nBusID); } } )(i) );
				}

				AddEvent("strip" + MM_ID_1ST_BUILTIN_MIC + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(MM_ID_1ST_BUILTIN_MIC, g_nCurrentBusID) );
				//AddEvent("strip" + MM_ID_1ST_PEERED_TALK_MIC + "-send" + g_nCurrentBusID + "-rotary", "click", ( function(_nStripID, _nSendID) { return function() { return OpenSendRotaryControl(_nStripID, _nSendID); } } )(MM_ID_1ST_PEERED_TALK_MIC, g_nCurrentBusID) );
			}
			else if (jsMixer.busses[g_nCurrentBusID].cue_mode == 0)
			{
				AddEvent("bus" + nBusID + "-talk", "click", function() { return TalkToCue(nBusID); } );
				AddEvent("bus" + nBusID + "-cue-to-mon", "click", function() { return CueToMon(nBusID); } );
			}
			break;			

		case 7:
		case 8:
			AddEvent("bus" + nBusID + "-edit", "click", function() { return EditFX(nBusID); } );
			AddEvent("bus" + nBusID + "-snap", "click", function() { return FXSnapshots(); } );
			break;			
	}

	AddEvent("bus" + nBusID + "-mastergain", "click", function() { OpenMasterGainMenu(); } );
	AddEvent("bus" + nBusID + "-selector", "click", function () { OpenBusSelectorMenu(); });
	AddEvent("bus" + nBusID + "-selector", "touchstart", function (event) { g_LongClickTimer = setTimeout(OpenCopyBus, MM_LONG_CLICK_DURATION); });
	AddEvent("bus" + nBusID + "-selector", "mousedown", function (event) { g_LongClickTimer = setTimeout(OpenCopyBus, MM_LONG_CLICK_DURATION); });
	AddEvent("bus" + nBusID + "-selector", "touchend", function (event) { clearTimeout(g_LongClickTimer); });
	AddEvent("bus" + nBusID + "-selector", "mouseup", function (event) { clearTimeout(g_LongClickTimer); });


	AddEvent("bus" + nBusID + "-cue-to-monitoring-clear", "click", function() { return CueToMonClear(); } );
	AddEvent("bus" + nBusID + "-solo-clear", "click", function() { return SoloClear(nBusID); } );
	AddEvent("bus" + nBusID + "-talk-all", "click", function() { return TalkToAll(); } );
	AddEvent("bus" + nBusID + "-mon-to-cue-all", "click", function() { return MonToCueAll(); } );
	//AddEvent("bus" + nBusID + "-menu", "click", function() { return Menu(nBusID); } );

	AddEvent("bus" + nBusID + "-master-fader", "touchstart", function(event) { MasterFaderMouseDown(event, nBusID, true); } );
	AddEvent("bus" + nBusID + "-master-fader", "touchmove", function(event) { MasterFaderMouseMove(event, true); } );
	AddEvent("bus" + nBusID + "-master-fader", "touchend", function(event) { MasterFaderMouseUp(); } );

	AddEvent("bus" + nBusID + "-master-fader", "mousedown", function(event) { MasterFaderMouseDown(event, nBusID, false); } );
	AddEvent("bus" + nBusID + "-master-fader", "mousemove", function(event) { MasterFaderMouseMove(event, false); } );
	AddEvent("bus" + nBusID + "-master-fader", "mouseup", function(event) { MasterFaderMouseUp(); } );

	AddEvent("bus" + nBusID + "-master-fader", "dblclick", function() { return Ref(nBusID); } );

	AddEvent("masters", "mousemove", function(event)
	{
		MasterFaderMouseMove(event, false);
	});

	AddEvent("master-center-button-foot", "click", function () { OpenOutputMenu(); });

	return true;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PromptFaderGain(nStripID, nSendID, nGroupID)
{
	var nGain = 0;

	if (nStripID)
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

	nGain = nGain / 10;

	
	var nNewGain = prompt((nGroupID && nGroupID != -1) ? "Set Group Gain" : "Set Gain", nGain); 
	if (nNewGain == null || nNewGain == nGain)
	{
		return;
	}


	nNewGain = Number(nNewGain) * 10;

	nNewGain = Math.trunc(nNewGain);

	if (nNewGain > 60)
	{
		nNewGain = 60;
	}
	if (nNewGain < -1445)
	{
		nNewGain = -1445;
	}

	
	if (nStripID)
	{
		if (nGroupID != null)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { group_gain: nNewGain } });
		}
		else
		{
			if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { link_gain: nNewGain } });
			}
			else
			{
				self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nSendID +")][0]", value: { gain: nNewGain } });
			}
		}
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nSendID +")][0]", value: { master_gain: nNewGain } });
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nFaderMouseDownKnobGain = 0;
var g_nFaderMouseDownKnobLinkGain = 0;
var g_nFaderMouseDownKnobGroupGain = 0;
var g_nFaderMouseDownKnobPos = 0;
var g_nFaderMouseDownClick = 0;

var g_nCapturedFaderStrip = -1;
var g_nCapturedFaderBus = -1;

var g_nCapturedFaderGroup = -1;
var g_nCapturedFaderGroupStrip = -1;
var g_nCapturedFaderGroupBus = -1;

var g_nCapturedMasterFader = -1;

var g_bCapturedFaderMoved = false;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderMouseDown(event, nStripID, nBusID, bTouch)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}


	g_nFaderMouseDownKnobGain = jsSend.gain;

	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		g_nFaderMouseDownKnobLinkGain = jsSend.link_gain;
	}


	var r = document.querySelector(':root');
	var szKnobPos = r.style.getPropertyValue("--strip" + nStripID + "-send" + nBusID + "-fader-slider-knob-top");
	szKnobPos = szKnobPos.replace("px","");
	g_nFaderMouseDownKnobPos = Number(szKnobPos) + Number(g_nStripFaderKnobHeight);

    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nFaderMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
		g_nFaderMouseDownClick = event.pageY;
	}


	g_nCapturedFaderStrip = nStripID;
	g_nCapturedFaderBus = nBusID;
	g_bCapturedFaderMoved = false;

	AddScrollerMoveCancelFaderEvent();

	g_nPublishFaderTimer = window.setInterval(OnTimerPublishFader, 50)


	var szStripButtons = "strip" + nStripID + "-buttons";
	var eStripButtons = document.getElementById(szStripButtons);
	if (eStripButtons && g_bButtonsHideFaders)
	{
		eStripButtons.classList.add("strip-buttons-container-hide-transition");
		eStripButtons.classList.add("strip-buttons-container-hide");
	}

	UpdateSendGainFaderHidden(nStripID, nBusID, null, null);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderMouseMove(event, bTouch)
{
	if (g_nCapturedFaderStrip == -1 || g_nCapturedFaderBus == -1)
	{
		return;
	}

	var jsSend = GetSendJSON(g_nCapturedFaderStrip, g_nCapturedFaderBus);
	if (jsSend == null)
	{
		return;
	}
	
	var jsInput = GetInputJSON(g_nCapturedFaderStrip);
	if (jsInput == null)
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

		nMove = event.targetTouches[0].clientY - g_nFaderMouseDownClick;
	}
	else
	{
		nMove = event.pageY - g_nFaderMouseDownClick;
	}

	if (nMove != 0)
	{
		g_bCapturedFaderMoved = true;
	}


	var nNewPos = g_nFaderMouseDownKnobPos + nMove;

	var nNewGain = PosToGain(nNewPos) * 10;

	nNewGain = Math.trunc(nNewGain);
	
	nNewGain = Number(nNewGain);

	PublishFader(nNewGain);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderMouseUp(bCancelMove)
{
	if (g_nCapturedFaderStrip == -1 || g_nCapturedFaderBus == -1)
	{
		return;
	}


	var szStripButtons = "strip" + g_nCapturedFaderStrip + "-buttons";
	var eStripButtons = document.getElementById(szStripButtons);
	if (eStripButtons)
	{
		eStripButtons.classList.remove("strip-buttons-container-hide");
		//eStripButtons.classList.remove("strip-buttons-container-hide-transition");
	}


	if (bCancelMove) // Move is canceled by a horizontal scroll, revert to original position before move start
	{
		var jsInput = GetInputJSON(g_nCapturedFaderStrip);
		if (jsInput == null)
		{
			return;
		}

		if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
		{
			PublishFader(g_nFaderMouseDownKnobLinkGain);
		}
		else
		{
			PublishFader(g_nFaderMouseDownKnobGain);
		}
	}


	OnTimerPublishFader();
	clearTimeout(g_nPublishFaderTimer);
	g_nPublishFaderTimer = null;
	g_nLastPublishedFaderGain = null;
	g_nLastSendFaderGain = null;

	var nStripID = g_nCapturedFaderStrip;
	var nBusID = g_nCapturedFaderBus;
	g_nCapturedFaderStrip = -1;
	g_nCapturedFaderBus = -1;


	UpdateSendGainFaderHidden(nStripID, nBusID, null, null);

	if (g_bCapturedFaderMoved == false && bCancelMove == false)
	{
		OpenStripGainMenu(nStripID, nBusID, null, g_nFaderMouseDownClick);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedFaderGain = null;
var g_nLastSendFaderGain = null;
var g_nPublishFaderTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishFader(nNewGain)
{
	g_nLastPublishedFaderGain = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishFader()
{
	if (g_nCapturedFaderStrip == -1 || g_nCapturedFaderBus == -1)
	{
		return;
	}

	if (g_nLastPublishedFaderGain == null)
	{
		return;
	}

	if (g_nLastPublishedFaderGain == g_nLastSendFaderGain)
	{
		return;
	}

	var jsInput = GetInputJSON(g_nCapturedFaderStrip);
	if (jsInput == null)
	{
		return;
	}
	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedFaderStrip +")][0].sends[?(@.id=="+ g_nCapturedFaderBus +")][0]", value: { link_gain: g_nLastPublishedFaderGain } });
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedFaderStrip +")][0].sends[?(@.id=="+ g_nCapturedFaderBus +")][0]", value: { gain: g_nLastPublishedFaderGain } });
	}

	g_nLastSendFaderGain = g_nLastPublishedFaderGain;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderReset(nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
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
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderGroupMouseDown(event, nGroupID, nStripID, nBusID, bTouch)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	g_nFaderMouseDownKnobGroupGain = jsSend.group_gain;

	var r = document.querySelector(':root');
	var szKnobPos = r.style.getPropertyValue("--group" + nGroupID + "-send" + nBusID + "-fader-slider-knob-top");
	szKnobPos = szKnobPos.replace("px","");
	g_nFaderMouseDownKnobPos = Number(szKnobPos) + Number(g_nStripFaderKnobHeight);

    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nFaderMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
		g_nFaderMouseDownClick = event.pageY;
	}


	g_nCapturedFaderGroup = nGroupID;
	g_nCapturedFaderGroupStrip = nStripID;
	g_nCapturedFaderGroupBus = nBusID;
	g_bCapturedFaderMoved = false;

	AddScrollerMoveCancelFaderGroupEvent();


	g_nPublishFaderGroupTimer = window.setInterval(OnTimerPublishFaderGroup, 50)


	var szStripButtons = "group" + nGroupID + "-buttons";
	var eStripButtons = document.getElementById(szStripButtons);
	if (eStripButtons && g_bButtonsHideFaders)
	{
		eStripButtons.classList.add("strip-buttons-container-hide-transition");
		eStripButtons.classList.add("strip-buttons-container-hide");
	}

	var jsMixer = GetMixerJSON();
	if (jsMixer)
	{
		for (var j = 0; j < jsMixer.strips.length; j++)
		{
			if (jsMixer.strips[j].group_id == nGroupID)
			{
				var szStripButtons = "strip" + jsMixer.strips[j].id + "-buttons";
				var eStripButtons = document.getElementById(szStripButtons);
				if (eStripButtons && g_bButtonsHideFaders)
				{
					eStripButtons.classList.add("strip-buttons-container-hide-transition");
					eStripButtons.classList.add("strip-buttons-container-hide");
				}
			}
		}
	}

	UpdateSendGainFaderHidden(nStripID, nBusID, nGroupID, null);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderGroupMouseMove(event, bTouch)
{
	if (g_nCapturedFaderGroup == -1 || g_nCapturedFaderGroupStrip == -1 || g_nCapturedFaderGroupBus == -1)
	{
		return;
	}

	var jsSend = GetSendJSON(g_nCapturedFaderGroupStrip, g_nCapturedFaderGroupBus);
	if (jsSend == null)
	{
		return;
	}
	
	var jsInput = GetInputJSON(g_nCapturedFaderGroupStrip);
	if (jsInput == null)
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

		nMove = event.targetTouches[0].clientY - g_nFaderMouseDownClick;
	}
	else
	{
		nMove = event.pageY - g_nFaderMouseDownClick;
	}

	if (nMove != 0)
	{
		g_bCapturedFaderMoved = true;
	}


	var nNewPos = g_nFaderMouseDownKnobPos + nMove;

	var nNewGain = PosToGain(nNewPos) * 10;

	nNewGain = Math.trunc(nNewGain);
	
	nNewGain = Number(nNewGain);

	PublishFaderGroup(nNewGain);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderGroupMouseUp(bCancelMove)
{
	if (g_nCapturedFaderGroup == -1 || g_nCapturedFaderGroupStrip == -1 || g_nCapturedFaderGroupBus == -1)
	{
		return;
	}


	var szStripButtons = "group" + g_nCapturedFaderGroup + "-buttons";
	var eStripButtons = document.getElementById(szStripButtons);
	if (eStripButtons)
	{
		eStripButtons.classList.remove("strip-buttons-container-hide");
		//eStripButtons.classList.remove("strip-buttons-container-hide-transition");
	}

	var jsMixer = GetMixerJSON();
	if (jsMixer)
	{
		for (var j = 0; j < jsMixer.strips.length; j++)
		{
			if (jsMixer.strips[j].group_id == g_nCapturedFaderGroup)
			{
				var szStripButtons = "strip" + jsMixer.strips[j].id + "-buttons";
				var eStripButtons = document.getElementById(szStripButtons);
				if (eStripButtons)
				{
					eStripButtons.classList.remove("strip-buttons-container-hide");
					//eStripButtons.classList.remove("strip-buttons-container-hide-transition");
				}
			}
		}
	}


	if (bCancelMove) // Move is canceled by a horizontal scroll, revert to original position before move start
	{
		PublishFaderGroup(g_nFaderMouseDownKnobGroupGain);
	}


	OnTimerPublishFaderGroup();
	clearTimeout(g_nPublishFaderGroupTimer);
	g_nPublishFaderGroupTimer = null;
	g_nLastPublishedFaderGroupGain = null;
	g_nLastSendFaderGroupGain = null;

	var nGroupID = g_nCapturedFaderGroup;
	var nStripID = g_nCapturedFaderGroupStrip;
	var nBusID = g_nCapturedFaderGroupBus;
	g_nCapturedFaderGroup = -1;
	g_nCapturedFaderGroupStrip = -1;
	g_nCapturedFaderGroupBus = -1;


	UpdateSendGainFaderHidden(nStripID, nBusID, nGroupID, null);
	for (var j = 0; j < jsMixer.strips.length; j++)
	{
		if (jsMixer.strips[j].group_id == nGroupID)
		{
			UpdateSendGainFaderHidden(jsMixer.strips[j].id, nBusID, null, null)
		}
	}

	if (g_bCapturedFaderMoved == false && bCancelMove == false)
	{
		OpenStripGainMenu(nStripID, nBusID, nGroupID, g_nFaderMouseDownClick);
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedFaderGroupGain = null;
var g_nLastSendFaderGroupGain = null;
var g_nPublishFaderGroupTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishFaderGroup(nNewGain)
{
	g_nLastPublishedFaderGroupGain = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishFaderGroup()
{
	if (g_nCapturedFaderGroupStrip == -1 || g_nCapturedFaderGroupBus == -1)
	{
		return;
	}

	if (g_nLastPublishedFaderGroupGain == g_nLastSendFaderGroupGain)
	{
		return;
	}

	if (g_nLastPublishedFaderGroupGain == null)
	{
		return;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ g_nCapturedFaderGroupStrip +")][0].sends[?(@.id=="+ g_nCapturedFaderGroupBus +")][0]", value: { group_gain: g_nLastPublishedFaderGroupGain } });

	g_nLastSendFaderGroupGain = g_nLastPublishedFaderGroupGain;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FaderGroupReset(nGroupID, nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}


	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_gain: 0 } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Solo(nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var bSolo = jsSend.solo;


	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var eSolo = document.getElementById("strip" + nStripID + "-send" + nBusID + "-solo");
	if (eSolo && eSolo.classList.contains("strip-button-disabled"))
	{
		return;
	}

	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { link_solo: !bSolo } });
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { solo: !bSolo } });
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SoloGroup(nGroupID, nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var bSolo = jsSend.group_solo;

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_solo: !bSolo } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Mute(nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var bMute = jsSend.mute;


	var jsInput = GetInputJSON(nStripID);
	if (jsInput == null)
	{
		return;
	}

	var eMute = document.getElementById("strip" + nStripID + "-send" + nBusID + "-mute");
	if (eMute && eMute.classList.contains("strip-button-disabled"))
	{
		return;
	}

	if (jsInput.linked_input_id != -1 && jsInput.collapsed_link)
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { link_mute: !bMute } });
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { mute: !bMute } });
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MuteGroup(nGroupID, nStripID, nBusID)
{
	var jsSend = GetSendJSON(nStripID, nBusID);
	if (jsSend == null)
	{
		return;
	}
	
	var bMute = jsSend.group_mute;

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nStripID +")][0].sends[?(@.id=="+ nBusID +")][0]", value: { group_mute: !bMute } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ResetPeaks()
{
	var jsValue = new Array();
	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==3)][0].actions.meter_reset_all_holds", value: { jsValue } });


	var jsStrips = GetStripJSON(-1);
	if (jsStrips)
	{
		for (var i = 0; i < jsStrips.length; i++)
		{
			var eOverload = document.getElementById("strip" + jsStrips[i].id + "-overload");
			if (eOverload)
			{
				eOverload.classList.remove("strip-overloaded");
			}
		}
	}

	var jsGroups = GetGroupJSON(-1);
	if (jsGroups)
	{
		for (var i = 0; i < jsGroups.length; i++)
		{
			var eOverload = document.getElementById("group" + jsGroups[i].id + "-overload");
			if (eOverload)
			{
				eOverload.classList.remove("strip-overloaded");
			}
		}
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ref(nBusID)
{
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { ref: true } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MinusInfinite(nBusID)
{
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { master_gain: -1445 } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleMute(nBusID)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { mute: !jsBus.mute } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectBus(nBusID)
{
    var bReOpenBusRouting = false;
    var eBusRouting = document.getElementById("mixerSectionPopupBusRouting_Low");
    if (eBusRouting)
    {
        bReOpenBusRouting = true;
    }

	CloseBusSelectorMenu();

	g_nCurrentBusID = nBusID;
	save_ToCookie(false);

	BuildMixerUI();

	if (bReOpenBusRouting)
	    OpenBusRouting();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SendRotariesTogglePage(nBusID)
{
	if (g_nFirstShownRotary == (NB_SEND_ROTARIES() - g_nNbShownRotaries))
	{
		g_nFirstShownRotary = 0;
	}
	else
	{
		g_nFirstShownRotary += g_nNbShownRotaries;
	}

	if (g_nFirstShownRotary > (NB_SEND_ROTARIES() - g_nNbShownRotaries))
	{
		g_nFirstShownRotary = NB_SEND_ROTARIES() - g_nNbShownRotaries;
	}
	save_ToCookie(false);

	OnMixerResize();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Dim(nBusID)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}
	
	var bDim = jsBus.dim;

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { dim: !bDim } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DownMix(nBusID)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}
	
	var bDownMix = jsBus.downmix;

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { downmix: !bDownMix } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MonToCue(nBusID)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	var jsSettings = GetSettingsJSON();
	if (jsSettings == null || jsSettings.cue_monitoring_disabled)
	{
	    return;
	}
	
	var bMonToCue = jsBus.monitoring_to_cue;

	//self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { monitoring_to_cue: !bMonToCue } });
	// Use the strip route as only the strips makes sure the corresponding cue to mon is properly disabled
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nBusID * 2 +")][0]", value: { monitoring_to_cue: !bMonToCue } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TalkToCue(nBusID)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}

	/*var jsSettings = GetSettingsJSON();
	if (jsSettings == null || jsSettings.cue_monitoring_disabled)
	{
	    return;
	}*/
	
	var bTalk = jsBus.talking_to_cue;

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { talking_to_cue: !bTalk } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CueToMon(nBusID)
{
	var jsBus = GetBusJSON(0);
	if (jsBus == null)
	{
		return;
	}

	var jsSettings = GetSettingsJSON();
	if (jsSettings == null || jsSettings.cue_monitoring_disabled)
	{
	    return;
	}
	
	var nCueToMon = nBusID;
	if (nCueToMon == jsBus.cue_to_monitoring)
	{
		nCueToMon = -1;
	}

	//self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==0)][0]", value: { cue_to_monitoring: nCueToMon } });
	// Use the strip route as only the strips makes sure the corresponding mon to cue is properly disabled
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ nBusID * 2 +")][0]", value: { cue_to_monitoring: nCueToMon } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EditFX(nBusID)
{
    var szScrollToEffectName;
    if (nBusID == MM_ID_DYNAMICS_BUS)
        szScrollToEffectName = "dynamics";
    else if (nBusID == MM_ID_REVERB_BUS)
        szScrollToEffectName = "reverb";

	OpenEffectsSection(true, nBusID == MM_ID_DYNAMICS_BUS, nBusID == MM_ID_REVERB_BUS, false, true, nBusID, false, -1, szScrollToEffectName);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FXSnapshots()
{
	var szSnaphotsName;
	if (g_nCurrentBusID == MM_ID_DYNAMICS_BUS)
	{
		szSnaphotsName = "dynamics";
	}
	else if (g_nCurrentBusID == MM_ID_REVERB_BUS)
	{
		var jsMixer = GetMixerJSON();
		if (jsMixer == null)
		{
			return;
		}

		if (jsMixer.reverb_type_id == EVENTIDE_BLACKHOLE_REVERB_ID)
		{        
			szSnaphotsName = "eventide_blackhole";
		}
		else
		{
			szSnaphotsName = "reverb";
		}
	}

	OpenSnapshots(false, true, szSnaphotsName, true, g_nCurrentBusID, false, -1);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CueToMonClear()
{
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id==0)][0]", value: { cue_to_monitoring: -1 } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SoloClear(nBusID)
{
	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ nBusID +")][0]", value: { has_solo: false } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TalkToAll()
{
	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
		return;
	}

	/*var jsSettings = GetSettingsJSON();
	if (jsSettings == null || jsSettings.cue_monitoring_disabled)
	{
	    return;
	}*/

	var bTalkAll = false;
	for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
	{
		if (jsBusses[i].talking_to_cue)
		{
			bTalkAll = true;
			break;
		}
	}

	for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
	{
		if (jsBusses[i].cue_mode == 0)
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ i +")][0]", value: { talking_to_cue: !bTalkAll } });
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MonToCueAll()
{
	var jsBusses = GetBusJSON(-1);
	if (jsBusses == null)
	{
		return;
	}


	var jsSettings = GetSettingsJSON();
	if (jsSettings == null || jsSettings.cue_monitoring_disabled)
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

	for (var i = MM_ID_FIRST_CUE_BUS; i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS; i++)
	{
		if (jsBusses[i].cue_mode == 0)
		{
			//self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ jsBusses[i].id +")][0]", value: { monitoring_to_cue: !bMonToCueAll } });
			// Use the strip route as only the strips makes sure the corresponding cue to mon is properly disabled
			self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.strips[?(@.id=="+ jsBusses[i].id * 2 +")][0]", value: { monitoring_to_cue: !bMonToCueAll } });
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Menu(nBusID)
{
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MasterFaderMouseDown(event, nBusID, bTouch)
{
	var jsBus = GetBusJSON(nBusID);
	if (jsBus == null)
	{
		return;
	}


	var r = document.querySelector(':root');
	var szKnobPos = r.style.getPropertyValue("--bus" + nBusID + "-fader-slider-knob-top");
	szKnobPos = szKnobPos.replace("px","");
	g_nFaderMouseDownKnobPos = Number(szKnobPos);

    if (bTouch)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nFaderMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
		g_nFaderMouseDownClick = event.pageY;
	}

	g_nCapturedMasterFader = nBusID;
	g_bCapturedFaderMoved = false;


	var eMasterButtons = document.getElementById("master-center-buttons");
	if (eMasterButtons && g_bButtonsHideFaders)
	{
		eMasterButtons.classList.add("master-center-buttons-container-hide-transition");
		eMasterButtons.classList.add("master-center-buttons-container-hide");
	}

	UpdateMasterFaderHidden(nBusID);


	g_nPublishMasterFaderTimer = window.setInterval(OnTimerPublishMasterFader, 50)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MasterFaderMouseMove(event, bTouch)
{
	if (g_nCapturedMasterFader == -1)
	{
		return;
	}

	var jsBus = GetBusJSON(g_nCapturedMasterFader);
	if (jsBus == null)
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

		nMove = event.targetTouches[0].clientY - g_nFaderMouseDownClick;
	}
	else
	{
		nMove = event.pageY - g_nFaderMouseDownClick;
	}

	if (nMove != 0)
	{
		g_bCapturedFaderMoved = true;
	}

	var nNewPos = g_nFaderMouseDownKnobPos + nMove;

	var nNewGain = PosToGain(nNewPos) * 10;

	nNewGain = Math.trunc(nNewGain);
	
	nNewGain = Number(nNewGain);

	PublishMasterFader(nNewGain);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function MasterFaderMouseUp()
{
	if (g_nCapturedMasterFader == -1)
	{
		return;
	}

	var eMasterButtons = document.getElementById("master-center-buttons");
	if (eMasterButtons)
	{
		eMasterButtons.classList.add("master-center-buttons-container-hide-transition");
		eMasterButtons.classList.add("master-center-buttons-container-hide");
	}
	if (eMasterButtons)
	{
		eMasterButtons.classList.remove("master-center-buttons-container-hide");
		//eMasterButtons.classList.remove("strip-buttons-container-hide-transition");
	}


	OnTimerPublishMasterFader();
	clearTimeout(g_nPublishMasterFaderTimer);
	g_nPublishMasterFaderTimer = null;
	g_nLastPublishedMasterFaderGain = null;
	g_nLastSendMasterFaderGain = null;

	var nBusID = g_nCapturedMasterFader;
	g_nCapturedMasterFader = -1;

	UpdateMasterFaderHidden(nBusID);


	if (g_bCapturedFaderMoved == false)
	{
		//OpenMasterGainMenu();
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedMasterFaderGain = null;
var g_nLastSendMasterFaderGain = null;
var g_nPublishMasterFaderTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishMasterFader(nNewGain)
{
	g_nLastPublishedMasterFaderGain = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishMasterFader()
{
	if (g_nCapturedMasterFader == -1)
	{
		return;
	}

	if (g_nLastPublishedMasterFaderGain == g_nLastSendMasterFaderGain)
	{
		return;
	}

	if (g_nLastPublishedMasterFaderGain == null)
	{
		return;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ g_nCapturedMasterFader +")][0]", value: { master_gain: g_nLastPublishedMasterFaderGain } });

	g_nLastSendMasterFaderGain = g_nLastPublishedMasterFaderGain;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowAllAux()
{
	var jsBus = GetBusJSON(g_nCurrentBusID);
	if (jsBus == null)
	{
		return;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.busses[?(@.id=="+ g_nCurrentBusID +")][0]", value: { muted_daws_shown: !jsBus.muted_daws_shown } });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowSendRotaries()
{
	g_bShowSendRotaries = !g_bShowSendRotaries;

	save_ToCookie(false);

	BuildMixerUI();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowPreamps()
{
	if (!g_bDisplayPreamps)
	{
		if (!GetAccessControl("CAnubis_InputsWidget"))
			return;
	}

	g_bDisplayPreamps = !g_bDisplayPreamps;

	save_ToCookie(false);

	BuildMixerUI();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleMicLineInstrument(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var nInputMode = 0;
	if (eButton.innerHTML == "Mic" || eButton.innerHTML == "MIC")
	{
		nInputMode = 1;
    }
	else if (eButton.innerHTML == "Line" || eButton.innerHTML == "LINE")
	{
		nInputMode = 2;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { inputMode: nInputMode } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleMicLine(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var nInputMode = 0;
	if (eButton.innerHTML == "Mic" || eButton.innerHTML == "MIC")
	{
		nInputMode = 1;
    }

	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { inputMode: nInputMode } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleLineInstrument(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var nInputMode = 1;
	if (eButton.innerHTML == "Line" || eButton.innerHTML == "LINE")
	{
		nInputMode = 2;
	}

	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { inputMode: nInputMode } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleLock(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-lock-disabled"))
		return;

	var bLock = !eButton.classList.contains("strip-button-preamp-lock-checked");

	var nCurrentGroupID = GetPreampGroupID(nModuleID, nChannelID);
	if (nCurrentGroupID != -1)
	{
		for (var nIdx = 0; nIdx < g_tPreampGroup[nCurrentGroupID].length; nIdx++)
		{
			var nToUpdateModuleID = g_tPreampGroup[nCurrentGroupID][nIdx][0];
			var nToUpdateChannelID = g_tPreampGroup[nCurrentGroupID][nIdx][1];

			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nToUpdateModuleID + ")][0].custom.ins.channels[" + nToUpdateChannelID + "]", value: { lock: bLock } });
		}
	}
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lock: bLock } });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Toggle48V(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-red-checked-disabled"))
		return;

	var b48V = !eButton.classList.contains("strip-button-preamp-red-checked");

	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { m48V: b48V } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleZIn(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var bZIn = !eButton.classList.contains("strip-button-preamp-checked");

	self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { z_in: bZIn } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetPadMode(nPadMode, nModuleID, nChannelID)
{
	switch (nPadMode)
	{
		case 0:
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lift: true } });
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { pad: false } });
			break;
        }	

		case 1:
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lift: false } });
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { pad: false } });
			break;
        }	

		case 2:
		{
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lift: false } });
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { pad: true } });
			break;
        }			
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TogglePhase(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-disabled") || eButton.classList.contains("strip-button-preamp-checked-disabled"))
		return;

	var bPhase = !eButton.classList.contains("strip-button-preamp-checked");

	var nCurrentGroupID = GetPreampGroupID(nModuleID, nChannelID);
	if (nCurrentGroupID != -1)
	{
		for (var nIdx = 0; nIdx < g_tPreampGroup[nCurrentGroupID].length; nIdx++)
		{
			var nToUpdateModuleID = g_tPreampGroup[nCurrentGroupID][nIdx][0];
			var nToUpdateChannelID = g_tPreampGroup[nCurrentGroupID][nIdx][1];

			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nToUpdateModuleID + ")][0].custom.ins.channels[" + nToUpdateChannelID + "]", value: { phase: bPhase } });
		}
    }
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { phase: bPhase } });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetLowCut(bLowCut, nLowCutFreq, nModuleID, nChannelID)
{
	var nCurrentGroupID = GetPreampGroupID(nModuleID, nChannelID);
	if (nCurrentGroupID != -1)
	{
		for (var nIdx = 0; nIdx < g_tPreampGroup[nCurrentGroupID].length; nIdx++)
		{
			var nToUpdateModuleID = g_tPreampGroup[nCurrentGroupID][nIdx][0];
			var nToUpdateChannelID = g_tPreampGroup[nCurrentGroupID][nIdx][1];

			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nToUpdateModuleID + ")][0].custom.ins.channels[" + nToUpdateChannelID + "]", value: { lowCut: bLowCut } });

			if (bLowCut)
				self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nToUpdateModuleID + ")][0].custom.ins.channels[" + nToUpdateChannelID + "]", value: { lowCut_freq: nLowCutFreq } });
		}
    }
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lowCut: bLowCut } });

		if (bLowCut)
			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { lowCut_freq: nLowCutFreq } });
	}

	ClosePopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ToggleCut(eButton, nModuleID, nChannelID)
{
	if (eButton.classList.contains("strip-button-preamp-cut-disabled") || eButton.classList.contains("strip-button-preamp-cut-checked-disabled"))
		return;

	var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
	}

	var bCut = jsSettings.neumann_edition ? !eButton.classList.contains("strip-button-preamp-red-checked") : !eButton.classList.contains("strip-button-preamp-cut-checked");

	var nCurrentGroupID = GetPreampGroupID(nModuleID, nChannelID);
	if (nCurrentGroupID != -1)
	{
		for (var nIdx = 0; nIdx < g_tPreampGroup[nCurrentGroupID].length; nIdx++)
		{
			var nToUpdateModuleID = g_tPreampGroup[nCurrentGroupID][nIdx][0];
			var nToUpdateChannelID = g_tPreampGroup[nCurrentGroupID][nIdx][1];

			self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nToUpdateModuleID + ")][0].custom.ins.channels[" + nToUpdateChannelID + "]", value: { cut: bCut } });
		}
    }
	else
	{
		self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==" + nModuleID + ")][0].custom.ins.channels[" + nChannelID + "]", value: { cut: bCut } });
    }
}
