////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Music Mission Mixer Creation
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MM_ZERO_DB = 0;
var MM_ZERO_LIN = 1;
var MM_MUTE_DB = -144.5;
var MM_MUTE_LIN = 0.00000000000001;

// BUS_TYPE
const BT_UNDEFINED = 0;
const BT_MONITOR = 1;
const BT_CUE = 2;
const BT_EFFECT = 3;
const BT_INSERT = 4;

// BUS_ID
const MM_ID_MONITOR_BUS = 0;
const MM_ID_ALT_MONITOR_BUS = 1;
const MM_ID_FIRST_CUE_BUS = 2;
const MM_ID_REVERB_BUS = 7;
const MM_ID_DYNAMICS_BUS = 8;
const MM_ID_FIRST_SEND_BUS = 9;

const MM_NB_MONITOR_BUS = 2;
const MM_NB_CUE_BUS = 5;
const MM_NB_EFFECT_BUS = 2;
const MM_NB_SEND_BUS = 3;

// CUE_MODE
const CM_CUE = 0;
const CM_MIXALT = 1;

// INPUT_TYPE
const IT_UNDEFINED = 0;
const IT_LOCAL_ADAT = 13;
const IT_LOCAL_DANTE = 14;

// STRIP_TYPE
const ST_UNDEFINED = 0;
const ST_MUSIC_INPUT = 1;
const ST_LOCAL_TALK_MIC = 2;
const ST_PEERED_TALK_MIC = 3;
const ST_DAW_INPUT = 4;
const ST_MONITOR_RETURN = 5;
const ST_CUE_RETURN = 6;
const ST_EFFECT_RETURN = 7;

// STRIP_ID
const MM_ID_FIRST_REVERB_STRIP_RETURN = 14;
const MM_ID_SECOND_REVERB_STRIP_RETURN = 15;
const MM_ID_FIRST_DYNAMICS_STRIP_RETURN = 16;
const MM_ID_SECOND_DYNAMICS_STRIP_RETURN = 17;
const MM_ID_1ST_BUILTIN_MIC = 998;
const MM_ID_1ST_PEERED_TALK_MIC = 999;

// OUTPUT_TYPE
const OT_UNDEFINED = 0;
const OT_LOCAL_LINE = 1;
const OT_LOCAL_HEADPHONE = 2;
const OT_PEERED_GENERIC = 3;
const OT_LOCAL_ADAT = 4;
const OT_LOCAL_DANTE = 5;

const MM_LONG_CLICK_DURATION = 800; // [ms]

// REVERB TYPE
const MERGING_REVERB_ID = 0;
const EVENTIDE_BLACKHOLE_REVERB_ID = 1;

//////////////////////////////////////////////////
// NEUMANN EDITION
//////////////////////////////////////////////////

const MM_NEUMANN_ID_FIRST_MIX_BUS = 2;

const MM_NEUMANN_NB_MIX_BUS = 4;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FIRST_SEND_ROTARY_ID() {
	return MM_ID_REVERB_BUS;
}

function NB_SEND_ROTARIES() {
	var jsMixer = GetMixerJSON();
	if (jsMixer && jsMixer.settings.expert_mode) {
		return MM_NB_EFFECT_BUS + MM_NB_SEND_BUS;
	}

	return MM_NB_EFFECT_BUS + 1;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dB2Linear(fdB) {
	if (fdB <= MM_MUTE_DB) {
		return 0;
	} else {
		return Math.pow(10, fdB / 20);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Linear2dB(fGain) {
	if (fGain <= MM_MUTE_LIN) {
		return MM_MUTE_DB;
	}

	return 20.0 * Math.log10(fGain);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_szSerialNumber = "";

var _titleBarHeight = 30;

var g_isStripsScroller;
var g_nOnRefreshStripsScrollerX = -1;
var g_nNbVisibleStrips = 0;

var g_isSendRotariesScroller;
var g_nOnRefreshSendRotariesScrollerY = -1;

var g_nCurrentBusID = 0;
var g_bShowSendRotaries = true;
var g_nNbShownRotaries = 0;
var g_nFirstShownRotary = 0;
var g_szSelectedRotaryID = "";

var g_nMixerMargin = 0;
var g_nElementsBorderWidth = 0;

var g_nStripsWidth = 0;

var g_nStripWidth = 0;
var g_nStripRightMargin = 0;

var g_nStripButtonWidth = 0;

var g_nStripPanWidth = 0;
var g_nStripPanHeight = 0;
var g_nStripPanKnobWidth = 0;

var g_nStripFaderSectionWidth = 0;
var g_nStripMeterSectionWidth = 0;
var g_nStripMeterWidth = 0;
var g_nStripLinkedMeterWidth = 0;

var g_nStripFaderValueHeight = 0;
var g_nStripFaderWidth = 0;
var g_nStripFaderHeight = 0;
var g_nStripFaderKnobHeight = 0;
var g_nStripFaderKnobBorder = 0;
var g_nStripRotarySectionHeight = 0;
var g_nStripPreampSectionHeight = 0;
var g_nStripPreampMeterHeight = 0;

var g_bButtonsHideFaders = true;

var g_nStripButtonsContainerHeight = 0;
var g_nStripButtonsGapHeight = 0;

var g_nMasterButtonsContainerHeight = 0;

var g_nStripScaleTop = 0;
var g_nStripScaleHeight = 0;

var g_nNbScaleSteps = 24;
var g_nStripScaleStepHeight = 0;

var g_n0dB = 0;
var g_n6dB = 0;

var g_LongClickTimer;

var g_bEQSnapshotsOpened = false;
var g_bDynamicsSnapshotsOpened = false;
var g_bReverbSnapshotsOpened = false;
var g_bDeesserSnapshotsOpened = false;
var g_bEventideBlackholeSnapshotsOpened = false;

var g_nEffectSectionControlInputID = -1;
var g_nEffectSectionControlBusID = -1;

var g_bPreampCapabilityZInAvailable = false;

var g_nSampleRate = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddEvent(szElementID, szEvent, fnCallBack) {
	try {
		var eElement = document.getElementById(szElementID);
		if (eElement) {
			try {
				eElement.attachEvent("on" + szEvent, fnCallBack); //For IE
			} catch (e) {
				try {
					eElement.addEventListener(szEvent, fnCallBack, false); //For other browsers
				} catch (e) {}
			}
		}
	} catch (e) {}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RemoveEvent(szElementID, szEvent, fnCallBack) {
	try {
		var eElement = document.getElementById(szElementID);
		if (eElement) {
			try {
				eElement.detachEvent("on" + szEvent, fnCallBack); //For IE
			} catch (e) {
				try {
					eElement.removeEventListener(szEvent, fnCallBack, false); //For other browsers
				} catch (e) {}
			}
		}
	} catch (e) {}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnMixerResize() {
	var jsMixer = GetMixerJSON();
	if (jsMixer == null) {
		return;
	}
	var bNeumannEdition = jsMixer.settings.neumann_edition;
	/*
	var screenSize = window.innerWidth;
	if (window.innerWidth > window.innerHeight)
	{
		screenSize = window.innerHeight;
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripWidth = 100;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var elementsBorderWidth = 2;
	var elementsBorderRadius = 6;

	var debugResolutionColor = '#000000';

	if (screenSize <= 576)
	{
		stripWidth = 58;
		elementsBorderWidth = 1.5;
		elementsBorderRadius = 4;

		displayHalfSolo = true;
		displayHalfMute = true;

		debugResolutionColor = '#ff0000';
	}
	else if (screenSize <= 768)
	{
		stripWidth = 65;
		elementsBorderWidth = 1.5;
		elementsBorderRadius = 4;

		debugResolutionColor = '#ffff00';
	}
	else if (screenSize <= 992)
	{
		stripWidth = 65;//77;
		elementsBorderWidth = 1.5;//2;
		elementsBorderRadius = 5;

		debugResolutionColor = '#00ff00';
	}
	else if (screenSize <= 1200)
	{
		stripWidth = 65;//90;
		elementsBorderWidth = 1.5;//2;
		elementsBorderRadius = 5;

		debugResolutionColor = '#0000ff';
	}
	else
	{
		stripWidth = 65;//77;//100;
		elementsBorderWidth = 1.5;//2;//3;
		elementsBorderRadius = 5;//6;

		debugResolutionColor = '#000000';
	}
*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var mixerMargin = 15;
	var debugResolutionColor = "#000000";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//var stripWidth = 65;
	var stripWidth = 58;
	var elementsBorderWidth = 1.5;
	var elementsBorderRadius = 4;

	/*if (window.innerHeight <= 576)
	{
		//stripWidth = 58;

		displayHalfSolo = true;
		displayHalfMute = true;
	}*/
	/*
	else
	{
		var stripRightMargin = stripWidth / 12;
		var nVisibleStripsWidth = g_nNbVisibleStrips * (stripWidth + stripRightMargin);

		var eStrips = document.getElementById("strips");
		if (eStrips)
		{
			if (nVisibleStripsWidth > eStrips.offsetWidth)
			{
				stripWidth = 58;
			}
		}
	}
*/

	//var eDebug = document.getElementById("musicMainMenu-text");
	//if (eDebug)
	//{
	//	eDebug.innerText = stripWidth;
	//}

	/*if (window.devicePixelRatio == 1 && elementsBorderWidth < 2)
	{
		elementsBorderWidth = 2;
	}*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var displaySolo = true;
	var displayHalfSolo = false;

	var displayMute = true;
	var displayHalfMute = false;

	/*if (window.innerHeight <= 500)
	{
		displayHalfSolo = true;
		displayHalfMute = true;
	}
	if (window.innerHeight <= 400)
	{
		displayHalfSolo = true;
		displayHalfMute = true;
	}*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var mixerWidth = window.innerWidth;
	if (mixerWidth < 300) {
		mixerWidth = 300;
	}

	var mixerHeight = window.innerHeight - _titleBarHeight - mixerMargin * 2;
	if (mixerHeight < 300) {
		mixerHeight = 300;
	}

	var stripButtonsGapHeight = stripWidth / 10;

	var _panGainRowHeight = (stripWidth * 4) / 9;
	var _faderValueRowHeight = (stripWidth * 1) / 3;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripRightMargin = stripWidth / 12;
	var stripsWidth = g_nNbVisibleStrips * (stripWidth + stripRightMargin);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripPanHeight = _panGainRowHeight;
	var stripPanWidth = stripWidth;
	var stripPanKnobWidth = stripPanWidth / (bNeumannEdition ? 11 : 8);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripFaderSectionWidth = (stripWidth * 5) / 6;
	var stripFaderSectionHeight =
		mixerHeight -
		stripPanHeight -
		elementsBorderWidth * 2 -
		stripButtonsGapHeight * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var bButtonsHideFaders = 1;
	var bDisplayNeumannButtons = 0;

	var stripPreampSectionHeight = 0;

	var stripRotarySectionHeight = 0;
	g_nNbShownRotaries = 0;

	if (g_bDisplayPreamps) {
		stripPreampSectionHeight +=
			((stripWidth * 1.8) / 3) *
				(g_bPreampCapabilityZInAvailable ? 9 : 8) +
			stripWidth +
			stripButtonsGapHeight * 2.2;
		stripFaderSectionHeight -=
			stripPreampSectionHeight + stripButtonsGapHeight * 2;
	}

	switch (g_nCurrentBusID) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6: {
			if (g_bShowSendRotaries) {
				stripRotarySectionHeight +=
					stripWidth + stripButtonsGapHeight + stripButtonsGapHeight;
				stripFaderSectionHeight -=
					stripWidth + stripButtonsGapHeight + stripButtonsGapHeight;
				g_nNbShownRotaries = 1;

				if (
					bNeumannEdition &&
					stripFaderSectionHeight > stripWidth * 8
				) {
					stripRotarySectionHeight +=
						(stripFaderSectionWidth + elementsBorderWidth * 2) * 2 +
						stripButtonsGapHeight * 2;
					stripFaderSectionHeight -=
						(stripFaderSectionWidth + elementsBorderWidth * 2) * 2 +
						stripButtonsGapHeight * 2;

					bDisplayNeumannButtons = 1;
				}
			}

			for (
				var j = FIRST_SEND_ROTARY_ID() + 1;
				j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES();
				j++
			) {
				if (stripFaderSectionHeight < stripWidth * 7) {
					break;
				}

				if (g_bShowSendRotaries && !bNeumannEdition) {
					stripRotarySectionHeight +=
						stripWidth + stripButtonsGapHeight;
					stripFaderSectionHeight -=
						stripWidth + stripButtonsGapHeight;
					g_nNbShownRotaries++;
				}

				if (
					!g_bShowSendRotaries ||
					(g_bShowSendRotaries &&
						(g_nNbShownRotaries >= 3 || bNeumannEdition))
				) {
					bButtonsHideFaders = 0; // show entire faders

					var nFaderHeightAvailable;
					if (bNeumannEdition) {
						nFaderHeightAvailable =
							stripFaderSectionHeight -
							(stripFaderSectionWidth + elementsBorderWidth * 2) *
								6;
					} else {
						nFaderHeightAvailable =
							stripFaderSectionHeight -
							(stripFaderSectionWidth + elementsBorderWidth * 2) *
								3;
					}

					var nMinimumNotHiddenFaderHeight = 260;
					if (
						nFaderHeightAvailable -
							(stripWidth + stripButtonsGapHeight) >
						nMinimumNotHiddenFaderHeight
					) {
						// add another rotary
						continue;
					} else {
						if (
							nFaderHeightAvailable < nMinimumNotHiddenFaderHeight
						)
							// hide faders
							bButtonsHideFaders = 1;

						break;
					}
				}
			}

			if (g_nFirstShownRotary > NB_SEND_ROTARIES() - g_nNbShownRotaries) {
				g_nFirstShownRotary = NB_SEND_ROTARIES() - g_nNbShownRotaries;
			}
		}
	}

	g_bButtonsHideFaders = bButtonsHideFaders == 1;

	if (bButtonsHideFaders == 0) {
		stripFaderSectionHeight -=
			(stripFaderSectionWidth + elementsBorderWidth * 2) * 3;
	}

	var stripFaderValueHeight = _faderValueRowHeight;
	var stripFaderValueWidth = stripFaderSectionWidth;

	var stripFaderWidth = stripFaderSectionWidth;
	var stripFaderHeight =
		stripFaderSectionHeight -
		stripFaderValueHeight * (bNeumannEdition ? 1.5 : 1);

	if (stripFaderSectionHeight <= 330 && g_bButtonsHideFaders) {
		displayHalfSolo = true;
		displayHalfMute = true;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripScaleTop = 0;
	var stripScaleHeight = stripFaderHeight - stripFaderSectionWidth / 3;
	var stripScaleStepHeight = stripScaleHeight / g_nNbScaleSteps;

	var stripFaderKnobHeight = stripFaderWidth / 8;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripButtonWidth = stripFaderSectionWidth - elementsBorderWidth * 2;
	var stripButtonHeight = stripFaderSectionWidth - elementsBorderWidth * 2;

	var stripButtonSoloHeight = 0;
	var stripButtonSoloMarginBottom = 0;
	var stripButtonSoloBorderWidth = 0;
	if (displaySolo) {
		stripButtonSoloHeight =
			stripFaderSectionWidth - elementsBorderWidth * 2;
		stripButtonSoloMarginBottom = stripButtonsGapHeight;
		stripButtonSoloBorderWidth = elementsBorderWidth;

		if (displayHalfSolo) {
			stripButtonSoloHeight /= 2.5;
		}
	}

	var stripButtonMuteHeight = 0;
	var stripButtonMuteMarginBottom = 0;
	var stripButtonMuteBorderWidth = 0;
	if (displayMute) {
		stripButtonMuteHeight =
			stripFaderSectionWidth - elementsBorderWidth * 2;
		stripButtonMuteMarginBottom = stripButtonsGapHeight;
		stripButtonMuteBorderWidth = elementsBorderWidth;

		if (displayHalfMute) {
			stripButtonMuteHeight /= 2.5;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripButtonsContainerHeight = stripButtonsGapHeight * 3;
	if (stripButtonSoloHeight > 0) {
		stripButtonsContainerHeight +=
			stripButtonSoloHeight +
			elementsBorderWidth * 2 +
			stripButtonsGapHeight;
	}

	if (stripButtonMuteHeight > 0) {
		stripButtonsContainerHeight +=
			stripButtonMuteHeight +
			elementsBorderWidth * 2 +
			stripButtonsGapHeight;
	}

	stripButtonsContainerHeight += stripButtonHeight + elementsBorderWidth * 2;

	var masterButtonsContainerHeight = stripButtonsGapHeight * 3;
	masterButtonsContainerHeight += stripButtonHeight + elementsBorderWidth * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripButtonsCueContainerHeight = stripButtonsGapHeight * 3;
	stripButtonsCueContainerHeight +=
		(stripButtonHeight + elementsBorderWidth * 2 + stripButtonsGapHeight) *
		3;
	stripButtonsCueContainerHeight +=
		stripButtonHeight + elementsBorderWidth * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripButtonsTalkContainerHeight = stripButtonsGapHeight * 3;
	stripButtonsTalkContainerHeight +=
		stripButtonHeight + elementsBorderWidth * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var stripMeterSectionWidth = stripWidth - stripFaderSectionWidth;

	var stripOverloadWidth = bNeumannEdition ? 3 : 6; //(stripMeterSectionWidth * 4) / (bNeumannEdition ? 12 : 6);
	var stripOverloadHeight = stripFaderValueHeight;

	var stripMeterWidth = stripOverloadWidth;
	var stripMeterHeight = stripScaleHeight;

	var stripLinkedMeterWidth = bNeumannEdition
		? stripMeterWidth
		: stripMeterWidth / 2 - 1;

	var stripMeterSectionHeight =
		stripFaderSectionHeight -
		stripPreampSectionHeight -
		stripRotarySectionHeight;

	var stripPreampMeterHeight =
		stripPreampSectionHeight *
			(g_bPreampCapabilityZInAvailable ? 0.961 : 0.953) -
		stripOverloadHeight -
		6;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var masterMarginLeft = 12;
	var masterLeftWidth = stripFaderSectionWidth;
	var masterCenterWidth = masterLeftWidth * 1.2;
	var masterRightWidth = masterLeftWidth / 3;
	var masterWidth =
		masterMarginLeft +
		masterLeftWidth +
		masterCenterWidth +
		masterRightWidth +
		4;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var masterGainHeight = _panGainRowHeight;
	var masterGainWidth =
		masterWidth - masterMarginLeft - elementsBorderWidth * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var masterLeftHeight =
		mixerHeight - masterGainHeight - stripButtonsGapHeight * 2.5;

	var masterButtonWidth = masterLeftWidth - elementsBorderWidth * 2;
	var masterButtonHeight = masterLeftWidth - elementsBorderWidth * 2;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var masterCenterHeight = masterLeftHeight;

	var masterFaderValueHeight = _faderValueRowHeight;
	var masterFaderValueWidth = masterLeftWidth;

	var masterFaderWidth = masterCenterWidth;
	var masterFaderHeight =
		mixerHeight -
		(masterGainHeight + elementsBorderWidth * 2) -
		stripButtonsGapHeight -
		masterFaderValueHeight;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var masterRightHeight = masterLeftHeight;

	var masterOverloadWidth = masterRightWidth;
	var masterOverloadHeight = masterFaderValueHeight;

	var masterMeterWidth = masterRightWidth;
	var masterMeterHeight =
		mixerHeight -
		masterGainHeight -
		stripButtonsGapHeight -
		masterOverloadHeight;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Publish results
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	g_nMixerMargin = mixerMargin;
	g_nElementsBorderWidth = elementsBorderWidth;

	g_nStripsWidth = stripsWidth;

	g_nStripWidth = stripWidth;
	g_nStripRightMargin = stripRightMargin;

	g_nStripButtonWidth = stripButtonWidth;

	g_nStripPanWidth = stripPanWidth;
	g_nStripPanHeight = stripPanHeight;
	g_nStripPanKnobWidth = stripPanKnobWidth;

	g_nStripFaderSectionWidth = stripFaderSectionWidth;
	g_nStripMeterSectionWidth = stripMeterSectionWidth;

	g_nStripPreampSectionHeight = stripPreampSectionHeight;
	g_nStripPreampMeterHeight = stripPreampMeterHeight;

	g_nStripRotarySectionHeight = stripRotarySectionHeight;

	g_nStripMeterWidth = stripMeterWidth;
	g_nStripLinkedMeterWidth = stripLinkedMeterWidth;

	g_nStripFaderValueHeight = stripFaderValueHeight;
	g_nStripFaderWidth = stripFaderWidth;
	g_nStripFaderHeight = stripFaderHeight;
	g_nStripFaderKnobHeight = stripFaderKnobHeight;

	g_nStripButtonsContainerHeight = stripButtonsContainerHeight;
	g_nStripButtonsGapHeight = stripButtonsGapHeight;

	g_nMasterButtonsContainerHeight = masterButtonsContainerHeight;

	g_nStripScaleTop = stripScaleTop;
	g_nStripScaleHeight = stripScaleHeight;
	g_nStripScaleStepHeight = stripScaleStepHeight;

	g_n0dB = GainToPos(0);
	g_n6dB = GainToPos(6);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var r = document.querySelector(":root");

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Remove the buttons container top transition to avoid strange effects while resizing
	// Init meters decay last value
	if (jsMixer) {
		for (var i = 0; i < jsMixer.strips.length; i++) {
			var szStripButtons = "strip" + jsMixer.strips[i].id + "-buttons";
			var eStripButtons = document.getElementById(szStripButtons);
			if (eStripButtons) {
				eStripButtons.classList.remove(
					"strip-buttons-container-hide-transition"
				);
			}

			r.style.setProperty(
				"--strip" + jsMixer.strips[i].id + "-meter-last",
				MM_MUTE_DB
			);
			r.style.setProperty(
				"--strip" + jsMixer.strips[i].id + "-meter",
				"100000px"
			);
			r.style.setProperty(
				"--strip" + jsMixer.strips[i].id + "-meter-2",
				"100000px"
			);
		}
		for (var i = 0; i < jsMixer.groups.length; i++) {
			var szStripButtons = "group" + jsMixer.groups[i].id + "-buttons";
			var eStripButtons = document.getElementById(szStripButtons);
			if (eStripButtons) {
				eStripButtons.classList.remove(
					"strip-buttons-container-hide-transition"
				);
			}

			r.style.setProperty(
				"--group" + jsMixer.groups[i].id + "-meter-last",
				MM_MUTE_DB
			);
			r.style.setProperty(
				"--group" + jsMixer.groups[i].id + "-meter",
				"100000px"
			);
		}

		r.style.setProperty(
			"--bus" + g_nCurrentBusID + "-meter-left-last",
			MM_MUTE_DB
		);
		r.style.setProperty(
			"--bus" + g_nCurrentBusID + "-meter-right-last",
			MM_MUTE_DB
		);
		r.style.setProperty(
			"--bus" + g_nCurrentBusID + "-meter-left",
			"100000px"
		);
		r.style.setProperty(
			"--bus" + g_nCurrentBusID + "-meter-right",
			"100000px"
		);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var eStripsUL = document.getElementById("strips-ul");
	if (eStripsUL) {
		eStripsUL.style.width = stripsWidth + "px";
	}

	r.style.setProperty("--mixer-margin", mixerMargin + "px");
	r.style.setProperty("--mixer-height", mixerHeight + "px");

	r.style.setProperty("--elements-border-width", elementsBorderWidth + "px");
	r.style.setProperty(
		"--elements-border-radius",
		elementsBorderRadius + "px"
	);
	r.style.setProperty(
		"--strip-buttons-gap-height",
		stripButtonsGapHeight + "px"
	);

	r.style.setProperty("--strips-width", stripsWidth + "px");
	r.style.setProperty("--strip-width", stripWidth + "px");

	for (var i = 0; i < g_nNbVisibleStrips; i++) {
		r.style.setProperty(
			"--strip-" + i + "-left",
			(stripWidth + stripRightMargin) * i + "px"
		);
	}

	r.style.setProperty("--strip-margin-right", stripRightMargin + "px");

	r.style.setProperty(
		"--strip-fader-section-width",
		stripFaderSectionWidth + "px"
	);
	r.style.setProperty(
		"--strip-fader-section-height",
		stripFaderSectionHeight + "px"
	);

	r.style.setProperty("--buttons-hide-faders", bButtonsHideFaders);
	r.style.setProperty("--display-neumann-buttons", bDisplayNeumannButtons);

	r.style.setProperty(
		"--display-strip-preamp-section",
		g_bDisplayPreamps ? 1 : 0
	);
	r.style.setProperty(
		"--strip-preamp-section-height",
		stripPreampSectionHeight + "px"
	);
	r.style.setProperty(
		"--strip-preamp-meter-height",
		stripPreampMeterHeight + "px"
	);

	r.style.setProperty(
		"--strip-fader-rotary-section-height",
		stripRotarySectionHeight + "px"
	);

	r.style.setProperty(
		"--strip-meter-section-width",
		stripMeterSectionWidth + "px"
	);
	r.style.setProperty(
		"--strip-meter-section-height",
		stripMeterSectionHeight + "px"
	);

	r.style.setProperty("--strip-button-width", stripButtonWidth + "px");
	r.style.setProperty("--strip-button-height", stripButtonHeight + "px");
	r.style.setProperty(
		"--strip-button-solo-height",
		stripButtonSoloHeight + "px"
	);
	r.style.setProperty(
		"--strip-button-solo-margin-bottom",
		stripButtonSoloMarginBottom + "px"
	);
	r.style.setProperty(
		"--strip-button-solo-border-width",
		stripButtonSoloBorderWidth + "px"
	);
	r.style.setProperty(
		"--strip-button-mute-height",
		stripButtonMuteHeight + "px"
	);
	r.style.setProperty(
		"--strip-button-mute-margin-bottom",
		stripButtonMuteMarginBottom + "px"
	);
	r.style.setProperty(
		"--strip-button-mute-border-width",
		stripButtonMuteBorderWidth + "px"
	);
	r.style.setProperty(
		"--strip-buttons-container-height",
		stripButtonsContainerHeight + "px"
	);
	r.style.setProperty(
		"--strip-buttons-cue-container-height",
		stripButtonsCueContainerHeight + "px"
	);
	r.style.setProperty(
		"--strip-buttons-talk-container-height",
		stripButtonsTalkContainerHeight + "px"
	);

	r.style.setProperty(
		"--master-buttons-container-height",
		masterButtonsContainerHeight + "px"
	);

	r.style.setProperty("--strip-pan-width", stripPanWidth + "px");
	r.style.setProperty("--strip-pan-height", stripPanHeight + "px");
	r.style.setProperty("--strip-pan-knob-width", stripPanKnobWidth + "px");

	r.style.setProperty(
		"--strip-gain-value-width",
		stripFaderValueWidth + "px"
	);
	r.style.setProperty(
		"--strip-gain-value-height",
		stripFaderValueHeight + "px"
	);
	r.style.setProperty("--strip-fader-width", stripFaderWidth + "px");
	r.style.setProperty("--strip-fader-height", stripFaderHeight + "px");
	r.style.setProperty(
		"--strip-fader-knob-height",
		stripFaderKnobHeight + "px"
	);

	r.style.setProperty("--strip-scale-top", stripScaleTop + "px");
	r.style.setProperty("--strip-scale-height", stripScaleHeight + "px");
	r.style.setProperty(
		"--strip-scale-step-height",
		stripScaleStepHeight + "px"
	);
	r.style.setProperty("--strip-scale-nbsteps", g_nNbScaleSteps);

	for (var i = 0; i < g_nNbScaleSteps; i++) {
		r.style.setProperty(
			"--strip-scale-top" + i,
			stripScaleTop + stripScaleStepHeight * i + "px"
		);
	}

	for (var i = 0; i < 7; i++) {
		r.style.setProperty(
			"--strip-scale-number-top" + i,
			stripScaleTop +
				stripScaleStepHeight * i * 4 -
				stripButtonWidth / 8 +
				"px"
		);
	}

	var bDXDDSDMode = g_nSampleRate == 352800;

	r.style.setProperty(
		"--preamp-meter-scale-number-top0",
		PreampMeterGainToPos(bDXDDSDMode ? 6 : 0) + "px"
	);
	r.style.setProperty(
		"--preamp-meter-scale-number-top6",
		PreampMeterGainToPos(bDXDDSDMode ? 0 : -6) + "px"
	);
	r.style.setProperty(
		"--preamp-meter-scale-number-top12",
		PreampMeterGainToPos(bDXDDSDMode ? -6 : -12) + "px"
	);
	r.style.setProperty(
		"--preamp-meter-scale-number-top18",
		PreampMeterGainToPos(-18) + "px"
	);
	r.style.setProperty(
		"--preamp-meter-scale-number-top36",
		PreampMeterGainToPos(-36) + "px"
	);
	r.style.setProperty(
		"--preamp-meter-scale-number-top72",
		PreampMeterGainToPos(-72) + "px"
	);

	r.style.setProperty("--strip-overload-width", stripOverloadWidth + "px");
	r.style.setProperty("--strip-overload-height", stripOverloadHeight + "px");
	r.style.setProperty("--strip-meter-width", stripMeterWidth + "px");
	r.style.setProperty("--strip-meter-height", stripMeterHeight + "px");

	r.style.setProperty("--strip-meter-0dB", GainToPos(0) + "px");
	r.style.setProperty("--strip-meter-18dB", GainToPos(-18) + "px");

	r.style.setProperty("--masters-width", masterWidth + "px");
	r.style.setProperty("--master-width", masterWidth + "px");

	r.style.setProperty("--master-margin-left", masterMarginLeft + "px");

	r.style.setProperty("--master-gain-width", masterGainWidth + "px");
	r.style.setProperty("--master-gain-height", masterGainHeight + "px");

	r.style.setProperty("--master-left-width", masterLeftWidth + "px");
	r.style.setProperty("--master-left-height", masterLeftHeight + "px");

	r.style.setProperty("--master-center-width", masterCenterWidth + "px");
	r.style.setProperty("--master-center-height", masterCenterHeight + "px");

	r.style.setProperty("--master-right-width", masterRightWidth + "px");
	r.style.setProperty("--master-right-height", masterRightHeight + "px");

	r.style.setProperty("--master-button-width", masterButtonWidth + "px");
	r.style.setProperty("--master-button-height", masterButtonHeight + "px");

	r.style.setProperty(
		"--master-fader-value-width",
		masterFaderValueWidth + "px"
	);
	r.style.setProperty(
		"--master-fader-value-height",
		masterFaderValueHeight + "px"
	);
	r.style.setProperty("--master-fader-width", masterFaderWidth + "px");
	r.style.setProperty("--master-fader-height", masterFaderHeight + "px");

	r.style.setProperty("--master-overload-width", masterOverloadWidth + "px");
	r.style.setProperty(
		"--master-overload-height",
		masterOverloadHeight + "px"
	);
	r.style.setProperty("--master-meter-width", masterMeterWidth + "px");
	r.style.setProperty("--master-meter-height", masterMeterHeight + "px");

	r.style.setProperty(
		"--master-meter-background-color",
		debugResolutionColor
	);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	UpdateDisplayedStrips();
	UpdateGroups();
	UpdateDisplayedBus();
	UpdateExpertMode();
	UpdateCueMonitoringDisabled();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	ComputeSendRotariesPositions();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	UpdateDanteLogo();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ComputeSendRotariesPositions() {
	var jsSettings = GetSettingsJSON();
	if (jsSettings == null) {
		return;
	}

	var nSendRotariesTop = new Array(NB_SEND_ROTARIES());
	var nSendRotariesHeight = new Array(NB_SEND_ROTARIES());
	for (var i = 0; i < NB_SEND_ROTARIES(); i++) {
		nSendRotariesTop[i] = 0;
		nSendRotariesHeight[i] = 0;
	}

	if (g_bShowSendRotaries) {
		var r = document.querySelector(":root");
		var nDisplayNeumannButtons = r.style.getPropertyValue(
			"--display-neumann-buttons"
		);
		nDisplayNeumannButtons = nDisplayNeumannButtons.replace("px", "");

		var nTop =
			jsSettings.neumann_edition && nDisplayNeumannButtons == 1
				? ((g_nStripWidth * 5) / 6 + g_nElementsBorderWidth * 2) * 2 +
				  g_nStripButtonsGapHeight * 2
				: 0;
		for (var i = 0; i < NB_SEND_ROTARIES(); i++) {
			if (i < g_nFirstShownRotary) {
				continue;
			}

			if (i >= g_nFirstShownRotary + g_nNbShownRotaries) {
				break;
			}

			nSendRotariesTop[i] = nTop;
			nSendRotariesHeight[i] = g_nStripWidth;

			nTop += g_nStripWidth + g_nStripButtonsGapHeight;
		}
	}

	var r = document.querySelector(":root");

	for (
		var i = MM_ID_MONITOR_BUS;
		i < MM_ID_FIRST_CUE_BUS + MM_NB_CUE_BUS;
		i++
	) {
		r.style.setProperty(
			"--strip-send" + i + "-rotary-height",
			g_nStripWidth + "px"
		);
	}

	for (var i = 0; i < NB_SEND_ROTARIES(); i++) {
		r.style.setProperty(
			"--strip-send" + (MM_ID_REVERB_BUS + i) + "-rotary-top",
			nSendRotariesTop[i] + "px"
		);
		r.style.setProperty(
			"--strip-send" + (MM_ID_REVERB_BUS + i) + "-rotary-height",
			nSendRotariesHeight[i] + "px"
		);
	}

	r.style.setProperty(
		"--strip-send" + MM_ID_1ST_BUILTIN_MIC + "-rotary-height",
		g_nStripWidth + "px"
	);
	r.style.setProperty(
		"--strip-send" + MM_ID_1ST_PEERED_TALK_MIC + "-rotary-height",
		g_nStripWidth + "px"
	);

	var bToggleShown = false;
	var eTogglePage = document.getElementById(
		"bus" + g_nCurrentBusID + "-send-rotaries-page"
	);
	if (eTogglePage) {
		if (g_bShowSendRotaries && g_nNbShownRotaries < NB_SEND_ROTARIES()) {
			eTogglePage.classList.remove("master-button-hidden");
			bToggleShown = true;
		} else {
			eTogglePage.classList.add("master-button-hidden");
		}
	}

	var eDownMix = document.getElementById(
		"bus" + g_nCurrentBusID + "-downmix"
	);
	var eCMClear = document.getElementById(
		"bus" + g_nCurrentBusID + "-cue-to-monitoring-clear"
	);
	var eMCAll = document.getElementById(
		"bus" + g_nCurrentBusID + "-mon-to-cue-all"
	);
	if (eDownMix && eCMClear && eMCAll) {
		if (bToggleShown) {
			if (window.innerHeight < 400) {
				eDownMix.classList.add("master-button-hidden");
				eCMClear.classList.add("master-button-hidden");
				eMCAll.classList.add("master-button-hidden");
			} else {
				eDownMix.classList.remove("master-button-hidden");
				eCMClear.classList.remove("master-button-hidden");
				eMCAll.classList.remove("master-button-hidden");
			}
		} else {
			if (window.innerHeight < 400) {
				eCMClear.classList.add("master-button-hidden");
				eMCAll.classList.add("master-button-hidden");
			} else {
				eCMClear.classList.remove("master-button-hidden");
				eMCAll.classList.remove("master-button-hidden");
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetMixerJSON() {
	var jsMusicEngine;

	if (RavennaDeviceCache && RavennaDeviceCache.document()) {
		jsMusicEngine = RavennaDeviceCache.document();
	}

	if (jsMusicEngine == null) {
		return;
	}

	if (
		jsMusicEngine._oem_ui_process_engine == null ||
		jsMusicEngine._oem_ui_process_engine.music == null ||
		jsMusicEngine._oem_ui_process_engine.music.mixer == null
	) {
		return;
	}

	return jsMusicEngine._oem_ui_process_engine.music.mixer;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildMixerUI() {
	g_bPreampCapabilityZInAvailable = GetPreampCapabilityZInAvailable();
	var r = document.querySelector(":root");
	r.style.setProperty(
		"--strip-preamp-ZIN-available",
		g_bPreampCapabilityZInAvailable
	);

	var jsMixer = GetMixerJSON();
	if (jsMixer == null) {
		return;
	}

	if (
		jsMixer.inputs.length == 0 ||
		jsMixer.outputs.length == 0 ||
		jsMixer.busses.length == 0 ||
		jsMixer.strips.length == 0 ||
		jsMixer.displayed_strips.length == 0 ||
		jsMixer.groups.length == 0
	) {
		return;
	}

	var bNeumannEdition = jsMixer.settings.neumann_edition;

	g_nSampleRate = jsMixer.sample_rate;
	var bDXDDSDMode = g_nSampleRate == 352800;

	if (
		bNeumannEdition &&
		g_nCurrentBusID != MM_NEUMANN_ID_FIRST_MIX_BUS &&
		g_nCurrentBusID != MM_NEUMANN_ID_FIRST_MIX_BUS + 1 &&
		g_nCurrentBusID != MM_NEUMANN_ID_FIRST_MIX_BUS + 2 &&
		g_nCurrentBusID != MM_NEUMANN_ID_FIRST_MIX_BUS + 3
	) {
		g_nCurrentBusID = MM_NEUMANN_ID_FIRST_MIX_BUS;
	} else if (
		!jsMixer.settings.expert_mode &&
		g_nCurrentBusID != MM_ID_MONITOR_BUS &&
		g_nCurrentBusID != MM_ID_ALT_MONITOR_BUS &&
		g_nCurrentBusID != MM_ID_FIRST_CUE_BUS &&
		g_nCurrentBusID != MM_ID_FIRST_SEND_BUS
	) {
		g_nCurrentBusID = MM_ID_MONITOR_BUS;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	g_nNbVisibleStrips = 0;
	var visibleStrips = new Array();
	var visibleStripsGroup = new Array();
	var visibleStripsInput = new Array();
	var visibleStripDisplayNumber = new Array();
	for (var i = 0; i < jsMixer.displayed_strips.length; i++) {
		var nStripIndex = -1;
		var nGroupIndex = -1;
		var nInputIndex = -1;

		if (
			jsMixer.displayed_strips[i].id >= 3000 &&
			jsMixer.displayed_strips[i].id <= 3007
		) {
			var nGroupID = jsMixer.displayed_strips[i].id - 3000;

			for (var j = 0; j < jsMixer.strips.length; j++) {
				if (jsMixer.strips[j].group_id == nGroupID) {
					nStripIndex = j;
					nGroupIndex = nGroupID;
					break;
				}
			}
		} else {
			for (var j = 0; j < jsMixer.strips.length; j++) {
				if (jsMixer.strips[j].id == jsMixer.displayed_strips[i].id) {
					// Assume group index == group id here
					if (
						jsMixer.strips[j].group_id == -1 ||
						jsMixer.groups[jsMixer.strips[j].group_id]
							.collapsed_on_bus[g_nCurrentBusID] == false
					) {
						nStripIndex = j;
					}
					break;
				}
			}

			if (nStripIndex != -1) {
				for (var j = 0; j < jsMixer.inputs.length; j++) {
					if (
						jsMixer.inputs[j].id == jsMixer.strips[nStripIndex].id
					) {
						nInputIndex = j;

						if (jsMixer.inputs[j].linked_input_id != -1) {
							if (
								jsMixer.inputs[j].id >
									jsMixer.inputs[j].linked_input_id &&
								jsMixer.inputs[j].collapsed_link
							) {
								nStripIndex = -1;
							}
						}
						break;
					}
				}
			}
		}

		if (nStripIndex != -1) {
			if (jsMixer.strips[nStripIndex].sends[g_nCurrentBusID].visible) {
				visibleStrips[g_nNbVisibleStrips] = nStripIndex;
				visibleStripsGroup[g_nNbVisibleStrips] = nGroupIndex;
				visibleStripsInput[g_nNbVisibleStrips] = nInputIndex;
				if (nGroupIndex == -1) {
					visibleStripDisplayNumber[g_nNbVisibleStrips] =
						jsMixer.displayed_strips[i].display_number;
				} else {
					visibleStripDisplayNumber[g_nNbVisibleStrips] = -1;
				}
				g_nNbVisibleStrips++;
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var r = document.querySelector(":root");

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var eMixerSection = document.getElementById("mixerSection");
	eMixerSection.innerHTML = "";

	var szPage = "<div id='mixer' class='mixer'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Strips
	szPage += "<div id='strips' class='strips'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	szPage += "<ul id='strips-ul' class='strips-ul'>";

	for (var i = 0; i < g_nNbVisibleStrips; i++) {
		var szStripID = "";
		if (visibleStripsGroup[i] != -1) {
			szStripID = "group" + visibleStripsGroup[i];
		} else {
			szStripID = "strip" + jsMixer.strips[visibleStrips[i]].id;
		}

		var szStripSendID = szStripID + "-send" + g_nCurrentBusID;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		szPage += "<li class='strip-li'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip
		szPage +=
			"<div id='" +
			szStripID +
			"' class='strip' style='left: var(--strip-" +
			i +
			"-left);'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Pan
		szPage += "<div id='" + szStripSendID + "-pan' class='strip-pan'>";

		szPage +=
			"<div id='" + szStripSendID + "-pan-knob' class='strip-pan-knob'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szStripSendID +
			"-pan-knob2' class='strip-pan-knob strip-pan-knob2'>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Preamp section
		if (g_bDisplayPreamps) {
			if (
				jsMixer.inputs[visibleStrips[i]].analog &&
				visibleStripsGroup[i] == -1
			) {
				var szPreampId =
					"strip" +
					jsMixer.strips[visibleStrips[i]].id +
					"-module" +
					jsMixer.inputs[visibleStrips[i]].module_id +
					"-channel" +
					jsMixer.inputs[visibleStrips[i]].channel_id +
					"-preamp";

				szPage += "<div class='strip-preamp-container'>";

				if (
					jsMixer.inputs[visibleStrips[i]].linked_input_id != -1 &&
					jsMixer.inputs[visibleStrips[i]].id <
						jsMixer.inputs[visibleStrips[i]].linked_input_id &&
					jsMixer.inputs[visibleStrips[i]].collapsed_link
				) {
					szPage +=
						"<div id='" +
						szStripID +
						"-preamp-buttons' class='strip-preamp-buttons-container'>";

					szPage +=
						"<div id='" +
						szStripID +
						"-expand' class='strip-button strip-button-text strip-button-text-color' style='position: absolute; top: " +
						(g_bPreampCapabilityZInAvailable ? "86.6%" : "85%") +
						"; left: 8.5%;'>";

					szPage +=
						"<div class='strip-button-text-vcenter-2-lines' style='font-size: calc(var(--strip-button-width) / 4.2); white-space: initial;'>";
					szPage += "EXPAND\nLINK";
					szPage += "</div>";

					szPage += "</div>";

					szPage += "</div>";
				} else {
					szPage +=
						"<div id='" +
						szStripID +
						"-preamp-buttons' class='strip-preamp-buttons-container'>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// InputMode
					szPage +=
						"<div id='" +
						szPreampId +
						"-inputMode' class='strip-button-preamp strip-button-preamp-disabled'>";
					szPage += "";
					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// 48V
					szPage +=
						"<div id='" +
						szPreampId +
						"-48V' class='strip-button-preamp" +
						(bNeumannEdition ? "" : " strip-button-preamp-red") +
						" strip-button-preamp-disabled'>";
					szPage += "48V";
					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Z Hi
					if (g_bPreampCapabilityZInAvailable) {
						szPage +=
							"<div id='" +
							szPreampId +
							"-zIn' class='strip-button-preamp strip-button-preamp-disabled'>";
						szPage += bNeumannEdition ? "Z HI" : "Z Hi";
						szPage += "</div>";
					}

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Pad
					szPage +=
						"<div id='" +
						szPreampId +
						"-pad' class='strip-button-preamp'>";
					szPage += "";
					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Phase
					szPage +=
						"<div id='" +
						szPreampId +
						"-phase' class='strip-button-preamp strip-button-preamp-disabled'>";
					szPage += "&#216;";
					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// LowCut
					szPage +=
						"<div id='" +
						szPreampId +
						"-lowCut' class='strip-button-preamp strip-button-preamp-disabled strip-button-preamp-2lines' style='font-size: calc(var(--strip-button-width) / 4.8);'>";
					szPage += "";
					szPage += "</div>";

					///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Cut
					szPage +=
						"<div id='" +
						szPreampId +
						"-cut' class='strip-button-preamp " +
						(bNeumannEdition
							? "strip-button-preamp-disabled"
							: "strip-button-preamp-cut-disabled") +
						"'>";
					szPage += bNeumannEdition ? "CUT" : "";
					szPage += "</div>";

					///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Lock
					szPage +=
						"<div id='" +
						szPreampId +
						"-lock' class='strip-button-preamp strip-button-preamp-disabled strip-button-preamp-lock-disabled'>";
					szPage += "";
					szPage += "</div>";

					///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Group
					var nCurrentGroupID = GetPreampGroupID(
						jsMixer.inputs[visibleStrips[i]].module_id,
						jsMixer.inputs[visibleStrips[i]].channel_id
					);

					var szText = bNeumannEdition ? "PLG" : "GRP";
					if (nCurrentGroupID != -1)
						szText += " " + (nCurrentGroupID + 1);

					szPage +=
						"<div id='" +
						szPreampId +
						"-group' class='strip-button-preamp " +
						(nCurrentGroupID == -1
							? ""
							: "strip-button-preamp-checked") +
						"' style='" +
						(nCurrentGroupID != -1
							? " background-color: " +
							  g_tPreampGroupColor[nCurrentGroupID] +
							  ";" +
							  (bNeumannEdition
									? " border-color: " +
									  g_tPreampGroupColor[nCurrentGroupID] +
									  ";"
									: "") +
							  ""
							: "") +
						(bNeumannEdition
							? ""
							: "font-size: calc(var(--strip-button-width) / 3.6)") +
						"'>";
					szPage += szText;
					szPage += "</div>";

					if (bNeumannEdition)
						szPage +=
							"<div id='" +
							szPreampId +
							"-group-line' class='strip-preamp-group-line' style='background-color: " +
							(nCurrentGroupID != -1
								? g_tPreampGroupColor[nCurrentGroupID]
								: "transparent") +
							";'></div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Gain
					szPage +=
						"<div id='" +
						szPreampId +
						"-gain-rotary' class='strip-send-rotary'>";

					if (bNeumannEdition)
						szPage +=
							"<canvas id='neumann-" +
							szPreampId +
							"-gain-rotary-canvas' width='" +
							g_nStripsWidth +
							"' height='" +
							g_nStripsWidth +
							"' class='strip-send-rotary-canvas' style='top: -5%;'></canvas>";

					szPage +=
						"<canvas id='" +
						szPreampId +
						"-gain-rotary-canvas' width='" +
						g_nStripsWidth +
						"' height='" +
						g_nStripsWidth +
						"' class='strip-send-rotary-canvas'>";
					szPage += "</canvas>";

					szPage +=
						"<div id='" +
						szPreampId +
						"-gain-rotary-title' class='strip-send-rotary-title' style='color: #bbbbbb;'>";
					szPage += bNeumannEdition ? "GAIN" : "Gain";
					szPage += "</div>";

					szPage +=
						"<div id='" +
						szPreampId +
						"-gain-rotary-value' class='strip-send-rotary-value'>";
					szPage += "0.0";
					szPage += "</div>";

					szPage += "</div>";

					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Meter Section
					szPage +=
						"<div id='" +
						szStripID +
						"-preamp-meter-section' class='preamp-meter-section'>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Overload
					szPage +=
						"<div id='" +
						szPreampId +
						"-clip' class='preamp-clip'>";
					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Meter
					szPage +=
						"<div id='" +
						szPreampId +
						"-meter' class='preamp-meter' style='height: var(--strip-preamp-meter-height);'>";
					szPage +=
						"<div id='" +
						szPreampId +
						"-meter-low' class='preamp-meter-segment preamp-meter-low'>";
					szPage += "</div>";
					szPage +=
						"<div id='" +
						szPreampId +
						"-meter-alignment' class='preamp-meter-segment preamp-meter-alignment'>";
					szPage += "</div>";
					szPage +=
						"<div id='" +
						szPreampId +
						"-meter-hot' class='preamp-meter-segment preamp-meter-hot'>";
					szPage += "</div>";

					szPage +=
						"<div id='" +
						szPreampId +
						"-meter-mask' class='preamp-meter preamp-meter-mask' style='height: calc(var(--" +
						szPreampId +
						"-meter));'>";

					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: var(--preamp-meter-scale-number-top0)'></div>";
					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: var(--preamp-meter-scale-number-top6)'></div>";
					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: var(--preamp-meter-scale-number-top12);'></div>";
					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: var(--preamp-meter-scale-number-top18);'></div>";
					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: var(--preamp-meter-scale-number-top36);'></div>";
					szPage +=
						"<div class='preamp-meter-scale-tic' style='top: calc(var(--preamp-meter-scale-number-top72) - 1px);'></div>";

					szPage += "</div>";

					szPage += "</div>";

					r.style.setProperty(
						"--" + szPreampId + "-meter-last",
						MM_MUTE_DB
					);
					r.style.setProperty(
						"--" + szPreampId + "-meter",
						"100000px"
					);

					szPage += "</div>";

					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// Scale
					szPage +=
						"<div id='" +
						szStripID +
						"-preamp-meter-scale' class='preamp-meter-scale'>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top0)'>";
					szPage += "&nbsp;" + (bDXDDSDMode ? "6" : "0");
					szPage += "</div>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top6)'>";
					szPage += "&nbsp;" + (bDXDDSDMode ? "0" : "6");
					szPage += "</div>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top12);'>";
					szPage += bDXDDSDMode ? "6" : "12";
					szPage += "</div>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top18);'>";
					szPage += "18";
					szPage += "</div>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top36);'>";
					szPage += "36";
					szPage += "</div>";

					szPage +=
						"<div class='preamp-meter-scale-numbers' style='top: var(--preamp-meter-scale-number-top72);'>";
					szPage += "72";
					szPage += "</div>";

					szPage += "</div>";
				}

				szPage += "</div>";
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Send Rotaries
		var bTalkStrip =
			jsMixer.strips[visibleStrips[i]].type == ST_LOCAL_TALK_MIC ||
			jsMixer.strips[visibleStrips[i]].type == ST_PEERED_TALK_MIC;
		if (g_bShowSendRotaries || bNeumannEdition) {
			if (
				bNeumannEdition &&
				(jsMixer.inputs[visibleStrips[i]].analog ||
					jsMixer.inputs[visibleStrips[i]].type == IT_LOCAL_ADAT ||
					jsMixer.inputs[visibleStrips[i]].type == IT_LOCAL_DANTE ||
					bTalkStrip) &&
				visibleStripsGroup[i] == -1
			) {
				szPage +=
					"<div class='strip-neumann-buttons-container' style='top: calc(var(--strip-pan-height) + var(--strip-preamp-section-height)" +
					(g_bDisplayPreamps
						? " + var(--strip-buttons-gap-height) * 3"
						: " + var(--strip-buttons-gap-height) * 1.5") +
					");'>";

				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				// Preamp
				/*szPage += "<div id='" + szStripID + "-preamp' class='strip-button strip-neumann-button-text strip-button-text-color strip-neumann-button" + (jsMixer.inputs[visibleStrips[i]].type == IT_LOCAL_ADAT ? " strip-button-disabled" : "") + "'>";

								            szPage += "<div class='strip-neumann-button-text-vcenter-2-lines'>";
								                szPage += "PRE\nAMP";
								            szPage += "</div>";

                                        szPage += "</div>";*/

				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				// EQ
				szPage +=
					"<div id='" +
					szStripID +
					"-eq' class='strip-button strip-button-text strip-button-text-color strip-neumann-button'>";

				szPage += "<div class='strip-button-text-vcenter'>";
				szPage += "EQ";
				szPage += "</div>";

				szPage += "</div>";

				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				// DYN
				szPage +=
					"<div id='" +
					szStripID +
					"-dynamics' class='strip-button strip-button-text strip-button-text-color strip-neumann-button'>";

				szPage += "<div class='strip-button-text-vcenter'>";
				szPage += "DYN";
				szPage += "</div>";

				szPage += "</div>";

				szPage += "</div>";
			}

			switch (g_nCurrentBusID) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6: {
					if (
						visibleStripsGroup[i] != -1 ||
						jsMixer.strips[visibleStrips[i]].type == ST_MUSIC_INPUT
					) {
						for (
							var j = FIRST_SEND_ROTARY_ID();
							j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES();
							j++
						) {
							////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							// Send Rotary
							szPage +=
								"<div id='" +
								szStripID +
								"-send" +
								j +
								"-rotary' class='strip-send-rotary' style='top: calc(var(--strip-pan-height) + var(--strip-preamp-section-height)" +
								(g_bDisplayPreamps
									? " + var(--strip-buttons-gap-height) * 2.5"
									: " + var(--strip-buttons-gap-height)") +
								" + var(--strip-send" +
								j +
								"-rotary-top)); height: var(--strip-send" +
								j +
								"-rotary-height);'>";

							if (bNeumannEdition)
								szPage +=
									"<canvas id='neumann-" +
									szStripID +
									"-send" +
									j +
									"-rotary-canvas' width='" +
									g_nStripsWidth +
									"' height='" +
									g_nStripsWidth +
									"' class='strip-send-rotary-canvas' style='top: -5%;'></canvas>";

							szPage +=
								"<canvas id='" +
								szStripID +
								"-send" +
								j +
								"-rotary-canvas' width='" +
								g_nStripsWidth +
								"' height='" +
								g_nStripsWidth +
								"' class='strip-send-rotary-canvas'>";
							szPage += "</canvas>";

							szPage +=
								"<div id='" +
								szStripID +
								"-send" +
								j +
								"-rotary-title' class='strip-send-rotary-title'>";
							if (j == MM_ID_REVERB_BUS) {
								szPage += "REV";
							} else if (j == MM_ID_DYNAMICS_BUS) {
								szPage += "DYN";
							} else {
								szPage += jsMixer.busses[j].name;
							}
							szPage += "</div>";

							szPage +=
								"<div id='" +
								szStripID +
								"-send" +
								j +
								"-rotary-value' class='strip-send-rotary-value'>";
							szPage += "0.0";
							szPage += "</div>";

							szPage += "</div>";
						}
					}
				}
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Rotary for Cue returns and Talks
		if (
			jsMixer.strips[visibleStrips[i]].type == ST_CUE_RETURN ||
			bTalkStrip
		) {
			var szTop =
				"var(--strip-pan-height) + var(--strip-preamp-section-height)" +
				(g_bDisplayPreamps
					? " + var(--strip-buttons-gap-height) * 2.5"
					: " + var(--strip-buttons-gap-height)") +
				(bNeumannEdition
					? " + ((var(--strip-width) * 5 / 6 + var(--elements-border-width) * 2) * 2 + var(--strip-buttons-gap-height) * 2) * var(--display-neumann-buttons)"
					: "");

			szPage +=
				"<div id='" +
				szStripSendID +
				"-rotary' class='strip-send-rotary' style='top: calc(" +
				szTop +
				" + 3px); height: var(--strip-send" +
				g_nCurrentBusID +
				"-rotary-height);'>";

			if (bNeumannEdition)
				szPage +=
					"<canvas id='neumann-" +
					szStripSendID +
					"-rotary-canvas' width='" +
					g_nStripsWidth +
					"' height='" +
					g_nStripsWidth +
					"' class='strip-send-rotary-canvas' style='top: -5%;'></canvas>";

			szPage +=
				"<canvas id='" +
				szStripSendID +
				"-rotary-canvas' width='" +
				g_nStripsWidth +
				"' height='" +
				g_nStripsWidth +
				"' class='strip-send-rotary-canvas'>";
			szPage += "</canvas>";

			szPage +=
				"<div id='" +
				szStripSendID +
				"-rotary-title' class='strip-send-rotary-title'>";

			if (bTalkStrip) szPage += bNeumannEdition ? "TALK" : "Talk";

			szPage += "</div>";

			szPage +=
				"<div id='" +
				szStripSendID +
				"-rotary-value' class='strip-send-rotary-value'>";
			szPage += "</div>";

			szPage += "</div>";

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Preamp Peak
			if (jsMixer.inputs[visibleStrips[i]].analog && bTalkStrip) {
				szPage +=
					"<div id='" +
					szStripID +
					"-preamp-peak' class='strip-preamp-peak' style='top: calc(" +
					szTop +
					");'>";
				szPage += "</div>";
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Fader Section
		szPage +=
			"<div id='" +
			szStripID +
			"-fader-section' class='strip-fader-section'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Fader for Music Inputs, DAW Inputs or Effects return
		if (
			jsMixer.strips[visibleStrips[i]].type == ST_MUSIC_INPUT ||
			jsMixer.strips[visibleStrips[i]].type == ST_DAW_INPUT ||
			jsMixer.strips[visibleStrips[i]].type == ST_EFFECT_RETURN
		) {
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Preamp Peak
			if (jsMixer.inputs[visibleStrips[i]].analog) {
				szPage +=
					"<div id='" +
					szStripID +
					"-preamp-peak' class='strip-preamp-peak'>";
				szPage += "</div>";
			}

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Gain Value
			szPage +=
				"<div id='" +
				szStripSendID +
				"-gain-value' class='strip-gain-value strip-button-text-color'>";
			szPage += "</div>";

			szPage +=
				"<div id='" +
				szStripSendID +
				"-gain-value-dB' class='strip-gain-value-dB strip-button-text-color'>";
			szPage += "dB";
			szPage += "</div>";

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Fader
			szPage +=
				"<div id='" + szStripSendID + "-fader' class='strip-fader'>";

			szPage +=
				"<div id='" +
				szStripSendID +
				"-fader-slider' class='strip-fader-slider' " +
				(bNeumannEdition
					? ""
					: "style='top: calc(var(--" +
					  szStripSendID +
					  "-fader-slider-knob-top) + var(--strip-fader-knob-height) * 2); height: calc(var(--strip-scale-height) - var(--" +
					  szStripSendID +
					  "-fader-slider-knob-top));'") +
				">";
			szPage += "</div>";

			if (bNeumannEdition) {
				szPage +=
					"<div id='" +
					szStripSendID +
					"-fader-slider-knob' class='strip-fader-slider-knob' style='top: calc(var(--" +
					szStripSendID +
					"-fader-slider-knob-top) - var(--strip-fader-knob-height) - 1px);'>";
				szPage += "</div>";

				szPage +=
					"<div id='" +
					szStripSendID +
					"-fader-slider-knob-2' class='strip-fader-slider-knob' style='top: calc(var(--" +
					szStripSendID +
					"-fader-slider-knob-top) + var(--strip-fader-knob-height) + 1px);'>";
				szPage += "</div>";

				szPage +=
					"<div id='" +
					szStripSendID +
					"-fader-slider-knob-3' class='strip-fader-slider-knob-line' style='top: calc(var(--" +
					szStripSendID +
					"-fader-slider-knob-top) + var(--strip-fader-knob-height) / 2 + 2px);'>";
				szPage += "</div>";
			} else {
				szPage +=
					"<div id='" +
					szStripSendID +
					"-fader-slider-knob' class='strip-fader-slider-knob' style='top: var(--" +
					szStripSendID +
					"-fader-slider-knob-top);'>";
				szPage += "</div>";
			}

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			szPage +=
				"<div id='" +
				szStripID +
				"-fader-scale' class='strip-fader-scale'>";

			for (var s = 0; s < g_nNbScaleSteps; s++) {
				if (bNeumannEdition && (s == 3 || s == 5)) continue;

				if (s % 4) {
					szPage +=
						"<div class='strip-fader-scale-step' style='top: var(--strip-scale-top" +
						s +
						");'>";
					szPage += "</div>";
				}
			}

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top0);'>";
			szPage += "6";
			szPage += "</div>";

			if (bNeumannEdition) {
				szPage +=
					"<div class='strip-fader-scale-numbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) - var(--strip-scale-number-top1) / 4);'>";
				szPage += "+";
				szPage += "</div>";
			}

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top1);'>";
			szPage += "0";
			szPage += "</div>";

			if (bNeumannEdition) {
				szPage +=
					"<div class='strip-fader-scale-numbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) + var(--strip-scale-number-top1) / 4);'>";
				szPage += "-";
				szPage += "</div>";
			}

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top2);'>";
			szPage += "6";
			szPage += "</div>";

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top3);'>";
			szPage += "18";
			szPage += "</div>";

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top4);'>";
			szPage += "30";
			szPage += "</div>";

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top5);'>";
			szPage += "90";
			szPage += "</div>";

			szPage +=
				"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top6);'>";
			szPage += "oo";
			szPage += "</div>";

			szPage += "</div>";

			szPage += "</div>";
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Buttons
		szPage +=
			"<div id='" +
			szStripID +
			"-buttons' class='strip-buttons-container";

		// Talk Strips
		if (bTalkStrip) {
			szPage += " strip-buttons-talk-container";
		}
		// Cue Return Strips
		else if (jsMixer.strips[visibleStrips[i]].type == ST_CUE_RETURN) {
			szPage += " strip-buttons-cue-container";
		}

		szPage += "'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		szPage += "<div class='strip-button-gap'>";
		szPage += "</div>";
		szPage += "<div class='strip-button-gap'>";
		szPage += "</div>";
		szPage +=
			"<div class='strip-button-gap' style='background-color: var(--strip-background-color);'>";
		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Hidden Fader indicator
		szPage +=
			"<div id='" +
			szStripSendID +
			"-fader-hidden' class='strip-button-fader-hidden'>";
		szPage += "";
		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		szPage += "<div class='strip-buttons-container-mask'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Talk Strips Buttons
		if (bTalkStrip) {
			// No specific buttons for Talk Input
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Cue Return Strips Buttons
		else if (jsMixer.strips[visibleStrips[i]].type == ST_CUE_RETURN) {
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// M > C
			szPage +=
				"<div id='" +
				szStripSendID +
				"-mon-to-cue' class='strip-button strip-button-text strip-button-text-color strip-button-mon-to-cue'>";

			szPage += "<div class='strip-button-text-vcenter'>";
			szPage += "M > C";
			szPage += "</div>";

			szPage += "</div>";

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Talk
			szPage +=
				"<div id='" +
				szStripSendID +
				"-talk-to-cue' class='strip-button strip-button-text strip-button-text-color strip-button-talk-to-cue'>";

			szPage += "<div class='strip-button-text-vcenter'>";
			szPage += "TALK";
			szPage += "</div>";

			szPage += "</div>";

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// C > M
			szPage +=
				"<div id='" +
				szStripSendID +
				"-cue-to-mon' class='strip-button strip-button-text strip-button-text-color strip-button-cue-to-mon'>";

			szPage += "<div class='strip-button-text-vcenter'>";
			szPage += "C > M";
			szPage += "</div>";

			szPage += "</div>";
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Other Strips Solo/Mute Buttons
		else {
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Solo
			szPage +=
				"<div id='" +
				szStripSendID +
				"-solo' class='strip-button strip-button-text strip-button-text-color strip-button-solo'>";

			szPage += "<div class='strip-button-solo-text-vcenter'>";
			szPage += "SOLO";
			szPage += "</div>";

			szPage += "</div>";

			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// Mute
			szPage +=
				"<div id='" +
				szStripSendID +
				"-mute' class='strip-button strip-button-text strip-button-text-color strip-button-mute'>";

			szPage += "<div class='strip-button-mute-text-vcenter'>";
			szPage += "MUTE";
			szPage += "</div>";

			szPage += "</div>";
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Common Strip Button Foot
		szPage +=
			"<div id='" +
			szStripID +
			"-button-foot' class='strip-button " +
			(bNeumannEdition ? "neumann-" : "") +
			"strip-button-text-color'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 1st Row / 1st Col
		szPage +=
			"<div class='strip-button-text strip-button-foot-1st-row strip-button-foot-1st-row-1st-col'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// EQ
		szPage +=
			"<div id='" +
			szStripID +
			"-input-eq' class='strip-button-foot-1st-row-1st-col-eq'>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 1st Row / 2nd Col
		szPage +=
			"<div class='strip-button-text strip-button-foot-1st-row strip-button-foot-1st-row-2nd-col'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Number / Talk Input Indicator
		szPage +=
			"<div id='" +
			szStripID +
			"-number' class='strip-button-foot-1st-row-2nd-col-number'>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 1st Row / 3rd Col
		szPage +=
			"<div class='strip-button-text strip-button-foot-1st-row strip-button-foot-1st-row-3rd-col'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Dynamics
		szPage +=
			"<div id='" +
			szStripID +
			"-input-dyn' class='strip-button-foot-1st-row-3rd-col-dyn'>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 2nd Row
		szPage +=
			"<div id='" +
			szStripID +
			"-button-foot-2nd-row-1st-2nd-col' class='strip-button-text strip-button-foot-2nd-row strip-button-foot-2nd-row-1st-2nd-col'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Self Cue
		szPage += "<div class=''>";

		szPage +=
			"<div id='" +
			szStripID +
			"-self-cue' class='strip-button-foot-2nd-row-text'>";
		szPage += "</div>";

		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 2nd Row / 3rd Col
		szPage +=
			"<div id='" +
			szStripID +
			"-button-foot-2nd-row-3rd-col' class='strip-button-text strip-button-foot-2nd-row strip-button-foot-2nd-row-3rd-col'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Deesser
		szPage +=
			"<div id='" +
			szStripID +
			"-input-dsr' class='strip-button-foot-2nd-row-3rd-col-dsr'>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Button Foot 3rd Row
		// Strip Name
		szPage +=
			"<div id='" +
			szStripID +
			"-name' class='strip-button-text strip-button-foot-3rd-row'>";
		szPage += "</div>";

		szPage += "</div>";

		szPage += "</div>";

		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strip Meter Section
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-section' class='strip-meter-section'>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Overload
		szPage +=
			"<div id='" + szStripID + "-overload' class='strip-overload'>";
		szPage += "</div>";
		szPage +=
			"<div id='" +
			szStripID +
			"-overload-2' class='strip-overload strip-overload-2'>";
		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Meter
		szPage += "<div id='" + szStripID + "-meter' class='strip-meter'>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-low' class='strip-meter-segment strip-meter-low'>";
		szPage += "</div>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-mid' class='strip-meter-segment strip-meter-mid'>";
		szPage += "</div>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-over' class='strip-meter-segment strip-meter-over'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szStripID +
			"-meter-mask' class='strip-meter strip-meter-mask' style='height: calc(var(--" +
			szStripID +
			"-meter))'>";
		szPage += "</div>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szStripID +
			"-meter-2' class='strip-meter strip-meter-2'>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-low' class='strip-meter-segment strip-meter-low'>";
		szPage += "</div>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-mid' class='strip-meter-segment strip-meter-mid'>";
		szPage += "</div>";
		szPage +=
			"<div id='" +
			szStripID +
			"-meter-over' class='strip-meter-segment strip-meter-over'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szStripID +
			"-meter-mask-2' class='strip-meter strip-meter-mask' style='height: calc(var(--" +
			szStripID +
			"-meter-2))'>";
		szPage += "</div>";
		szPage += "</div>";

		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strips separator
		szPage +=
			"<div id='" + szStripID + "-separator' class='strips-separator'>";
		szPage += "</div>";

		// Strip
		szPage += "</div>";

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Strips link
		szPage +=
			"<div id='" +
			szStripID +
			"-link' class='strips-link' style='left: calc(var(--strip-" +
			(i + 1) +
			"-left) - var(--strip-meter-section-width) - var(--elements-border-width) * " +
			(bNeumannEdition ? "5" : "4.5") +
			");'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szStripID +
			"-link-border' class='strips-link-border' style='left: calc(var(--strip-" +
			(i + 1) +
			"-left) - var(--strip-meter-section-width) - var(--elements-border-width) * " +
			(bNeumannEdition ? "5" : "4.5") +
			");'>";
		szPage += "</div>";

		if (bNeumannEdition) {
			szPage +=
				"<div id='" +
				szStripID +
				"-pan-link' class='strips-pan-link' style='left: calc(var(--strip-" +
				(i + 1) +
				"-left) - var(--strip-meter-section-width) - var(--elements-border-width) * " +
				(bNeumannEdition ? "5" : "4.5") +
				");'>";
			szPage += "</div>";
		}

		szPage += "</li>";
	}

	szPage += "</ul>";

	// Strips
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Masters
	szPage += "<div id='masters' class='masters'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master
	szPage += "<div class='master'>";

	var szBusID = "bus" + g_nCurrentBusID;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master Gain
	szPage +=
		"<div id='" +
		szBusID +
		"-mastergain' class='master-gain master-gain-text-color'>";

	szPage +=
		"<div id='" + szBusID + "-mastergain-value' class='master-gain-text'>";
	szPage += "</div>";

	szPage += "<div class='master-gain-text-dB'>";
	szPage += "dB";
	szPage += "</div>";

	szPage +=
		"<div id='" +
		szBusID +
		"-mastergain-decimal' class='master-gain-text-decimal'>";
	szPage += "</div>";

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master Left Section
	szPage += "<div id='master-left' class='master-left'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Bus Selector/Name
	szPage +=
		"<div id='" +
		szBusID +
		"-selector' class='master-button master-button-text master-button-text-color'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// EQ
	szPage += "<div id='" + szBusID + "-eq' class='master-button-eq'>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Name
	szPage +=
		"<div id='" +
		szBusID +
		"-name' class='master-button-text-vcenter-1-line master-button-text-color'>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Dynamics
	szPage += "<div id='" + szBusID + "-dyn' class='master-button-dyn'>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SoundID
	if (!bNeumannEdition) {
		szPage +=
			"<div id='" + szBusID + "-SoundID' class='master-button-SoundID'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szBusID +
			"-SoundID-TargetMode' class='master-button-SoundID-TargetMode'>";
		szPage += "</div>";
	}

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Send Rotaries toggle
	if (g_bShowSendRotaries && !bNeumannEdition) {
		switch (g_nCurrentBusID) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6: {
				szPage +=
					"<div id='" +
					szBusID +
					"-send-rotaries-page' class='master-button master-button-text master-button-text-color'>";

				szPage += "<div class='master-button-text-vcenter-2-lines'>";
				szPage += "FLIP\nSEND";
				szPage += "</div>";

				szPage += "</div>";
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DIM / TALK / EDIT
	switch (g_nCurrentBusID) {
		case 0:
		case 1: {
			szPage +=
				"<div id='" +
				szBusID +
				"-dim' class='master-button master-button-text master-button-text-color'>";

			szPage += "<div class='master-button-text-vcenter-1-line'>";
			szPage += "DIM";
			szPage += "</div>";

			szPage += "</div>";

			break;
		}

		case 2:
		case 3:
		case 4:
		case 5:
		case 6: {
			if (
				jsMixer.busses[g_nCurrentBusID].cue_mode == 1 ||
				bNeumannEdition
			) {
				szPage +=
					"<div id='" +
					szBusID +
					"-dim' class='master-button master-button-text master-button-text-color'>";

				szPage += "<div class='master-button-text-vcenter-1-line'>";
				szPage += "DIM";
				szPage += "</div>";

				szPage += "</div>";
			} else if (jsMixer.busses[g_nCurrentBusID].cue_mode == 0) {
				szPage +=
					"<div id='" +
					szBusID +
					"-talk' class='master-button master-button-text master-button-text-color'>";

				szPage += "<div class='master-button-text-vcenter-1-line'>";
				szPage += "TALK";
				szPage += "</div>";

				szPage += "</div>";
			}

			break;
		}

		case 7:
		case 8: {
			szPage +=
				"<div id='" +
				szBusID +
				"-edit' class='master-button master-button-text master-button-text-color'>";

			szPage += "<div class='master-button-text-vcenter-1-line'>";
			szPage += "EDIT";
			szPage += "</div>";

			szPage += "</div>";

			break;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// MONO / C>M / SNAP
	switch (g_nCurrentBusID) {
		case 0:
		case 1: {
			szPage +=
				"<div id='" +
				szBusID +
				"-downmix' class='master-button master-button-text master-button-text-color'>";

			szPage += "<div class='master-button-text-vcenter-1-line'>";
			szPage += "MONO";
			szPage += "</div>";

			szPage += "</div>";

			break;
		}

		case 2:
		case 3:
		case 4:
		case 5:
		case 6: {
			if (
				jsMixer.busses[g_nCurrentBusID].cue_mode == 1 ||
				bNeumannEdition
			) {
				szPage +=
					"<div id='" +
					szBusID +
					"-downmix' class='master-button master-button-text master-button-text-color'>";

				szPage += "<div class='master-button-text-vcenter-1-line'>";
				szPage += "MONO";
				szPage += "</div>";

				szPage += "</div>";
			} else if (jsMixer.busses[g_nCurrentBusID].cue_mode == 0) {
				szPage +=
					"<div id='" +
					szBusID +
					"-cue-to-mon' class='master-button master-button-text master-button-text-color'>";

				szPage += "<div class='master-button-text-vcenter-1-line'>";
				szPage += "C > M";
				szPage += "</div>";

				szPage += "</div>";
			}

			break;
		}

		case 7:
		case 8: {
			szPage +=
				"<div id='" +
				szBusID +
				"-snap' class='master-button master-button-text master-button-text-color'>";

			szPage += "<div class='master-button-text-vcenter-1-line'>";
			szPage += "SNAP";
			szPage += "</div>";

			szPage += "</div>";

			break;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SOLO CLEAR
	szPage +=
		"<div id='" +
		szBusID +
		"-solo-clear' class='master-button master-button-text master-button-text-color'>";

	szPage += "<div class='master-button-text-vcenter-2-lines'>";
	szPage += "SOLO\nCLEAR";
	szPage += "</div>";

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// C>M CLEAR / M > C ALL / TALK ALL
	var bDoIt = false;
	switch (g_nCurrentBusID) {
		case 0:
		case 1: {
			bDoIt = true;
			break;
		}

		case 2:
		case 3:
		case 4:
		case 5:
		case 6: {
			if (
				jsMixer.busses[g_nCurrentBusID].cue_mode == 1 &&
				!bNeumannEdition
			) {
				bDoIt = true;
			}
			break;
		}
	}

	if (bDoIt) {
		szPage +=
			"<div id='" +
			szBusID +
			"-cue-to-monitoring-clear' class='master-button master-button-text master-button-text-color'>";

		szPage += "<div class='master-button-text-vcenter-2-lines'>";
		szPage += "C > M\nCLEAR";
		szPage += "</div>";

		szPage += "</div>";

		szPage +=
			"<div id='" +
			szBusID +
			"-mon-to-cue-all' class='master-button master-button-text master-button-text-color'>";

		szPage +=
			"<div id='" +
			szBusID +
			"-mon-to-cue-all-text' class='master-button-text-vcenter-2-lines'>";
		szPage += "M > C\nALL";
		szPage += "</div>";

		szPage += "</div>";

		szPage +=
			"<div id='" +
			szBusID +
			"-talk-all' class='master-button master-button-text master-button-text-color'>";

		szPage +=
			"<div id='" +
			szBusID +
			"-talk-all-text' class='master-button-text-vcenter-2-lines'>";
		szPage += "TALK\nALL";
		szPage += "</div>";

		szPage += "</div>";
	}
	/*
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					// MENU
					szPage += "<div id='" + szBusID + "-menu' class='master-button master-button-text master-button-text-color'>";

						szPage += "<div class='master-button-text-vcenter-1-line'>";
							szPage += "MENU";
						szPage += "</div>";

					szPage += "</div>";
*/

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Send Master Rotaries
	if (g_bShowSendRotaries) {
		switch (g_nCurrentBusID) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6: {
				if (
					visibleStripsGroup[i] != -1 ||
					jsMixer.strips[visibleStrips[i]].type == ST_MUSIC_INPUT
				) {
					for (
						var j = MM_ID_FIRST_SEND_BUS;
						j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES();
						j++ //for (var j = FIRST_SEND_ROTARY_ID(); j < FIRST_SEND_ROTARY_ID() + NB_SEND_ROTARIES(); j++)
					) {
						////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						// Send Rotary
						szPage +=
							"<div id='" +
							szBusID +
							"-master" +
							j +
							"-rotary' class='strip-send-rotary' style='left: calc(var(--master-margin-left) + var(--master-left-width) + 20px); top: calc(var(--strip-pan-height) + var(--strip-buttons-gap-height) + var(--strip-send" +
							j +
							"-rotary-top)); height: var(--strip-send" +
							j +
							"-rotary-height);'>";

						if (bNeumannEdition)
							szPage +=
								"<canvas id='neumann-" +
								szBusID +
								"-master" +
								j +
								"-rotary-canvas' width='" +
								g_nStripsWidth +
								"' height='" +
								g_nStripsWidth +
								"' class='strip-send-rotary-canvas' style='top: -5%;'></canvas>";

						szPage +=
							"<canvas id='" +
							szBusID +
							"-master" +
							j +
							"-rotary-canvas' width='" +
							g_nStripsWidth +
							"' height='" +
							g_nStripsWidth +
							"' class='strip-send-rotary-canvas'>";
						szPage += "</canvas>";

						szPage +=
							"<div id='" +
							szBusID +
							"-master" +
							j +
							"-rotary-title' class='strip-send-rotary-title'>";
						if (j == MM_ID_REVERB_BUS) {
							szPage += "REV";
						} else if (j == MM_ID_DYNAMICS_BUS) {
							szPage += "DYN";
						} else {
							szPage += jsMixer.busses[j].name;
						}
						szPage += "</div>";

						szPage +=
							"<div id='" +
							szBusID +
							"-master" +
							j +
							"-rotary-value' class='strip-send-rotary-value'>";
						szPage += "0.0";
						szPage += "</div>";

						szPage += "</div>";
					}
				}
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master Center Section
	szPage += "<div class='master-center'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Fader
	szPage += "<div id='" + szBusID + "-master-fader' class='master-fader'>";

	szPage +=
		"<div id='" +
		szBusID +
		"-fader-slider' class='master-fader-slider'  " +
		(bNeumannEdition
			? ""
			: "style='top: calc(var(--" +
			  szBusID +
			  "-fader-slider-knob-top) + var(--strip-fader-knob-height) * 2); height: calc(var(--strip-meter-height) - var(--" +
			  szBusID +
			  "-fader-slider-knob-top));'") +
		">";
	szPage += "</div>";

	if (bNeumannEdition) {
		szPage +=
			"<div id='" +
			szBusID +
			"-fader-slider-knob' class='master-fader-slider-knob' style='top: calc(var(--" +
			szBusID +
			"-fader-slider-knob-top) - var(--strip-fader-knob-height) - 1px);'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szBusID +
			"-fader-slider-knob-2' class='master-fader-slider-knob' style='top: calc(var(--" +
			szBusID +
			"-fader-slider-knob-top) + var(--strip-fader-knob-height) + 1px);'>";
		szPage += "</div>";

		szPage +=
			"<div id='" +
			szBusID +
			"-fader-slider-knob-3' class='master-fader-slider-knob-line' style='top: calc(var(--" +
			szBusID +
			"-fader-slider-knob-top) + var(--strip-fader-knob-height) / 2 + 2px);'>";
		szPage += "</div>";
	} else {
		szPage +=
			"<div id='" +
			szBusID +
			"-fader-slider-knob' class='master-fader-slider-knob' style='top: var(--" +
			szBusID +
			"-fader-slider-knob-top);'>";
		szPage += "</div>";
	}

	szPage +=
		"<div id='" + szBusID + "-fader-scale' class='master-fader-scale'>";

	for (var s = 0; s < g_nNbScaleSteps; s++) {
		if (bNeumannEdition && (s == 3 || s == 5)) continue;

		if (s % 4) {
			szPage +=
				"<div class='strip-fader-scale-step' style='top: var(--strip-scale-top" +
				s +
				");'>";
			szPage += "</div>";
		}
	}

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top0);'>";
	szPage += "6";
	szPage += "</div>";

	if (bNeumannEdition) {
		szPage +=
			"<div class='strip-fader-scale-numbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) - var(--strip-scale-number-top1) / 4);'>";
		szPage += "+";
		szPage += "</div>";
	}

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top1);'>";
	szPage += "0";
	szPage += "</div>";

	if (bNeumannEdition) {
		szPage +=
			"<div class='strip-fader-scale-numbers' style='font-size: calc(var(--strip-button-width) / 3.5); top: calc(var(--strip-scale-number-top1) + var(--strip-scale-number-top1) / 4);'>";
		szPage += "-";
		szPage += "</div>";
	}

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top2);'>";
	szPage += "6";
	szPage += "</div>";

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top3);'>";
	szPage += "18";
	szPage += "</div>";

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top4);'>";
	szPage += "30";
	szPage += "</div>";

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top5);'>";
	szPage += "90";
	szPage += "</div>";

	szPage +=
		"<div class='strip-fader-scale-numbers' style='top: var(--strip-scale-number-top6);'>";
	szPage += "oo";
	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Strip Buttons
	szPage +=
		"<div id='master-center-buttons' class='master-center-buttons-container'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	szPage += "<div class='strip-button-gap'>";
	szPage += "</div>";
	szPage += "<div class='strip-button-gap'>";
	szPage += "</div>";
	/*szPage += "<div class='strip-button-gap' style='background-color: var(--strip-background-color);'>";
						szPage += "</div>";*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Hidden Fader indicator
	szPage +=
		"<div id='master-center-buttons-fader-hidden' class='master-center-buttons-fader-hidden'>";
	szPage += "";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	szPage += "<div class='master-center-buttons-container-mask'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Button Foot
	szPage +=
		"<div id='master-center-button-foot' class='master-center-button'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Output Name
	szPage +=
		"<div id='master-center-button-name-line1' class='master-center-button-text master-center-button-text-line1'></div>";
	szPage +=
		"<div id='master-center-button-name-line2' class='master-center-button-text master-center-button-text-line2'></div>";

	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master Right Section
	szPage += "<div class='master-right'>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Overload L
	szPage +=
		"<div id='" +
		szBusID +
		"-overload-left' class='master-overload master-om-left'>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Meter L
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-left' class='master-meter master-om-left' " +
		(bNeumannEdition ? "" : "style='left: 1px;") +
		"'>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-left-low' class='strip-meter-segment strip-meter-low'>";
	szPage += "</div>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-left-mid' class='strip-meter-segment strip-meter-mid'>";
	szPage += "</div>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-left-over' class='strip-meter-segment strip-meter-over'>";
	szPage += "</div>";

	szPage +=
		"<div id='" +
		szBusID +
		"-meter-left-mask' class='strip-meter master-meter-mask' style='height: calc(var(--" +
		szBusID +
		"-meter-left))'>";
	szPage += "</div>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master meter separator
	/*szPage += "<div class='master-meter-separator' style='left: calc(var(--master-overload-width) / 2 - 1px)'>";
					szPage += "</div>";*/

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Overload R
	szPage +=
		"<div id='" +
		szBusID +
		"-overload-right' class='master-overload master-om-right'>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Meter R
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-right' class='master-meter master-om-right'>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-right-low' class='strip-meter-segment strip-meter-low'>";
	szPage += "</div>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-right-mid' class='strip-meter-segment strip-meter-mid'>";
	szPage += "</div>";
	szPage +=
		"<div id='" +
		szBusID +
		"-meter-right-over' class='strip-meter-segment strip-meter-over'>";
	szPage += "</div>";

	szPage +=
		"<div id='" +
		szBusID +
		"-meter-right-mask' class='strip-meter master-meter-mask' style='height: calc(var(--" +
		szBusID +
		"-meter-right))'>";
	szPage += "</div>";
	szPage += "</div>";

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Master meter separator
	szPage +=
		"<div class='master-meter-separator' style='left: calc(var(--master-overload-width) - 1px)'>";
	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	szPage += "</div>";

	eMixerSection.innerHTML = szPage;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	OnMixerResize();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	UpdatePreamps();
	UpdateInputs();
	UpdateDisplayedStrips();
	UpdateGroups();

	// Update EQ Led on Rev/Dyn returns
	UpdateBus(MM_ID_REVERB_BUS);
	UpdateBus(MM_ID_DYNAMICS_BUS);

	UpdateDisplayedBus();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var nStripsScrollerX = 0;
	if (g_isStripsScroller) {
		nStripsScrollerX = g_isStripsScroller.x;
		g_isStripsScroller.destroy();
		g_isStripsScroller = null;
	}

	g_isStripsScroller = new iScroll("strips", {
		hScroll: true,
		vScroll: false,
		bounce: false,
	});

	if (g_nOnRefreshStripsScrollerX != -1) {
		g_isStripsScroller.scrollTo(g_nOnRefreshStripsScrollerX, 0, 0);
	} else {
		g_isStripsScroller.scrollTo(nStripsScrollerX, 0, 0);
	}

	g_isStripsScroller.onUserTouchEnd = function () {
		g_nOnRefreshStripsScrollerX = g_isStripsScroller.x;
		if (g_nOnRefreshStripsScrollerX > 0) {
			g_nOnRefreshStripsScrollerX = 0;
		}
		save_ToCookie(true);
		g_nOnRefreshStripsScrollerX = -1;
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var nSendRotariesScrollerY = 0;
	if (g_isSendRotariesScroller) {
		nSendRotariesScrollerY = g_isSendRotariesScroller.y;
		g_isSendRotariesScroller.destroy();
		g_isSendRotariesScroller = null;
	}

	if (g_bShowSendRotaries) {
		g_isSendRotariesScroller = new iScroll("strips", {
			hScroll: true,
			vScroll: false,
			bounce: false,
		});

		if (g_nOnRefreshSendRotariesScrollerY != -1) {
			g_isSendRotariesScroller.scrollTo(
				g_nOnRefreshSendRotariesScrollerY,
				0,
				0
			);
		} else {
			g_isSendRotariesScroller.scrollTo(nSendRotariesScrollerY, 0, 0);
		}

		g_isSendRotariesScroller.onUserTouchEnd = function () {
			g_nOnRefreshSendRotariesScrollerY = g_isSendRotariesScroller.y;
			if (g_nOnRefreshSendRotariesScrollerY > 0) {
				g_nOnRefreshSendRotariesScrollerY = 0;
			}
			save_ToCookie(true);
			g_nOnRefreshSendRotariesScrollerY = -1;
		};
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	AddEvents(visibleStrips, visibleStripsGroup, visibleStripsInput);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var eTitle = document.getElementById("centralSection");
	if (eTitle) {
		if (RavennaDeviceCache && RavennaDeviceCache.document()) {
			jsMusicEngine = RavennaDeviceCache.document();
		}

		if (jsMusicEngine && jsMusicEngine.identity) {
			g_szSerialNumber = jsMusicEngine.identity.serial;
			g_szSerialNumber = g_szSerialNumber.replace("A", "");

			var szBusName;
			var jsBus = GetBusJSON(g_nCurrentBusID);
			if (jsBus) {
				szBusName = jsBus.name;
			}

			var szTitle =
				(bNeumannEdition ? "MT 48 " : "ANUBIS ") +
				g_szSerialNumber +
				" - " +
				szBusName;

			if (jsBus.type == BT_CUE) {
				if (bNeumannEdition) {
					if (
						(g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 1 &&
							jsMixer.settings.mix2_follow_mix1) ||
						(g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 2 &&
							jsMixer.settings.mix3_follow_mix1) ||
						(g_nCurrentBusID == MM_NEUMANN_ID_FIRST_MIX_BUS + 3 &&
							jsMixer.settings.mix4_follow_mix1)
					) {
						var jsMix1Bus = GetBusJSON(MM_NEUMANN_ID_FIRST_MIX_BUS);
						if (jsMix1Bus) {
							szTitle += " (" + jsMix1Bus.name + ")";
						}
					}
				} else if (jsBus.cue_mode == CM_MIXALT) {
					szTitle += " (M-ALT)";
				}
			}

			eTitle.innerText = szTitle;
		}

		document.title = bNeumannEdition ? "Neumann MT 48" : "ANUBIS+MUSIC";
	}

	_updateView();

	return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nOnTouchStripsScrollerX = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddScrollerMoveCancelFaderEvent() {
	g_isStripsScroller.onUserTouchStart = function () {
		g_nOnTouchStripsScrollerX = g_isStripsScroller.x;
	};

	g_isStripsScroller.onUserTouchMove = function () {
		if (Math.abs(g_nOnTouchStripsScrollerX - g_isStripsScroller.x) > 3) {
			FaderMouseUp(true);

			RemoveScrollerMoveCancelFaderEvent();
		}
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddScrollerMoveCancelFaderGroupEvent() {
	g_isStripsScroller.onUserTouchStart = function () {
		g_nOnTouchStripsScrollerX = g_isStripsScroller.x;
	};

	g_isStripsScroller.onUserTouchMove = function () {
		if (Math.abs(g_nOnTouchStripsScrollerX - g_isStripsScroller.x) > 5) {
			FaderGroupMouseUp(true);

			RemoveScrollerMoveCancelFaderEvent();
		}
	};
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RemoveScrollerMoveCancelFaderEvent() {
	g_isStripsScroller.onUserTouchStart = function () {};
	g_isStripsScroller.onUserTouchMove = function () {};
}
