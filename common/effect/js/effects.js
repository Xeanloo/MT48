////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Anubis Effects
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// eRotaryRingMode
const ERRM_WRAP       = 0;
const ERRM_SINGLE_DOT = 1;
const ERRM_BOOST_CUT  = 2;
const ERRM_SPREAD     = 3;
const ERRM_SPREAD_INV = 4;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EQ_COLOR = "";

const EQ_T_BAND_COLORS =        ["#f39308", "#90c34a", "#2591ed", "#9d2caf", "#f14a42", "#ffe73e", "#0bb8c6", "#673eb8", "#fec010", "#58b154", "#4058ba", "#d51b60"];
const EQ_T_BAND_COLORS_BLEND =  ["#7e4e08", "#4d662a", "#174d7b", "#531b5c", "#7e2723", "#8c7f22", "#054e54", "#271846", "#8c6a09", "#20401f", "#1a2349", "#630d2d"];

const NEUMANN_EQ_T_BAND_COLORS =        ["#cc5f39", "#5ea24a", "#266496", "#80487a", "#f14a42", "#ffe73e", "#0bb8c6", "#673eb8", "#fec010", "#58b154", "#4058ba", "#d51b60"];
const NEUMANN_EQ_T_BAND_COLORS_BLEND =  ["#703926", "#395b2f", "#1d3c55", "#4a2e47", "#7e2723", "#8c7f22", "#054e54", "#271846", "#8c6a09", "#20401f", "#1a2349", "#630d2d"];

const EQ_T_TYPE = ["Low Cut", "Low Shelf", "Peak", "High Shelf", "High Cut"];
const NEUMANN_EQ_T_TYPE = ["Low\nCut", "Low\nShelf", "Peak", "High\nShelf", "High\nCut"];

const EQ_TYPE_LOCUT   = 0;
const EQ_TYPE_LOSHELF = 1;
const EQ_TYPE_PEAK    = 2;
const EQ_TYPE_HISHELF = 3;
const EQ_TYPE_HICUT   = 4;

const EQ_FREQUENCY_MIN = 20;
const EQ_FREQUENCY_MAX = 20000;

const EQ_Q_MIN = 1;
const EQ_Q_MAX = 100;

const EQ_T_FREQUENCY_AXE_VALUES = ["32", "63", "125", "250", "500", "1k", "2k", "4k", "8k", "16k"];

const EQ_CURVE_FREQUENCY_MIN = 16;
const EQ_CURVE_FREQUENCY_MAX = 32000;

const EQ_NB_BANDS = 4;
const EQ_MAX_NB_BANKS = 3;
const EQ_BAND_COUNT_BY_GROUP = 4;


var g_nControledEQBandID = 0;
var g_bAllBandBypass = false;

var g_bControledEQBallMouseDown = false;
var g_bControledEQBallMouseMoving = false;
var g_nControledEQMouseDownFreqValue = 0;
var g_nControledEQMouseDownGainValue = 0;
var g_nControledEQMouseDownTypeValue = 0;
var g_nControledEQMouseDownClickOffsetX = 0;

var g_nEQBallSize = 0;
var g_tEQBallPointsX = [];
var g_tEQBallPointsY = [];

// Max 12 Bands
var g_tCurvesPointsX = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var g_tCurvesPointsY = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

var g_tResultCurvePointsY = [];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var REVERB_COLOR = "";

const REVERB_FREQUENCY_MIN = 10;
const REVERB_FREQUENCY_MAX = 20000;

var EVENTIDE_BLACKHOLE_COLOR = "";


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DYNAMICS_COLOR = "";

const DYNAMICS_T_BANDS = ["GATE", "EXP", "COMP", "LIM"];

var g_nControledDynamicsBandID = 2;

var g_tDynamicsThreshold = [];
var g_tDynamicsThresholdMin = [-1440, -1440, -960, -1440];
var g_tDynamicsThresholdMax = [0, 0, 0, 0];
var g_tDynamicsThresholdStep = [1, 1, 1, 1];

var g_tDynamicsRatio = [];
var g_tDynamicsRatioMin = [0.03125, 0.03125, 1, 32];
var g_tDynamicsRatioMax = [0.03125, 1, 32, 32];
var g_tDynamicsRatioStep = [0.1, 0.1, 0.1, 0.1];

var g_tDynamicsAttack = [];
var g_tDynamicsAttackMin = [100, 100, 100, 100];
var g_tDynamicsAttackMax = [200000, 200000, 200000, 200000];
var g_tDynamicsAttackStep = [10, 10, 10, 10];

var g_tDynamicsRelease = [];
var g_tDynamicsReleaseMin = [12000, 12000, 11000, 50000];
var g_tDynamicsReleaseMax = [2000000, 2000000, 2000000, 2000000];
var g_tDynamicsReleaseStep = [10, 10, 10, 10];

var g_tDynamicsBypass = [];

var g_nDynamicsFaderHeight = 0;
var g_nDynamicsKnobHeight = 0;

var g_nDynamicsThresholdScaleStepHeight = 0;
var g_nDynamicsRightScaleStepHeight = 0;

var g_nDynamicsThresholdPos0dB = 0;
var g_nDynamicsThresholdPos18dB = 0;

var g_bDynamicsEnabled = false;
var g_bStereoDynamics = false;

var g_szCapturedDynamicsFaderElementId = "";
var g_nDynamicsMouseDownFaderValue = 0;
var g_nDynamicsFaderMouseDownClick = 0;
var g_bDynamicsGainFaderMouseMoved = false;
var g_bDynamicsGainFaderLongClick = false;
var g_nPublishDynamicsFaderValueTimer = null;
var g_nDynamicsGainFaderLongClickTimer = null;


var g_nDynamicsInputMeterMonoValue = 0;
var g_tDynamicsInputMetersValue = [0, 0];

var g_nDynamicsOutputMeterMonoValue = 0;
var g_tDynamicsOutputMetersValue = [0, 0];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var DEESSER_COLOR = "";

const DEESSER_FREQUENCY_MIN = 2000;
const DEESSER_FREQUENCY_MAX = 20000;

const DEESSER_RANGE_MIN = 0;
const DEESSER_RANGE_MAX = 240;

const DEESSER_Q_MIN = 1;
const DEESSER_Q_MAX = 100;

const DEESSER_THRESHOLD_MIN = -960;
const DEESSER_THRESHOLD_MAX = 0;

var g_nDeesserFaderHeight = 0;
var g_nDeesserKnobHeight = 0;

var g_nDeesserThresholdScaleStepHeight = 0;

var g_nDeesserThresholdPos0dB = 0;
var g_nDeesserThresholdPos18dB = 0;

var g_bDeesserEnabled = false;
var g_bStereoDeesser = false;

var g_szCapturedDeesserFaderElementId = "";
var g_nDeesserMouseDownFaderValue = 0;
var g_nDeesserFaderMouseDownClick = 0;
var g_nPublishDeesserFaderValueTimer = null;


var g_nDeesserInputMeterMonoValue = 0;
var g_tDeesserInputMetersValue = [0, 0];

var g_nDeesserOutputMeterMonoValue = 0;
var g_tDeesserOutputMetersValue = [0, 0];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_bBusEffect = false;
var g_nOnBusID = -1;

var g_bInputEffect = false;
var g_nOnInputID = -1;
var g_nLinkedInputID = -1;
var g_nSidechainID = -1;

var g_szCapturedEffectRotaryControlElementId = "";

var g_nEffectRotaryControlMouseDownKnobValue = 0;
var g_nEffectRotaryControlMouseDownClick = 0;

var g_szClickedEffectRotaryControlElementId = "";
var g_bClickedEQRotary = false;
var g_bClickedDynamicsRotary = false;
var g_bClickedDeesserRotary = false;
var g_bClickedDeesserRotary = false;
var g_bClickedReverbRotary = false;
var g_bClickedEventideBlackholeRotary = false;

var g_nScrollY = 0;
var g_szScrollToEffectName = "";
var g_isEffectsScroller = null;
var g_nEffectsScrollerY = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildEffects(bBuildEQ, bBuildDynamics, bBuildReverb, bBuildEventideBlackhole, bBuildDeesser, bBusEffect, nBusID, bInputEffect, nInputID, szScrollToEffectName)
{
    if ((bBusEffect && nBusID == g_nOnBusID) || (bInputEffect && nInputID == g_nOnInputID))
    {
        ScrollToEffect(szScrollToEffectName, bBuildDeesser);
        return;
    }

    g_bBusEffect = bBusEffect;
    g_nOnBusID = nBusID;

    g_bInputEffect = bInputEffect;
    g_nOnInputID = nInputID;


    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    // Get colors
    var style = getComputedStyle(document.body)
    if (style)
    {
        EQ_COLOR = style.getPropertyValue('--eq-color');
        REVERB_COLOR = style.getPropertyValue('--reverb-color');
        EVENTIDE_BLACKHOLE_COLOR = style.getPropertyValue('--eventide-blackhole-color');
        DYNAMICS_COLOR = style.getPropertyValue('--dynamics-color');
        DEESSER_COLOR = style.getPropertyValue('--deesser-color');
    }

    if (EQ_COLOR == "" || REVERB_COLOR == "" || EVENTIDE_BLACKHOLE_COLOR == "" || DYNAMICS_COLOR == "" || DEESSER_COLOR == "")
    {
        return;
    }


    eEffectsSection.innerHTML = "";

    var nScrollContainerHeight = eEffectsSection.offsetHeight - 30;

    var szPage = "";

    szPage += "<div id='effectsHeaderClose' class='effectsHeaderClose' style='top: " + eEffectsSection.offsetTop + "px;'>X</div>";
    if (g_bInputEffect)
    {
        szPage += "<div id='effectsHeaderPrevious' class='effectsHeaderPrevious' style='top: " + eEffectsSection.offsetTop + "px;'><</div>";
        szPage += "<div id='effectsHeaderNext' class='effectsHeaderNext' style='top: " + eEffectsSection.offsetTop + "px;'>></div>";
    }

    szPage += "<div id='effectsHeader' class='effectsHeader'>MERGING+EFFECTS</div>";

    szPage += "<div id='effectsScrollContainer' class='effectsScrollContainer' style='height: " + nScrollContainerHeight + "px;'>";

        szPage += "<div id='effectsScroll' class='effectsScroll'>";

            if (bBuildDeesser)
            {
                szPage += "<div id='DeesserEffectContainer' class='effectContainer'>";

                    szPage += BuildDeesser();

                szPage += "</div>";
            }

            if (bBuildEQ)
            {
                szPage += "<div id='EQEffectContainer' class='effectContainer' style='margin-top: 0px;'>";
                    
                    szPage += BuildEQ(bBuildDeesser);

                szPage += "</div>";
            }

            if (bBuildDynamics)
            {
                szPage += "<div id='DynamicsEffectContainer' class='effectContainer'>";

                    szPage += BuildDynamics(bBuildDeesser);

                szPage += "</div>";
            }

            if (bBuildReverb)
            {
                szPage += "<div id='ReverbEffectContainer' class='effectContainer'>";

                    szPage += BuildReverb();

                szPage += "</div>";
            }
            else if (bBuildEventideBlackhole)
            {
                szPage += "<div id='EventideBlackholeEffectContainer' class='effectContainer'>";

                    szPage += BuildEventideBlackhole();

                szPage += "</div>";
            }

        szPage += "</div>";

    szPage += "</div>";
     

    eEffectsSection.innerHTML = szPage;


    UpdateEffectsTitle(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);

    if (bBuildDeesser)
        UpdateDeesser(g_nOnInputID);

    if (bBuildEQ)
        UpdateEQ(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);

    if (bBuildDynamics)
        UpdateDynamics(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);

    if (bBuildReverb)
        UpdateReverb(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);

    if (bBuildEventideBlackhole)
        UpdateEventideBlackhole(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);


    if (g_isEffectsScroller)
    {
        g_nScrollY = g_isEffectsScroller.y;
        g_isEffectsScroller.destroy();
    }
    g_isEffectsScroller = new iScroll("effectsScrollContainer", { hScroll: false, vScroll: true, bounce: false, wheelAction: "none" });


    var bTouchDevice = 'ontouchstart' in document.documentElement;

    AddEvent("effectsHeaderClose", "click", function () { CloseEffectsSection(); });
    AddEvent("effectsHeaderPrevious", "click", function () { NextInputEffectsSection(true); });
    AddEvent("effectsHeaderNext", "click", function () { NextInputEffectsSection(false); });

    AddEvent("effectsScrollContainer", "touchstart", function (event) { EffectRotaryControlMouseDown(event, bTouchDevice); });
    AddEvent("effectsScrollContainer", "touchmove", function (event) { EffectRotaryControlMouseMove(event, true); EQBallMouseMove(event, true); });
    AddEvent("effectsScrollContainer", "touchend", function (event) { EffectRotaryControlMouseUp(event); EQBallMouseUp(event); });
    AddEvent("mixerSection", "touchend", function (event) { EffectRotaryControlMouseUp(event); EQBallMouseUp(event); });
    AddEvent("mixerSection", "touchcancel", function (event) { EffectRotaryControlMouseUp(event); EQBallMouseUp(event); });

    AddEvent("effectsScrollContainer", "mousedown", function (event) { EffectRotaryControlMouseDown(event, bTouchDevice); });
    AddEvent("effectsScrollContainer", "mousemove", function (event) { DynamicsFaderMouseMove(event, false); DeesserFaderMouseMove(event, false); EffectRotaryControlMouseMove(event, false); EQBallMouseMove(event, false); });
    AddEvent("effectsScrollContainer", "mouseup", function (event)
    {
        DynamicsFaderMouseUp(event);
        DeesserFaderMouseUp(event);
        EffectRotaryControlMouseUp(event);
        EQBallMouseUp(event);
        SelectEQRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDynamicsRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDeesserRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectReverbRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectEventideBlackholeRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        DynamicsResetButtonPressed(false);
    });
    AddEvent("effectsSection", "mouseup", function (event)
    {
        DynamicsFaderMouseUp(event);
        DeesserFaderMouseUp(event);
        EffectRotaryControlMouseUp(event);
        EQBallMouseUp(event);
        SelectEQRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDynamicsRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDeesserRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectReverbRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectEventideBlackholeRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        DynamicsResetButtonPressed(false);
    });
    AddEvent("effectsSection", "mousemove", function (event) { DynamicsFaderMouseMove(event, false); DeesserFaderMouseMove(event, false); EffectRotaryControlMouseMove(event, false); EQBallMouseMove(event, false); });
    AddEvent("mixerSection", "mouseup", function (event)
    {
        DynamicsFaderMouseUp(event);
        DeesserFaderMouseUp(event);
        EffectRotaryControlMouseUp(event);
        EQBallMouseUp(event);
        SelectEQRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDynamicsRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDeesserRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectReverbRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectEventideBlackholeRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        DynamicsResetButtonPressed(false);
    });
    AddEvent("mixerSection", "mousemove", function (event) { DynamicsFaderMouseMove(event, false); DeesserFaderMouseMove(event, false); EffectRotaryControlMouseMove(event, false); EQBallMouseMove(event, false); });
    AddEvent("header", "mouseup", function (event)
    {
        DynamicsFaderMouseUp(event);
        DeesserFaderMouseUp(event);
        EffectRotaryControlMouseUp(event);
        EQBallMouseUp(event);
        SelectEQRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDynamicsRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectDeesserRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectReverbRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        SelectEventideBlackholeRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId));
        DynamicsResetButtonPressed(false);
    });
    AddEvent("header", "mousemove", function (event) { DynamicsFaderMouseMove(event, false); DeesserFaderMouseMove(event, false); EffectRotaryControlMouseMove(event, false); EQBallMouseMove(event, false); });


    if (bBuildEQ)
    {
        AddEvent("eq-bands-button", "click", function () { OpenEQBandsMenu(); });
        AddEvent("eq-snap-button", "click", function () { OpenSnapshots(false, true, "eq", g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("eq-link-button", "click", function () { LinkEQ(); });
        AddEvent("eq-on-button", "click", function () { EnableEQ(); });

        //AddEvent("eq-curve-canvas", "click", function (event) { SelectEQBall(event, bTouchDevice, true); });
        AddEvent("eq-curve-canvas", (bTouchDevice ? "touchstart" : "mousedown"), function (event) { SelectEQBall(event, bTouchDevice, false);  });
        AddEvent("eq-curve-canvas", (bTouchDevice ? "touchmove" : "mousemove"), function (event) { EQBallMouseMove(event, bTouchDevice); });
        AddEvent("eq-curve-canvas", (bTouchDevice ? "touchend" : "mouseup"), function (event) { EQBallMouseUp(event); });

        AddEvent("eq-bypass-button", "click", function () { BypassEQBand(); });

        var eEQRotarys = document.getElementsByClassName("eq-rotary");
        if (eEQRotarys == null)
        {
            return;
        }

        for (var idx = 0; idx < eEQRotarys.length; idx++)
        {
            AddEvent(eEQRotarys[idx].id, (bTouchDevice ? "touchstart" : "mousedown"), (function _SelectEQRotary(_eRotary) { return function () { return SelectEQRotary(_eRotary); } })(eEQRotarys[idx]));
            AddEvent(eEQRotarys[idx].id, (bTouchDevice ? "touchend" : "mouseup"), (function _SelectEQRotary(_eRotary) { return function () { return SelectEQRotary(_eRotary); } })(eEQRotarys[idx]));
        }
    }

    if (bBuildDynamics)
    {
        AddEvent("dynamics-snap-button", "click", function () { OpenSnapshots(false, true, "dynamics", g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("dynamics-link-button", "click", function () { LinkDynamics(); });
        AddEvent("dynamics-on-button", "click", function () { EnableDynamics(); });

        AddEvent("dynamics-band0-button", "click", function () { if (!g_bDynamicsEnabled) return; g_nControledDynamicsBandID = 0; UpdateDynamics(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("dynamics-band2-button", "click", function () { if (!g_bDynamicsEnabled) return; g_nControledDynamicsBandID = 2; UpdateDynamics(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("dynamics-band3-button", "click", function () { if (!g_bDynamicsEnabled) return; g_nControledDynamicsBandID = 3; UpdateDynamics(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });

        AddEvent("dynamics-band-on-button", "click", function () { BypassDynamicsBand(); });
        AddEvent("dynamics-reset-button", "click", function () { DynamicsPeakReset(); });
        AddEvent("dynamics-reset-button", (bTouchDevice ? "touchstart" : "mousedown"), function () { DynamicsResetButtonPressed(true); });
        AddEvent("dynamics-autogain-button", "click", function () { DynamicsAutoGain(); });
        AddEvent("dynamics-sidechain-button", "click", function () { OpenSidechainListPopup(); });

        var eDynamicsRotarys = document.getElementsByClassName("dynamics-rotary");
        if (eDynamicsRotarys == null)
        {
            return;
        }

        for (var idx = 0; idx < eDynamicsRotarys.length; idx++)
        {
            AddEvent(eDynamicsRotarys[idx].id, (bTouchDevice ? "touchstart" : "mousedown"), (function _SelectDynamicsRotary(_eRotary) { return function () { return SelectDynamicsRotary(_eRotary); } })(eDynamicsRotarys[idx]));
            AddEvent(eDynamicsRotarys[idx].id, (bTouchDevice ? "touchend" : "mouseup"), (function _SelectDynamicsRotary(_eRotary) { return function () { return SelectDynamicsRotary(_eRotary); } })(eDynamicsRotarys[idx]));
        }

        AddEvent("dynamics-threshold-fader-section", (bTouchDevice ? "touchstart" : "mousedown"), function (event) { g_szCapturedDynamicsFaderElementId = "dynamics-threshold-fader-section"; DynamicsFaderMouseDown(event, bTouchDevice); });
        AddEvent("dynamics-threshold-fader-section", (bTouchDevice ? "touchmove" : "mousemove"), function (event) { DynamicsFaderMouseMove(event, bTouchDevice); });
        AddEvent("dynamics-threshold-fader-section", (bTouchDevice ? "touchend" : "mouseup"), function (event) { DynamicsFaderMouseUp(event); });

        //AddEvent("dynamics-threshold-fader-slider-knob", "click", function (event) { DynamicsSetFaderValue("threshold"); });


        AddEvent("dynamics-makeup-fader-section", (bTouchDevice ? "touchstart" : "mousedown"), function (event)
        {
            g_szCapturedDynamicsFaderElementId = "dynamics-makeup-fader-section";
            DynamicsFaderMouseDown(event, bTouchDevice);
            g_nDynamicsGainFaderLongClickTimer = window.setTimeout((function _OnTimerDynamicsGainFaderLongClick(_event) { return function () { OnTimerDynamicsGainFaderLongClick(_event); } })(event), 750);
        });
        AddEvent("dynamics-makeup-fader-section", (bTouchDevice ? "touchmove" : "mousemove"), function (event) { DynamicsFaderMouseMove(event, bTouchDevice); });
        AddEvent("dynamics-makeup-fader-section", (bTouchDevice ? "touchend" : "mouseup"), function (event) { DynamicsFaderMouseUp(event); SelectDynamicsRotary(document.getElementById(g_szCapturedEffectRotaryControlElementId)); });

        //AddEvent("dynamics-makeup-fader-slider-knob", "click", function (event) { DynamicsSetFaderValue("makeup"); });
    }

    if (bBuildDeesser)
    {
        AddEvent("deesser-snap-button", "click", function () { OpenSnapshots(false, true, "deesser", g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("deesser-link-button", "click", function () { LinkDeesser(); });
        AddEvent("deesser-on-button", "click", function () { EnableDeesser(); });

        AddEvent("deesser-listen-button", "click", function () { DeesserListen(); });
        AddEvent("deesser-filter-button", "click", function () { DeesserSwitchFilter(); });

        var eDeesserRotarys = document.getElementsByClassName("deesser-rotary");
        if (eDeesserRotarys == null)
        {
            return;
        }

        for (var idx = 0; idx < eDeesserRotarys.length; idx++)
        {
            AddEvent(eDeesserRotarys[idx].id, (bTouchDevice ? "touchstart" : "mousedown"), (function _SelectDeesserRotary(_eRotary) { return function () { return SelectDeesserRotary(_eRotary); } })(eDeesserRotarys[idx]));
            AddEvent(eDeesserRotarys[idx].id, (bTouchDevice ? "touchend" : "mouseup"), (function _SelectDeesserRotary(_eRotary) { return function () { return SelectDeesserRotary(_eRotary); } })(eDeesserRotarys[idx]));
        }

        AddEvent("deesser-threshold-fader-section", (bTouchDevice ? "touchstart" : "mousedown"), function (event) { g_szCapturedDeesserFaderElementId = "deesser-threshold-fader-section"; DeesserFaderMouseDown(event, bTouchDevice); });
        AddEvent("deesser-threshold-fader-section", (bTouchDevice ? "touchmove" : "mousemove"), function (event) { DeesserFaderMouseMove(event, bTouchDevice); });
        AddEvent("deesser-threshold-fader-section", (bTouchDevice ? "touchend" : "mouseup"), function (event) { DeesserFaderMouseUp(event); });
    }

    if (bBuildReverb)
    {
        AddEvent("reverb-snap-button", "click", function () { OpenSnapshots(false, true, "reverb", g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("reverb-on-button", "click", function ()
        {
            var szText = "<br/>Reverb is always ON in parallel processing. Use the Mute<br/>on the Mixer Reverb channel return strip to turn it off.<br/>";

            OpenInfosPopup(szText, 500, 100);
        });

        var eReverbRotarys = document.getElementsByClassName("reverb-rotary");
        if (eReverbRotarys == null)
        {
            return;
        }

        for (var idx = 0; idx < eReverbRotarys.length; idx++)
        {
            AddEvent(eReverbRotarys[idx].id, (bTouchDevice ? "touchstart" : "mousedown"), (function _SelectReverbRotary(_eRotary) { return function () { return SelectReverbRotary(_eRotary); } })(eReverbRotarys[idx]));
            AddEvent(eReverbRotarys[idx].id, (bTouchDevice ? "touchend" : "mouseup"), (function _SelectReverbRotary(_eRotary) { return function () { return SelectReverbRotary(_eRotary); } })(eReverbRotarys[idx]));
        }
    }

    if (bBuildEventideBlackhole)
    {
        AddEvent("eventide-blackhole-snap-button", "click", function () { OpenSnapshots(false, true, "eventide_blackhole", g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID); });
        AddEvent("eventide-blackhole-on-button", "click", function ()
        {
            var szText = "<br/>Reverb is always ON in parallel processing. Use the Mute<br/>on the Mixer Reverb channel return strip to turn it off.<br/>";

            OpenInfosPopup(szText, 500, 100);
        });

        var eRotarys = document.getElementsByClassName("eventide-blackhole-rotary-canvas");
        if (eRotarys == null)
        {
            return;
        }

        for (var idx = 0; idx < eRotarys.length; idx++)
        {
            AddEvent(eRotarys[idx].id, (bTouchDevice ? "touchstart" : "mousedown"), (function _SelectEventideBlackholeRotary(_eRotary) { return function () { return SelectEventideBlackholeRotary(_eRotary); } })(eRotarys[idx]));
            AddEvent(eRotarys[idx].id, (bTouchDevice ? "touchend" : "mouseup"), (function _SelectEventideBlackholeRotary(_eRotary) { return function () { return SelectEventideBlackholeRotary(_eRotary); } })(eRotarys[idx]));
        }
    }

    ScrollToEffect(szScrollToEffectName, bBuildDeesser);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NextInputEffectsSection(bPrevious)
{
    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer)
    {
        var jsStrips = jsMixer.strips;
        var jsDisplayedStrips = jsMixer.displayed_strips;
        if (jsStrips && jsDisplayedStrips)
        {
            var nCurrentIndex = -1;
            var nNextIndex = -1;
            var nNextInputID = -1;
            for (var idx = 0; idx < jsDisplayedStrips.length; idx++)
            {
                if (jsDisplayedStrips[idx].id == g_nOnInputID)
                {
                    nCurrentIndex = idx;

                    if (bPrevious)
                    {
                        break;
                    }
                }
                else if (nCurrentIndex != -1)
                {
                    nNextIndex = idx;
                    break;
                }
            }

            if (bPrevious && nCurrentIndex > 0)
            {
                nNextIndex = nCurrentIndex - 1;
            }

            if (nNextIndex == -1)
                return;

            nNextInputID = jsDisplayedStrips[nNextIndex].id;

            while (nNextIndex > 0 && GetStripJSON(nNextInputID).type != ST_MUSIC_INPUT && GetStripJSON(nNextInputID).type != ST_DAW_INPUT)
            {
                if (bPrevious)
                    nNextIndex--;
                else
                    nNextIndex++;

                nNextInputID = jsDisplayedStrips[nNextIndex].id;
            }      

            var bOpenNextInputEffectsSection = false;
            if (nNextInputID != -1)
            {
                for (var idx = 0; idx < jsStrips.length; idx++)
                {
                    if (jsStrips[idx].id == nNextInputID && (jsStrips[idx].type == ST_MUSIC_INPUT || jsStrips[idx].type == ST_DAW_INPUT) && jsStrips[idx].sends[g_nCurrentBusID].visible)
                    {
                        bOpenNextInputEffectsSection = true;
                        break;
                    }
                }            

                if (bOpenNextInputEffectsSection)
                {
                    OpenEffectsSection(true, true, false, true, g_bBusEffect, g_nOnBusID, g_bInputEffect, nNextInputID, "");
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ScrollToEffect(szEffectName, bBuildDeesser)
{
    var eEffectsScroll = document.getElementById("effectsScroll");
    if (eEffectsScroll == null)
    {
        return;
    }

    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    if (szEffectName == "")
    {
        g_isEffectsScroller.scrollTo(0, g_nScrollY, 0);
    }
    else
    {
        g_szScrollToEffectName = szEffectName;

        var nScrollContainerHeight = eEffectsSection.offsetHeight - 30;

        if (eEffectsScroll.offsetHeight > nScrollContainerHeight)
        {
            var nScrollToY = 0;
            var nEffectHeight = 0;
            var nEffectTop = 0;
            if (szEffectName.includes("deesser"))
            {
                var eDeesser = document.getElementById("DeesserEffectContainer");
                if (eDeesser == null)
                {
                    return;
                }

                nScrollToY = 1;
                nEffectHeight = eDeesser.offsetHeight;
                nEffectTop = 0;
            }
            else if (szEffectName.includes("eq"))
            {
                var eEQ = document.getElementById("EQEffectContainer");
                if (eEQ == null)
                {
                    return;
                }

                nScrollToY = bBuildDeesser ? -eEQ.offsetTop - 1 : 1;
                nEffectHeight = eEQ.offsetHeight;
                nEffectTop = eEQ.offsetTop;
            }
            else if (szEffectName.includes("dynamics"))
            {
                var eDynamics = document.getElementById("DynamicsEffectContainer");
                if (eDynamics == null)
                {
                    return;
                }

                nScrollToY = -eDynamics.offsetTop - 1;
                nEffectHeight = eDynamics.offsetHeight;
                nEffectTop = eDynamics.offsetTop;
            }
            else if (szEffectName.includes("reverb"))
            {
                var eReverb = document.getElementById("EventideBlackholeEffectContainer");
                if (eReverb == null)
                {
                    eReverb = document.getElementById("ReverbEffectContainer");
                    if (eReverb == null)
                    {
                        return;
                    }
                }

                nScrollToY = -eReverb.offsetTop - 1;
                nEffectHeight = eReverb.offsetHeight;
                nEffectTop = eReverb.offsetTop;
            }

            if (nScrollToY > 0)
            {
                nScrollToY = 0;
            }
            else if (-nScrollToY + nEffectHeight > nScrollContainerHeight)
            {
                nScrollToY = -nEffectTop + (nScrollContainerHeight - nEffectHeight);
            }

            g_isEffectsScroller.scrollTo(0, nScrollToY, 0);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateEffectsTitle(bBusEffect, nBusID, bInputEffect, nInputID)
{
    var eEffectsHeader = document.getElementById("effectsHeader");
    if (eEffectsHeader == null)
    {
        return;
    }

    if (bBusEffect && nBusID != g_nOnBusID)
        return;

    if (bInputEffect && nInputID != g_nOnInputID)
        return;


    var jsBus;
    var szName;
    var szColor;
    if (bBusEffect)
    {
        jsBus = GetBusJSON(nBusID);
        if (jsBus == null)
        {
            return;
        }

        szName = jsBus.name;
        szColor = jsBus.color;
    }
    else if (bInputEffect)
    {
        var jsStrip = GetStripJSON(nInputID);
        if (jsStrip == null)
        {
            return;
        }       

        if (jsStrip.group_id != -1)
        {
            var jsGroup = GetGroupJSON(jsStrip.group_id);
            if (jsGroup)
            {
                szColor = jsGroup.color;
            }          
        }
        else
        {
            szColor = jsStrip.color;
        }

        szName = jsStrip.name;
    }

    if (szColor != "" && szColor != "#000000" && szColor != "#343434")
        eEffectsHeader.style.color = szColor;
    else
        eEffectsHeader.style.color = "#aaaaaa";

   eEffectsHeader.innerText = szName;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateEQ(bBusEffect, nBusID, bInputEffect, nInputID)
{
    if (bBusEffect && nBusID != g_nOnBusID)
        return;

    if (bInputEffect && nInputID != g_nOnInputID)
        return;

    var EQEffectContainer = document.getElementById("EQEffectContainer");
    if (EQEffectContainer == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsInput;
    var nLinkedInputID = -1;
    if (bInputEffect)
    {
        jsInput = GetInputJSON(nInputID);
        if (jsInput == null)
        {
            return;
        }

        var jsStrip = GetStripJSON(nInputID);
        if (jsStrip == null)
        {
            return;
        }

        nLinkedInputID = jsInput.linked_input_id;
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var nMaxEQs = jsMixer.dsp_ressources.max_eqs;
    var nAllocatedEQs = jsMixer.dsp_ressources.allocated_eqs;
    var nAvailableEQs = nMaxEQs - nAllocatedEQs;

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var bEQDisabled = !jsEQ.enabled;

    var eLinkButton = document.getElementById("eq-link-button");
    if (eLinkButton)
    {
        eLinkButton.classList.remove("effect-button-disabled");
        eLinkButton.classList.remove("effect-link-button-checked");

        if (bBusEffect || nLinkedInputID == -1)
            eLinkButton.classList.add("effect-button-disabled");
        else if (jsEQ.linked)
            eLinkButton.classList.add("effect-link-button-checked");
    }

    var eOnButton = document.getElementById("eq-on-button");
    if (eOnButton)
    {
        eOnButton.classList.remove("eq-on-button-checked");
        eOnButton.classList.remove("effect-button-disabled");

        bEQDisabled ? eOnButton.classList.remove("eq-on-button-checked") : eOnButton.classList.add("eq-on-button-checked");

        if (bEQDisabled && ((bBusEffect && (nAvailableEQs < 2)) || (bInputEffect && nAvailableEQs < 1)))
        {
            eOnButton.classList.remove("eq-on-button-checked");
            eOnButton.classList.add("effect-button-disabled");
        }
    }

    var nNbBands = jsEQ.eq_bands.length;

    var eBandsButton = document.getElementById("eq-bands-button");
    if (eBandsButton)
    {
        bEQDisabled ? eBandsButton.classList.add("effect-button-disabled") : eBandsButton.classList.remove("effect-button-disabled");
    }

    var bAllBandBypass = true;
    for (var nBandID = 0; nBandID < nNbBands; nBandID++)
    {
        bAllBandBypass &= jsEQ.eq_bands[nBandID].bypass;

        switch (jsEQ.eq_bands[nBandID].type)
        {
            case EQ_TYPE_LOCUT:
            case EQ_TYPE_HICUT:
                ComputeCutCurve(nBandID);
                break;

            case EQ_TYPE_LOSHELF:
            case EQ_TYPE_HISHELF:
                ComputeShelfCurve(nBandID);
                break;

            case EQ_TYPE_PEAK:
                ComputePeakCurve(nBandID);
                break;

            default:
            {
                if (g_tCurvesPointsX[nBandID])
                    g_tCurvesPointsX[nBandID] = [];

                if (g_tCurvesPointsY[nBandID])
                    g_tCurvesPointsY[nBandID] = [];

                break;
            }
        }
    }

    g_bAllBandBypass = bAllBandBypass;

    ComputeResultCurve(nNbBands);

    DrawEQ();

    var eBypassButton = document.getElementById("eq-bypass-button");
    if (eBypassButton)
    {
        if (g_nControledEQBandID == -1)
        {
            eBypassButton.innerText = "All";
        }
        else
        {
            eBypassButton.innerText = (g_nControledEQBandID + 1);
        }

        if (!bEQDisabled)
        {
            if (g_nControledEQBandID == -1)
            {
                if (g_bAllBandBypass)
                {
                    eBypassButton.classList.add("eq-bypass-button-checked");
                    eBypassButton.style.backgroundColor = "#404040"; //"#656565";
                    eBypassButton.style.borderColor = "#404040";
                }
                else
                {
                    eBypassButton.classList.remove("eq-bypass-button-checked");
                    eBypassButton.style.backgroundColor = bNeumannEdition ? "#343434" : "#222222";
                    eBypassButton.style.borderColor = bNeumannEdition ? "#343434" : "#222222";
                }
            }
            else
            {
                if (jsEQ.eq_bands[g_nControledEQBandID].bypass)
                {
                    var szColor = bNeumannEdition ? NEUMANN_EQ_T_BAND_COLORS_BLEND[g_nControledEQBandID] : EQ_T_BAND_COLORS_BLEND[g_nControledEQBandID];
                    eBypassButton.classList.add("eq-bypass-button-checked");
                    eBypassButton.style.backgroundColor = szColor;
                    eBypassButton.style.borderColor = szColor;
                }
                else
                {
                    eBypassButton.classList.remove("eq-bypass-button-checked");
                    eBypassButton.style.backgroundColor = bNeumannEdition ? "#343434" : "#222222";
                    eBypassButton.style.borderColor = bNeumannEdition ? "#343434" : "#222222";
                }
            }                
        }
        else
        {
            eBypassButton.innerText = "All";
            eBypassButton.style.backgroundColor = bNeumannEdition ? "#343434" : "#222222";
            eBypassButton.style.borderColor = bNeumannEdition ? "#343434" : "#222222";
        }
    }


    var szBandColor = bNeumannEdition ? NEUMANN_EQ_T_BAND_COLORS[g_nControledEQBandID] : EQ_T_BAND_COLORS[g_nControledEQBandID];
    if (document.getElementById("eq-type-rotary"))
    {
        var bDisable = g_nControledEQBandID == -1 || bEQDisabled;

        var eTypeCanvas = document.getElementById("eq-type-rotary-canvas");
        if (eTypeCanvas)
        {
            DrawEQTypeRotary(eTypeCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].type, g_szCapturedEffectRotaryControlElementId.includes("-type") && !bDisable, bDisable, szBandColor);
        }

        var eTypeTitle = document.getElementById("eq-type-title");
        if (eTypeTitle && !bNeumannEdition)
        {
            if (bDisable)
            {
                eTypeTitle.innerText = "---";
            }
            else
            {
                eTypeTitle.innerText = EQ_T_TYPE[jsEQ.eq_bands[g_nControledEQBandID].type];
            }
        }

        var eTypeValue = document.getElementById("eq-type-rotary-value");
        if (eTypeValue)
        {
            if (bDisable)
            {
                if (bNeumannEdition)
                    eTypeValue.innerText = "";
                else
                    eTypeValue.classList.add("eq-rotary-value-disabled");
            }
            else
            {
                if (bNeumannEdition)
                {
                    jsEQ.eq_bands[g_nControledEQBandID].type == EQ_TYPE_PEAK ? eTypeValue.classList.remove("eq-rotary-title-2lines") : eTypeValue.classList.add("eq-rotary-title-2lines");
                    eTypeValue.innerText = NEUMANN_EQ_T_TYPE[jsEQ.eq_bands[g_nControledEQBandID].type];
                }
                else
                {
                    eTypeValue.classList.remove("eq-rotary-value-disabled");
                }
            }
        }
    }

    if (document.getElementById("eq-freq-rotary"))
    {
        var bDisable = g_nControledEQBandID == -1 || bEQDisabled;

        var eFreqCanvas = document.getElementById("eq-freq-rotary-canvas");
        if (eFreqCanvas)
        {
            var nValue = bDisable ? EQ_FREQUENCY_MIN : jsEQ.eq_bands[g_nControledEQBandID].freq;
            DrawEQFrequencyRotary(eFreqCanvas, nValue, g_szCapturedEffectRotaryControlElementId.includes("-freq") && !bDisable, bDisable, szBandColor);
        }

        var eFreqTitle = document.getElementById("eq-freq-title");
        if (eFreqTitle && !bNeumannEdition)
        {
            if (bDisable)
            {
                eFreqTitle.innerText = "---";
            }
            else
            {
                var nFreq = jsEQ.eq_bands[g_nControledEQBandID].freq;
                var szFreq = nFreq > 1000 ? Number(nFreq / 1000).toFixed(1) + " kHz" : Number(nFreq).toFixed(0) + " Hz";
                eFreqTitle.innerText = szFreq;
            }
        }

        var eFreqValue = document.getElementById("eq-freq-rotary-value");
        if (eFreqValue)
        {
            if (bDisable)
            {
                if (bNeumannEdition)
                    eFreqValue.innerText = "";
                else
                    eFreqValue.classList.add("eq-rotary-value-disabled");
            }
            else
            {
                if (bNeumannEdition)
                {
                    var nFreq = jsEQ.eq_bands[g_nControledEQBandID].freq;
                    var szFreq = nFreq > 1000 ? Number(nFreq / 1000).toFixed(1) + "\nkHz" : Number(nFreq).toFixed(0) + "\nHz";
                    eFreqValue.innerText = szFreq;
                }
                else
                {
                    eFreqValue.classList.remove("eq-rotary-value-disabled");
                }
            }
        }
    }

    if (document.getElementById("eq-gain-rotary"))
    {
        var nEQType = g_nControledEQBandID == -1 || bEQDisabled ? EQ_TYPE_PEAK : jsEQ.eq_bands[g_nControledEQBandID].type;
        var bDisable = g_nControledEQBandID == -1 || nEQType == EQ_TYPE_LOCUT || nEQType == EQ_TYPE_HICUT || bEQDisabled;

        var eGainCanvas = document.getElementById("eq-gain-rotary-canvas");
        if (eGainCanvas)
        {
            DrawEQGainRotary(eGainCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].gain, g_szCapturedEffectRotaryControlElementId.includes("-gain") && !bDisable, bDisable, szBandColor);
        }

        var eGainValue = document.getElementById("eq-gain-rotary-value");
        if (eGainValue)
        {
            if (bDisable)
            {
                if (bNeumannEdition)
                    eGainValue.innerText = "";
                else
                    eGainValue.classList.add("eq-rotary-value-disabled");
            }
            else
            {
                if (bNeumannEdition)
                    eGainValue.innerText = Number(jsEQ.eq_bands[g_nControledEQBandID].gain).toFixed(1) + "\ndB";
                else
                    eGainValue.classList.remove("eq-rotary-value-disabled");
            }
        }

        var eGainTitle = document.getElementById("eq-gain-title");
        if (eGainTitle && !bNeumannEdition)
        {
            if (bDisable)
            {
                eGainTitle.innerText = "---";
            }
            else
            {
                eGainTitle.innerText = Number(jsEQ.eq_bands[g_nControledEQBandID].gain).toFixed(1) + " dB";
            }
        }
    }

    if (document.getElementById("eq-q-rotary"))
    {
        var bDisable = bEQDisabled;
        if (!bDisable)
            bDisable = g_nControledEQBandID == -1 || jsEQ.eq_bands[g_nControledEQBandID].type != EQ_TYPE_PEAK;

        var eQCanvas = document.getElementById("eq-q-rotary-canvas");
        if (eQCanvas)
        {
            DrawEQQRotary(eQCanvas, bDisable ? 10 : jsEQ.eq_bands[g_nControledEQBandID].Q, g_szCapturedEffectRotaryControlElementId.includes("-q") && !bDisable, bDisable, szBandColor);
        }

        var eQValue = document.getElementById("eq-q-rotary-value");
        if (eQValue)
        {
            if (bDisable)
            {
                if (bNeumannEdition)
                    eQValue.innerText = "";
                else
                    eQValue.classList.add("eq-rotary-value-disabled");
            }
            else
            {
                if (bNeumannEdition)
                    eQValue.innerText = Number(jsEQ.eq_bands[g_nControledEQBandID].Q).toFixed(1);
                else
                    eQValue.classList.remove("eq-rotary-value-disabled");
            }
        }

        var eQTitle = document.getElementById("eq-q-title");
        if (eQTitle && !bNeumannEdition)
        {
            if (bDisable)
            {
                eQTitle.innerText = "---";
            }
            else
            {
                eQTitle.innerText = Number(jsEQ.eq_bands[g_nControledEQBandID].Q).toFixed(1);
            }
        }
    }
    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDynamics(bBusEffect, nBusID, bInputEffect, nInputID)
{
    if (bBusEffect && nBusID != g_nOnBusID)
        return;

    if (bInputEffect && nInputID != g_nOnInputID)
        return;

    var DynamicsEffectContainer = document.getElementById("DynamicsEffectContainer");
    if (DynamicsEffectContainer == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsBus;
    var jsInput;
    if (bBusEffect)
    {
        jsBus = GetBusJSON(nBusID);
        if (jsBus == null)
        {
            return;
        }

        g_bStereoDynamics = true;
    }
    else if (bInputEffect)
    {
        jsInput = GetInputJSON(nInputID);
        if (jsInput == null)
        {
            return;
        }

        var jsStrip = GetStripJSON(nInputID);
        if (jsStrip == null)
        {
            return;
        }

        g_nLinkedInputID = jsInput.linked_input_id;
        g_nSidechainID = jsInput.dynamics.dynamics_sidechain;
    }

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var nMaxDynamics = jsMixer.dsp_ressources.max_dynamics;
    var nAllocatedDynamics = jsMixer.dsp_ressources.allocated_dynamics;
    var nAvailableDynamics = nMaxDynamics - nAllocatedDynamics;

    var nMaxPostFxMasterGain = jsMixer.dsp_ressources.max_post_fx_mastergain;
    var nAllocatedPostFxMasterGain = jsMixer.dsp_ressources.allocated_post_fx_mastergain;
    

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }


    if (bInputEffect)
        g_bStereoDynamics = g_nLinkedInputID != -1 && jsDynamics.linked;

    g_bDynamicsEnabled = jsDynamics.enabled;
    

    g_tDynamicsThreshold = [];
    g_tDynamicsRatio = [];
    g_tDynamicsAttack = [];
    g_tDynamicsRelease = [];
    g_tDynamicsBypass = [];
    for (var nBandID = 0; nBandID < jsDynamics.dynamics_bands.length; nBandID++)
    {
        g_tDynamicsThreshold.push(jsDynamics.dynamics_bands[nBandID].threshold);
        g_tDynamicsRatio.push(jsDynamics.dynamics_bands[nBandID].ratio);
        g_tDynamicsAttack.push(jsDynamics.dynamics_bands[nBandID].attack);
        g_tDynamicsRelease.push(jsDynamics.dynamics_bands[nBandID].release);
        g_tDynamicsBypass.push(jsDynamics.dynamics_bands[nBandID].bypass);        
    }


    var eLinkButton = document.getElementById("dynamics-link-button");
    if (eLinkButton)
    {
        eLinkButton.classList.remove("effect-button-disabled");
        eLinkButton.classList.remove("effect-link-button-checked");

        if (bBusEffect || g_nLinkedInputID == -1)
            eLinkButton.classList.add("effect-button-disabled");
        else if (jsDynamics.linked)
            eLinkButton.classList.add("effect-link-button-checked");
    }

    var eOnButton = document.getElementById("dynamics-on-button");
    if (eOnButton)
    {
        eOnButton.classList.remove("dynamics-on-button-checked");
        eOnButton.classList.remove("effect-button-disabled");

        g_bDynamicsEnabled ? eOnButton.classList.add("dynamics-on-button-checked") : eOnButton.classList.remove("dynamics-on-button-checked");

        if (GetSidechainedByInputNames().length > 0 && !g_bBusEffect)
        {
            eOnButton.innerText = "SIDE CH'ED";
            eOnButton.classList.add("dynamics-button-smallFont");
        }
        else
        {
            eOnButton.innerText = "ON";
            eOnButton.classList.remove("dynamics-button-smallFont");
        }

        if (!g_bDynamicsEnabled && ((g_bBusEffect && (nAvailableDynamics < 2)) || (g_bInputEffect && nAvailableDynamics < 1) || (nAllocatedPostFxMasterGain + 1 > nMaxPostFxMasterGain)))
        {
            eOnButton.classList.remove("dynamics-on-button-checked");
            eOnButton.classList.add("effect-button-disabled");
        }
    }

    var jsInputs = GetInputJSON(-1);
    if (jsInputs == null)
    {
        return;
    }

    var tSidechainIds = [];
    for (var idx = 0; idx < jsInputs.length; idx++)
    {
        if (jsInputs[idx].dynamics)
        {
            if (jsInputs[idx].dynamics.enabled)
            {
                if (jsInputs[idx].id != g_nOnInputID)
                {
                    var jsStrip = GetStripJSON(jsInputs[idx].id);
                    if (jsStrip)
                    {
                        tSidechainIds.push(jsInputs[idx].id);
                    }
                }
            }
        }
    }

    var eSidechainButton = document.getElementById("dynamics-sidechain-button");
    if (eSidechainButton && !g_bBusEffect)
    {
        eSidechainButton.classList.remove("dynamics-button-checked");
        eSidechainButton.classList.remove("dynamics-button-checked-disabled");

        jsInput.dynamics.dynamics_sidechain != -1 ? eSidechainButton.classList.add("dynamics-button-checked") : eSidechainButton.classList.remove("dynamics-button-checked");

        if ((!g_bDynamicsEnabled && ((g_bBusEffect && (nAvailableDynamics < 2)) || (g_bInputEffect && nAvailableDynamics < 1) || (nAllocatedPostFxMasterGain + 1 > nMaxPostFxMasterGain))) || !g_bDynamicsEnabled || tSidechainIds.length < 1)
        {
            eSidechainButton.classList.remove("dynamics-button-checked");
            eSidechainButton.classList.add("dynamics-button-checked-disabled");
        }
    }


    if (document.getElementById("dynamics-ratio-rotary"))
    {
        var bDisabled = !g_bDynamicsEnabled || g_tDynamicsBypass[g_nControledDynamicsBandID] || g_nControledDynamicsBandID == 0 || g_nControledDynamicsBandID == 3;
        var eRatioCanvas = document.getElementById("dynamics-ratio-rotary-canvas");
        if (eRatioCanvas)
        {
            DrawDynamicsRatioRotary(eRatioCanvas, g_tDynamicsRatioMin[g_nControledDynamicsBandID], g_tDynamicsRatioMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].ratio, g_szCapturedEffectRotaryControlElementId.includes("-ratio"), bDisabled);
        }

        var eRatioValue = document.getElementById("dynamics-ratio-rotary-value");
        if (eRatioValue)
        {
            if (g_nControledDynamicsBandID == 0)
                eRatioValue.innerText = "";
            else if (g_tDynamicsBypass[g_nControledDynamicsBandID] || (!g_bDynamicsEnabled && bNeumannEdition))
                eRatioValue.innerText = bNeumannEdition ? "" : "---";
            else
                eRatioValue.innerText = Number(jsDynamics.dynamics_bands[g_nControledDynamicsBandID].ratio).toFixed(1) + ":1";
        }

        var eRatioTitle = document.getElementById("dynamics-ratio-rotary-title");
        if (eRatioTitle)
        {
            bDisabled ? eRatioTitle.classList.add("dynamics-rotary-title-disabled") : eRatioTitle.classList.remove("dynamics-rotary-title-disabled");
        }
    }

    if (document.getElementById("dynamics-attack-rotary"))
    {
        var eAttackCanvas = document.getElementById("dynamics-attack-rotary-canvas");
        if (eAttackCanvas)
        {
            DrawDynamicsRotary(eAttackCanvas, g_tDynamicsAttackMin[g_nControledDynamicsBandID], g_tDynamicsAttackMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].attack, g_szCapturedEffectRotaryControlElementId.includes("-attack"), g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled);
        }

        var eAttackValue = document.getElementById("dynamics-attack-rotary-value");
        if (eAttackValue)
        {
            if (g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled)
                eAttackValue.innerText = bNeumannEdition ? "" : "---";
            else
                eAttackValue.innerText = Number(jsDynamics.dynamics_bands[g_nControledDynamicsBandID].attack / 1000).toFixed(2) + (bNeumannEdition ? "\nms" : " ms");
        }

        var eAttackTitle = document.getElementById("dynamics-attack-rotary-title");
        if (eAttackTitle)
        {
            g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled ? eAttackTitle.classList.add("dynamics-rotary-title-disabled") : eAttackTitle.classList.remove("dynamics-rotary-title-disabled");
        }
    }

    if (document.getElementById("dynamics-release-rotary"))
    {
        var eReleaseCanvas = document.getElementById("dynamics-release-rotary-canvas");
        if (eReleaseCanvas)
        {
            DrawDynamicsRotary(eReleaseCanvas, g_tDynamicsReleaseMin[g_nControledDynamicsBandID], g_tDynamicsReleaseMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].release, g_szCapturedEffectRotaryControlElementId.includes("-release"), g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled);
        }

        var eReleaseValue = document.getElementById("dynamics-release-rotary-value");
        if (eReleaseValue)
        {
            if (g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled)
                eReleaseValue.innerText = bNeumannEdition ? "" : "---";
            else
            {
                nValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].release;

                if (nValue > 1000000)
                {
                    nValue = Number(nValue / 1000000).toFixed(1);
                    eReleaseValue.innerText = nValue + (bNeumannEdition ? "\ns" : " s");
                }
                else
                {
                    nValue = Number(nValue / 1000).toFixed(1);
                    eReleaseValue.innerText = nValue + (bNeumannEdition ? "\nms" : " ms");
                }
            }
        }

        var eReleaseTitle = document.getElementById("dynamics-release-rotary-title");
        if (eReleaseTitle)
        {
            g_tDynamicsBypass[g_nControledDynamicsBandID] || !g_bDynamicsEnabled ? eReleaseTitle.classList.add("dynamics-rotary-title-disabled") : eReleaseTitle.classList.remove("dynamics-rotary-title-disabled");
        }
    }


    for (var i = 0; i < g_tDynamicsBypass.length; i++)
    {
        var eLed = document.getElementById("dynamics-band" + i + "-led");
        if (eLed)
        {
            g_tDynamicsBypass[i] || !g_bDynamicsEnabled ? eLed.classList.remove("dynamics-led-on") : eLed.classList.add("dynamics-led-on");
        }

        var eButton = document.getElementById("dynamics-band" + i + "-button");
        if (eButton)
        {
            i == g_nControledDynamicsBandID ? eButton.classList.add("dynamics-button-checked") : eButton.classList.remove("dynamics-button-checked");

            g_bDynamicsEnabled ? eButton.classList.remove("dynamics-button-checked-disabled") : eButton.classList.add("dynamics-button-checked-disabled");
        }
    }

    var eButtonBandOn = document.getElementById("dynamics-band-on-button");
    if (eButtonBandOn)
    {
        g_tDynamicsBypass[g_nControledDynamicsBandID] ? eButtonBandOn.classList.remove("dynamics-button-checked") : eButtonBandOn.classList.add("dynamics-button-checked");

        g_bDynamicsEnabled ? eButtonBandOn.classList.remove("dynamics-button-checked-disabled") : eButtonBandOn.classList.add("dynamics-button-checked-disabled");
    }

    var eButtonReset = document.getElementById("dynamics-reset-button");
    if (eButtonReset)
    {
        g_bDynamicsEnabled ? eButtonReset.classList.remove("dynamics-button-checked-disabled") : eButtonReset.classList.add("dynamics-button-checked-disabled");
    }

    var eButtonAutoGain = document.getElementById("dynamics-autogain-button");
    if (eButtonAutoGain)
    {
        jsDynamics.auto_gain ? eButtonAutoGain.classList.add("dynamics-button-checked") : eButtonAutoGain.classList.remove("dynamics-button-checked");

        g_bDynamicsEnabled ? eButtonAutoGain.classList.remove("dynamics-button-checked-disabled") : eButtonAutoGain.classList.add("dynamics-button-checked-disabled");
    }

    var eThresholdFaderKnob = document.getElementById("dynamics-threshold-fader-slider-knob");
    if (eThresholdFaderKnob)
    {
        nTresholdValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].threshold;
        eThresholdFaderKnob.style.top = DynamicsThresholdFaderGainToPosY(nTresholdValue) + "px";

        if (!g_bDynamicsEnabled && bNeumannEdition)
            eThresholdFaderKnob.innerText = "";
        else if (nTresholdValue == 0)
            eThresholdFaderKnob.innerText = "0";
        else
            eThresholdFaderKnob.innerText = nTresholdValue < -1000 ? Number(nTresholdValue / 10).toFixed(0) : Number(nTresholdValue / 10).toFixed(1);

        if (bNeumannEdition)
            g_bDynamicsEnabled ? eThresholdFaderKnob.classList.remove("dynamics-fader-slider-knob-disabled") : eThresholdFaderKnob.classList.add("dynamics-fader-slider-knob-disabled");


        var eSlider = document.getElementById("dynamics-threshold-fader-slider");
        if (eSlider)
        {
            var nSliderTop = bNeumannEdition ? 0 : DynamicsThresholdFaderGainToPosY(nTresholdValue) + g_nDynamicsKnobHeight + 4;
            var nSliderHeight = g_nDynamicsFaderHeight - nSliderTop;

            eSlider.style.top = nSliderTop + "px";
            eSlider.style.height = nSliderHeight < 0 ? "0px" : nSliderHeight + "px";
        }
    }

    var eThresholdScaleNumberMax = document.getElementById("dynamics-threshold-scale-number0");
    if (eThresholdScaleNumberMax)
    {
        eThresholdScaleNumberMax.innerText = Math.abs(Number(g_tDynamicsThresholdMax[g_nControledDynamicsBandID] / 10).toFixed(0));
    }

    var eThresholdScaleNumberMin = document.getElementById("dynamics-threshold-scale-number4");
    if (eThresholdScaleNumberMin)
    {
        eThresholdScaleNumberMin.innerText = Math.abs(Number(g_tDynamicsThresholdMin[g_nControledDynamicsBandID] / 10).toFixed(0));
    }


    var eMakeupFaderKnob = document.getElementById("dynamics-makeup-fader-slider-knob");
    if (eMakeupFaderKnob)
    {
        nMakeupGainValue = jsDynamics.gain;
        eMakeupFaderKnob.style.top = DynamicsMakeupFaderGainToPosY(nMakeupGainValue) + "px";

        if (!g_bDynamicsEnabled && bNeumannEdition)
            eMakeupFaderKnob.innerText = "";
        else if (nMakeupGainValue == 0)
            eMakeupFaderKnob.innerText = "0";
        else
            eMakeupFaderKnob.innerText = (nMakeupGainValue > 0 ? "+" : "") + Number(nMakeupGainValue / 10).toFixed(1);

        if (bNeumannEdition)
            g_bDynamicsEnabled ? eMakeupFaderKnob.classList.remove("dynamics-fader-slider-knob-disabled") : eMakeupFaderKnob.classList.add("dynamics-fader-slider-knob-disabled");


        var eSlider = document.getElementById("dynamics-makeup-fader-slider");
        if (eSlider)
        {
            var nSliderTop = bNeumannEdition ? 0 : DynamicsMakeupFaderGainToPosY(nMakeupGainValue) + g_nDynamicsKnobHeight + 4;
            var nSliderHeight = g_nDynamicsFaderHeight - nSliderTop;

            eSlider.style.top = nSliderTop + "px";
            eSlider.style.height = nSliderHeight < 0 ? "0px" : nSliderHeight + "px";
        }
    }


    // Threshold meters
    var eMeter0 = document.getElementById("dynamics-threshold-meter0");
    if (eMeter0)
    {
        (g_bStereoDynamics && g_nSidechainID == -1) ? eMeter0.classList.remove("dynamics-meter-hidden") : eMeter0.classList.add("dynamics-meter-hidden");
    }

    var eMeter0Mask = document.getElementById("dynamics-threshold-meter0-mask");
    if (eMeter0Mask)
    {
       if (!g_bDynamicsEnabled)
            eMeter0Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    var eMeter1 = document.getElementById("dynamics-threshold-meter1");
    if (eMeter1)
    {
        (g_bStereoDynamics && g_nSidechainID == -1) ? eMeter1.classList.remove("dynamics-meter-hidden") : eMeter1.classList.add("dynamics-meter-hidden");
    }

    var eMeter1Mask = document.getElementById("dynamics-threshold-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDynamicsEnabled)
            eMeter1Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    var eMeterMono = document.getElementById("dynamics-threshold-meter-mono");
    if (eMeterMono)
    {
        (g_bStereoDynamics && g_nSidechainID == -1) ? eMeterMono.classList.add("dynamics-meter-hidden") : eMeterMono.classList.remove("dynamics-meter-hidden");
    }  

    var eMeterMonoMask = document.getElementById("dynamics-threshold-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDynamicsEnabled)
            eMeterMonoMask.style.height = g_nDynamicsFaderHeight + "px";
    }


    // Input meters
    eMeter0 = document.getElementById("dynamics-input-meter0");
    if (eMeter0)
    {
        g_bStereoDynamics ? eMeter0.classList.remove("dynamics-meter-hidden") : eMeter0.classList.add("dynamics-meter-hidden");
    }

    eMeter0Mask = document.getElementById("dynamics-input-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDynamicsEnabled)
            eMeter0Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    eMeter1 = document.getElementById("dynamics-input-meter1");
    if (eMeter1)
    {
        g_bStereoDynamics ? eMeter1.classList.remove("dynamics-meter-hidden") : eMeter1.classList.add("dynamics-meter-hidden");
    }

    eMeter1Mask = document.getElementById("dynamics-input-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDynamicsEnabled)
            eMeter1Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    eMeterMono = document.getElementById("dynamics-input-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDynamics ? eMeterMono.classList.add("dynamics-meter-hidden") : eMeterMono.classList.remove("dynamics-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("dynamics-input-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDynamicsEnabled)
            eMeterMonoMask.style.height = g_nDynamicsFaderHeight + "px";
    }
    

    // Delta meters
    eMeter0 = document.getElementById("dynamics-delta-meter0");
    if (eMeter0)
    {
        g_bStereoDynamics ? eMeter0.classList.remove("dynamics-meter-hidden") : eMeter0.classList.add("dynamics-meter-hidden");
    }

    eMeter0Mask = document.getElementById("dynamics-delta-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDynamicsEnabled)
        {
            eMeter0Mask.style.height = g_nDynamicsFaderHeight + "px";
            eMeter0Mask.style.top = "0px";
        }
    }


    eMeter1 = document.getElementById("dynamics-delta-meter1");
    if (eMeter1)
    {
        g_bStereoDynamics ? eMeter1.classList.remove("dynamics-meter-hidden") : eMeter1.classList.add("dynamics-meter-hidden");
    }

    eMeter1Mask = document.getElementById("dynamics-delta-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDynamicsEnabled)
        {
            eMeter1Mask.style.height = g_nDynamicsFaderHeight + "px";
            eMeter1Mask.style.top = "0px";
        }
    }


    eMeterMono = document.getElementById("dynamics-delta-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDynamics ? eMeterMono.classList.add("dynamics-meter-hidden") : eMeterMono.classList.remove("dynamics-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("dynamics-delta-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDynamicsEnabled)
        {
            eMeterMonoMask.style.height = g_nDynamicsFaderHeight + "px";
            eMeterMonoMask.style.top = "0px";
        }
    }


    // Output meters
    eMeter0 = document.getElementById("dynamics-output-meter0");
    if (eMeter0)
    {
        g_bStereoDynamics ? eMeter0.classList.remove("dynamics-meter-hidden") : eMeter0.classList.add("dynamics-meter-hidden");
    }

    eMeter0Mask = document.getElementById("dynamics-output-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDynamicsEnabled)
            eMeter0Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    eMeter1 = document.getElementById("dynamics-output-meter1");
    if (eMeter1)
    {
        g_bStereoDynamics ? eMeter1.classList.remove("dynamics-meter-hidden") : eMeter1.classList.add("dynamics-meter-hidden");
    }

    eMeter1Mask = document.getElementById("dynamics-output-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDynamicsEnabled)
            eMeter1Mask.style.height = g_nDynamicsFaderHeight + "px";
    }


    eMeterMono = document.getElementById("dynamics-output-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDynamics ? eMeterMono.classList.add("dynamics-meter-hidden") : eMeterMono.classList.remove("dynamics-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("dynamics-output-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDynamicsEnabled)
            eMeterMonoMask.style.height = g_nDynamicsFaderHeight + "px";
    }

    UpdateSidechainListPopup();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetSidechainedByInputNames()
{
    var jsInputs = GetInputJSON(-1);
    if (jsInputs)
    {
        var tSidechainedByInputNames = [];
        for (var idx = 0; idx < jsInputs.length; idx++)
        {
            if (jsInputs[idx].dynamics)
            {
                if (jsInputs[idx].dynamics.enabled)
                {
                    if (jsInputs[idx].dynamics.dynamics_sidechain == g_nOnInputID)
                    {
                        var jsStrip = GetStripJSON(jsInputs[idx].id);
                        if (jsStrip)
                        {
                            tSidechainedByInputNames.push(jsStrip.name);
                        }
                    }
                }
            }
        }
    }

    return tSidechainedByInputNames;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDynamicsInputMeters(jsMeters)
{
    if (!g_bDynamicsEnabled)
        return;

    for (var idx = 0; idx < jsMeters.length; idx++)
    {
        const jsLevel = jsMeters[idx].levels;
        var nLevel = jsLevel[0];

        var nGain = MeterTodB(nLevel);

        if (g_nSidechainID != -1)
        {
            if (g_bInputEffect && jsMeters[idx].id == g_nSidechainID)
            {
                var eThresholdMonoMask = document.getElementById("dynamics-threshold-meter-mono-mask");
                if (eThresholdMonoMask)
                {
                    var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eThresholdMonoMask.style.height = nHeight + "px";
                }
            }
        }
        else
        {
            if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
            {
                if (g_bStereoDynamics)
                {
                    var eThresholdMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-threshold-meter0-mask") : document.getElementById("dynamics-threshold-meter1-mask");
                    if (eThresholdMask)
                    {
                        var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                        if (nHeight > g_nDynamicsFaderHeight)
                            nHeight = g_nDynamicsFaderHeight;

                        eThresholdMask.style.height = nHeight + "px";
                    }
                }
                else
                {
                    var eThresholdMonoMask = document.getElementById("dynamics-threshold-meter-mono-mask");
                    if (eThresholdMonoMask)
                    {
                        var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                        if (nHeight > g_nDynamicsFaderHeight)
                            nHeight = g_nDynamicsFaderHeight;

                        eThresholdMonoMask.style.height = nHeight + "px";
                    }
                }
            }
            else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDynamics)
            {
                var eThresholdMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-threshold-meter1-mask") : document.getElementById("dynamics-threshold-meter0-mask");
                if (eThresholdMask)
                {
                    var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eThresholdMask.style.height = nHeight + "px";
                }
            }
            else if (g_bBusEffect && g_bStereoDynamics)
            {
                if (jsMeters[idx].id == (g_nOnBusID * 2) || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2)))
                {
                    var eThresholdMask = document.getElementById("dynamics-threshold-meter0-mask");
                    if (eThresholdMask)
                    {
                        var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                        if (nHeight > g_nDynamicsFaderHeight)
                            nHeight = g_nDynamicsFaderHeight;

                        eThresholdMask.style.height = nHeight + "px";
                    }
                }

                if (jsMeters[idx].id == (g_nOnBusID * 2) + 1 || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2 + 1)))
                {
                    var eThresholdMask = document.getElementById("dynamics-threshold-meter1-mask");
                    if (eThresholdMask)
                    {
                        var nHeight = DynamicsThresholdFaderGainToPosY(nGain * 10) + g_nDynamicsThresholdScaleStepHeight;

                        if (nHeight > g_nDynamicsFaderHeight)
                            nHeight = g_nDynamicsFaderHeight;

                        eThresholdMask.style.height = nHeight + "px";
                    }
                }
            }
        }

        if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
        {
            if (g_bStereoDynamics)
            {
                var eInputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-input-meter0-mask") : document.getElementById("dynamics-input-meter1-mask");
                if (eInputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eInputMask.style.height = nHeight + "px";

                    g_tDynamicsInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }
            else
            {
                var eInputMonoMask = document.getElementById("dynamics-input-meter-mono-mask");
                if (eInputMonoMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eInputMonoMask.style.height = nHeight + "px";

                    g_nDynamicsInputMeterMonoValue = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }            
        }
        else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDynamics)
        {
            var eInputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-input-meter1-mask") : document.getElementById("dynamics-input-meter0-mask");
            if (eInputMask)
            {
                var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                if (nHeight > g_nDynamicsFaderHeight)
                    nHeight = g_nDynamicsFaderHeight;

                eInputMask.style.height = nHeight + "px";

                g_tDynamicsInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0] = nLevel;
                UpdateDynamicsDeltaMeters();
            }
        }
        else if (g_bBusEffect && g_bStereoDynamics)
        {
            if (jsMeters[idx].id == (g_nOnBusID * 2) || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2)))
            {
                var eInputMask = document.getElementById("dynamics-input-meter0-mask");
                if (eInputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eInputMask.style.height = nHeight + "px";

                    g_tDynamicsInputMetersValue[0] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }

            if (jsMeters[idx].id == (g_nOnBusID * 2) + 1 || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2 + 1)))
            {
                var eInputMask = document.getElementById("dynamics-input-meter1-mask");
                if (eInputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eInputMask.style.height = nHeight + "px";

                    g_tDynamicsInputMetersValue[1] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDynamicsDeltaMeters()
{
    if (!g_bDynamicsEnabled)
        return;

    if ((g_bInputEffect && g_bStereoDynamics) || (g_bBusEffect && g_bStereoDynamics))
    {
        var eDeltaMask;
        if (g_bInputEffect)
            eDeltaMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter0-mask") : document.getElementById("dynamics-delta-meter1-mask");
        else
            eDeltaMask = document.getElementById("dynamics-delta-meter0-mask");

        if (eDeltaMask)
        {
            var bComp = false;
            var bExp = false;


            var nInputLevel;
            if (g_bInputEffect)
                nInputLevel = g_tDynamicsInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1];
            else
                nInputLevel = g_tDynamicsInputMetersValue[0];


            var nOutputLevel;
            if (g_bInputEffect)
                nOutputLevel = g_tDynamicsOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1];
            else
                nOutputLevel = g_tDynamicsOutputMetersValue[0];
                
            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDynamicsFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight;
                nHeight = g_nDynamicsFaderHeight - (DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DynamicsRightScaleGainToPosY(0);
                nHeight = DynamicsRightScaleGainToPosY(-720) - (DynamicsRightScaleGainToPosY(-nDeltaGain * 10) - DynamicsRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDynamicsFaderHeight)
                nHeight = g_nDynamicsFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMask.style.top = nTop + "px";
            eDeltaMask.style.height = nHeight + "px";

            var eComp;
            if (g_bInputEffect)
                eComp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter0-comp") : document.getElementById("dynamics-delta-meter1-comp");
            else
                eComp = document.getElementById("dynamics-delta-meter0-comp");

            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }


            var eExp;
            if (g_bInputEffect)
                eExp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter0-exp") : document.getElementById("dynamics-delta-meter1-exp");
            else
                eExp = document.getElementById("dynamics-delta-meter0-exp");

            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }
    else if (g_bInputEffect && !g_bStereoDynamics)
    {
        var eDeltaMonoMask = document.getElementById("dynamics-delta-meter-mono-mask");
        if (eDeltaMonoMask)
        {
            var bComp = false;
            var bExp = false;

            var nInputLevel = g_nDynamicsInputMeterMonoValue;
            var nOutputLevel = g_nDynamicsOutputMeterMonoValue;

            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDynamicsFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight;
                nHeight = g_nDynamicsFaderHeight - (DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DynamicsRightScaleGainToPosY(0);
                nHeight = DynamicsRightScaleGainToPosY(-720) - (DynamicsRightScaleGainToPosY(-nDeltaGain * 10) - DynamicsRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDynamicsFaderHeight)
                nHeight = g_nDynamicsFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMonoMask.style.top = nTop + "px";
            eDeltaMonoMask.style.height = nHeight + "px";

            var eComp = document.getElementById("dynamics-delta-meter-mono-comp");
            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }

            var eExp = document.getElementById("dynamics-delta-meter-mono-exp");
            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }

    if ((g_bInputEffect && g_bStereoDynamics) || (g_bBusEffect && g_bStereoDynamics))
    {
        var eDeltaMask;
        if (g_bInputEffect)
            eDeltaMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter1-mask") : document.getElementById("dynamics-delta-meter0-mask");
        else
            eDeltaMask = document.getElementById("dynamics-delta-meter1-mask");

        if (eDeltaMask)
        {
            var bComp = false;
            var bExp = false;

            var nInputLevel;
            if (g_bInputEffect)
                nInputLevel = g_tDynamicsInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0];
            else
                nInputLevel = g_tDynamicsInputMetersValue[1];

            var nOutputLevel;
            if (g_bInputEffect)
                nOutputLevel = g_tDynamicsOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0];
            else
                nOutputLevel = g_tDynamicsOutputMetersValue[1];

            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDynamicsFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight;
                nHeight = g_nDynamicsFaderHeight - (DynamicsRightScaleGainToPosY(nDeltaGain * 10) + g_nDynamicsRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DynamicsRightScaleGainToPosY(0);
                nHeight = DynamicsRightScaleGainToPosY(-720) - (DynamicsRightScaleGainToPosY(-nDeltaGain * 10) - DynamicsRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDynamicsFaderHeight)
                nHeight = g_nDynamicsFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMask.style.top = nTop + "px";
            eDeltaMask.style.height = nHeight + "px";

            var eComp;
            if (g_bInputEffect)
                eComp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter1-comp") : document.getElementById("dynamics-delta-meter0-comp");
            else
                eComp = document.getElementById("dynamics-delta-meter1-comp");

            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }


            var eExp;
            if (g_bInputEffect)
                eExp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-delta-meter1-exp") : document.getElementById("dynamics-delta-meter0-exp");
            else
                eExp = document.getElementById("dynamics-delta-meter1-exp");

            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDynamicsOutputMeters(jsMeters)
{
    if (!g_bDynamicsEnabled)
        return;

    for (var idx = 0; idx < jsMeters.length; idx++)
    {
        const jsLevel = jsMeters[idx].levels;
        var nLevel = jsLevel[0];

        var nGain = MeterTodB(nLevel);

        if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
        {
            if (g_bStereoDynamics)
            {
                var eOutputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-output-meter0-mask") : document.getElementById("dynamics-output-meter1-mask");
                if (eOutputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eOutputMask.style.height = nHeight + "px";

                    g_tDynamicsOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }
            else
            {
                var eOutputMonoMask = document.getElementById("dynamics-output-meter-mono-mask");
                if (eOutputMonoMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eOutputMonoMask.style.height = nHeight + "px";

                    g_nDynamicsOutputMeterMonoValue = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }            
        }
        else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDynamics)
        {
            var eOutputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("dynamics-output-meter1-mask") : document.getElementById("dynamics-output-meter0-mask");
            if (eOutputMask)
            {
                var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                if (nHeight > g_nDynamicsFaderHeight)
                    nHeight = g_nDynamicsFaderHeight;

                eOutputMask.style.height = nHeight + "px";

                g_tDynamicsOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0] = nLevel;
                UpdateDynamicsDeltaMeters();
            }
        }
        else if (g_bBusEffect && g_bStereoDynamics)
        {
            if (jsMeters[idx].id == (g_nOnBusID * 2) || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2)))
            {
                var eOutputMask = document.getElementById("dynamics-output-meter0-mask");
                if (eOutputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eOutputMask.style.height = nHeight + "px";

                    g_tDynamicsOutputMetersValue[0] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }

            if (jsMeters[idx].id == (g_nOnBusID * 2) + 1 || (g_nOnBusID == MM_ID_DYNAMICS_BUS && jsMeters[idx].id == (MM_ID_DYNAMICS_BUS * 2 + 1)))
            {
                var eOutputMask = document.getElementById("dynamics-output-meter1-mask");
                if (eOutputMask)
                {
                    var nHeight = DynamicsRightScaleGainToPosY(nGain * 10) + g_nDynamicsRightScaleStepHeight;

                    if (nHeight > g_nDynamicsFaderHeight)
                        nHeight = g_nDynamicsFaderHeight;

                    eOutputMask.style.height = nHeight + "px";

                    g_tDynamicsOutputMetersValue[1] = nLevel;
                    UpdateDynamicsDeltaMeters();
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDeesser(nInputID)
{
    if (nInputID != g_nOnInputID)
        return;

    var DeesserEffectContainer = document.getElementById("DeesserEffectContainer");
    if (DeesserEffectContainer == null)
    {
        return;
    }


    var jsInput = jsInput = GetInputJSON(nInputID);
    if (jsInput == null)
    {
        return;
    }

    var jsStrip = GetStripJSON(nInputID);
    if (jsStrip == null)
    {
        return;
    }

    g_nLinkedInputID = jsInput.linked_input_id;
    

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }
    var bNeumannEdition = jsMixer.settings.neumann_edition;

    var nAvailableDeesser = jsMixer.dsp_ressources.available_deessers;
    

    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }


    g_bStereoDeesser = g_nLinkedInputID != -1 && jsDeesser.linked;
    g_bDeesserEnabled = jsDeesser.enabled;
    

    var eLinkButton = document.getElementById("deesser-link-button");
    if (eLinkButton)
    {
        eLinkButton.classList.remove("effect-button-disabled");
        eLinkButton.classList.remove("effect-link-button-checked");

        if (g_nLinkedInputID == -1)
            eLinkButton.classList.add("effect-button-disabled");
        else if (jsDeesser.linked)
            eLinkButton.classList.add("effect-link-button-checked");
    }

    var eOnButton = document.getElementById("deesser-on-button");
    if (eOnButton)
    {
        eOnButton.classList.remove("deesser-on-button-checked");
        eOnButton.classList.remove("effect-button-disabled");

        g_bDeesserEnabled ? eOnButton.classList.add("deesser-on-button-checked") : eOnButton.classList.remove("deesser-on-button-checked");

        if (!g_bDeesserEnabled && nAvailableDeesser < 1)
        {
            eOnButton.classList.remove("deesser-on-button-checked");
            eOnButton.classList.add("effect-button-disabled");
        }
    }

    if (document.getElementById("deesser-range-rotary"))
    {
        var bDisabled = !g_bDeesserEnabled;
        var eRangeCanvas = document.getElementById("deesser-range-rotary-canvas");
        if (eRangeCanvas)
        {
            DrawDeesserRangeRotary(eRangeCanvas, DEESSER_RANGE_MIN, DEESSER_RANGE_MAX, jsDeesser.range, g_szCapturedEffectRotaryControlElementId.includes("-range"), bDisabled);
        }

        var eRangeValue = document.getElementById("deesser-range-rotary-value");
        if (eRangeValue)
        {
            eRangeValue.innerText = g_bDeesserEnabled || !bNeumannEdition ? Number(jsDeesser.range / 10).toFixed(1) : "";
            bDisabled ? eRangeValue.classList.add("deesser-rotary-title-disabled") : eRangeValue.classList.remove("deesser-rotary-title-disabled");
        }
    }

    if (document.getElementById("deesser-freq-rotary"))
    {
        var eFreqCanvas = document.getElementById("deesser-freq-rotary-canvas");
        if (eFreqCanvas)
        {
            DrawDeesserRotary(eFreqCanvas, DEESSER_FREQUENCY_MIN, DEESSER_FREQUENCY_MAX, jsDeesser.freq, g_szCapturedEffectRotaryControlElementId.includes("-freq"), !g_bDeesserEnabled);
        }

        var eFreqTitle = document.getElementById("deesser-freq-rotary-title");
        if (eFreqTitle)
        {
            !g_bDeesserEnabled ? eFreqTitle.classList.add("deesser-rotary-title-disabled") : eFreqTitle.classList.remove("deesser-rotary-title-disabled");

            if (bNeumannEdition)
                eFreqTitle.innerText = g_bDeesserEnabled ? "F" : "";
        }

        var eFreqValue = document.getElementById("deesser-freq-value");
        if (eFreqValue)
        {
            if (!g_bDeesserEnabled)
                eFreqValue.innerText = bNeumannEdition ? "" : "---";
            else
                eFreqValue.innerText = Number(jsDeesser.freq / 1000).toFixed(1) + " kHz";
        }
    }

    if (document.getElementById("deesser-q-rotary"))
    {
        var eQCanvas = document.getElementById("deesser-q-rotary-canvas");
        if (eQCanvas)
        {
            DrawDeesserRotary(eQCanvas, DEESSER_Q_MIN, DEESSER_Q_MAX, jsDeesser.q, g_szCapturedEffectRotaryControlElementId.includes("-q"), !g_bDeesserEnabled || !jsDeesser.split);
        }

        var eQTitle = document.getElementById("deesser-q-rotary-title");
        if (eQTitle)
        {
            g_bDeesserEnabled && jsDeesser.split ? eQTitle.classList.remove("deesser-rotary-title-disabled") : eQTitle.classList.add("deesser-rotary-title-disabled");

            if (bNeumannEdition)
                eQTitle.innerText = g_bDeesserEnabled && jsDeesser.split ? "W" : "";
        }
    }

    if (document.getElementById("deesser-cursor"))
    {
        DrawDeesserCursor(jsDeesser.freq, jsDeesser.q, jsDeesser.split, g_bDeesserEnabled);
    }


    var eButtonListen = document.getElementById("deesser-listen-button");
    if (eButtonListen)
    {
        jsDeesser.listen ? eButtonListen.classList.add("deesser-button-checked") : eButtonListen.classList.remove("deesser-button-checked");

        g_bDeesserEnabled ? eButtonListen.classList.remove("deesser-button-checked-disabled") : eButtonListen.classList.add("deesser-button-checked-disabled");
    }

    var eButtonFilter = document.getElementById("deesser-filter-button");
    if (eButtonFilter)
    {
        jsDeesser.split ? eButtonFilter.classList.add("deesser-button-checked") : eButtonFilter.classList.remove("deesser-button-checked");

        g_bDeesserEnabled ? eButtonFilter.classList.remove("deesser-button-checked-disabled") : eButtonFilter.classList.add("deesser-button-checked-disabled");

        var eButtonFilterLine1 = document.getElementById("deesser-filter-button-line1");
        if (eButtonFilterLine1)
        {
            eButtonFilterLine1.innerText = (jsDeesser.split ? "BAND" : "HIGH");
        }
    }


    var eThresholdFaderKnob = document.getElementById("deesser-threshold-fader-slider-knob");
    if (eThresholdFaderKnob)
    {
        nTresholdValue = jsDeesser.threshold;
        eThresholdFaderKnob.style.top = DeesserThresholdFaderGainToPosY(nTresholdValue) + "px";

        if (!g_bDeesserEnabled && bNeumannEdition)
            eThresholdFaderKnob.innerText = "";
        else if (nTresholdValue == 0)
            eThresholdFaderKnob.innerText = "0";
        else
            eThresholdFaderKnob.innerText = nTresholdValue < -1000 ? Number(nTresholdValue / 10).toFixed(0) : Number(nTresholdValue / 10).toFixed(1);

        if (bNeumannEdition)
            g_bDeesserEnabled ? eThresholdFaderKnob.classList.remove("deesser-fader-slider-knob-disabled") : eThresholdFaderKnob.classList.add("deesser-fader-slider-knob-disabled");

        var eSlider = document.getElementById("deesser-threshold-fader-slider");
        if (eSlider)
        {
            var nSliderTop = bNeumannEdition ? 0 : DeesserThresholdFaderGainToPosY(nTresholdValue) + g_nDeesserKnobHeight + 4;
            var nSliderHeight = g_nDeesserFaderHeight - nSliderTop;

            eSlider.style.top = nSliderTop + "px";
            eSlider.style.height = nSliderHeight < 0 ? "0px" : nSliderHeight + "px";
        }
    }


    // Threshold meters
    var eMeter0 = document.getElementById("deesser-threshold-meter0");
    if (eMeter0)
    {
        (g_bStereoDeesser) ? eMeter0.classList.remove("deesser-meter-hidden") : eMeter0.classList.add("deesser-meter-hidden");
    }

    var eMeter0Mask = document.getElementById("deesser-threshold-meter0-mask");
    if (eMeter0Mask)
    {
       if (!g_bDeesserEnabled)
            eMeter0Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    var eMeter1 = document.getElementById("deesser-threshold-meter1");
    if (eMeter1)
    {
        (g_bStereoDeesser) ? eMeter1.classList.remove("deesser-meter-hidden") : eMeter1.classList.add("deesser-meter-hidden");
    }

    var eMeter1Mask = document.getElementById("deesser-threshold-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDeesserEnabled)
            eMeter1Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    var eMeterMono = document.getElementById("deesser-threshold-meter-mono");
    if (eMeterMono)
    {
        (g_bStereoDeesser) ? eMeterMono.classList.add("deesser-meter-hidden") : eMeterMono.classList.remove("deesser-meter-hidden");
    }  

    var eMeterMonoMask = document.getElementById("deesser-threshold-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDeesserEnabled)
            eMeterMonoMask.style.height = g_nDeesserFaderHeight + "px";
    }


    // Input meters
    eMeter0 = document.getElementById("deesser-input-meter0");
    if (eMeter0)
    {
        g_bStereoDeesser ? eMeter0.classList.remove("deesser-meter-hidden") : eMeter0.classList.add("deesser-meter-hidden");
    }

    eMeter0Mask = document.getElementById("deesser-input-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDeesserEnabled)
            eMeter0Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    eMeter1 = document.getElementById("deesser-input-meter1");
    if (eMeter1)
    {
        g_bStereoDeesser ? eMeter1.classList.remove("deesser-meter-hidden") : eMeter1.classList.add("deesser-meter-hidden");
    }

    eMeter1Mask = document.getElementById("deesser-input-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDeesserEnabled)
            eMeter1Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    eMeterMono = document.getElementById("deesser-input-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDeesser ? eMeterMono.classList.add("deesser-meter-hidden") : eMeterMono.classList.remove("deesser-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("deesser-input-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDeesserEnabled)
            eMeterMonoMask.style.height = g_nDeesserFaderHeight + "px";
    }
    

    // Delta meters
    eMeter0 = document.getElementById("deesser-delta-meter0");
    if (eMeter0)
    {
        g_bStereoDeesser ? eMeter0.classList.remove("deesser-meter-hidden") : eMeter0.classList.add("deesser-meter-hidden");
    }

    eMeter0Mask = document.getElementById("deesser-delta-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDeesserEnabled)
        {
            eMeter0Mask.style.height = g_nDeesserFaderHeight + "px";
            eMeter0Mask.style.top = "0px";
        }
    }


    eMeter1 = document.getElementById("deesser-delta-meter1");
    if (eMeter1)
    {
        g_bStereoDeesser ? eMeter1.classList.remove("deesser-meter-hidden") : eMeter1.classList.add("deesser-meter-hidden");
    }

    eMeter1Mask = document.getElementById("deesser-delta-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDeesserEnabled)
        {
            eMeter1Mask.style.height = g_nDeesserFaderHeight + "px";
            eMeter1Mask.style.top = "0px";
        }
    }


    eMeterMono = document.getElementById("deesser-delta-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDeesser ? eMeterMono.classList.add("deesser-meter-hidden") : eMeterMono.classList.remove("deesser-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("deesser-delta-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDeesserEnabled)
        {
            eMeterMonoMask.style.height = g_nDeesserFaderHeight + "px";
            eMeterMonoMask.style.top = "0px";
        }
    }


    // Output meters
    eMeter0 = document.getElementById("deesser-output-meter0");
    if (eMeter0)
    {
        g_bStereoDeesser ? eMeter0.classList.remove("deesser-meter-hidden") : eMeter0.classList.add("deesser-meter-hidden");
    }

    eMeter0Mask = document.getElementById("deesser-output-meter0-mask");
    if (eMeter0Mask)
    {
        if (!g_bDeesserEnabled)
            eMeter0Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    eMeter1 = document.getElementById("deesser-output-meter1");
    if (eMeter1)
    {
        g_bStereoDeesser ? eMeter1.classList.remove("deesser-meter-hidden") : eMeter1.classList.add("deesser-meter-hidden");
    }

    eMeter1Mask = document.getElementById("deesser-output-meter1-mask");
    if (eMeter1Mask)
    {
        if (!g_bDeesserEnabled)
            eMeter1Mask.style.height = g_nDeesserFaderHeight + "px";
    }


    eMeterMono = document.getElementById("deesser-output-meter-mono");
    if (eMeterMono)
    {
        g_bStereoDeesser ? eMeterMono.classList.add("deesser-meter-hidden") : eMeterMono.classList.remove("deesser-meter-hidden");
    }  

    eMeterMonoMask = document.getElementById("deesser-output-meter-mono-mask");
    if (eMeterMonoMask)
    {
        if (!g_bDeesserEnabled)
            eMeterMonoMask.style.height = g_nDeesserFaderHeight + "px";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDeesserInputMeters(jsMeters)
{
    if (!g_bDeesserEnabled)
        return;

    for (var idx = 0; idx < jsMeters.length; idx++)
    {
        const jsLevel = jsMeters[idx].levels;
        var nLevel = jsLevel[0];

        var nGain = MeterTodB(nLevel);


        if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
        {
            if (g_bStereoDeesser)
            {
                var eThresholdMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-threshold-meter0-mask") : document.getElementById("deesser-threshold-meter1-mask");
                if (eThresholdMask)
                {
                    var nHeight = DeesserThresholdFaderGainToPosY(nGain * 10) + g_nDeesserThresholdScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eThresholdMask.style.height = nHeight + "px";
                }
            }
            else
            {
                var eThresholdMonoMask = document.getElementById("deesser-threshold-meter-mono-mask");
                if (eThresholdMonoMask)
                {
                    var nHeight = DeesserThresholdFaderGainToPosY(nGain * 10) + g_nDeesserThresholdScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eThresholdMonoMask.style.height = nHeight + "px";
                }
            }
        }
        else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDeesser)
        {
            var eThresholdMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-threshold-meter1-mask") : document.getElementById("deesser-threshold-meter0-mask");
            if (eThresholdMask)
            {
                var nHeight = DeesserThresholdFaderGainToPosY(nGain * 10) + g_nDeesserThresholdScaleStepHeight;

                if (nHeight > g_nDeesserFaderHeight)
                    nHeight = g_nDeesserFaderHeight;

                eThresholdMask.style.height = nHeight + "px";
            }
        }
        

        if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
        {
            if (g_bStereoDeesser)
            {
                var eInputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-input-meter0-mask") : document.getElementById("deesser-input-meter1-mask");
                if (eInputMask)
                {
                    var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eInputMask.style.height = nHeight + "px";

                    g_tDeesserInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1] = nLevel;
                    UpdateDeesserDeltaMeters();
                }
            }
            else
            {
                var eInputMonoMask = document.getElementById("deesser-input-meter-mono-mask");
                if (eInputMonoMask)
                {
                    var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eInputMonoMask.style.height = nHeight + "px";

                    g_nDeesserInputMeterMonoValue = nLevel;
                    UpdateDeesserDeltaMeters();
                }
            }            
        }
        else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDeesser)
        {
            var eInputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-input-meter1-mask") : document.getElementById("deesser-input-meter0-mask");
            if (eInputMask)
            {
                var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                if (nHeight > g_nDeesserFaderHeight)
                    nHeight = g_nDeesserFaderHeight;

                eInputMask.style.height = nHeight + "px";

                g_tDeesserInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0] = nLevel;
                UpdateDeesserDeltaMeters();
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDeesserDeltaMeters()
{
    if (!g_bDeesserEnabled)
        return;

    if (g_bInputEffect && g_bStereoDeesser)
    {
        var eDeltaMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter0-mask") : document.getElementById("deesser-delta-meter1-mask");
        if (eDeltaMask)
        {
            var bComp = false;
            var bExp = false;

            var nInputLevel = g_tDeesserInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1];
            var nOutputLevel = g_tDeesserOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1];
                
            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDeesserFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight;
                nHeight = g_nDeesserFaderHeight - (DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DeesserRightScaleGainToPosY(0);
                nHeight = DeesserRightScaleGainToPosY(-720) - (DeesserRightScaleGainToPosY(-nDeltaGain * 10) - DeesserRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDeesserFaderHeight)
                nHeight = g_nDeesserFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMask.style.top = nTop + "px";
            eDeltaMask.style.height = nHeight + "px";

            var eComp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter0-comp") : document.getElementById("deesser-delta-meter1-comp");
            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }

            var eExp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter0-exp") : document.getElementById("deesser-delta-meter1-exp");
            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }
    else if (g_bInputEffect && !g_bStereoDeesser)
    {
        var eDeltaMonoMask = document.getElementById("deesser-delta-meter-mono-mask");
        if (eDeltaMonoMask)
        {
            var bComp = false;
            var bExp = false;

            var nInputLevel = g_nDeesserInputMeterMonoValue;
            var nOutputLevel = g_nDeesserOutputMeterMonoValue;

            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDeesserFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight;
                nHeight = g_nDeesserFaderHeight - (DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DeesserRightScaleGainToPosY(0);
                nHeight = DeesserRightScaleGainToPosY(-720) - (DeesserRightScaleGainToPosY(-nDeltaGain * 10) - DeesserRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDeesserFaderHeight)
                nHeight = g_nDeesserFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMonoMask.style.top = nTop + "px";
            eDeltaMonoMask.style.height = nHeight + "px";

            var eComp = document.getElementById("deesser-delta-meter-mono-comp");
            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }

            var eExp = document.getElementById("deesser-delta-meter-mono-exp");
            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }

    if (g_bInputEffect && g_bStereoDeesser)
    {
        var eDeltaMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter1-mask") : document.getElementById("deesser-delta-meter0-mask");
        if (eDeltaMask)
        {
            var bComp = false;
            var bExp = false;

            var nInputLevel = g_tDeesserInputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0];
            var nOutputLevel = g_tDeesserOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0];

            var nOutputGain = MeterTodB(nOutputLevel);
            var nInputGain = MeterTodB(nInputLevel);
            var nDeltaGain = nOutputGain - nInputGain;

            var nTop;
            var nHeight;
            if (nOutputGain == nInputGain)
            {
                nTop = 0;
                nHeight = g_nDeesserFaderHeight;
            }
            else if (nOutputGain < nInputGain) // comp
            {
                nTop = DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight;
                nHeight = g_nDeesserFaderHeight - (DeesserRightScaleGainToPosY(nDeltaGain * 10) + g_nDeesserRightScaleStepHeight);

                bComp = true;
            }
            else if (nOutputGain > nInputGain) // exp
            {
                nTop = DeesserRightScaleGainToPosY(0);
                nHeight = DeesserRightScaleGainToPosY(-720) - (DeesserRightScaleGainToPosY(-nDeltaGain * 10) - DeesserRightScaleGainToPosY(0));

                bExp = true;
            }

            if (nTop + nHeight > g_nDeesserFaderHeight)
                nHeight = g_nDeesserFaderHeight - nTop;

            nHeight = Math.max(0, nHeight);

            eDeltaMask.style.top = nTop + "px";
            eDeltaMask.style.height = nHeight + "px";

            var eComp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter1-comp") : document.getElementById("deesser-delta-meter0-comp");
            if (eComp)
            {
                eComp.style.zIndex = bComp ? 10 : 0;
            }

            var eExp = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-delta-meter1-exp") : document.getElementById("deesser-delta-meter0-exp");
            if (eExp)
            {
                eExp.style.zIndex = bExp ? 10 : 0;
            }
        }
    }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateDeesserOutputMeters(jsMeters)
{
    if (!g_bDeesserEnabled)
        return;

    for (var idx = 0; idx < jsMeters.length; idx++)
    {
        const jsLevel = jsMeters[idx].levels;
        var nLevel = jsLevel[0];

        var nGain = MeterTodB(nLevel);

        if (g_bInputEffect && jsMeters[idx].id == g_nOnInputID)
        {
            if (g_bStereoDeesser)
            {
                var eOutputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-output-meter0-mask") : document.getElementById("deesser-output-meter1-mask");
                if (eOutputMask)
                {
                    var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eOutputMask.style.height = nHeight + "px";

                    g_tDeesserOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 0 : 1] = nLevel;
                    UpdateDeesserDeltaMeters();
                }
            }
            else
            {
                var eOutputMonoMask = document.getElementById("deesser-output-meter-mono-mask");
                if (eOutputMonoMask)
                {
                    var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                    if (nHeight > g_nDeesserFaderHeight)
                        nHeight = g_nDeesserFaderHeight;

                    eOutputMonoMask.style.height = nHeight + "px";

                    g_nDeesserOutputMeterMonoValue = nLevel;
                    UpdateDeesserDeltaMeters();
                }
            }            
        }
        else if (g_bInputEffect && jsMeters[idx].id == g_nLinkedInputID && g_bStereoDeesser)
        {
            var eOutputMask = g_nOnInputID < g_nLinkedInputID ? document.getElementById("deesser-output-meter1-mask") : document.getElementById("deesser-output-meter0-mask");
            if (eOutputMask)
            {
                var nHeight = DeesserRightScaleGainToPosY(nGain * 10) + g_nDeesserRightScaleStepHeight;

                if (nHeight > g_nDeesserFaderHeight)
                    nHeight = g_nDeesserFaderHeight;

                eOutputMask.style.height = nHeight + "px";

                g_tDeesserOutputMetersValue[g_nOnInputID < g_nLinkedInputID ? 1 : 0] = nLevel;
                UpdateDeesserDeltaMeters();
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateReverb(bBusEffect, nBusID, bInputEffect, nInputID)
{
    if (bBusEffect && nBusID != g_nOnBusID)
        return;

    if (bInputEffect && nInputID != g_nOnInputID)
        return;

    var ReverbEffectContainer = document.getElementById("ReverbEffectContainer");
    if (ReverbEffectContainer == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;


    var jsInput;
    var nLinkedInputID = -1;
    if (bInputEffect)
    {
        jsInput = GetInputJSON(nInputID);
        if (jsInput == null)
        {
            return;
        }

        var jsStrip = GetStripJSON(nInputID);
        if (jsStrip == null)
        {
            return;
        }

        nLinkedInputID = jsInput.linked_input_id;
    }


    var jsReverb = GetReverbJSON(nBusID);
    if (jsReverb == null)
    {
        return;
    }


    var eOnButton = document.getElementById("reverb-on-button");
    if (eOnButton)
    {
        jsReverb.enabled ? eOnButton.classList.add("reverb-on-button-checked") : eOnButton.classList.remove("reverb-on-button-checked");
    }

    if (document.getElementById("reverb-lowCut-rotary"))
    {
        var eLowCutCanvas = document.getElementById("reverb-lowCut-rotary-canvas");
        if (eLowCutCanvas)
        {
            DrawReverbFrequencyRotary(eLowCutCanvas, jsReverb.reverb_params.low_cut, g_szCapturedEffectRotaryControlElementId.includes("-lowCut"), false, REVERB_COLOR);
        }

        var eLowCutValue = document.getElementById("reverb-lowCut-rotary-value");
        if (eLowCutValue)
        {
            var nLowCut = jsReverb.reverb_params.low_cut;
            var szValue;

            if (nLowCut > 1000)
                szValue = Number.parseFloat(nLowCut / 1000).toFixed(1) + (bNeumannEdition ? "\nkHz" : " kHz");
            else
                szValue = nLowCut + (bNeumannEdition ? "\nHz" : " Hz");

            eLowCutValue.innerText = szValue;
        }
    }

    if (document.getElementById("reverb-highCut-rotary"))
    {
        var eHighCutCanvas = document.getElementById("reverb-highCut-rotary-canvas");
        if (eHighCutCanvas)
        {
            DrawReverbFrequencyRotary(eHighCutCanvas, jsReverb.reverb_params.high_cut, g_szCapturedEffectRotaryControlElementId.includes("-highCut"), false, REVERB_COLOR);
        }

        var eHighCutValue = document.getElementById("reverb-highCut-rotary-value");
        if (eHighCutValue)
        {
            var nHighCut = jsReverb.reverb_params.high_cut;
            var szValue;

            if (nHighCut > 1000)
                szValue = Number.parseFloat(nHighCut / 1000).toFixed(1) + (bNeumannEdition ? "\nkHz" : " kHz");
            else
                szValue = nHighCut + (bNeumannEdition ? "\nHz" : " Hz");

            eHighCutValue.innerText = szValue;
        }
    }

    if (document.getElementById("reverb-size-rotary"))
    {
        var eSizeCanvas = document.getElementById("reverb-size-rotary-canvas");
        if (eSizeCanvas)
        {
            DrawLinearRotary(eSizeCanvas, jsReverb.reverb_params.size, g_szCapturedEffectRotaryControlElementId.includes("-size"), false);
        }
    }

    if (document.getElementById("reverb-predelay-rotary"))
    {
        var ePredelayCanvas = document.getElementById("reverb-predelay-rotary-canvas");
        if (ePredelayCanvas)
        {
            DrawPredelayRotary(ePredelayCanvas, jsReverb.reverb_params.pre_delay, g_szCapturedEffectRotaryControlElementId.includes("-predelay"), false);
        }

        var ePredelayValue = document.getElementById("reverb-predelay-rotary-value");
        if (ePredelayValue)
        {
            ePredelayValue.innerText = jsReverb.reverb_params.pre_delay + (bNeumannEdition ? "\nms" : " ms");
        }
    }

    if (document.getElementById("reverb-decay-rotary"))
    {
        var eDecayCanvas = document.getElementById("reverb-decay-rotary-canvas");
        if (eDecayCanvas)
        {
            DrawLinearRotary(eDecayCanvas, jsReverb.reverb_params.decay, g_szCapturedEffectRotaryControlElementId.includes("-decay"), false);
        }

        var eDecayValue = document.getElementById("reverb-decay-rotary-value");
        if (eDecayValue)
        {
            eDecayValue.innerText = jsReverb.reverb_params.decay + (bNeumannEdition ? "\n%" : "%");
        }
    }

    if (document.getElementById("reverb-diffusion-rotary"))
    {
        var eDiffusionCanvas = document.getElementById("reverb-diffusion-rotary-canvas");
        if (eDiffusionCanvas)
        {
            DrawLinearRotary(eDiffusionCanvas, jsReverb.reverb_params.diffusion, g_szCapturedEffectRotaryControlElementId.includes("-diffusion"), false);
        }

        var eDiffusionValue = document.getElementById("reverb-diffusion-rotary-value");
        if (eDiffusionValue)
        {
            eDiffusionValue.innerText = jsReverb.reverb_params.diffusion + (bNeumannEdition ? "\n%" : "%");
        }
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateEventideBlackhole(bBusEffect, nBusID, bInputEffect, nInputID)
{
    if (bBusEffect && nBusID != g_nOnBusID)
        return;

    if (bInputEffect && nInputID != g_nOnInputID)
        return;

    var EventideBlackholeEffectContainer = document.getElementById("EventideBlackholeEffectContainer");
    if (EventideBlackholeEffectContainer == null)
    {
        return;
    }

    var jsReverb = GetReverbJSON(nBusID);
    if (jsReverb == null)
    {
        return;
    }

    var eOnButton = document.getElementById("eventide-blackhole-on-button");
    if (eOnButton)
    {
        jsReverb.enabled ? eOnButton.classList.add("eventide-blackhole-on-button-checked") : eOnButton.classList.remove("eventide-blackhole-on-button-checked");
    }


    var eMixCanvas = document.getElementById("eventide-blackhole-mix-rotary-canvas");
    if (eMixCanvas)
    {
        DrawEventideBlackholeRotary(eMixCanvas, jsReverb.eventide_blackhole_params.mix, g_szCapturedEffectRotaryControlElementId.includes("-mix"), false, ERRM_WRAP);
    }
    var eMixValue = document.getElementById("eventide-blackhole-mix-value");
    if (eMixValue)
    {
        eMixValue.innerText = jsReverb.eventide_blackhole_params.mix;
    }


    var eSizeCanvas = document.getElementById("eventide-blackhole-size-rotary-canvas");
    if (eSizeCanvas)
    {
        DrawEventideBlackholeRotary(eSizeCanvas, jsReverb.eventide_blackhole_params.size, g_szCapturedEffectRotaryControlElementId.includes("-size"), false, ERRM_WRAP);
    }
    var eSizeValue = document.getElementById("eventide-blackhole-size-value");
    if (eSizeValue)
    {
        eSizeValue.innerText = jsReverb.eventide_blackhole_params.size;
    }


    var ePredelayCanvas = document.getElementById("eventide-blackhole-predelay-rotary-canvas");
    if (ePredelayCanvas)
    {
        DrawEventideBlackholeRotary(ePredelayCanvas, jsReverb.eventide_blackhole_params.pre_delay, g_szCapturedEffectRotaryControlElementId.includes("-predelay"), false, ERRM_WRAP);
    }
    var ePredelayValue = document.getElementById("eventide-blackhole-predelay-value");
    if (ePredelayValue)
    {
        ePredelayValue.innerText = jsReverb.eventide_blackhole_params.pre_delay;
    }


    var eLowLevelCanvas = document.getElementById("eventide-blackhole-low-level-rotary-canvas");
    if (eLowLevelCanvas)
    {
        DrawEventideBlackholeRotary(eLowLevelCanvas, jsReverb.eventide_blackhole_params.low_level, g_szCapturedEffectRotaryControlElementId.includes("-low-level"), false, ERRM_BOOST_CUT);
    }
    var eLowLevelValue = document.getElementById("eventide-blackhole-low-level-value");
    if (eLowLevelValue)
    {
        eLowLevelValue.innerText = jsReverb.eventide_blackhole_params.low_level * 2 - 100;
    }


    var eHighLevelCanvas = document.getElementById("eventide-blackhole-high-level-rotary-canvas");
    if (eHighLevelCanvas)
    {
        DrawEventideBlackholeRotary(eHighLevelCanvas, jsReverb.eventide_blackhole_params.high_level, g_szCapturedEffectRotaryControlElementId.includes("-high-level"), false, ERRM_BOOST_CUT);
    }
    var eHighLevelValue = document.getElementById("eventide-blackhole-high-level-value");
    if (eHighLevelValue)
    {
        eHighLevelValue.innerText = jsReverb.eventide_blackhole_params.high_level * 2 - 100;
    }


    var eInvGravityCanvas = document.getElementById("eventide-blackhole-inv-gravity-rotary-canvas");
    if (eInvGravityCanvas)
    {
        DrawEventideBlackholeRotary(eInvGravityCanvas, jsReverb.eventide_blackhole_params.inv_gravity, g_szCapturedEffectRotaryControlElementId.includes("-inv-gravity"), false, ERRM_BOOST_CUT);
    }
    var eInvGravityValue = document.getElementById("eventide-blackhole-inv-gravity-value");
    if (eInvGravityValue)
    {
        eInvGravityValue.innerText = jsReverb.eventide_blackhole_params.inv_gravity * 2 - 100;
    }


    var eModDepthCanvas = document.getElementById("eventide-blackhole-mod-depth-rotary-canvas");
    if (eModDepthCanvas)
    {
        DrawEventideBlackholeRotary(eModDepthCanvas, jsReverb.eventide_blackhole_params.mod_depth, g_szCapturedEffectRotaryControlElementId.includes("-mod-depth"), false, ERRM_WRAP);
    }
    var eModDepthValue = document.getElementById("eventide-blackhole-mod-depth-value");
    if (eModDepthValue)
    {
        eModDepthValue.innerText = jsReverb.eventide_blackhole_params.mod_depth;
    }


    var eModRateCanvas = document.getElementById("eventide-blackhole-mod-rate-rotary-canvas");
    if (eModRateCanvas)
    {
        DrawEventideBlackholeRotary(eModRateCanvas, jsReverb.eventide_blackhole_params.mod_rate, g_szCapturedEffectRotaryControlElementId.includes("-mod-rate"), false, ERRM_WRAP);
    }
    var eModRateValue = document.getElementById("eventide-blackhole-mod-rate-value");
    if (eModRateValue)
    {
        eModRateValue.innerText = jsReverb.eventide_blackhole_params.mod_rate;
    }


    var eFeedbackCanvas = document.getElementById("eventide-blackhole-feedback-rotary-canvas");
    if (eFeedbackCanvas)
    {
        DrawEventideBlackholeRotary(eFeedbackCanvas, jsReverb.eventide_blackhole_params.feedback, g_szCapturedEffectRotaryControlElementId.includes("-feedback"), false, ERRM_WRAP);
    }
    var eFeedbackValue = document.getElementById("eventide-blackhole-feedback-value");
    if (eFeedbackValue)
    {
        var nValue = jsReverb.eventide_blackhole_params.feedback;
        //eFeedbackValue.innerText = nValue == 100 ? "INFINITE" : nValue;
        eFeedbackValue.innerText = Math.floor(nValue / 99. * 100); // ANUBIS-1244: workaround
    }


    var eResonanceCanvas = document.getElementById("eventide-blackhole-resonance-rotary-canvas");
    if (eResonanceCanvas)
    {
        DrawEventideBlackholeRotary(eResonanceCanvas, jsReverb.eventide_blackhole_params.resonance, g_szCapturedEffectRotaryControlElementId.includes("-resonance"), false, ERRM_WRAP);
    }
    var eResonanceValue = document.getElementById("eventide-blackhole-resonance-value");
    if (eResonanceValue)
    {
        eResonanceValue.innerText = jsReverb.eventide_blackhole_params.resonance;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseEffects()
{
    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection)
    {
        if (eEffectsSection.classList.contains("visible"))
        {
            eEffectsSection.classList.remove("visible");
            effectsSection.innerHTML = "";
        }
    }

    g_bBusEffect = false;
    g_nOnBusID = -1;

    g_bInputEffect = false;
    g_nOnInputID = -1;
    g_nLinkedInputID = -1;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildDeesser()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }


    var nEffectMargin = g_nElementsBorderWidth * 2;
    var nEffectWidth = g_nStripWidth * 7.6 - nEffectMargin * 2;
    var nEffectHeight = g_nStripWidth * 5.5 - nEffectMargin * 2;

    var nDeesserTop = nEffectMargin;
    var nDeesserLeft = nEffectMargin;

    var nHeaderButtonWidth = ((nEffectWidth / 2) - g_nElementsBorderWidth * 14) / 3;
    var nRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 5;
    var nRotaryHeight = nRotaryWidth;
    var nRatioRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 2.8;
    var nButtonWidth = nRotaryWidth * 2.1 / 3 - g_nElementsBorderWidth * 2;

    g_nDeesserFaderHeight = nEffectHeight - (nEffectHeight / 12) - nButtonWidth - g_nElementsBorderWidth - 20;

    var nKnobBorderWidth = 2;
    var nKnobWidth = nButtonWidth - nKnobBorderWidth * (bNeumannEdition ? 9 : 3);
    g_nDeesserKnobHeight = nKnobWidth / (bNeumannEdition ? 2.2 : 2.7);

    g_nDeesserThresholdScaleStepHeight = (g_nDeesserFaderHeight - g_nDeesserKnobHeight) / (4 * 4); // 4 step by scale slot (4)
    g_nDeesserThresholdPos0dB = DeesserThresholdFaderGainToPosY(0) + g_nDeesserThresholdScaleStepHeight;
    g_nDeesserThresholdPos18dB = DeesserThresholdFaderGainToPosY(-180) + g_nDeesserThresholdScaleStepHeight;

    g_nDeesserRightScaleStepHeight = (g_nDeesserFaderHeight - g_nDeesserKnobHeight) / (3 * 5); // 3 step by scale slot (5)
    var nDeesserRightScalePos0dB = DeesserRightScaleGainToPosY(0) + g_nDeesserRightScaleStepHeight;
    var nDeesserRightScalePos3dB = DeesserRightScaleGainToPosY(-30) + g_nDeesserRightScaleStepHeight;
    var nDeesserRightScalePos18dB = DeesserRightScaleGainToPosY(-180) + g_nDeesserRightScaleStepHeight;

    var nMergingTextWidth = 90;
    var nDeesserTextWidth = 89;
    

    var szEffectTitleStyle = "style='top: " + nDeesserTop + "px; height:" + (nEffectHeight / 12) + "px; line-height: " + (nEffectHeight / 12) + "px;";
    var szHeaderButtonStyle = "style='top: " + nDeesserTop + "px; width: " + nHeaderButtonWidth + "px; height:" + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px; line-height: " + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px;";

    var szRangeTitleStyle = "style='top: " + (nDeesserTop + nRatioRotaryWidth * 1.15) + "px; left: " + (nDeesserLeft + nEffectWidth / 2 - nRatioRotaryWidth / 2 - g_nElementsBorderWidth + 2) + "px;'";
    var szRangeStyle = "style='top: " + (nDeesserTop + nRatioRotaryWidth / 3.4) + "px; left: " + (nDeesserLeft + nEffectWidth / 2 - nRatioRotaryWidth / 2 - g_nElementsBorderWidth + 1) + "px;'";

    var szFreqValueStyle = "style='top: " + (nDeesserTop + nRatioRotaryWidth * 1.45) + "px; left: " + (nDeesserLeft + nEffectWidth / 2 - nRatioRotaryWidth / 2 - g_nElementsBorderWidth + 1) + "px;'";

    var szRotaryStyle = "style='top: " + (nDeesserTop + nEffectHeight - nRotaryHeight * 1.45 - 10) + "px;";

    var szButtonListenStyle = "style='top: " + (nDeesserTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDeesserLeft + nEffectMargin) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px; line-height: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px;'";
    var szButtonFilterStyle = "style='top: " + (nDeesserTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDeesserLeft + nEffectWidth - nEffectMargin - nButtonWidth) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px;'";

    var szThresholdFaderStyle = "style='top: " + (nDeesserTop + (nEffectHeight / 12) + 12) + "px; left: " + nDeesserLeft + "px; width: " + nKnobWidth + "px; height: " + g_nDeesserFaderHeight + "px;'";
    var szThresholdKnobStyle = "style='left: " + (nKnobBorderWidth * 1.5) + "px; width: " + (nKnobWidth - nKnobBorderWidth * 3) + "px; height: " + g_nDeesserKnobHeight + "px; line-height: " + g_nDeesserKnobHeight + "px;'";
    var szThresholdSliderStyle = "style='left: " + (nKnobBorderWidth + nKnobWidth / 2 - (bNeumannEdition ? 1 : 0)) + "px; height: " + (g_nDeesserFaderHeight - 20 - g_nDeesserKnobHeight - nKnobBorderWidth * 2) + "px;'";

    var szThresholdScaleStyle = "style='position: absolute; top: " + (nDeesserTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDeesserLeft + nButtonWidth - 9) + "px; width: " + 30 + "px; height: " + g_nDeesserFaderHeight + "px;'";

    var szScaleNumberStyle = "style='position: absolute; width: " + 30 + "px; height: " + (g_nDeesserThresholdScaleStepHeight * 2) + "px; line-height: " + (g_nDeesserThresholdScaleStepHeight * 2) + "px;";
    var szScaleStepStyle = "style='position: absolute; left: " + (bNeumannEdition ? 13.5 : 8) + "px; width: " + (bNeumannEdition ? 3 : 14) + "px; height: " + (g_nDeesserThresholdScaleStepHeight - 1) + "px;";

    var szMetersSectionStyle = "style='top: " + (nDeesserTop + (nEffectHeight / 12) + 12) + "px; height: " + g_nDeesserFaderHeight + "px;";
    var szMeterStyle = "style='width: 4px; height: " + g_nDeesserFaderHeight + "px;";

    var szThresholdMeterOver = "style='height: " + (g_nDeesserThresholdPos0dB) + "px'";
    var szThresholdMeterMid = "style='top: " + (g_nDeesserThresholdPos0dB) + "px; height: " + (g_nDeesserThresholdPos18dB - g_nDeesserThresholdPos0dB) + "px;'";
    var szThresholdMeterLow = "style='top: " + (g_nDeesserThresholdPos18dB) + "px; height: " + (g_nDeesserFaderHeight - g_nDeesserThresholdPos18dB) + "px;'";


    var szOutputScaleStyle = "style='position: absolute; top: " + (nDeesserTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDeesserLeft + nEffectWidth - nEffectMargin - nButtonWidth + nButtonWidth / 2 + g_nElementsBorderWidth) + "px; width: " + 30 + "px; height: " + g_nDeesserFaderHeight + "px;'";
    
    var szMeterOver = "style='top: " + (nDeesserRightScalePos0dB) + "px; height: " + (nDeesserRightScalePos3dB - nDeesserRightScalePos0dB) + "px'";
    var szMeterMid = "style='top: " + (nDeesserRightScalePos3dB) + "px; height: " + (nDeesserRightScalePos18dB - nDeesserRightScalePos3dB) + "px;'";
    var szMeterLow = "style='top: " + (nDeesserRightScalePos18dB) + "px; height: " + (g_nDeesserFaderHeight - nDeesserRightScalePos18dB) + "px;'";

    var szDeltaMeter = "style='top: " + (nDeesserRightScalePos0dB) + "px; height: " + (g_nDeesserFaderHeight - nDeesserRightScalePos0dB) + "px;'";

    var szCursorStyle = "style='top: " + (nDeesserTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDeesserLeft + nEffectMargin + nButtonWidth + 1) + "px;'";


    var szPage = "";

    if (bNeumannEdition)
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + (nEffectWidth / 2) + "px; text-align: center; color: " + DEESSER_COLOR + ";'>DEESSER</div>";
    }
    else
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + ((nEffectWidth / 2 - nMergingTextWidth - nDeesserTextWidth) / 2 + nMergingTextWidth) + "px; text-align: right;'>MERGING+</div>";
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " left: " + ((nEffectWidth / 2 - nMergingTextWidth - nDeesserTextWidth) / 2 + nMergingTextWidth + 5) + "px; width: " + ((nEffectWidth / 2 - nMergingTextWidth - nDeesserTextWidth) / 2 + nDeesserTextWidth) + "px; text-align: left; color: " + DEESSER_COLOR + ";'>DEESSER</div>";
    }

    if (GetAccessControl("CAnubisMusic_DeesserWidget"))
    {
        szPage += "<div id='deesser-snap-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 4) + "px;'>SNAP</div>";
        szPage += "<div id='deesser-link-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 8 + nHeaderButtonWidth) + "px;'>LINK DSR</div>";
        szPage += "<div id='deesser-on-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 12 + nHeaderButtonWidth * 2) + "px;'>ON</div>";


        szPage += "<div id='deesser-range-rotary' class='deesser-rotary deesser-range-rotary' " + szRangeStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-deesser-range-rotary-canvas' class='deesser-range-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='deesser-range-rotary-canvas' class='deesser-range-rotary-canvas'></canvas>";

            szPage += "<div id='deesser-range-rotary-value' class='deesser-range-rotary-value'></div>";

        szPage += "</div>";
        szPage += "<div id='deesser-range-rotary-title' class='deesser-range-rotary-title' " + szRangeTitleStyle + ">RANGE</div>";

        szPage += "<div id='deesser-freq-rotary' class='deesser-rotary' " + szRotaryStyle + "left: " + (nDeesserLeft + nEffectMargin + nEffectWidth / 2 - nRotaryWidth * 1.65 + (bNeumannEdition ? 12 : 6)) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-deesser-freq-rotary-canvas' class='deesser-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='deesser-freq-rotary-canvas' class='deesser-rotary-canvas'></canvas>";

            szPage += "<div id='deesser-freq-rotary-title' class='deesser-rotary-title'>F</div>";

        szPage += "</div>";
        szPage += "<div id='deesser-freq-value' class='deesser-freq-value' " + szFreqValueStyle + ">kHz</div>";

        szPage += "<div id='deesser-q-rotary' class='deesser-rotary' " + szRotaryStyle + "left: " + (nDeesserLeft + nEffectMargin + nEffectWidth / 2 + nRotaryWidth * .65 - (bNeumannEdition ? 12 : 2)) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-deesser-q-rotary-canvas' class='deesser-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='deesser-q-rotary-canvas' class='deesser-rotary-canvas'></canvas>";

            szPage += "<div id='deesser-q-rotary-title' class='deesser-rotary-title'>W</div>";

        szPage += "</div>";


        szPage += "<div id='deesser-listen-button' class='effect-button' " + szButtonListenStyle + ">LISTEN</div>";

        szPage += "<div id='deesser-filter-button' class='effect-button' " + szButtonFilterStyle + ">";
            szPage += "<div id='deesser-filter-button-line1' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 25%; width: 100%; height: 50%; line-height: 50%;'>?</div>";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 65%; width: 100%; height: 50%; line-height: 50%;'>PASS</div>";
        szPage += "</div>";


        szPage += "<div id='deesser-threshold-fader-section' class='deesser-fader-section' " + szThresholdFaderStyle + ">";

            szPage += "<div id='deesser-threshold-fader-slider-knob' class='deesser-fader-slider-knob' " + szThresholdKnobStyle + ">-20.0</div>";

            szPage += "<div id='deesser-threshold-fader-slider' class='deesser-fader-slider' " + szThresholdSliderStyle + "></div>";

        szPage += "</div>";

        szPage += "<div id='deesser-cursor' class='deesser-cursor' " + szCursorStyle + "'>";

            szPage += "<canvas id='deesser-cursor-canvas' class='deesser-cursor-canvas'></canvas>";

        szPage += "</div>";


        szPage += "<div id='' class='' " + szThresholdScaleStyle + ">";

            for (var i = 0; i < 17; i++)
            {
                if (i == 0 || i == 4 || i == 8 || i == 12 || i == 16)
                {
                    var nNumber;
                    switch (i)
                    {
                        case 0:
                            nNumber = 0;
                            break;

                        case 4:
                            nNumber = 6;
                            break;

                        case 8:
                            nNumber = 18;
                            break;

                        case 12:
                            nNumber = 36;
                            break;

                        case 16:
                            nNumber = 96;
                            break;
                    }
            
                    szPage += "<div id='deesser-threshold-scale-number" + (i / 4) + "' class='deesser-scale-number' " + szScaleNumberStyle + " top: " + (i * g_nDeesserThresholdScaleStepHeight) + "px;'>" + nNumber + "</div>";
                }
                else
                {
                    szPage += "<div id='' class='deesser-scale-step' " + szScaleStepStyle + " top: " + (i * g_nDeesserThresholdScaleStepHeight) + "px;'></div>";
                }
            }

        szPage += "</div>";


        // Threshold
        szPage += "<div id='' class='deesser-meter-section' " + szMetersSectionStyle + " left: " + (nDeesserLeft + nButtonWidth - 14) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='deesser-threshold-meter" + i + "' class='deesser-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5) + "px;'>";

                    szPage += "<div id='' class='deesser-meter-over' " + szThresholdMeterOver + "></div>";

                    szPage += "<div id='' class='deesser-meter-mid' " + szThresholdMeterMid + "></div>";

                    szPage += "<div id='' class='deesser-meter-low' " + szThresholdMeterLow + "></div>";

                    szPage += "<div id='deesser-threshold-meter" + i + "-mask' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : (i == 0 ? 3 : 3.5)) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='deesser-threshold-meter-mono' class='deesser-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='deesser-meter-over' " + szThresholdMeterOver + "></div>";

                szPage += "<div id='' class='deesser-meter-mid' " + szThresholdMeterMid + "></div>";

                szPage += "<div id='' class='deesser-meter-low' " + szThresholdMeterLow + "></div>";

                szPage += "<div id='deesser-threshold-meter-mono-mask' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Input
        szPage += "<div id='' class='deesser-meter-section' " + szMetersSectionStyle + " left: " + (nDeesserLeft + nEffectWidth - nEffectMargin - nButtonWidth + 4) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='deesser-input-meter" + i + "' class='deesser-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5) + "px;'>";

                    szPage += "<div id='' class='deesser-meter-over' " + szMeterOver + "></div>";

                    szPage += "<div id='' class='deesser-meter-mid' " + szMeterMid + "></div>";

                    szPage += "<div id='' class='deesser-meter-low' " + szMeterLow + "></div>";

                    szPage += "<div id='deesser-input-meter" + i + "-mask' class='deesser-meter-mask " + (i == 0 ? "deesser-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='deesser-input-meter-mono' class='deesser-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 10.5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='deesser-meter-over' " + szMeterOver + "></div>";

                szPage += "<div id='' class='deesser-meter-mid' " + szMeterMid + "></div>";

                szPage += "<div id='' class='deesser-meter-low' " + szMeterLow + "></div>";

                szPage += "<div id='deesser-input-meter-mono-mask' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Delta
        szPage += "<div id='' class='deesser-meter-section' " + szMetersSectionStyle + " left: " + (nDeesserLeft + nEffectWidth - nEffectMargin - nButtonWidth + 3 + 11.5) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='deesser-delta-meter" + i + "' class='deesser-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5) + "px;'>";

                    if (i == 1 || bNeumannEdition)
                        szPage += "<div id='' class='deesser-meter-mask " + (i == 0 ? "deesser-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px; height: " + nDeesserRightScalePos0dB + "px;'></div>";

                    szPage += "<div id='deesser-delta-meter" + i + "-comp' class='deesser-meter-comp' " + szDeltaMeter + "></div>";

                    szPage += "<div id='deesser-delta-meter" + i + "-exp' class='deesser-meter-exp' " + szDeltaMeter + "></div>";

                    szPage += "<div id='deesser-delta-meter" + i + "-mask' class='deesser-meter-mask " + (i == 0 ? "deesser-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='deesser-delta-meter-mono' class='deesser-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px; height: " + nDeesserRightScalePos0dB + "px;'></div>";

                szPage += "<div id='deesser-delta-meter-mono-comp' class='deesser-meter-comp' " + szDeltaMeter + "></div>";

                szPage += "<div id='deesser-delta-meter-mono-exp' class='deesser-meter-exp' " + szDeltaMeter + "></div>";

                szPage += "<div id='deesser-delta-meter-mono-mask' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Output
        szPage += "<div id='' class='deesser-meter-section' " + szMetersSectionStyle + " left: " + (nDeesserLeft + nEffectWidth - nEffectMargin - nButtonWidth + 3 + 11 * 2) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='deesser-output-meter" + i + "' class='deesser-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5.5) + "px;'>";

                    szPage += "<div id='' class='deesser-meter-over' " + szMeterOver + "></div>";

                    szPage += "<div id='' class='deesser-meter-mid' " + szMeterMid + "></div>";

                    szPage += "<div id='' class='deesser-meter-low' " + szMeterLow + "></div>";

                    szPage += "<div id='deesser-output-meter" + i + "-mask' class='deesser-meter-mask " + (i == 0 ? "deesser-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='deesser-output-meter-mono' class='deesser-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 0 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='deesser-meter-over' " + szMeterOver + "></div>";

                szPage += "<div id='' class='deesser-meter-mid' " + szMeterMid + "></div>";

                szPage += "<div id='' class='deesser-meter-low' " + szMeterLow + "></div>";

                szPage += "<div id='deesser-output-meter-mono-mask' class='deesser-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        szPage += "<div id='' class='' " + szOutputScaleStyle + ">";

            for (var i = 0; i < 16; i++)
            {
                if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12 || i == 15)
                {
                    var nNumber;
                    switch (i)
                    {
                        case 0:
                            nNumber = 0;
                            break;

                        case 3:
                            nNumber = 6;
                            break;

                        case 6:
                            nNumber = 12;
                            break;

                        case 9:
                            nNumber = 18;
                            break;

                        case 12:
                            nNumber = 36;
                            break;

                        case 15:
                            nNumber = 72;
                            break;
                    }
            
                    szPage += "<div id='' class='deesser-scale-number' " + szScaleNumberStyle + " top: " + (i * g_nDeesserRightScaleStepHeight) + "px;'>" + nNumber + "</div>";
                }
                else
                {
                    szPage += "<div id='' class='deesser-scale-step' " + szScaleStepStyle + " top: " + (i * g_nDeesserRightScaleStepHeight) + "px;'></div>";
                }
            }

        szPage += "</div>";
    }
    else
    {
        var szLockedStyle = "style='width:" + nEffectWidth + "px; height:" + nEffectHeight + "px; line-height: " + nEffectHeight + "px; text-align: center;'";
        szPage += "<div id='' class='effectHeader' " + szLockedStyle + ">ACCESS LOCKED</div>";
    }

    return szPage;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildEQ(bDeesserBuilt)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    var nEffectMargin = g_nElementsBorderWidth * 2;
    var nEffectWidth = g_nStripWidth * 7.6 - nEffectMargin * 2;
    var nEffectHeight = g_nStripWidth * 5.5 - nEffectMargin * 2;

    var nEqTop = nEffectMargin + (bDeesserBuilt ? nEffectMargin * 2 + nEffectHeight : 0);
    var nEqLeft = nEffectMargin;

    var nRotaryWidth = (nEffectWidth - nEffectMargin * 19) / 5;
    var nRotaryHeight = nRotaryWidth;

    var nHeaderButtonWidth = ((nEffectWidth / 2) - g_nElementsBorderWidth * 14) / 3;
    var nCurveContainerHeight = nEffectHeight - g_nStripWidth / 2.5 - nRotaryHeight - nRotaryHeight / 3.2 - nEffectMargin * 2; 
    var nFreqAxeTitleContainerHeight = ((nEffectHeight - nRotaryHeight - nRotaryHeight / 3.2 - nEffectMargin) / 10);
    var nFreqAxeWidth = ((nEffectWidth - nEffectMargin * 2) / (EQ_T_FREQUENCY_AXE_VALUES.length + 1));
    var nFreqAxeTitleWidth = nFreqAxeWidth * 2;

    var nMergingTextWidth = 90;
    var nEQTextWidth = 14;

    var szEffectTitleStyle = "style='height:" + (nEffectHeight / 12) + "px; line-height: " + (nEffectHeight / 12) + "px;";
    var szHeaderButtonStyle = "style='top: " + nEqTop + "px; width: " + nHeaderButtonWidth + "px; height:" + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px; line-height: " + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px;";

    var szCurveContainerStyle = "style='position: absolute; top: " + (nEqTop + nEffectMargin + g_nStripWidth / 2.5) + "px; left: " + (nEqLeft + nEffectMargin) + "px; width: " + (nEffectWidth - nEffectMargin * 2) + "px; height: " + nCurveContainerHeight + "px;'";
    var szFreqAxeTitleContainerStyle = "style='width: " + (nEffectWidth - nEffectMargin * 2) + "px; height: " + nFreqAxeTitleContainerHeight + "px;'";
    var szFreqAxeTitle = "style='width: " + nFreqAxeTitleWidth + "px; height: " + nFreqAxeTitleContainerHeight + "px; line-height: " + (nFreqAxeTitleContainerHeight + g_nElementsBorderWidth) + "px;";
    var szFreqAxe = "style='position: absolute; top: " + nFreqAxeTitleContainerHeight + "px; width: " + (nFreqAxeWidth - 1) + "px; height: " + (nCurveContainerHeight - nFreqAxeTitleContainerHeight) + "px;";

    var szCurveCanvasStyle = "style='top: " + (nFreqAxeTitleContainerHeight) + "px; width: " + (nEffectWidth - nEffectMargin * 2) + "px; height: " + (nCurveContainerHeight - nFreqAxeTitleContainerHeight) + "px'";

    var szParamTitleContainerStyle = "style='top: " + (nEqTop + nEffectHeight - nRotaryHeight - nRotaryHeight / 3.2) + "px; left: " + (nEqLeft + nEffectMargin / 2 + g_nElementsBorderWidth) + "px; width: " + (nEffectWidth - nEffectMargin - g_nElementsBorderWidth * 2) + "px; height: " + (nRotaryHeight / 3.2) + "px;'";
    var szParamTitleStyle = "style='width: " + (nEffectWidth / 5 - g_nElementsBorderWidth * 2) + "px; height: " + (nRotaryHeight / 3.2) + "px; line-height: " + (nRotaryHeight / 3.2 + nEffectMargin) + "px;";

    var szControlContainerStyle = "style='position: absolute; top: " + (nEqTop + nEffectHeight - nRotaryHeight) + "px; left: " + (nEqLeft + nEffectMargin) + "px; width: " + (nEffectWidth - nEffectMargin * 2) + "px; height: " + nRotaryHeight + "px;'";
    var szBypassButtonStyle = "style='left: " + (g_nElementsBorderWidth * 4 + 5) + "px; top: " + (g_nElementsBorderWidth * 4.5 + 3.5) + "px; width: " + (nRotaryWidth - g_nElementsBorderWidth * 14 + 2) + "px; height: " + (nRotaryHeight - g_nElementsBorderWidth * 14 + 2) + "px; line-height: " + (nRotaryHeight - g_nElementsBorderWidth * 14 + 2) + "px;'";
    var szControlStyle = "style='top: " + (nRotaryHeight / 15) + "px;";
    

    var bAddBandsButton = false;
    if (g_bBusEffect && (g_nOnBusID >= MM_ID_MONITOR_BUS && g_nOnBusID < MM_ID_REVERB_BUS))
    {
        bAddBandsButton = true;
    }

    var szPage = "";

    if (bNeumannEdition)
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + (nEffectWidth / 2 - (bAddBandsButton ? nHeaderButtonWidth : 0)) + "px; text-align: center; color: " + EQ_COLOR + ";'>EQ</div>";
    }
    else
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + ((nEffectWidth / 2 - (bAddBandsButton ? nHeaderButtonWidth : 0) - nMergingTextWidth - nEQTextWidth) / 2 + nMergingTextWidth - 5) + "px; text-align: right;'>MERGING+</div>";
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " left: " + ((nEffectWidth / 2 - (bAddBandsButton ? nHeaderButtonWidth : 0) - nMergingTextWidth - nEQTextWidth) / 2 + nMergingTextWidth) + "px; width: " + ((nEffectWidth / 2 - nMergingTextWidth - nEQTextWidth) / 2 + nEQTextWidth) + "px; text-align: left; color: " + EQ_COLOR + ";'>EQ</div>";
    }

    if (GetAccessControl("CAnubisMusic_EqWidget"))
    {
        if (bAddBandsButton)
        {
            szPage += "<div id='eq-bands-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 - nHeaderButtonWidth) + "px;'>BANDS</div>";
        }

        szPage += "<div id='eq-snap-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 4) + "px;'>SNAP</div>";
        szPage += "<div id='eq-link-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 8 + nHeaderButtonWidth) + "px;'>LINK EQ</div>";
        szPage += "<div id='eq-on-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 12 + nHeaderButtonWidth * 2) + "px;'>ON</div>";

        szPage += "<div id='' class='' " + szCurveContainerStyle + ">";

            szPage += "<div id='' class='eq-param-value-container' " + szFreqAxeTitleContainerStyle + ">";

                for (var idx = 0; idx < EQ_T_FREQUENCY_AXE_VALUES.length; idx++)
                {
                    szPage += "<div id='' class='eq-freq-axe-title' " + szFreqAxeTitle + "left: " + (nFreqAxeWidth * idx) + "px;'>" + EQ_T_FREQUENCY_AXE_VALUES[idx] + "</div>";
                    szPage += "<div id='eq-freq-axe' class='eq-freq-axe' " + szFreqAxe + "left: " + (nFreqAxeWidth * idx) + "px;'></div>";
                }

            szPage += "</div>";

            szPage += "<canvas id='eq-curve-canvas' class='eq-curve-canvas' " + szCurveCanvasStyle + "></canvas>";

        szPage += "</div>";


        szPage += "<div id='' class='eq-param-value-container' " + szParamTitleContainerStyle + ">";
        
            szPage += "<div id='' class='eq-param-value' " + szParamTitleStyle + "'>Bypass</div>";
            szPage += "<div id='eq-type-title' class='eq-param-value' " + szParamTitleStyle + " left: " + (nEffectMargin * 2 + nRotaryWidth * 1) + "px;'>" + (bNeumannEdition ? "Type" : "Peak") + "</div>";
            szPage += "<div id='eq-freq-title' class='eq-param-value' " + szParamTitleStyle + " left: " + (nEffectMargin * 6 + nRotaryWidth * 2) + "px;'>" + (bNeumannEdition ? "Frequency" : "100 Hz") + "</div>";
            szPage += "<div id='eq-gain-title' class='eq-param-value' " + szParamTitleStyle + " left: " + (nEffectMargin * 10 + nRotaryWidth * 3) + "px;'>" + (bNeumannEdition ? "Gain" : "0.0 dB") + "</div>";
            szPage += "<div id='eq-q-title' class='eq-param-value' " + szParamTitleStyle + " left: " + (nEffectMargin * 14 + nRotaryWidth * 4) + "px;'>" + (bNeumannEdition ? "Q" : "10.0") + "</div>";

        szPage += "</div>";


        szPage += "<div id='' class='' " + szControlContainerStyle + ">";

        szPage += "<div id='eq-bypass-button' class='eq-bypass-button' " + szBypassButtonStyle + ">??</div>";

    
            szPage += "<div id='eq-type-rotary' class='eq-rotary' " + szControlStyle + " left: " + (nRotaryWidth * 1 + nEffectMargin * 2.5) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-eq-type-rotary-canvas' class='eq-rotary-canvas' style='top: -5%;'></canvas>";

                szPage += "<canvas id='eq-type-rotary-canvas' class='eq-rotary-canvas'></canvas>";

                szPage += "<div id='eq-type-rotary-value' class='eq-rotary-title'>" + (bNeumannEdition ? "" : "T") + "</div>";

            szPage += "</div>";

    
            szPage += "<div id='eq-freq-rotary' class='eq-rotary' " + szControlStyle + " left: " + (nRotaryWidth * 2 + nEffectMargin * 6.5) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-eq-freq-rotary-canvas' class='eq-rotary-canvas' style='top: -5%;'></canvas>";

                szPage += "<canvas id='eq-freq-rotary-canvas' class='eq-rotary-canvas'></canvas>";

                szPage += "<div id='eq-freq-rotary-value' class='eq-rotary-title" + (bNeumannEdition ? " eq-rotary-title-2lines" : "") + "'>" + (bNeumannEdition ? "" : "F") + "</div>";

            szPage += "</div>";

    
            szPage += "<div id='eq-gain-rotary' class='eq-rotary' " + szControlStyle + " left: " + (nRotaryWidth * 3 + nEffectMargin * 10.5) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-eq-gain-rotary-canvas' class='eq-rotary-canvas' style='top: -5%;'></canvas>";

                szPage += "<canvas id='eq-gain-rotary-canvas' class='eq-rotary-canvas'></canvas>";

                szPage += "<div id='eq-gain-rotary-value' class='eq-rotary-title" + (bNeumannEdition ? " eq-rotary-title-2lines" : "") + "'>" + (bNeumannEdition ? "" : "G") + "</div>";

            szPage += "</div>";

    
            szPage += "<div id='eq-q-rotary' class='eq-rotary' " + szControlStyle + " left: " + (nRotaryWidth * 4 + nEffectMargin * 14.5) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-eq-q-rotary-canvas' class='eq-rotary-canvas' style='top: -5%;'></canvas>";

                szPage += "<canvas id='eq-q-rotary-canvas' class='eq-rotary-canvas'></canvas>";

                szPage += "<div id='eq-q-rotary-value' class='eq-rotary-title'>" + (bNeumannEdition ? "" : "Q") + "</div>";

            szPage += "</div>";

        szPage += "</div>";
    }
    else
    {
        var szLockedStyle = "style='width:" + nEffectWidth + "px; height:" + nEffectHeight + "px; line-height: " + nEffectHeight + "px; text-align: center;'";
        szPage += "<div id='' class='effectHeader' " + szLockedStyle + ">ACCESS LOCKED</div>";
    }

    return szPage;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildDynamics(bDeesserBuilt)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }


    var nEffectMargin = g_nElementsBorderWidth * 2;
    var nEffectWidth = g_nStripWidth * 7.6 - nEffectMargin * 2;
    var nEffectHeight = g_nStripWidth * 5.5 - nEffectMargin * 2;

    var nDynamicsTop = nEffectMargin * 3 + nEffectHeight + (bDeesserBuilt ? nEffectMargin * 2 + nEffectHeight : 0);
    var nDynamicsLeft = nEffectMargin;

    var nHeaderButtonWidth = ((nEffectWidth / 2) - g_nElementsBorderWidth * 14) / 3;
    var nRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 5;
    var nRotaryHeight = nRotaryWidth;
    var nRatioRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 2.8;
    var nButtonHeight = nRotaryHeight / 3.2;
    var nButtonWidth = nRotaryWidth * 2.1 / 3 - g_nElementsBorderWidth * 2;

    g_nDynamicsFaderHeight = nEffectHeight - (nEffectHeight / 12) - nButtonWidth - g_nElementsBorderWidth - 20;

    var nKnobBorderWidth = 2;
    var nKnobWidth = nButtonWidth - nKnobBorderWidth * (bNeumannEdition ? 9 : 3);
    g_nDynamicsKnobHeight = nKnobWidth / (bNeumannEdition ? 2.2 : 2.7);

    g_nDynamicsThresholdScaleStepHeight = (g_nDynamicsFaderHeight - g_nDynamicsKnobHeight) / (4 * 4); // 4 step by scale slot (4)
    g_nDynamicsThresholdPos0dB = DynamicsThresholdFaderGainToPosY(0) + g_nDynamicsThresholdScaleStepHeight;
    g_nDynamicsThresholdPos18dB = DynamicsThresholdFaderGainToPosY(-180) + g_nDynamicsThresholdScaleStepHeight;

    g_nDynamicsRightScaleStepHeight = (g_nDynamicsFaderHeight - g_nDynamicsKnobHeight) / (3 * 5); // 3 step by scale slot (5)
    var nDynamicsRightScalePos0dB = DynamicsRightScaleGainToPosY(0) + g_nDynamicsRightScaleStepHeight;
    var nDynamicsRightScalePos3dB = DynamicsRightScaleGainToPosY(-30) + g_nDynamicsRightScaleStepHeight;
    var nDynamicsRightScalePos18dB = DynamicsRightScaleGainToPosY(-180) + g_nDynamicsRightScaleStepHeight;

    var nMergingTextWidth = 90;
    var nDynamicsTextWidth = 89;
    

    var szEffectTitleStyle = "style='top: " + nDynamicsTop + "px; height:" + (nEffectHeight / 12) + "px; line-height: " + (nEffectHeight / 12) + "px;";
    var szHeaderButtonStyle = "style='top: " + nDynamicsTop + "px; width: " + nHeaderButtonWidth + "px; height:" + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px; line-height: " + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px;";

    var szRatioValueStyle = "style='top: " + (bNeumannEdition ? nRatioRotaryWidth / 2 - 14.5 : nDynamicsTop + nRatioRotaryWidth / 3.4 - 16) + "px; " + (bNeumannEdition ? "" : " left: " + (nDynamicsLeft + nEffectWidth / 2 - nRatioRotaryWidth / 2 - g_nElementsBorderWidth) + "px;") + "'";
    var szRatioStyle = "style='top: " + (nDynamicsTop + nRatioRotaryWidth / 3.4 - (bNeumannEdition ? 10 : 0)) + "px; left: " + (nDynamicsLeft + nEffectWidth / 2 - nRatioRotaryWidth / 2 - g_nElementsBorderWidth) + "px;'";

    var szRotaryValueStyle = "style='top: " + (bNeumannEdition ? nRotaryHeight / 2 - 16 : nDynamicsTop + nEffectHeight - nRotaryHeight * 1.25 - 28) + "px;";
    var szRotaryStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nRotaryHeight * 1.25 - (bNeumannEdition ? 20 : 10)) + "px;";

    var szButtonStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonHeight - g_nElementsBorderWidth * 2) + "px; width: " + nButtonWidth + "px; height:" + (nButtonHeight - g_nElementsBorderWidth * 2) + "px; line-height: " + (nButtonHeight - g_nElementsBorderWidth * 2) + "px;";
    var szLedStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonHeight - g_nElementsBorderWidth * 2 - 12) + "px;";

    var szButtonSideChainStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDynamicsLeft + nEffectMargin) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px;'";
    var szButtonOnStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDynamicsLeft + nEffectMargin + nButtonWidth + g_nElementsBorderWidth * 2) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px; line-height: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px;'";

    var szButtonAutoGainStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth * 2 - g_nElementsBorderWidth * 2) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px;'";
    var szButtonResetStyle = "style='top: " + (nDynamicsTop + nEffectHeight - nButtonWidth - g_nElementsBorderWidth) + "px; left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth) + "px; width: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px; height:" + (nButtonWidth - g_nElementsBorderWidth * 3) + "px; line-height: " + (nButtonWidth - g_nElementsBorderWidth * 2) + "px;'";

    var szThresholdFaderStyle = "style='top: " + (nDynamicsTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDynamicsLeft + nEffectMargin + nButtonWidth + g_nElementsBorderWidth * 3) + "px; width: " + nKnobWidth + "px; height: " + g_nDynamicsFaderHeight + "px;'";
    var szThresholdKnobStyle = "style='left: " + (nKnobBorderWidth * 1.5) + "px; width: " + (nKnobWidth - nKnobBorderWidth * 3) + "px; height: " + g_nDynamicsKnobHeight + "px; line-height: " + g_nDynamicsKnobHeight + "px;'";
    var szThresholdSliderStyle = "style='left: " + (nKnobBorderWidth + nKnobWidth / 2 - (bNeumannEdition ? 1 : 0)) + "px; height: " + (g_nDynamicsFaderHeight - 20 - g_nDynamicsKnobHeight - nKnobBorderWidth * 2) + "px;'";

    var szThresholdScaleStyle = "style='position: absolute; top: " + (nDynamicsTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDynamicsLeft + nEffectMargin + nButtonWidth / 2 - 6) + "px; width: " + 30 + "px; height: " + g_nDynamicsFaderHeight + "px;'";

    var szScaleNumberStyle = "style='position: absolute; width: " + 30 + "px; height: " + (g_nDynamicsThresholdScaleStepHeight * 2) + "px; line-height: " + (g_nDynamicsThresholdScaleStepHeight * 2) + "px;";
    var szScaleStepStyle = "style='position: absolute; left: " + (bNeumannEdition ? 13.5 : 8) + "px; width: " + (bNeumannEdition ? 3 : 14) + "px; height: " + (g_nDynamicsThresholdScaleStepHeight - 1) + "px;";

    var szMetersSectionStyle = "style='left: " + (nDynamicsLeft + nEffectMargin + nButtonWidth / 2 - 11) + "px; top: " + (nDynamicsTop + (nEffectHeight / 12) + 12) + "px; height: " + g_nDynamicsFaderHeight + "px;";
    var szMeterStyle = "style='width: 4px; height: " + g_nDynamicsFaderHeight + "px;";

    var szThresholdMeterOver = "style='height: " + (g_nDynamicsThresholdPos0dB) + "px'";
    var szThresholdMeterMid = "style='top: " + (g_nDynamicsThresholdPos0dB) + "px; height: " + (g_nDynamicsThresholdPos18dB - g_nDynamicsThresholdPos0dB) + "px;'";
    var szThresholdMeterLow = "style='top: " + (g_nDynamicsThresholdPos18dB) + "px; height: " + (g_nDynamicsFaderHeight - g_nDynamicsThresholdPos18dB) + "px;'";
       

    var szMakeupFaderStyle = "style='top: " + (nDynamicsTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth * 1.5 - nKnobWidth / 2) + "px; width: " + nKnobWidth + "px; height: " + g_nDynamicsFaderHeight + "px;'";
    var szMakeupKnobStyle = "style='width: " + (nKnobWidth - nKnobBorderWidth * 3) + "px; height: " + g_nDynamicsKnobHeight + "px; line-height: " + g_nDynamicsKnobHeight + "px;'";
    var szMakeupSliderStyle = "style='left: " + (nKnobWidth / 2 - nKnobBorderWidth / 2 - (bNeumannEdition ? 1 : 0)) + "px; height: " + (g_nDynamicsFaderHeight - 20 - g_nDynamicsKnobHeight - nKnobBorderWidth * 2) + "px;'";

    var szOutputScaleStyle = "style='position: absolute; top: " + (nDynamicsTop + (nEffectHeight / 12) + 12) + "px; left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth + nButtonWidth / 2 + g_nElementsBorderWidth) + "px; width: " + 30 + "px; height: " + g_nDynamicsFaderHeight + "px;'";
    
    var szMeterOver = "style='top: " + (nDynamicsRightScalePos0dB) + "px; height: " + (nDynamicsRightScalePos3dB - nDynamicsRightScalePos0dB) + "px'";
    var szMeterMid = "style='top: " + (nDynamicsRightScalePos3dB) + "px; height: " + (nDynamicsRightScalePos18dB - nDynamicsRightScalePos3dB) + "px;'";
    var szMeterLow = "style='top: " + (nDynamicsRightScalePos18dB) + "px; height: " + (g_nDynamicsFaderHeight - nDynamicsRightScalePos18dB) + "px;'";

    var szDeltaMeter = "style='top: " + (nDynamicsRightScalePos0dB) + "px; height: " + (g_nDynamicsFaderHeight - nDynamicsRightScalePos0dB) + "px;'";



    var szPage = "";

    if (bNeumannEdition)
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + (nEffectWidth / 2) + "px; text-align: center; color: " + DYNAMICS_COLOR + ";'>DYNAMICS</div>";
    }
    else
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + ((nEffectWidth / 2 - nMergingTextWidth - nDynamicsTextWidth) / 2 + nMergingTextWidth) + "px; text-align: right;'>MERGING+</div>";
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " left: " + ((nEffectWidth / 2 - nMergingTextWidth - nDynamicsTextWidth) / 2 + nMergingTextWidth + 5) + "px; width: " + ((nEffectWidth / 2 - nMergingTextWidth - nDynamicsTextWidth) / 2 + nDynamicsTextWidth) + "px; text-align: left; color: " + DYNAMICS_COLOR + ";'>DYNAMICS</div>";
    }

    if (GetAccessControl("CAnubisMusic_DynWidget"))
    {
        szPage += "<div id='dynamics-snap-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 4) + "px;'>SNAP</div>";
        szPage += "<div id='dynamics-link-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 8 + nHeaderButtonWidth) + "px;'>LINK DYN</div>";
        szPage += "<div id='dynamics-on-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 12 + nHeaderButtonWidth * 2) + "px;'>ON</div>";


        if (!bNeumannEdition)
            szPage += "<div id='dynamics-ratio-rotary-value' class='dynamics-ratio-rotary-value' " + szRatioValueStyle + ">4.0:1</div>";

        szPage += "<div id='dynamics-ratio-rotary' class='dynamics-rotary dynamics-ratio-rotary' " + szRatioStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-dynamics-ratio-rotary-canvas' class='dynamics-ratio-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='dynamics-ratio-rotary-canvas' class='dynamics-ratio-rotary-canvas'></canvas>";

            szPage += "<div id='dynamics-ratio-rotary-title' class='dynamics-ratio-rotary-title'>" + (bNeumannEdition ? "RATIO" : "Ratio") + "</div>";

            if (bNeumannEdition)
                szPage += "<div id='dynamics-ratio-rotary-value' class='dynamics-ratio-rotary-value' " + szRatioValueStyle + ">4.0:1</div>";

        szPage += "</div>";


        if (!bNeumannEdition)
            szPage += "<div id='dynamics-attack-rotary-value' class='dynamics-rotary-value' " + szRotaryValueStyle + "left: " + (nDynamicsLeft + nEffectMargin + nEffectWidth / 2 - nRotaryWidth * (bNeumannEdition ? 1.20 : 1.25)) + "px;'>50 ms</div>";

        szPage += "<div id='dynamics-attack-rotary' class='dynamics-rotary' " + szRotaryStyle + "left: " + (nDynamicsLeft + nEffectMargin + nEffectWidth / 2 - nRotaryWidth * 1.25 + 4) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-dynamics-attack-rotary-canvas' class='dynamics-rotary-canvas' style='top: -5%';></canvas>";

            szPage += "<canvas id='dynamics-attack-rotary-canvas' class='dynamics-rotary-canvas'></canvas>";

            szPage += "<div id='dynamics-attack-rotary-title' class='dynamics-rotary-title'>" + (bNeumannEdition ? "ATK" : "Atk") + "</div>";
            
            if (bNeumannEdition)
                szPage += "<div id='dynamics-attack-rotary-value' class='dynamics-rotary-value' " + szRotaryValueStyle + "'>50 ms</div>";

        szPage += "</div>";


        if (!bNeumannEdition)
            szPage += "<div id='dynamics-release-rotary-value' class='dynamics-rotary-value' " + szRotaryValueStyle + "left: " + (nDynamicsLeft + nEffectMargin + nEffectWidth / 2 + nRotaryWidth * (bNeumannEdition ? 0.2 : 0.25)) + "px;'>200 ms</div>";

        szPage += "<div id='dynamics-release-rotary' class='dynamics-rotary' " + szRotaryStyle + "left: " + (nDynamicsLeft + nEffectMargin + nEffectWidth / 2 + nRotaryWidth / 4 - 4) + "px;'>";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-dynamics-release-rotary-canvas' class='dynamics-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='dynamics-release-rotary-canvas' class='dynamics-rotary-canvas'></canvas>";

            szPage += "<div id='dynamics-release-rotary-title' class='dynamics-rotary-title'>" + (bNeumannEdition ? "REL" : "Rel") + "</div>";
            
            if (bNeumannEdition)
                szPage += "<div id='dynamics-release-rotary-value' class='dynamics-rotary-value' " + szRotaryValueStyle + "'>200 ms</div>";

        szPage += "</div>";


        szPage += "<div id='dynamics-band0-button' class='effect-button' " + szButtonStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 - nButtonWidth * 1.5 - g_nElementsBorderWidth * 5) + "px;'>" + DYNAMICS_T_BANDS[0] + "</div>";
        szPage += "<div id='dynamics-band2-button' class='effect-button' " + szButtonStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 - nButtonWidth / 2 - g_nElementsBorderWidth * 1) + "px;'>" + DYNAMICS_T_BANDS[2] + "</div>";
        szPage += "<div id='dynamics-band3-button' class='effect-button' " + szButtonStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 + nButtonWidth / 2 + g_nElementsBorderWidth * 3) + "px;'>" + DYNAMICS_T_BANDS[3] + "</div>";

        szPage += "<div id='dynamics-band0-led' class='dynamics-led' " + szLedStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 - nButtonWidth * 1.5 - g_nElementsBorderWidth * 4 + nButtonWidth / 2 - 4) + "px;'></div>";
        szPage += "<div id='dynamics-band2-led' class='dynamics-led' " + szLedStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 - 4) + "px;'></div>";
        szPage += "<div id='dynamics-band3-led' class='dynamics-led' " + szLedStyle + " left: " + (nDynamicsLeft + nEffectWidth / 2 + nButtonWidth / 2 + g_nElementsBorderWidth * 4 + nButtonWidth / 2 - 4) + "px;'></div>";

        szPage += "<div id='dynamics-sidechain-button' class='effect-button " + (g_bBusEffect ? "effect-button-disabled" : "") + "' " + szButtonSideChainStyle + ">";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 25%; width: 100%; height: 50%; line-height: 50%;'>SIDE</div>";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 65%; width: 100%; height: 50%; line-height: 50%;'>CHAIN</div>";
        szPage += "</div>";
        szPage += "<div id='dynamics-band-on-button' class='effect-button' " + szButtonOnStyle + ">ON</div>";

        szPage += "<div id='dynamics-autogain-button' class='effect-button' " + szButtonAutoGainStyle + ">";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 25%; width: 100%; height: 50%; line-height: 50%;'>AUTO</div>";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 65%; width: 100%; height: 50%; line-height: 50%;'>GAIN</div>";
        szPage += "</div>";
        szPage += "<div id='dynamics-reset-button' class='effect-button dynamics-button-reset' " + szButtonResetStyle + ">";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 25%; width: 100%; height: 50%; line-height: 50%;'>RST</div>";
            szPage += "<div id='' class='' style='position: absolute; font-size: inherit; size-family: inherit; color: inherit; top: 65%; width: 100%; height: 50%; line-height: 50%;'>PEAK</div>";
        szPage += "</div>";


        szPage += "<div id='dynamics-threshold-fader-section' class='dynamics-fader-section' " + szThresholdFaderStyle + ">";

            szPage += "<div id='dynamics-threshold-fader-slider-knob' class='dynamics-fader-slider-knob' " + szThresholdKnobStyle + ">-20.0</div>";

            szPage += "<div id='dynamics-threshold-fader-slider' class='dynamics-fader-slider' " + szThresholdSliderStyle + "></div>";

        szPage += "</div>";


        szPage += "<div id='dynamics-makeup-fader-section' class='dynamics-fader-section' " + szMakeupFaderStyle + ">";

            szPage += "<div id='dynamics-makeup-fader-slider-knob' class='dynamics-fader-slider-knob' " + szMakeupKnobStyle + ">+20</div>";

            szPage += "<div id='dynamics-makeup-fader-slider' class='dynamics-fader-slider' " + szMakeupSliderStyle + "></div>";

        szPage += "</div>";


        szPage += "<div id='' class='' " + szThresholdScaleStyle + ">";

            for (var i = 0; i < 17; i++)
            {
                if (i == 0 || i == 4 || i == 8 || i == 12 || i == 16)
                {
                    var nNumber;
                    switch (i)
                    {
                        case 0:
                            nNumber = Math.abs(g_tDynamicsThresholdMax[g_nControledDynamicsBandID]);
                            break;

                        case 4:
                            nNumber = 6;
                            break;

                        case 8:
                            nNumber = 18;
                            break;

                        case 12:
                            nNumber = 36;
                            break;

                        case 16:
                            nNumber = Math.abs(g_tDynamicsThresholdMin[g_nControledDynamicsBandID] / 10).toFixed(0);
                            break;
                    }
            
                    szPage += "<div id='dynamics-threshold-scale-number" + (i / 4) + "' class='dynamics-scale-number' " + szScaleNumberStyle + " top: " + (i * g_nDynamicsThresholdScaleStepHeight) + "px;'>" + nNumber + "</div>";
                }
                else
                {
                    szPage += "<div id='' class='dynamics-scale-step' " + szScaleStepStyle + " top: " + (i * g_nDynamicsThresholdScaleStepHeight) + "px;'></div>";
                }
            }

        szPage += "</div>";


        // Threshold
        szPage += "<div id='' class='dynamics-meter-section' " + szMetersSectionStyle + " left: " + (nDynamicsLeft + nEffectMargin + nButtonWidth / 2 - 11) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='dynamics-threshold-meter" + i + "' class='dynamics-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5.5) + "px;'>";

                    szPage += "<div id='' class='dynamics-meter-over' " + szThresholdMeterOver + "></div>";

                    szPage += "<div id='' class='dynamics-meter-mid' " + szThresholdMeterMid + "></div>";

                    szPage += "<div id='' class='dynamics-meter-low' " + szThresholdMeterLow + "></div>";

                    szPage += "<div id='dynamics-threshold-meter" + i + "-mask' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='dynamics-threshold-meter-mono' class='dynamics-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='dynamics-meter-over' " + szThresholdMeterOver + "></div>";

                szPage += "<div id='' class='dynamics-meter-mid' " + szThresholdMeterMid + "></div>";

                szPage += "<div id='' class='dynamics-meter-low' " + szThresholdMeterLow + "></div>";

                szPage += "<div id='dynamics-threshold-meter-mono-mask' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Input
        szPage += "<div id='' class='dynamics-meter-section' " + szMetersSectionStyle + " left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth + 4) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='dynamics-input-meter" + i + "' class='dynamics-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5) + "px;'>";

                    szPage += "<div id='' class='dynamics-meter-over' " + szMeterOver + "></div>";

                    szPage += "<div id='' class='dynamics-meter-mid' " + szMeterMid + "></div>";

                    szPage += "<div id='' class='dynamics-meter-low' " + szMeterLow + "></div>";

                    szPage += "<div id='dynamics-input-meter" + i + "-mask' class='dynamics-meter-mask " + (i == 0 ? "dynamics-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='dynamics-input-meter-mono' class='dynamics-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 10.5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='dynamics-meter-over' " + szMeterOver + "></div>";

                szPage += "<div id='' class='dynamics-meter-mid' " + szMeterMid + "></div>";

                szPage += "<div id='' class='dynamics-meter-low' " + szMeterLow + "></div>";

                szPage += "<div id='dynamics-input-meter-mono-mask' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Delta
        szPage += "<div id='' class='dynamics-meter-section' " + szMetersSectionStyle + " left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth + 3 + 11.5) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='dynamics-delta-meter" + i + "' class='dynamics-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5) + "px;'>";

                    if (i == 1 || bNeumannEdition)
                        szPage += "<div id='' class='dynamics-meter-mask " + (i == 0 ? "dynamics-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px; height: " + nDynamicsRightScalePos0dB + "px;'></div>";

                    szPage += "<div id='dynamics-delta-meter" + i + "-comp' class='dynamics-meter-comp' " + szDeltaMeter + "></div>";

                    szPage += "<div id='dynamics-delta-meter" + i + "-exp' class='dynamics-meter-exp' " + szDeltaMeter + "></div>";

                    szPage += "<div id='dynamics-delta-meter" + i + "-mask' class='dynamics-meter-mask " + (i == 0 ? "dynamics-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='dynamics-delta-meter-mono' class='dynamics-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 5 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px; height: " + nDynamicsRightScalePos0dB + "px;'></div>";

                szPage += "<div id='dynamics-delta-meter-mono-comp' class='dynamics-meter-comp' " + szDeltaMeter + "></div>";

                szPage += "<div id='dynamics-delta-meter-mono-exp' class='dynamics-meter-exp' " + szDeltaMeter + "></div>";

                szPage += "<div id='dynamics-delta-meter-mono-mask' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6.5) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        // Output
        szPage += "<div id='' class='dynamics-meter-section' " + szMetersSectionStyle + " left: " + (nDynamicsLeft + nEffectWidth - nEffectMargin - nButtonWidth + 3 + 11 * 2) + "px;'>";

            for (var i = 0; i < 2; i++)
            {		    
                szPage += "<div id='dynamics-output-meter" + i + "' class='dynamics-meter' " + szMeterStyle + " left: " + (i == 0 ? 0 : 5.5) + "px;'>";

                    szPage += "<div id='' class='dynamics-meter-over' " + szMeterOver + "></div>";

                    szPage += "<div id='' class='dynamics-meter-mid' " + szMeterMid + "></div>";

                    szPage += "<div id='' class='dynamics-meter-low' " + szMeterLow + "></div>";

                    szPage += "<div id='dynamics-output-meter" + i + "-mask' class='dynamics-meter-mask " + (i == 0 ? "dynamics-meter-mask-noborder" : "") + "' style='width: " + (bNeumannEdition ? 4 : 3.5) + "px;'></div>";
    
                szPage += "</div>"; 
            }

            szPage += "<div id='dynamics-output-meter-mono' class='dynamics-meter' " + szMeterStyle + " left: " + (bNeumannEdition ? 0 : 2) + "px; width: " + ((bNeumannEdition ? 5 : 8) - 1) + "px;'>";

                szPage += "<div id='' class='dynamics-meter-over' " + szMeterOver + "></div>";

                szPage += "<div id='' class='dynamics-meter-mid' " + szMeterMid + "></div>";

                szPage += "<div id='' class='dynamics-meter-low' " + szMeterLow + "></div>";

                szPage += "<div id='dynamics-output-meter-mono-mask' class='dynamics-meter-mask' style='width: " + (bNeumannEdition ? 4 : 6) + "px;'></div>";
    
            szPage += "</div>";

        szPage += "</div>";


        szPage += "<div id='' class='' " + szOutputScaleStyle + ">";

            for (var i = 0; i < 16; i++)
            {
                if (i == 0 || i == 3 || i == 6 || i == 9 || i == 12 || i == 15)
                {
                    var nNumber;
                    switch (i)
                    {
                        case 0:
                            nNumber = 0;
                            break;

                        case 3:
                            nNumber = 6;
                            break;

                        case 6:
                            nNumber = 12;
                            break;

                        case 9:
                            nNumber = 18;
                            break;

                        case 12:
                            nNumber = 36;
                            break;

                        case 15:
                            nNumber = 72;
                            break;
                    }
            
                    szPage += "<div id='' class='dynamics-scale-number' " + szScaleNumberStyle + " top: " + (i * g_nDynamicsRightScaleStepHeight) + "px;'>" + nNumber + "</div>";
                }
                else
                {
                    szPage += "<div id='' class='dynamics-scale-step' " + szScaleStepStyle + " top: " + (i * g_nDynamicsRightScaleStepHeight) + "px;'></div>";
                }
            }

        szPage += "</div>";
    }
    else
    {
        var szLockedStyle = "style='width:" + nEffectWidth + "px; height:" + nEffectHeight + "px; line-height: " + nEffectHeight + "px; text-align: center;'";
        szPage += "<div id='' class='effectHeader' " + szLockedStyle + ">ACCESS LOCKED</div>";
    }

    return szPage;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildReverb()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }
    
    var nEffectMargin = g_nElementsBorderWidth * 2;
    var nEffectWidth = g_nStripWidth * 7.6 - nEffectMargin * 2;
    var nEffectHeight = g_nStripWidth * 5.5 - nEffectMargin * 2;

    var nReverbTop = nEffectMargin * 3 + nEffectHeight;
    var nReverbLeft = nEffectMargin;

    var nHeaderButtonWidth = ((nEffectWidth / 2) - g_nElementsBorderWidth * 14) / 3;
    var nRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 5;
    var nRotaryHeight = nRotaryWidth;
    var nSizeRotaryWidth = (nEffectWidth - g_nElementsBorderWidth * 6) / 2.2;

    var nMergingTextWidth = 90;
    var nReverbTextWidth = 70;


    var szEffectTitleStyle = "style='top: " + nReverbTop + "px; height:" + (nEffectHeight / 12) + "px; line-height: " + (nEffectHeight / 12) + "px;";
    var szHeaderButtonStyle = "style='top: " + nReverbTop + "px; width: " + nHeaderButtonWidth + "px; height:" + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px; line-height: " + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px;";

    var szLowCutStyle = "style='top: " + (nReverbTop + nEffectHeight / 2 - nSizeRotaryWidth / 2 - nEffectMargin * 8) + "px; left: " + (nReverbLeft + nEffectMargin * 3) + "px;'";
    var szHighCutStyle = "style='top: " + (nReverbTop + nEffectHeight / 2 - nSizeRotaryWidth / 2 - nEffectMargin * 8) + "px; left: " + (nReverbLeft + nEffectWidth - nRotaryWidth - nEffectMargin * 3) + "px;'";

    var szSizeStyle = "style='top: " + (nReverbTop + nEffectHeight / 2 - nSizeRotaryWidth / 2 - nEffectMargin * 8) + "px; left: " + (nReverbLeft + nEffectWidth / 2 - nSizeRotaryWidth / 2 - g_nElementsBorderWidth) + "px;'";
    var szSizeSmallStyle = "style='top: " + (nReverbTop + nEffectHeight / 2 + nSizeRotaryWidth / 2 - nEffectMargin * 8 - 55) + "px; left: " + (nReverbLeft) + "px; width: " + (nEffectWidth / 2 - nReverbLeft * 4) + "px;'";
    var szSizeLargeStyle = "style='top: " + (nReverbTop + nEffectHeight / 2 + nSizeRotaryWidth / 2 - nEffectMargin * 8 - 55) + "px; left: " + (nReverbLeft * 5 + nEffectWidth / 2) + "px; width: " + (nEffectWidth / 2 - nReverbLeft * 4) + "px;'";

    var szPredelayStyle = "style='top: " + (nReverbTop + nEffectHeight - nRotaryHeight - nEffectMargin * 4) + "px; left: " + (nReverbLeft + nEffectMargin * 3) + "px;'";
    var szDecayStyle = "style='top: " + (nReverbTop + nEffectHeight - nRotaryHeight - nEffectMargin * 4) + "px; left: " + (nReverbLeft + nEffectWidth - nRotaryWidth * 2 - nEffectMargin * 7) + "px;'";
    var szDiffusionStyle = "style='top: " + (nReverbTop + nEffectHeight - nRotaryHeight - nEffectMargin * 4) + "px; left: " + (nReverbLeft + nEffectWidth - nRotaryWidth - nEffectMargin * 3) + "px;'";
    

    var szPage = "";

    if (bNeumannEdition)
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + (nEffectWidth * 4 / 6) + "px; text-align: center; color: " + REVERB_COLOR + ";'>REVERB</div>";
    }
    else
    {
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + ((nEffectWidth * 4 / 6 - nMergingTextWidth - nReverbTextWidth) / 2 + nMergingTextWidth) + "px; text-align: right;'>MERGING+</div>";
        szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " left: " + ((nEffectWidth * 4 / 6 - nMergingTextWidth - nReverbTextWidth) / 2 + nMergingTextWidth + 5) + "px; width: " + ((nEffectWidth * 4 / 6 - nMergingTextWidth - nReverbTextWidth) / 2 + nReverbTextWidth) + "px; text-align: left; color: " + REVERB_COLOR + ";'>REVERB</div>";
    }

    if (GetAccessControl("CAnubisMusic_RevWidget"))
    {
        szPage += "<div id='reverb-snap-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 8 + nHeaderButtonWidth) + "px;'>SNAP</div>";
        szPage += "<div id='reverb-on-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 12 + nHeaderButtonWidth * 2) + "px;'>ON</div>";


        szPage += "<div id='reverb-lowCut-rotary' class='reverb-rotary' " + szLowCutStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-lowCut-rotary-canvas' class='reverb-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-lowCut-rotary-canvas' class='reverb-rotary-canvas'></canvas>";

            szPage += "<div id='reverb-lowCut-rotary-title' class='reverb-rotary-title'>LOW CUT</div>";

            szPage += "<div id='reverb-lowCut-rotary-value' class='reverb-rotary-value'></div>";

        szPage += "</div>";


        szPage += "<div id='reverb-highCut-rotary' class='reverb-rotary' " + szHighCutStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-highCut-rotary-canvas' class='reverb-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-highCut-rotary-canvas' class='reverb-rotary-canvas'></canvas>";

            szPage += "<div id='reverb-highCut-rotary-title' class='reverb-rotary-title'>HIGH CUT</div>";

            szPage += "<div id='reverb-highCut-rotary-value' class='reverb-rotary-value'></div>";

        szPage += "</div>";


        szPage += "<div id='reverb-size-rotary' class='reverb-rotary reverb-size-rotary' " + szSizeStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-size-rotary-canvas' class='reverb-size-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-size-rotary-canvas' class='reverb-size-rotary-canvas'></canvas>";

        szPage += "</div>";


        szPage += "<div id='reverb-predelay-rotary' class='reverb-rotary' " + szPredelayStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-predelay-rotary-canvas' class='reverb-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-predelay-rotary-canvas' class='reverb-rotary-canvas'></canvas>";

            szPage += "<div id='reverb-predelay-rotary-title' class='reverb-rotary-title'>PREDELAY</div>";

            szPage += "<div id='reverb-predelay-rotary-value' class='reverb-rotary-value'></div>";

        szPage += "</div>";


        szPage += "<div id='reverb-decay-rotary' class='reverb-rotary' " + szDecayStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-decay-rotary-canvas' class='reverb-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-decay-rotary-canvas' class='reverb-rotary-canvas'></canvas>";

            szPage += "<div id='reverb-decay-rotary-title' class='reverb-rotary-title'>DECAY</div>";

            szPage += "<div id='reverb-decay-rotary-value' class='reverb-rotary-value'></div>";

        szPage += "</div>";


        szPage += "<div id='reverb-diffusion-rotary' class='reverb-rotary' " + szDiffusionStyle + ">";

            if (bNeumannEdition)
                szPage += "<canvas id='neumann-reverb-diffusion-rotary-canvas' class='reverb-rotary-canvas' style='top: -5%;'></canvas>";

            szPage += "<canvas id='reverb-diffusion-rotary-canvas' class='reverb-rotary-canvas'></canvas>";

            szPage += "<div id='reverb-diffusion-rotary-title' class='reverb-rotary-title'>DIFFUSION</div>";

            szPage += "<div id='reverb-diffusion-rotary-value' class='reverb-rotary-value'></div>";

        szPage += "</div>";

        szPage += "<div id='' class='reverb-size-rotary-title' " + szSizeSmallStyle + ">SMALL</div>";
        szPage += "<div id='' class='reverb-size-rotary-title' " + szSizeLargeStyle + ">LARGE</div>";
    }
    else
    {
        var szLockedStyle = "style='width:" + nEffectWidth + "px; height:" + nEffectHeight + "px; line-height: " + nEffectHeight + "px; text-align: center;'";
        szPage += "<div id='' class='effectHeader' " + szLockedStyle + ">ACCESS LOCKED</div>";
    }

    return szPage;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuildEventideBlackhole()
{
    var eEffectsSection = document.getElementById("effectsSection");
    if (eEffectsSection == null)
    {
        return;
    }

    var nEffectMargin = g_nElementsBorderWidth * 2;
    var nEffectWidth = g_nStripWidth * 7.6 - nEffectMargin * 2;
    var nEffectHeight = g_nStripWidth * 5.5 - nEffectMargin * 2;

    var nReverbTop = nEffectMargin * 3 + nEffectHeight;
    var nReverbLeft = nEffectMargin;

    var nHeaderButtonWidth = ((nEffectWidth / 2) - g_nElementsBorderWidth * 14) / 3;


    var szEffectTitleStyle = "style='top: " + nReverbTop + "px; height:" + (nEffectHeight / 12) + "px; line-height: " + (nEffectHeight / 12) + "px;";
    var szHeaderButtonStyle = "style='top: " + nReverbTop + "px; width: " + nHeaderButtonWidth + "px; height:" + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px; line-height: " + (nEffectHeight / 12 - g_nElementsBorderWidth * 2 - 2) + "px;";

    var nKnobWidth = nEffectWidth / 7;
    var nKnobMargin = 2 * nKnobWidth / 6;
    var nTitleHeight = nKnobWidth / 2.5;
    var szRotaryStyle = "style='position: absolute; width: " + (nKnobWidth + 10) + "px; height: " + (nKnobWidth + 10) + "px;";
    var szKnobStyle = "style='position: absolute; width: " + nKnobWidth + "px; height: " + nKnobWidth + "px;";
    var szKnobTitleStyle = "style='width: " + nKnobWidth + "px; height: " + (nTitleHeight) + "px; line-height: " + (nTitleHeight) + "px;";
    var szInfoStyle = "style='width: " + (nKnobWidth * 2 + nKnobMargin) + "px; height: " + (nTitleHeight) + "px; line-height: " + (nTitleHeight) + "px; color: #7b7f80;";


    var szPage = "";

    szPage += "<img id='' src='../common/effects/images/Blackhole_background.png' style='position: absolute; left: " + (nReverbLeft + 3) + "px; top: " + (nReverbTop + nEffectHeight / 12 + 1) + "px;'></img>";
    szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12) + "px; width: " + (nEffectWidth - g_nElementsBorderWidth * 2 - 4) + "px; height: " + (nEffectHeight - nEffectHeight / 12 - g_nElementsBorderWidth - 4) + "px; border-radius: 4px; border: 2px solid #000000;'></div>";

    szPage += "<div id='' class='effectHeader' " + szEffectTitleStyle + " width: " + (nEffectWidth * 4 / 6) + "px; text-align: center; color: " + EVENTIDE_BLACKHOLE_COLOR + ";'>REVERB</div>";

    if (GetAccessControl("CAnubisMusic_RevWidget"))
    {
        szPage += "<div id='eventide-blackhole-snap-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 8 + nHeaderButtonWidth) + "px;'>SNAP</div>";
        szPage += "<div id='eventide-blackhole-on-button' class='effect-button' " + szHeaderButtonStyle + " left: " + (nEffectWidth / 2 + g_nElementsBorderWidth * 12 + nHeaderButtonWidth * 2) + "px;'>ON</div>";


        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-mix-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - 5) + "px; left: " + (nReverbLeft + nKnobMargin - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-mix-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - nTitleHeight) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'>0</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'>MIX</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-size-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - 5) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-size-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - nTitleHeight) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'>1</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'>SIZE</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-predelay-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - 5) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-predelay-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - nTitleHeight) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'>2</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'>PREDELAY</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-low-level-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - 5) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-low-level-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - nTitleHeight) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'>3</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'>LOW</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-high-level-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - 5) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-high-level-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 - nTitleHeight) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'>4</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'>HIGH</div>";

        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth + nTitleHeight / 2 - 1) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 4 - 12) + "px; border-top: 1px solid #7b7f80; width: 10px; height: 0px;'></div>";
        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth + nTitleHeight / 2 - 1) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 4 + 23) + "px; border-top: 1px solid #7b7f80; width: 10px; height: 0px;'></div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szInfoStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'>EQ</div>";
        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth + nTitleHeight / 2 + 8) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 4 + 10) + "px; border-left: 1px solid #7b7f80; width: 0px; height: 24px;'></div>";
        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth + nTitleHeight / 2 + 31) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 4 + 10) + "px; border-top: 1px solid #7b7f80; width: 26px; height: 0px;'></div>";

                                                                                  
        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-inv-gravity-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - 5) + "px; left: " + (nReverbLeft + nKnobMargin - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-inv-gravity-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - nTitleHeight) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'>5</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + nKnobMargin) + "px;'>GRAVITY</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-mod-depth-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - 5) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-mod-depth-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - nTitleHeight) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'>6</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth) + "px;'>DEPTH</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-mod-rate-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - 5) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-mod-rate-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - nTitleHeight) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'>7</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + 3 * nKnobMargin + nKnobWidth * 2) + "px;'>RATE</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-feedback-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - 5) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-feedback-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - nTitleHeight) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'>8</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + 4 * nKnobMargin + nKnobWidth * 3) + "px;'>FEEDBACK</div>";

        szPage += "<img id='' src='../common/effects/images/Blackhole_knob.png' " + szKnobStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'></img>";
        szPage += "<canvas id='eventide-blackhole-resonance-rotary-canvas' class='eventide-blackhole-rotary-canvas' " + szRotaryStyle + "top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - 5) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4 - 5) + "px;'></canvas>";
        szPage += "<div id='eventide-blackhole-resonance-value' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 - nTitleHeight) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'>9</div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szKnobTitleStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + 5 * nKnobMargin + nKnobWidth * 4) + "px;'>RESONANCE</div>";

        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth + nTitleHeight / 2 - 1) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth * 2 - 8) + "px; border-top: 1px solid #7b7f80; width: 5px; height: 0px;'></div>";
        szPage += "<div id='' class='' style='position: absolute; top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth + nTitleHeight / 2 - 1) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth * 2 + 28) + "px; border-top: 1px solid #7b7f80; width: 5px; height: 0px;'></div>";
        szPage += "<div id='' class='eventide-blackhole-knob-title' " + szInfoStyle + " top: " + (nReverbTop + nEffectHeight / 12 + nEffectHeight / 4 + nKnobWidth * 1.9 + nKnobWidth) + "px; left: " + (nReverbLeft + 2 * nKnobMargin + nKnobWidth + 3) + "px;'>MOD</div>";
    }
    else
    {
        var szLockedStyle = "style='width:" + nEffectWidth + "px; height:" + nEffectHeight + "px; line-height: " + nEffectHeight + "px; text-align: center;'";
        szPage += "<div id='' class='effectHeader' " + szLockedStyle + ">ACCESS LOCKED</div>";
    }

    return szPage;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenEQBandsMenu()
{
    var eBandsButton = document.getElementById("eq-bands-button");
    if (eBandsButton == null)
    {
        return;
    }

    if (eBandsButton.classList.contains("effect-button-disabled"))
        return;

    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eEffectScroll = document.getElementById("effectsScrollContainer");
    if (eEffectScroll == null)
    {
        return;
    }

    var eEQContainer = document.getElementById("EQEffectContainer");
    if (eEQContainer == null)
    {
        return;
    }
    
    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var nNbBands = jsEQ.eq_bands.length;


    var nLeft = eEQContainer.offsetLeft + eBandsButton.offsetLeft - 3;
    var nTop = eEffectScroll.offsetTop + eEQContainer.offsetTop + eBandsButton.offsetTop + eBandsButton.offsetHeight + 3;

    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupMenu' class='mixerSectionPopupMenu' style='top: " + nTop + "px; left: " + nLeft + "px; grid-template-columns: 140px;'>";

            szPage += "<div class='mixerSectionPopupMenuColumn'>";

                if (nNbBands < EQ_NB_BANDS * EQ_MAX_NB_BANKS)
                {
                    szPage += "<div class='mixerSectionPopupMenuItem' id='EQAddBands'>ADD BANDS " + (nNbBands + 1) + "-" + (nNbBands + EQ_BAND_COUNT_BY_GROUP) + "</div>";
                }

                if (nNbBands > EQ_NB_BANDS)
                {
                    szPage += "<div class='mixerSectionPopupMenuItem' id='EQRemoveBands'>REMOVE BANDS " + (nNbBands - EQ_BAND_COUNT_BY_GROUP + 1) + "-" + (nNbBands) + "</div>";
                }

                szPage += "<div class='mixerSectionPopupMenuItem' id='EQFlatBands'>FLAT</div>";

            szPage += "</div>";

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function (event) { CloseEQBandsMenu(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function (event) { CloseEQBandsMenu(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function (event) { CloseEQBandsMenu(); }, true);
    }

    AddEvent("mixerSectionPopupMenu", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupMenu", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupMenu", "mousedown", function (event) { event.stopPropagation(); }, true);

    AddEvent("EQAddBands", "click", function (event) { AddEQBands(); });
    AddEvent("EQRemoveBands", "click", function (event) { RemoveEQBands(); });
    AddEvent("EQFlatBands", "click", function (event) { FlatEQBands(); });

    ShowPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseEQBandsMenu()
{
	ClosePopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AddEQBands()
{
    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsNodes = [];

    var jsEQBands = jsEQ.eq_bands;

    for (var i = 0; i < jsEQBands.length; i++)
    {
        jsNodes.push(jsEQBands[i]);
    }

    var nSqrt2 = Math.sqrt(3.);
    var tFreqBase = [31.25 * nSqrt2, 31.25, 31.25 * 3];
    var nFreq = tFreqBase[jsEQBands.length % 3];

    for (var i = 0; i < EQ_BAND_COUNT_BY_GROUP; i++)
    {
        var jsBand =
        {
            gain: 0.,
            freq: nFreq,
            Q: 10.,
            type: 2,
            bypass: false
        }

        jsNodes.push(jsBand);

        nFreq *= nSqrt2 * 3;
    }

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq", value: { eq_bands: jsNodes } });

    CloseEQBandsMenu();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RemoveEQBands()
{
    g_nControledEQBandID = 0;
    UpdateEQ(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsNodes = [];

    var jsEQBands = jsEQ.eq_bands;
    var nNbBands = jsEQ.eq_bands.length;

    var nNewNbBands = nNbBands - EQ_BAND_COUNT_BY_GROUP > EQ_NB_BANDS * EQ_MAX_NB_BANKS ? 0 : nNbBands - EQ_BAND_COUNT_BY_GROUP;

    for (var i = 0; i < nNewNbBands; i++)
    {
        jsNodes.push(jsEQBands[i]);
    }

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq", value: { eq_bands: jsNodes } });

    CloseEQBandsMenu();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function FlatEQBands()
{
    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsNodes = [];

    var jsEQBands = jsEQ.eq_bands;

    for (var i = 0; i < jsEQBands.length; i++)
    {
        var jsBand =
        {
            gain: 0,
            type: 2
        };

        jsNodes.push(jsBand);
    }

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq", value: { eq_bands: jsNodes } });

    CloseEQBandsMenu();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkEQ()
{
    var eLinkButton = document.getElementById("eq-link-button");
    if (eLinkButton == null || g_bBusEffect)
    {
        return;
    }

    if (eLinkButton.classList.contains("effect-button-disabled"))
        return;

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();
    
    var bLinked = jsEQ.linked;
    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq", value: { linked: !bLinked } });

    if (g_bInputEffect)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        if (jsInput.linked_input_id != -1)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath.replace(g_nOnInputID, jsInput.linked_input_id) + ".eq", value: { linked: !bLinked } });
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EnableEQ()
{
    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var bEnabled = jsEQ.enabled;

    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var nMaxEQs = jsMixer.dsp_ressources.max_eqs;
    var nAllocatedEQs = jsMixer.dsp_ressources.allocated_eqs;
    var nAvailableEQs = nMaxEQs - nAllocatedEQs;

    if (!bEnabled && ((g_bBusEffect && (nAvailableEQs < 2)) || (g_bInputEffect && nAvailableEQs < 1)))
    {
        var szText = "";
        if (jsMixer.settings.neumann_edition)
        {
            szText = "<br/>Not enough resources available to enable this EQ.<br/>Please disable some other EQs.<br/>";
        }
        else
        {
            szText = "<br/>Not enough resources available to enable this EQ.<br/>Please disable some other EQs or SoundID profiles.<br/>";
        }

        OpenInfosPopup(szText, 480, 100);
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq", value: { enabled: !bEnabled } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BypassEQBand()
{
    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    if (!jsEQ.enabled)
        return;
    

    var bBypass;
    if (g_nControledEQBandID == -1)
    {
        var eBypassButton = document.getElementById("eq-bypass-button");
        if (eBypassButton == null)
        {
            return;
        }

        bBypass = eBypassButton.classList.contains("eq-bypass-button-checked");

        for (var nBandID = 0; nBandID < jsEQ.eq_bands.length; nBandID++)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + nBandID + "]", value: { bypass: !bBypass } });
        }
    }
    else
    {
        bBypass = jsEQ.eq_bands[g_nControledEQBandID].bypass;

        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { bypass: !bBypass } });
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkDynamics()
{
    var eLinkButton = document.getElementById("dynamics-link-button");
    if (eLinkButton == null || g_bBusEffect || !g_bDynamicsEnabled)
    {
        return;
    }

    if (eLinkButton.classList.contains("effect-button-disabled"))
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    var bLinked = jsDynamics.linked;
    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics", value: { linked: !bLinked } });

    if (g_bInputEffect)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        if (jsInput.linked_input_id != -1)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath.replace(g_nOnInputID, jsInput.linked_input_id) + ".dynamics", value: { linked: !bLinked } });
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EnableDynamics()
{
    if (g_bBusEffect && g_nOnBusID == MM_ID_DYNAMICS_BUS) // Parallel Dynamics always ON
    {
        var szText = "<br/>Dynamics is always ON in parallel processing. Use the Mute<br/>on the Mixer Dynamics channel return strip to turn it off.<br/>";

        OpenInfosPopup(szText, 510, 100);
    }
    else
    {
        var tSidechainNames = GetSidechainedByInputNames();
        var nSidechainNamesSize = tSidechainNames.length;
        if (nSidechainNamesSize > 0 && !g_bBusEffect)
        {
            var nPopupHeight;
            if (nSidechainNamesSize <= 2)
                nPopupHeight = 100;
            else if (nSidechainNamesSize <= 6)
                nPopupHeight = 120;
            else if (nSidechainNamesSize <= 10)
                nPopupHeight = 140;
            else
                nPopupHeight = 160;

            var szText = "<br/>Can't disable this dynamics, in use as<br/>Side-Chain input by ";

            for (var Idx = 0; Idx < nSidechainNamesSize; Idx++)
            {
                if (Idx < nSidechainNamesSize)
                    szText += tSidechainNames[Idx];

                if (Idx != nSidechainNamesSize - 1) {
                    szText += ",";

                    if (Idx == 1 || Idx == 5 || Idx == 9)
                        szText += "<br/>";
                    else
                        szText += " ";
                }
            }
            szText += ".<br/>";

            OpenInfosPopup(szText, 360, nPopupHeight);
            return;
        }

        var jsMixer = GetMixerJSON();
        if (jsMixer == null)
        {
            return;
        }

        var nMaxDynamics = jsMixer.dsp_ressources.max_dynamics;
        var nAllocatedDynamics = jsMixer.dsp_ressources.allocated_dynamics;
        var nAvailableDynamics = nMaxDynamics - nAllocatedDynamics;

        var nMaxPostFxMasterGain = jsMixer.dsp_ressources.max_post_fx_mastergain;
        var nAllocatedPostFxMasterGain = jsMixer.dsp_ressources.allocated_post_fx_mastergain;

        if (!g_bDynamicsEnabled && ((g_bBusEffect && (nAvailableDynamics < 2)) || (g_bInputEffect && nAvailableDynamics < 1) || (nAllocatedPostFxMasterGain + 1 > nMaxPostFxMasterGain)))
        {
            var szText = "<br/>Not enough resources available to enable this Dynamics.<br/>Please disable some other Dynamics.<br/>";

            OpenInfosPopup(szText, 480, 100);        
            return;
        }

        var jsDynamics = GetDynamicsJSON();
        if (jsDynamics == null)
        {
            return;
        }

        var szTruncatedPath = GetTruncatedPath();

        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics", value: { enabled: !g_bDynamicsEnabled } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BypassDynamicsBand()
{
    if (!g_bDynamicsEnabled)
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    var bBypass = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].bypass;
    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { bypass: !bBypass } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsPeakReset()
{
    if (!g_bDynamicsEnabled)
        return;

    var jsValue = new Array();
    self.Communicator.publish("/service/ravenna/settings", { path: "$._modules[?(@.id==3)][0].actions.meter_reset_all_holds", value: { jsValue } }); // ZMI_ROUTERVUMETER = 3
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsResetButtonPressed(bPressed)
{
    var eButton = document.getElementById("dynamics-reset-button");
    if (eButton)
    {
        bPressed ? eButton.classList.add("pressed") : eButton.classList.remove("pressed");
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsAutoGain()
{
    if (!g_bDynamicsEnabled)
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    self.Communicator.publish("/service/ravenna/settings", { path: GetTruncatedPath() + ".dynamics", value: { auto_gain: !jsDynamics.auto_gain } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OpenSidechainListPopup()
{
    var eMixerSectionPopupContainer = document.getElementById("mixerSectionPopupContainer");
    if (eMixerSectionPopupContainer == null)
    {
        return;
    }

    var eSidechainButton = document.getElementById("dynamics-sidechain-button");
    if (eSidechainButton && eSidechainButton.classList.contains("dynamics-button-checked-disabled"))
    {
        return;
    }

    var eEffectScroll = document.getElementById("effectsScrollContainer");
    if (eEffectScroll == null)
    {
        return;
    }

    var eDynamicsContainer = document.getElementById("DynamicsEffectContainer");
    if (eDynamicsContainer == null)
    {
        return;
    }

    var jsInputs = GetInputJSON(-1);
    if (jsInputs == null)
    {
        return;
    }

    var tSidechainIds = [];
    var tSidechainNames = [];
    for (var idx = 0; idx < jsInputs.length; idx++)
    {
        if (jsInputs[idx].dynamics)
        {
            if (jsInputs[idx].dynamics.enabled)
            {
                if (jsInputs[idx].id != g_nOnInputID)
                {
                    var jsStrip = GetStripJSON(jsInputs[idx].id);
                    if (jsStrip)
                    {
                        tSidechainIds.push(jsInputs[idx].id);
                        tSidechainNames.push(jsStrip.name);
                    }
                }
            }
        }
    }

    var nNbSidechainNames = tSidechainNames.length;

    if (nNbSidechainNames == 0) // do not open the popup if any sidechaine are not possible
        return;

    var nWidth = eDynamicsContainer.offsetWidth * 1.8 / 3;

    var r = document.querySelector(':root');

    var szButtonHeight = r.style.getPropertyValue("--strip-button-height");
    var nButtonHeight = Number(szButtonHeight.replace("px", "") * 1.1);

    var nHeight = (nButtonHeight + 1) * (nNbSidechainNames + 2);
    while (nHeight > eDynamicsContainer.offsetHeight - 30 * 2)
    {
        nHeight -= (nButtonHeight + 1);
    }

    var nLeft = eDynamicsContainer.offsetLeft + eDynamicsContainer.offsetWidth / 2 - nWidth / 2;

    var nTop = eEffectScroll.offsetTop + eDynamicsContainer.offsetTop + 30;
    if (nTop + nHeight > window.innerHeight)
        nTop = eEffectScroll.offsetTop + 30;

    var nMargin = (g_nElementsBorderWidth * 4);
    var nScrollContainerHeight = nHeight - nButtonHeight * 2;

    var szButtonStyle = "style='left: " + (g_nElementsBorderWidth + nMargin) + "px; width: " + (nWidth - nMargin * 2 - g_nElementsBorderWidth * 2) + "px; height: " + (nButtonHeight - nMargin) + "px; line-height: " + (nButtonHeight - nMargin) + "px;";

    var nScrollPosY = 0;
    var szPage = "";

    szPage += "<div id='mixerSectionPopup' class='mixerSectionPopup'>";

        szPage += "<div id='mixerSectionPopupSidechainListPopup' class='ScrollChoicePopup' style='top: " + nTop + "px; left: " + nLeft + "px; width: " + nWidth + "px; height: " + nHeight + "px;'>";

            szPage += "<div class='ScrollChoicePopupTitle' id='' " + szButtonStyle + "top: " + (g_nElementsBorderWidth) + "px;'>Side-Chain Input</div>";

            szPage += "<div id='SidechainListSection' class='ScrollChoicePopupSection' style='left: -1px; top: " + (nButtonHeight - g_nElementsBorderWidth * 3) + "px; width: " + (nWidth - g_nElementsBorderWidth * 2) + "px; height: " + nScrollContainerHeight + "px;'>";

                szPage += "<div id='SidechainList-scroll' class='ScrollChoicePopup-scroll'>";

                    for (var idx = 0; idx < nNbSidechainNames; ++idx)
                    {
                        szPage += "<div class='ScrollChoicePopupButton' id='SidechainListButton" + tSidechainIds[idx] + "' " + szButtonStyle + "'>&nbsp;&nbsp;&nbsp;" + tSidechainNames[idx] + "</div>";

                        if (tSidechainIds[idx] == g_nOnInputID)
                            nScrollPosY = idx;
                    }                    

                szPage += "</div>";

            szPage += "</div>";

            szPage += "<div class='ScrollChoicePopupButtonNone' id='SidechainListButtonNone' " + szButtonStyle + "top: " + (nHeight - nButtonHeight) + "px;'>NONE</div>";

        szPage += "</div>";

    szPage += "</div>";


    eMixerSectionPopupContainer.innerHTML = szPage;


    UpdateSidechainListPopup();

    var isButtonsScroller = new iScroll("SidechainListSection", { hScroll: false, vScroll: true, bounce: false });

    var nNbSidechainListButtons = Math.round((nHeight - (2 * (nButtonHeight + 1))) / (nButtonHeight + 1));
    if (nScrollPosY >= nNbSidechainListButtons)
    {
        nScrollPosY = (nScrollPosY - Math.floor(nNbSidechainListButtons / 2)) * (nButtonHeight + 1);
        isButtonsScroller.scrollTo(0, -nScrollPosY, 0);
    }

    var isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice)
    {
        AddEvent("mixerSectionPopup", "click", function () { CloseSidechainListPopup(); }, true);
    }
    else
    {
        AddEvent("mixerSectionPopup", "touchstart", function () { CloseSidechainListPopup(); }, true);
        AddEvent("mixerSectionPopup", "mousedown", function () { CloseSidechainListPopup(); }, true);
    }

    AddEvent("mixerSectionPopupSidechainListPopup", "click", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSidechainListPopup", "touchstart", function (event) { event.stopPropagation(); }, true);
    AddEvent("mixerSectionPopupSidechainListPopup", "mousedown", function (event) { event.stopPropagation(); }, true);


    var eButtons = document.getElementsByClassName("ScrollChoicePopupButton");
    if (eButtons)
    {
        for (var iIdx = 0; iIdx < eButtons.length; iIdx++)
        {
            AddEvent(eButtons[iIdx].id, "click", (function _SetSidechainID(_iID) { return function () { SetSidechainID(_iID); } })(Number(eButtons[iIdx].id.replace("SidechainListButton", ""))));
        }
    }

    AddEvent("SidechainListButtonNone", "click", function () { SetSidechainID(-1); }, true);

    ShowPopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateSidechainListPopup()
{
    var eSidechainPopup = document.getElementById("mixerSectionPopupSidechainListPopup");
    if (eSidechainPopup == null)
    {
        return;
    }

    var jsInput = GetInputJSON(g_nOnInputID);
    if (jsInput == null)
    {
        return;
    }

    var eButtons = document.getElementsByClassName("ScrollChoicePopupButton");
    if (eButtons)
    {
        for (var idx = 0; idx < eButtons.length; ++idx)
        {
            eButtons[idx].id.includes(g_nSidechainID) ? eButtons[idx].classList.add("ScrollChoicePopupButtonChecked") : eButtons[idx].classList.remove("ScrollChoicePopupButtonChecked");
        }
    }

    var eButtonNone = document.getElementById("SidechainListButtonNone")
    if (eButtonNone)
    {
        g_nSidechainID == -1 ? eButtonNone.classList.add("ScrollChoicePopupButtonChecked") : eButtonNone.classList.remove("ScrollChoicePopupButtonChecked");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CloseSidechainListPopup()
{
    ClosePopupContainer();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SetSidechainID(nID)
{
    var jsInput = GetInputJSON(g_nOnInputID);
    if (jsInput == null)
    {
        return;
    }
    
    self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + g_nOnInputID + ")][0].dynamics", value: { dynamics_sidechain: (jsInput.dynamics.dynamics_sidechain == nID ? -1 : nID) } });

    if (jsInput.dynamics.linked && jsInput.linked_input_id != -1)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + jsInput.linked_input_id + ")][0].dynamics", value: { dynamics_sidechain: (jsInput.dynamics.dynamics_sidechain == nID ? -1 : nID) } });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsSetFaderValue(szFaderName)
{
    if (!g_bDynamicsEnabled)
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    var nValue;    
    if (szFaderName == "threshold")
    {
        nValue = Number(prompt("THRESHOLD")) * 10;

        if (nValue < g_tDynamicsThresholdMin[g_nControledDynamicsBandID])
        {
            nValue = g_tDynamicsThresholdMin[g_nControledDynamicsBandID];
        }
        else if (nValue > g_tDynamicsThresholdMax[g_nControledDynamicsBandID])
        {
            nValue = g_tDynamicsThresholdMax[g_nControledDynamicsBandID];
        }

        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { threshold: nValue } });
    }
    else if (szFaderName == "makeup")
    {
        nValue = Number(prompt("MAKEUP GAIN")) * 10;

        if (nValue < -360)
        {
            nValue = -360;
        }
        else if (nValue > 360)
        {
            nValue = 360;
        }

        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics", value: { gain: nValue } });
    }    
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LinkDeesser()
{
    var eLinkButton = document.getElementById("deesser-link-button");
    if (eLinkButton == null)
    {
        return;
    }

    if (eLinkButton.classList.contains("effect-button-disabled"))
        return;

    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    var bLinked = jsDeesser.linked;
    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { linked: !bLinked } });

    if (g_bInputEffect)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        if (jsInput.linked_input_id != -1)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath.replace(g_nOnInputID, jsInput.linked_input_id) + ".deesser", value: { linked: !bLinked } });
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EnableDeesser()
{
    var jsMixer = GetMixerJSON();
    if (jsMixer == null)
    {
        return;
    }

    var nAvailableDeesser = jsMixer.dsp_ressources.available_deessers;

    if (!g_bDeesserEnabled && nAvailableDeesser < 1)
    {
        var szText = "<br/>Not enough resources available to enable this Deesser.<br/>Please disable some other Deessers.<br/>";

        OpenInfosPopup(szText, 480, 100);        
        return;
    }

    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { enabled: !g_bDeesserEnabled } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserListen()
{
    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }

    if (!jsDeesser.enabled)
        return;

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { listen: !jsDeesser.listen } });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserSwitchFilter()
{
    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }

    if (!jsDeesser.enabled)
        return;

    var szTruncatedPath = GetTruncatedPath();

    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { split: !jsDeesser.split } });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectEQBall(event, bTouch, bMouseUp)
{
    var eEffectScrollContainer = document.getElementById("effectsScrollContainer");
    if (eEffectScrollContainer == null)
    {
        return;
    } 

    var eEQContainer = document.getElementById("EQEffectContainer");
    if (eEQContainer == null)
    {
        return;
    }

    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    var nClickPosX = 0;
    var nClickPosY = 0;

    if (bTouch)
    {
        nClickPosX = event.targetTouches[0].clientX;
        nClickPosY = event.targetTouches[0].clientY;
    }
    else
    {
        nClickPosX = event.pageX;
        nClickPosY = event.pageY;
    }

    nClickPosX -= eEffectScrollContainer.offsetLeft + eEQContainer.offsetLeft + eCanvas.offsetLeft;
    nClickPosY -= eEffectScrollContainer.offsetTop + eEQContainer.offsetTop + g_isEffectsScroller.y + eCanvas.offsetTop + 35;

    var nNewControleEQBandID = GetEQBandID(nClickPosX, nClickPosY);

    if (nNewControleEQBandID != g_nControledEQBandID)
    {
        g_nControledEQBandID = nNewControleEQBandID;
        
        UpdateEQ(g_bBusEffect, g_nOnBusID, g_bInputEffect, g_nOnInputID);
    }

    if (!bMouseUp && g_nControledEQBandID != -1)
    {
        var jsEQ = GetEQJSON();
        if (jsEQ == null)
        {
            return;
        }

        g_nControledEQMouseDownTypeValue = jsEQ.eq_bands[g_nControledEQBandID].type;
        g_nControledEQMouseDownFreqValue = jsEQ.eq_bands[g_nControledEQBandID].freq;
        g_nControledEQMouseDownGainValue = jsEQ.eq_bands[g_nControledEQBandID].gain;

        if (bTouch && event.targetTouches)
        {
	        if (event.targetTouches.length <= 0)
	        {
		        return;
	        }

            g_nControledEQMouseDownClickOffsetX = event.targetTouches[0].clientX - g_tEQBallPointsX[g_nControledEQBandID];
        }
        else
        {
            g_nControledEQMouseDownClickOffsetX = event.pageX - g_tEQBallPointsX[g_nControledEQBandID];
        }

        g_bControledEQBallMouseDown = true;

        event.stopPropagation();

        g_nPublishEQBallValueTimer = window.setInterval(OnTimerPublishEQBallControl, 50);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetEQBandID(nClickPosX, nClickPosY)
{
    var nNormMin = 10000000000;
    for (var nBandID = 0; nBandID < g_tEQBallPointsX.length; nBandID++)
    {
        var nNorm = Math.sqrt(Math.pow((nClickPosX - g_tEQBallPointsX[nBandID]), 2) + Math.pow((nClickPosY - g_tEQBallPointsY[nBandID]), 2));
        nNormMin = Math.min(nNormMin, nNorm);
    }

    var nNewControleEQBandID = -1;
    if (nNormMin > 50)
    {
        nNewControleEQBandID = -1;
    }
    else
    {
        for (var nBandID = 0; nBandID < g_tEQBallPointsX.length; nBandID++)
        {
            var nNorm = Math.sqrt(Math.pow((nClickPosX - g_tEQBallPointsX[nBandID]), 2) + Math.pow((nClickPosY - g_tEQBallPointsY[nBandID]), 2));
            if (nNormMin == nNorm)
            {
                nNewControleEQBandID = nBandID;
                break;
            }
        }
    }

    return nNewControleEQBandID;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQBallMouseMove(event, bTouch)
{
    if (!g_bControledEQBallMouseDown)
	{
		return;
    }

    g_bControledEQBallMouseMoving = true;

    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    g_isEffectsScroller.scrollTo(0, g_nEffectsScrollerY, 0);

	var nMoveX = 0;
	var nPosY = 0;
	if (bTouch && event.targetTouches)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

        nMoveX = event.targetTouches[0].clientX - g_tEQBallPointsX[g_nControledEQBandID];
        nPosY = event.targetTouches[0].clientY - eCanvas.getBoundingClientRect().top;
	}
	else
    {
        nMoveX = event.pageX - g_tEQBallPointsX[g_nControledEQBandID];
        nPosY = event.pageY - eCanvas.getBoundingClientRect().top;
    }

    var nNewPosX = g_tEQBallPointsX[g_nControledEQBandID] + (nMoveX - g_nControledEQMouseDownClickOffsetX);
    var nNewFreq = EQPosXToFreq(nNewPosX, eCanvas.offsetWidth);
    nNewFreq = Number(nNewFreq).toFixed(0);


    var nMin = -18;
    var nMax = 18;

    var nBallDistanceFromCurve = g_nControledEQMouseDownTypeValue == EQ_TYPE_PEAK ? eCanvas.offsetHeight / 9 : eCanvas.offsetHeight / 28;
    var nNewGainPosY = eCanvas.offsetHeight / 2;
    if (nPosY > eCanvas.offsetHeight / 2 + nBallDistanceFromCurve)
    {
        nNewGainPosY = nPosY - nBallDistanceFromCurve;
	}
    else if (nPosY < eCanvas.offsetHeight / 2 - nBallDistanceFromCurve)
    {
        nNewGainPosY = nPosY + nBallDistanceFromCurve;
    }

    var nNewGain = (eCanvas.offsetHeight / 2 - nNewGainPosY) / (eCanvas.offsetHeight / (nMax - nMin));
    if (nNewGain < -24)
        nNewGain = -24;

    if (nNewGain > 24)
        nNewGain = 24;

    nNewFreq = Number(nNewFreq);
    nNewGain = Number(nNewGain);

    g_tEQBallPointsX[g_nControledEQBandID] = nNewPosX;
    g_tEQBallPointsY[g_nControledEQBandID] = nNewGainPosY;

    PublishEQBallControl(nNewFreq, (g_nControledEQMouseDownTypeValue == EQ_TYPE_HICUT || g_nControledEQMouseDownTypeValue == EQ_TYPE_LOCUT ? null : nNewGain));

    g_bControledEQBallMouseMoving = false;

    event.stopPropagation();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQBallMouseUp(event)
{
    if (!g_bControledEQBallMouseDown)
	{
		return;
    }

    g_nControledEQMouseDownClickOffsetX = 0;

    clearTimeout(g_nPublishEQBallValueTimer);
    g_nPublishEQBallValueTimer = null;
    g_nLastPublishedEQBallFreq = null;
    g_nLastPublishedEQBallGain = null;
	g_nLastSendEQBallFreq = null;
	g_nLastSendEQBallGain = null;

    g_bControledEQBallMouseDown = false;
    
	event.stopPropagation();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedEQBallFreq = null;
var g_nLastPublishedEQBallGain = null;
var g_nLastSendEQBallFreq = null;
var g_nLastSendEQBallGain = null;
var g_nPublishEQBallTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishEQBallControl(nNewFreq, nNewGain)
{
    g_nLastPublishedEQBallFreq = nNewFreq;
    g_nLastPublishedEQBallGain = nNewGain;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishEQBallControl()
{
    if (g_nLastPublishedEQBallFreq == g_nLastSendEQBallFreq && g_nLastPublishedEQBallGain == g_nLastSendEQBallGain)
	{
		return;
	}

    if (g_nLastPublishedEQBallFreq == null && g_nLastPublishedEQBallGain == null)
	{
		return;
	}

	
	var szTruncatedPath = GetTruncatedPath();

    if (g_nLastPublishedEQBallFreq >= EQ_FREQUENCY_MIN && g_nLastPublishedEQBallFreq <= EQ_FREQUENCY_MAX)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { freq: g_nLastPublishedEQBallFreq } });
    }

    if (g_nLastPublishedEQBallGain != null && g_nLastPublishedEQBallGain >= -24 && g_nLastPublishedEQBallGain <= 24)
    {
        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { gain: g_nLastPublishedEQBallGain } });
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEQTypeRotary(eRotaryCanvas, value, bSelected, bDisabled, cRingColor)
{
    var cRotaryColor = "#282828";

    if (bDisabled)
    {
        cRingColor = cRotaryColor;
    }

    var nValue = value / 4;

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_SINGLE_DOT);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEQFrequencyRotary(eRotaryCanvas, value, bSelected, bDisabled, cRingColor)
{
    var cRotaryColor = "#282828";

    if (bDisabled)
    {
        cRingColor = cRotaryColor;
    }

    var nValue = EQFrequencyRotaryValueToPos(value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQFrequencyRotaryValueToPos(nValue)
{
    return EffectLogRotaryValueToPos(EQ_FREQUENCY_MIN, EQ_FREQUENCY_MAX, nValue, 25 / 10);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQFrequencyRotaryPosToValue(nPos)
{
    return EffectLogRotaryPosToValue(EQ_FREQUENCY_MIN, EQ_FREQUENCY_MAX, nPos, 10 / 25);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEQGainRotary(eRotaryCanvas, value, bSelected, bDisabled, cRingColor)
{
    var cRotaryColor = "#282828";

    if (bDisabled)
    {
        cRingColor = cRotaryColor;
    }

    var nValue = (50 + value / 24 * 50) / 100;

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_BOOST_CUT);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEQQRotary(eRotaryCanvas, value, bSelected, bDisabled, cRingColor)
{
    var cRotaryColor = "#282828";

    if (bDisabled)
    {
        cRingColor = cRotaryColor;
    }

    var nValue = EQQRotaryValueToPos(value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_SPREAD_INV);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQQRotaryValueToPos(nValue)
{
    return EffectLogRotaryValueToPos(EQ_Q_MIN, EQ_Q_MAX, nValue, 25 / 10);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQQRotaryPosToValue(nPos)
{
    return EffectLogRotaryPosToValue(EQ_Q_MIN, EQ_Q_MAX, nPos, 10 / 25);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEQ()
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }


    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    var ctx = eCanvas.getContext("2d");
    if (ctx == null)
    {
        return;
    }

    var eRotary = document.getElementById("eq-type-rotary");
    if (eRotary == null)
    {
        return;
    }

    var nCanvasWidth = eCanvas.offsetWidth;
    var nCanvasHeight = eCanvas.offsetHeight;

    // Let's deal with the screen high dpi properly to avoid blurry drawing
    // TODO: Do this once only after creation
    let dpi = window.devicePixelRatio;
    eCanvas.setAttribute('height', nCanvasHeight * dpi);
    eCanvas.setAttribute('width', nCanvasWidth * dpi);
    ctx.scale(dpi, dpi);

    ctx.imageSmoothingEnabled = true;
    
    if (jsEQ.enabled)
    {
        g_nEQBallSize = eRotary.offsetWidth / 4.7;
        var nOffset = eCanvas.offsetHeight / 2; // 0dB

        if (!g_bControledEQBallMouseMoving)
        {
            g_tEQBallPointsX = [];
            g_tEQBallPointsY = [];
        }

        for (var nBandID = 0; nBandID < jsEQ.eq_bands.length; nBandID++)
        {
            var tCurvePointsX = g_tCurvesPointsX[nBandID];
            var tCurvePointsY = g_tCurvesPointsY[nBandID];

            for (nPoint = 0; nPoint < tCurvePointsX.length; nPoint++)
            {
                ctx.beginPath();
                ctx.strokeStyle = (bNeumannEdition ? NEUMANN_EQ_T_BAND_COLORS[nBandID] : EQ_T_BAND_COLORS[nBandID]) + "40";
                ctx.moveTo(nPoint, nOffset);
                ctx.lineTo(nPoint, nOffset + tCurvePointsY[nPoint]);
                ctx.lineWidth = 1;
                ctx.stroke();

                /*if (nPoint < tCurvePointsX.length - 1)
                {
                    ctx.beginPath();
                    ctx.strokeStyle = EQ_T_BAND_COLORS[nBandID];
                    ctx.moveTo(tCurvePointsX[nPoint], nOffset + tCurvePointsY[nPoint]);
                    ctx.lineTo(tCurvePointsX[nPoint + 1], nOffset + tCurvePointsY[nPoint + 1]);
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }*/
            }

            for (nPoint = 0; nPoint < tCurvePointsX.length - 1; nPoint++)
            {
                ctx.beginPath();
                ctx.strokeStyle = bNeumannEdition ? "#545454" : "#c0c0c0";
                ctx.moveTo(nPoint, nOffset + g_tResultCurvePointsY[nPoint]);
                ctx.lineTo(nPoint + 1, nOffset + g_tResultCurvePointsY[nPoint + 1]);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        for (var nBandID = 0; nBandID < jsEQ.eq_bands.length; nBandID++)
        {
            var nType = jsEQ.eq_bands[nBandID].type;
            var nFreq = jsEQ.eq_bands[nBandID].freq;
            var nGain = jsEQ.eq_bands[nBandID].gain;

            var nBallCenterX = 0;
            var nBallCenterY = 0;

            if (g_bControledEQBallMouseMoving)
            {
                nBallCenterX = g_tEQBallPointsX[nBandID];
                nBallCenterY = g_tEQBallPointsY[nBandID];
            }
            else
            {
                nBallCenterX = EQFreqToPosX(nFreq, eCanvas.offsetWidth);
                nBallCenterY = EQBallGainToPosY(nGain, eCanvas.offsetHeight, nType);

                g_tEQBallPointsX.push(nBallCenterX);
                g_tEQBallPointsY.push(nBallCenterY);
            }

            if (bNeumannEdition || nBandID == g_nControledEQBandID)
            {
                ctx.beginPath();
                ctx.arc(nBallCenterX, nBallCenterY, g_nEQBallSize / 2, 0, Math.PI * 2);
                ctx.fillStyle = (bNeumannEdition ? NEUMANN_EQ_T_BAND_COLORS[nBandID] : EQ_T_BAND_COLORS[nBandID]) + "88"; // transparency
                ctx.fill();

                if (bNeumannEdition && nBandID == g_nControledEQBandID)
                {
                    ctx.beginPath();
                    ctx.arc(nBallCenterX, nBallCenterY, g_nEQBallSize / 5, 0, Math.PI * 2);
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                }
            }

            ctx.beginPath();
            ctx.arc(nBallCenterX, nBallCenterY, g_nEQBallSize / 2, 0, Math.PI * 2);
            ctx.strokeStyle = (bNeumannEdition ? NEUMANN_EQ_T_BAND_COLORS[nBandID] : EQ_T_BAND_COLORS[nBandID]);
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }
}

//////////////////////////////////////////////////////////////////////
function ConvertdBToFloatLinear(ndBValue, nDivider)
{
    var nNorm_dBValue = nDivider == null ? ndBValue / 1 : ndBValue / nDivider;

    return Math.pow(10.0, 0.05 * nNorm_dBValue);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQFreqToPosX(nFreq, nPosXMax)
{
    var nPosX = (Math.log2(nFreq) - Math.log2(EQ_CURVE_FREQUENCY_MIN)) / (Math.log2(EQ_CURVE_FREQUENCY_MAX) - Math.log2(EQ_CURVE_FREQUENCY_MIN)) * nPosXMax;

    return nPosX;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQPosXToFreq(nPosX, nPosXMax)
{
    var nFreq = Math.pow(2, (nPosX / nPosXMax) * (Math.log2(EQ_CURVE_FREQUENCY_MAX) - Math.log2(EQ_CURVE_FREQUENCY_MIN)) + Math.log2(EQ_CURVE_FREQUENCY_MIN));

    return nFreq;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EQBallGainToPosY(nGain, nCanvasHeight, nType)
{
    var nPosY;

    var nGainPosYMin;
    var nGainPosYMax;

    var nPosYMin = g_nEQBallSize / 2;
    var nPosYMax = nCanvasHeight - g_nEQBallSize / 2;

    if (nGain == 0 || nType == EQ_TYPE_LOCUT || nType == EQ_TYPE_HICUT)
    {
        nPosY = nCanvasHeight / 2;
    }
    else if (nType == EQ_TYPE_LOSHELF || nType == EQ_TYPE_HISHELF)
    {
        nGainPosYMin = -15.4;
        nGainPosYMax = 15.4;

        if (nGain < 0)
        {
            nPosY = nGain * (((nCanvasHeight / 2 + g_nEQBallSize / 2) - nPosYMax) / (-nGainPosYMin)) + (nCanvasHeight / 2 + g_nEQBallSize / 2);
        }
        else if (nGain > 0)
        {
            nPosY = nGain * ((nPosYMin - (nCanvasHeight / 2 - g_nEQBallSize / 2)) / (nGainPosYMax)) + (nCanvasHeight / 2 - g_nEQBallSize / 2);
        }
    }
    else if (nType == EQ_TYPE_PEAK)
    {
        nGainPosYMin = -12.4;
        nGainPosYMax = 12.4;
        
        if (nGain > -0.05 && nGain < 0.05)
        {
            nPosY = nPosYMin + (nPosYMax - nPosYMin) / 2;
        }
        else if (nGain > 0)
        {
            nPosY = nGain * ((nPosYMin - nPosYMax + (nPosYMax - nPosYMin) * 2 / 8) / (nGainPosYMax - nGainPosYMin)) + nPosYMin + ((nPosYMax - nPosYMin) * 3 / 8);
        }
        else
        {
            nPosY = nGain * ((nPosYMin - nPosYMax + (nPosYMax - nPosYMin) * 2 / 8) / (nGainPosYMax - nGainPosYMin)) + nPosYMin + ((nPosYMax - nPosYMin) * 5 / 8);
        }
    }

    if (nPosY > nCanvasHeight - g_nEQBallSize / 1.3)
    {
        nPosY = nCanvasHeight - g_nEQBallSize / 1.3;
    }
    else if (nPosY < g_nEQBallSize / 1.3)
    {
        nPosY = g_nEQBallSize / 1.3;
    }

    return nPosY;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsThresholdFaderGainToPosY(nGain)
{
    var nGainMin = g_tDynamicsThresholdMin[g_nControledDynamicsBandID];
    var nGainMax = g_tDynamicsThresholdMax[g_nControledDynamicsBandID];

    var nScaleStepPerdB1 = g_nDynamicsThresholdScaleStepHeight * 4 / (nGainMax - (-60));
    var nScaleStepPerdB2 = g_nDynamicsThresholdScaleStepHeight * 4 / (-60 - (-180));
    var nScaleStepPerdB3 = g_nDynamicsThresholdScaleStepHeight * 4 / (-180 - (-360));
    var nScaleStepPerdB4 = g_nDynamicsThresholdScaleStepHeight * 4 / (-360 - nGainMin);


    var nPos = 0;

    if (nGain >= -60) // [nGainMax, -60]
    {
        nPos -= (nGain * nScaleStepPerdB1);
    }
    else if (nGain >= -180) // ]-60, -180]
    {
        nPos -= (-60 * nScaleStepPerdB1) + ((nGain + 60) * nScaleStepPerdB2);
    }
    else if (nGain >= -360) // ]-180, -360]
    {
        nPos -= (-60 * nScaleStepPerdB1) + (-120 * nScaleStepPerdB2) + ((nGain + 180) * nScaleStepPerdB3);
    }
    else // ]-360, nGainMin]
    {
        nPos -= (-60 * nScaleStepPerdB1) + (-120 * nScaleStepPerdB2) + (-180 * nScaleStepPerdB3) + ((nGain + 360) * nScaleStepPerdB4);
    }

    return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsThresholdFaderPosYToGain(nPos)
{
    var nGainMin = g_tDynamicsThresholdMin[g_nControledDynamicsBandID];
    var nGainMax = g_tDynamicsThresholdMax[g_nControledDynamicsBandID];

    var nPos0dB = g_nDynamicsThresholdPos0dB;
    var nPos6dB = DynamicsThresholdFaderGainToPosY(-60);
    var nPos18dB = g_nDynamicsThresholdPos18dB;
    var nPos36dB = DynamicsThresholdFaderGainToPosY(-360);

    var nScaledBPerStep1 = nGainMax - (-60) / (g_nDynamicsThresholdScaleStepHeight * 4);
    var nScaledBPerStep2 = (-60 - (-180)) / (g_nDynamicsThresholdScaleStepHeight * 4);
    var nScaledBPerStep3 = (-180 - (-360)) / (g_nDynamicsThresholdScaleStepHeight * 4);
    var nScaledBPerStep4 = (-360 - nGainMin) / (g_nDynamicsThresholdScaleStepHeight * 4);


    var nGain = 0;

    if (nPos <= nPos6dB) // [nGainMax, -60]
    {
        nGain -= (nPos * nScaledBPerStep1);
    }
    else if (nPos <= nPos18dB) // ]-60, -180]
    {
        nGain -= ((nPos6dB - nPos0dB) * nScaledBPerStep1) + ((nPos - nPos6dB) * nScaledBPerStep2);
    }
    else if (nPos <= nPos36dB) // ]-180, -360]
    {
        nGain -= ((nPos6dB - nPos0dB) * nScaledBPerStep1) + ((nPos18dB - nPos6dB) * nScaledBPerStep2) + ((nPos - nPos18dB) * nScaledBPerStep3);
    }
    else // ]-360, nGainMin]
    {
        nGain -= (nPos6dB * nScaledBPerStep1) + ((nPos18dB - nPos6dB) * nScaledBPerStep2) + ((nPos36dB - nPos18dB) * nScaledBPerStep3) + ((nPos - nPos36dB) * nScaledBPerStep4);
    }


    if (nGain < g_tDynamicsThresholdMin[g_nControledDynamicsBandID])
    {
        nGain = g_tDynamicsThresholdMin[g_nControledDynamicsBandID];
    }
    else if (nGain > g_tDynamicsThresholdMax[g_nControledDynamicsBandID])
    {
        nGain = g_tDynamicsThresholdMax[g_nControledDynamicsBandID];
    }

    return Number(nGain).toFixed(0);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsMakeupFaderGainToPosY(nGain)
{
    var nPos = (-nGain + 360) * (g_nDynamicsFaderHeight - g_nDynamicsKnobHeight) / 720;

    if (nPos > g_nDynamicsFaderHeight)
    {
        nPos = g_nDynamicsFaderHeight;
    }
    else if (nPos < 0)
    {
        nPos = 0;
    }

    return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsMakeupFaderPosYToGain(nPos)
{
    var nGain = -nPos * 720 / (g_nDynamicsFaderHeight - g_nDynamicsKnobHeight) + 360;

    if (nGain > 360)
    {
        nGain = 360;
    }
    else if (nGain < -360)
    {
        nGain = -360;
    }

    return Number(nGain).toFixed(0);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsRightScaleGainToPosY(nGain)
{
    var nGainMin = -720;
    var nGainMax = 0;

    var nScaleStepPerdB1 = g_nDynamicsRightScaleStepHeight * 9 / (nGainMax - (-180));
    var nScaleStepPerdB2 = g_nDynamicsRightScaleStepHeight * 3 / 180;
    var nScaleStepPerdB3 = g_nDynamicsRightScaleStepHeight * 3 / ((-360) - nGainMin);


    var nPos = 0;

    if (nGain >= -180) // [nGainMax, -180]
    {
        nPos -= (nGain * nScaleStepPerdB1);
    }
    else if (nGain >= -360) // ]-180, -360]
    {
        nPos -= (-180 * nScaleStepPerdB1) + ((nGain + 180) * nScaleStepPerdB2);
    }
    else // ]-360, nGainMin]
    {
        nPos -= (-180 * nScaleStepPerdB1) + (-180 * nScaleStepPerdB2) + ((nGain + 360) * nScaleStepPerdB3);
    }

    return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserThresholdFaderGainToPosY(nGain)
{
    var nGainMin = -960;
    var nGainMax = 0;

    var nScaleStepPerdB1 = g_nDeesserThresholdScaleStepHeight * 4 / (nGainMax - (-60));
    var nScaleStepPerdB2 = g_nDeesserThresholdScaleStepHeight * 4 / (-60 - (-180));
    var nScaleStepPerdB3 = g_nDeesserThresholdScaleStepHeight * 4 / (-180 - (-360));
    var nScaleStepPerdB4 = g_nDeesserThresholdScaleStepHeight * 4 / (-360 - nGainMin);


    var nPos = 0;

    if (nGain >= -60) // [nGainMax, -60]
    {
        nPos -= (nGain * nScaleStepPerdB1);
    }
    else if (nGain >= -180) // ]-60, -180]
    {
        nPos -= (-60 * nScaleStepPerdB1) + ((nGain + 60) * nScaleStepPerdB2);
    }
    else if (nGain >= -360) // ]-180, -360]
    {
        nPos -= (-60 * nScaleStepPerdB1) + (-120 * nScaleStepPerdB2) + ((nGain + 180) * nScaleStepPerdB3);
    }
    else // ]-360, nGainMin]
    {
        nPos -= (-60 * nScaleStepPerdB1) + (-120 * nScaleStepPerdB2) + (-180 * nScaleStepPerdB3) + ((nGain + 360) * nScaleStepPerdB4);
    }

    return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserThresholdFaderPosYToGain(nPos)
{
    var nGainMin = -960;
    var nGainMax = 0;

    var nPos0dB = g_nDeesserThresholdPos0dB;
    var nPos6dB = DeesserThresholdFaderGainToPosY(-60);
    var nPos18dB = g_nDeesserThresholdPos18dB;
    var nPos36dB = DeesserThresholdFaderGainToPosY(-360);

    var nScaledBPerStep1 = nGainMax - (-60) / (g_nDeesserThresholdScaleStepHeight * 4);
    var nScaledBPerStep2 = (-60 - (-180)) / (g_nDeesserThresholdScaleStepHeight * 4);
    var nScaledBPerStep3 = (-180 - (-360)) / (g_nDeesserThresholdScaleStepHeight * 4);
    var nScaledBPerStep4 = (-360 - nGainMin) / (g_nDeesserThresholdScaleStepHeight * 4);


    var nGain = 0;

    if (nPos <= nPos6dB) // [nGainMax, -60]
    {
        nGain -= (nPos * nScaledBPerStep1);
    }
    else if (nPos <= nPos18dB) // ]-60, -180]
    {
        nGain -= ((nPos6dB - nPos0dB) * nScaledBPerStep1) + ((nPos - nPos6dB) * nScaledBPerStep2);
    }
    else if (nPos <= nPos36dB) // ]-180, -360]
    {
        nGain -= ((nPos6dB - nPos0dB) * nScaledBPerStep1) + ((nPos18dB - nPos6dB) * nScaledBPerStep2) + ((nPos - nPos18dB) * nScaledBPerStep3);
    }
    else // ]-360, nGainMin]
    {
        nGain -= (nPos6dB * nScaledBPerStep1) + ((nPos18dB - nPos6dB) * nScaledBPerStep2) + ((nPos36dB - nPos18dB) * nScaledBPerStep3) + ((nPos - nPos36dB) * nScaledBPerStep4);
    }


    if (nGain < -960)
    {
        nGain = -960;
    }
    else if (nGain > 0)
    {
        nGain = 0;
    }

    return Number(nGain).toFixed(0);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserRightScaleGainToPosY(nGain)
{
    var nGainMin = -720;
    var nGainMax = 0;

    var nScaleStepPerdB1 = g_nDeesserRightScaleStepHeight * 9 / (nGainMax - (-180));
    var nScaleStepPerdB2 = g_nDeesserRightScaleStepHeight * 3 / 180;
    var nScaleStepPerdB3 = g_nDeesserRightScaleStepHeight * 3 / ((-360) - nGainMin);


    var nPos = 0;

    if (nGain >= -180) // [nGainMax, -180]
    {
        nPos -= (nGain * nScaleStepPerdB1);
    }
    else if (nGain >= -360) // ]-180, -360]
    {
        nPos -= (-180 * nScaleStepPerdB1) + ((nGain + 180) * nScaleStepPerdB2);
    }
    else // ]-360, nGainMin]
    {
        nPos -= (-180 * nScaleStepPerdB1) + (-180 * nScaleStepPerdB2) + ((nGain + 360) * nScaleStepPerdB3);
    }

    return nPos;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ComputeResultCurve(nNbBands)
{
    g_tResultCurvePointsY = [];

    for (nPoint = 0; nPoint < g_tCurvesPointsX[0].length; nPoint++)
    {
        var nSumPoint = 0;
        for (nBandID = 0; nBandID < nNbBands; nBandID++)
        {
            nSumPoint += g_tCurvesPointsY[nBandID][nPoint];
        }

        g_tResultCurvePointsY.push(nSumPoint);       
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ComputeCutCurve(nBandID)
{
    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsEQBand;
    if (nBandID != -1)
        jsEQBand = jsEQ.eq_bands[nBandID];

  
    g_tCurvesPointsX[nBandID] = [];
    g_tCurvesPointsY[nBandID] = [];


    const Fm = jsEQBand.freq;
    const nType = jsEQBand.type;
    const Wc = 2 * Math.PI * Fm;

    const nMaxPointCount = eCanvas.offsetWidth;
    const nVerticalPxPerdB = eCanvas.offsetHeight / 36;

    var step = 1;
    for (var x = 0; x < nMaxPointCount; x += step)
    {
        // Find s
        const freqFromXNorm = EQPosXToFreq(x, nMaxPointCount) * 2 * Math.PI;
		const s = Complex(0, freqFromXNorm);

        // Transfer function
		var a1 = (s.mul(s))
		var a2 = s.mul(Math.sqrt(2) * Wc);
		var a3 = Wc * Wc;

		var Ks = Complex(a1.add(a2).add(a3));

		if (nType == EQ_TYPE_LOCUT)
			Ks = (s.mul(s)).div(Ks);
		else if (nType == EQ_TYPE_HICUT)
		    Ks = (Ks.inverse()).mul(Wc * Wc);

        // Points
		const pointX = x;
		const pointY = jsEQBand.bypass ? 0 : (-20 * Math.log10(Ks.abs())) * nVerticalPxPerdB;

		g_tCurvesPointsX[nBandID].push(pointX);
		g_tCurvesPointsY[nBandID].push(pointY);

        // Ensure the Last point
		if (x + step >= nMaxPointCount && x != nMaxPointCount - 1)
        {
		    x = nMaxPointCount - step - 1;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ComputeShelfCurve(nBandID)
{
    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsEQBand;
    if (nBandID != -1)
        jsEQBand = jsEQ.eq_bands[nBandID];

  
    g_tCurvesPointsX[nBandID] = [];
    g_tCurvesPointsY[nBandID] = [];


    const K = jsEQBand.gain;
    const Fm = jsEQBand.freq;
    const nType = jsEQBand.type;

    const KLin = ConvertdBToFloatLinear(Math.abs(K));
    const wa = 2 * Math.PI * Fm;
    const wb = (nType == EQ_TYPE_LOSHELF ? wa * KLin : wa / KLin);    

    const nMaxPointCount = eCanvas.offsetWidth;
    const nVerticalPxPerdB = eCanvas.offsetHeight / 36;

    var step = 1;
    for (var x = 0; x < nMaxPointCount; x += step)
    {
        // Find s
        const freqFromXNorm = EQPosXToFreq(x, nMaxPointCount) * 2 * Math.PI;
        const s = Complex(0, freqFromXNorm);

        // Transfer function
        var Ks = Complex();

        var d1 = s.add(wb);
        var d2 = s.add(wa);
        if (K >= 0)
            Ks = d1.mul(d2.inverse());
        else
            Ks = d2.mul(d1.inverse());
			
        if (nType != EQ_TYPE_LOSHELF)
        {
            if (K >= 0)
                Ks = Ks.mul(wa / wb);
            else
                Ks = Ks.mul(wb / wa);
        }

        // Points
        const pointX = x;
        const pointY = jsEQBand.bypass ? 0 : (-20 * Math.log10(Ks.abs())) * nVerticalPxPerdB;

        g_tCurvesPointsX[nBandID].push(pointX);
        g_tCurvesPointsY[nBandID].push(pointY);

        // Ensure the Last point
        if (x + step >= nMaxPointCount && x != nMaxPointCount - 1)
        {
            x = nMaxPointCount - step - 1;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ComputePeakCurve(nBandID)
{
    var eCanvas = document.getElementById("eq-curve-canvas");
    if (eCanvas == null)
    {
        return;
    }

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    var jsEQBand;
    if (nBandID != -1)
        jsEQBand = jsEQ.eq_bands[nBandID];

  
    g_tCurvesPointsX[nBandID] = [];
    g_tCurvesPointsY[nBandID] = [];


    const K = jsEQBand.gain;
    const Fm = jsEQBand.freq;
    const Q = jsEQBand.Q;

    const w0 = 2 * Math.PI * Fm;
    const w02 = w0 * w0;

    const nMaxPointCount = eCanvas.offsetWidth;
    const nVerticalPxPerdB = eCanvas.offsetHeight / 36;

    var step = 1;
    for (var x = 0; x < nMaxPointCount; x += step)
    {
        // Find s
        const freqFromXNorm = EQPosXToFreq(x, nMaxPointCount) * 2 * Math.PI;
        const s = Complex(0, freqFromXNorm);

        // Transfer function        
        const t1 = Complex((s.mul(s)).add(w02));
        const t2 = Complex(s.mul(w0 / Q).mul(ConvertdBToFloatLinear(24, 1)).mul(1 / ConvertdBToFloatLinear(Math.abs(K), 1)));
        var Ks = Complex();
        if (K >= 0)
        {
            const d1 = t2.mul(ConvertdBToFloatLinear(K, 1)).add(t1);
            const d2 = t2.add(t1);
            Ks = d1.mul(d2.inverse());
        }
        else
        {
            const d1 = t2.add(t1);
            const d2 = t2.mul(ConvertdBToFloatLinear(-K, 1)).add(t1);
            Ks = d1.mul(d2.inverse());
        }

        // Points
        const pointX = x;
        const pointY = jsEQBand.bypass ? 0 : (-20 * Math.log10(Ks.abs())) * nVerticalPxPerdB;

        g_tCurvesPointsX[nBandID].push(pointX);
        g_tCurvesPointsY[nBandID].push(pointY);

        // Ensure the Last point
        if (x + step >= nMaxPointCount && x != nMaxPointCount - 1)
        {
            x = nMaxPointCount - step - 1;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawDynamicsRatioRotary(eRotaryCanvas, nMin, nMax, value, bSelected, bDisabled)
{
    var cRotaryColor = "#282828";
    var cRingColor = DYNAMICS_COLOR;

    if (bDisabled)
    {
        cRingColor = "#564003";
    }

    var nValue = DynamicsRatioRotaryValueToPos(nMin, nMax, value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsRatioRotaryValueToPos(nMin, nMax, nValue)
{
    return EffectLogRotaryValueToPos(nMin, nMax, nValue, 73 / 100);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsRatioRotaryPosToValue(nMin, nMax, nPos)
{
    return EffectLogRotaryPosToValue(nMin, nMax, nPos, 100 / 73);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawDynamicsRotary(eRotaryCanvas, nMin, nMax, value, bSelected, bDisabled)
{
    var cRotaryColor = "#282828";
    var cRingColor = DYNAMICS_COLOR;

    if (bDisabled)
    {
        cRingColor = "#564003";
    }

    var nValue = DynamicsRotaryValueToPos(nMin, nMax, value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsRotaryValueToPos(nMin, nMax, nValue)
{
    return EffectLogRotaryValueToPos(nMin, nMax, nValue, 27 / 10);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsRotaryPosToValue(nMin, nMax, nPos)
{
    var nValue = EffectLogRotaryPosToValue(nMin, nMax, nPos, 10 / 27);

    nValue = Number(nValue).toFixed(1);

    return nValue;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawDeesserRangeRotary(eRotaryCanvas, nMin, nMax, value, bSelected, bDisabled)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var cRotaryColor = "#282828";
    var cRingColor = DEESSER_COLOR;

    if (bDisabled)
    {
        cRingColor = bNeumannEdition ? DEESSER_COLOR + "50" : "#025734";
    }

    var nValue;
    if (nMin == nMax || value > nMax)
        nValue = 1;
    else if (value < nMin)
        nValue = 0;
    else
        nValue = value / DEESSER_RANGE_MAX;
    

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawDeesserRotary(eRotaryCanvas, nMin, nMax, value, bSelected, bDisabled)
{
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var cRotaryColor = "#282828";
    var cRingColor;
    if (eRotaryCanvas.id.includes("-q"))
    {
        cRingColor = bDisabled ? (bNeumannEdition ? DEESSER_COLOR + "50" : "#025734") : DEESSER_COLOR + "B0";
    }
    else
    {
        cRingColor = bDisabled ? (bNeumannEdition ? DEESSER_COLOR + "50" : "#025734") : DEESSER_COLOR;
    }

    var nValue = DeesserRotaryValueToPos(nMin, nMax, value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, (eRotaryCanvas.id.includes("-q") ? ERRM_SPREAD : ERRM_WRAP));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserRotaryValueToPos(nMin, nMax, nValue)
{
    return EffectLogRotaryValueToPos(nMin, nMax, nValue, 27 / 10);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserRotaryPosToValue(nMin, nMax, nPos)
{
    return EffectLogRotaryPosToValue(nMin, nMax, nPos, 10 / 27);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawReverbFrequencyRotary(eRotaryCanvas, value, bSelected, bDisabled, cRingColor)
{
	var cRotaryColor = "#282828";

	if (bDisabled)
	{
		cRingColor = cRotaryColor;
	}

    var nValue = ReverbFrequencyRotaryValueToPos(value);

    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ReverbFrequencyRotaryValueToPos(nValue)
{
    return EffectLogRotaryValueToPos(REVERB_FREQUENCY_MIN, REVERB_FREQUENCY_MAX, nValue, 25 / 10);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ReverbFrequencyRotaryPosToValue(nPos)
{
    return EffectLogRotaryPosToValue(REVERB_FREQUENCY_MIN, REVERB_FREQUENCY_MAX, nPos, 10 / 25);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawPredelayRotary(eRotaryCanvas, value, bSelected, bDisabled)
{
    var cRotaryColor = "#282828";
    var cRingColor = REVERB_COLOR;

	if (bDisabled)
	{
		cRingColor = cRotaryColor;
	}

	var nValue = value / 300;
    
    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawLinearRotary(eRotaryCanvas, value, bSelected, bDisabled)
{
	var cRotaryColor = "#282828";
    var cRingColor = REVERB_COLOR;

	if (bDisabled)
	{
		cRingColor = cRotaryColor;
	}

	var nValue = value / 100;
        
    DrawEffectRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, ERRM_WRAP);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEventideBlackholeRotary(eRotaryCanvas, value, bSelected, bDisabled, eRingRotaryMode)
{
    var cRotaryColor = "#000000";
    var cRingColor = EVENTIDE_BLACKHOLE_COLOR;

    if (bDisabled)
    {
        cRingColor = cRotaryColor;
    }

    var nValue = eRotaryCanvas.id.includes("-feedback") ? value / 99 : value / 100; // ANUBIS-1244: workaround

    var ctx = eRotaryCanvas.getContext("2d");
    if (ctx == null)
    {
        return;
    }

    var nSize = eRotaryCanvas.offsetWidth;

    // Let's deal with the screen high dpi properly to avoid blurry drawing
    // TODO: Do this once only after creation
    let dpi = window.devicePixelRatio;
    eRotaryCanvas.setAttribute('height', nSize * dpi);
    eRotaryCanvas.setAttribute('width', nSize * dpi);
    ctx.scale(dpi, dpi);

    ctx.imageSmoothingEnabled = true;

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
    var nRingStrokeWidth = nRadius / 11;

    var nRingRadius = nRadius - nRingStrokeWidth;

    var nLeft = nRadius;
    var nTop = nRadius;

    //Ring
    ctx.beginPath();
    ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, Math.PI * 2 / 6);
    ctx.strokeStyle = cRotaryColor;
    ctx.lineWidth = nRingStrokeWidth;
    ctx.stroke();

    ctx.beginPath();
    if (eRingRotaryMode == ERRM_WRAP)
    {
        ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, alpha);
    }
    else if (eRingRotaryMode == ERRM_BOOST_CUT)
    {
        if (nValue < 0.5)
            ctx.arc(nLeft, nTop, nRingRadius, alpha, -Math.PI / 2);
        else
            ctx.arc(nLeft, nTop, nRingRadius, -Math.PI / 2, alpha - Math.PI * 2);
    }
    ctx.strokeStyle = bSelected ? EQ_COLOR : cRingColor;
    ctx.lineWidth = nRingStrokeWidth;
    ctx.stroke();

    // Knob line
    var nLineLength = 21;

    ctx.beginPath();
    ctx.strokeStyle = bSelected ? EQ_COLOR : "#ffffff";
    ctx.moveTo(nSize / 2, nSize / 2);
    ctx.lineTo(nSize / 2 + Math.cos(alpha) * nLineLength, nTop + Math.sin(alpha) * nLineLength);
    ctx.lineWidth = 2;
    ctx.stroke();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawEffectRotary(eCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled, eRingRotaryMode)
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

	var alpha = (Math.PI * 4 / 6) + ((nValue * 2 * Math.PI * 5) / 6);
	if (alpha > Math.PI * 2)
	{
		alpha -= Math.PI * 2;
	}

	var nRadius = nSize / 2;
	var nRingStrokeWidth = nRadius / 11;
	var nBallSize = nRadius / 4.5;

	var nRingRadius = nRadius * .9 - nRingStrokeWidth;
	var nCenterRadius = nRingRadius - nBallSize;
	var nBallRadius = nRingRadius - nBallSize * .7;

	var nLeft = nRadius;
	var nTop = nRadius * .9;

    // Disc
    if (bNeumannEdition)
    {
        DrawNeumannRotary(eCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled);
    }
    else
    {
        ctx.beginPath();
        ctx.arc(nLeft, nTop, nCenterRadius, 0, Math.PI * 2);
        ctx.fillStyle = bSelected ? "#AAAAAA" : cRotaryColor;
        ctx.fill();
    }

    // Ring
	ctx.beginPath();
	ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, Math.PI * 2 / 6);
	ctx.strokeStyle = cRotaryColor;
	ctx.lineWidth = nRingStrokeWidth;
	ctx.stroke();

    ctx.beginPath();
    if (eRingRotaryMode == ERRM_WRAP)
    {
        ctx.arc(nLeft, nTop, nRingRadius, Math.PI * 4 / 6, alpha);
    }
    else if (eRingRotaryMode == ERRM_BOOST_CUT)
    {
        if (nValue < 0.5)
            ctx.arc(nLeft, nTop, nRingRadius, alpha, -Math.PI / 2);
        else
            ctx.arc(nLeft, nTop, nRingRadius, -Math.PI / 2, alpha - Math.PI * 2);
    }
    else if (eRingRotaryMode == ERRM_SINGLE_DOT)
    {
        var nAngle1 = alpha - Math.PI / 8;
        var nAngle2 = alpha + Math.PI / 8;

        if (nAngle1 <= Math.PI * 4 / 6 && nAngle2 > Math.PI * 4 / 6)
            nAngle1 = Math.PI * 4 / 6;

        if (nAngle2 >= Math.PI * 2 / 6 && nAngle1 < Math.PI * 4 / 6)
            nAngle2 = Math.PI * 2 / 6;

        ctx.arc(nLeft, nTop, nRingRadius, nAngle1, nAngle2);
    }
    else if (eRingRotaryMode == ERRM_SPREAD)
    {
        var nAngle1 = -(Math.PI / 72) - (Math.PI / 2) - (((Math.log(nValue + 1) / Math.log(2)) * 2 * Math.PI * 5) / 12);
        var nAngle2 = (Math.PI / 72) -(Math.PI / 2) + (((Math.log(nValue + 1) / Math.log(2)) * 2 * Math.PI * 5) / 12);

        ctx.arc(nLeft, nTop, nRingRadius, nAngle1, -Math.PI / 2);
        ctx.arc(nLeft, nTop, nRingRadius, -Math.PI / 2, nAngle2);
    }
    else if (eRingRotaryMode == ERRM_SPREAD_INV)
    {
        var nAngle1 = (Math.PI * 4 / 6) + (((Math.log(nValue + 1) / Math.log(2)) * 2 * Math.PI * 5) / 12);
        if (nValue == 1)
            nAngle1 = -Math.PI / 2;

        var nAngle2 = (Math.PI * 4 / 12) - (((Math.log(nValue + 1) / Math.log(2)) * 2 * Math.PI * 5) / 12);

        ctx.arc(nLeft, nTop, nRingRadius, nAngle1, -Math.PI / 2);
        ctx.arc(nLeft, nTop, nRingRadius, -Math.PI / 2, nAngle2);
    }
    
    ctx.strokeStyle = cRingColor;
    ctx.lineWidth = nRingStrokeWidth;
    ctx.stroke();


    // Little disc
    if (!bNeumannEdition)
    {
	    ctx.beginPath();
	    ctx.arc(nLeft + Math.cos(alpha) * nBallRadius, nTop + Math.sin(alpha) * nBallRadius, nBallSize / 2, 0, Math.PI * 2);
	    ctx.fillStyle = bSelected ? "#AAAAAA" : cRingColor;
	    ctx.fill();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawNeumannRotary(eRotaryCanvas, nValue, cRingColor, cRotaryColor, bSelected, bDisabled)
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
    if (!bDisabled && !eRotaryCanvas.id.includes("eq-type-rotary"))
    {
        const nPenWeight = nSize > 170 ? 3 : 2;

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
function DrawDeesserCursor(nFrequency, nQ, bSplit, bEnabled)
{    
    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    var eCanvas = document.getElementById("deesser-cursor-canvas");
    if (eCanvas == null)
	{
		return;
	}

	var ctx = eCanvas.getContext("2d");
	if (ctx == null)
	{
		return;
	}

    var nWidth = eCanvas.offsetWidth;
    var nHeight = eCanvas.offsetHeight;

	// Let's deal with the screen high dpi properly to avoid blurry drawing
	// TODO: Do this once only after creation
    let dpi = window.devicePixelRatio;
    eCanvas.setAttribute('width', nWidth * dpi);
    eCanvas.setAttribute('height', nHeight * dpi);
    ctx.scale(dpi, dpi);

    ctx.imageSmoothingEnabled = true;

    // scale
    ctx.beginPath();
    ctx.fillStyle = "#282828";
    ctx.fillRect(nWidth / 10, nHeight * 2 / 3 - 6, nWidth * 8 / 10, 8);

    for (var nFreq = DEESSER_FREQUENCY_MIN; nFreq <= DEESSER_FREQUENCY_MAX; nFreq += (nFreq < 10000 ? 1000 : 10000))
    {
        var nPosX = nWidth / 10 + DeesserCursorFreqToPosX(nFreq, nWidth * 8 / 10 - 2);

        ctx.beginPath();
        ctx.fillStyle = "#282828";
        ctx.fillRect(nPosX, nHeight * 2 / 3, 2, 10);
    }

    // Q width
    ctx.fillStyle = DEESSER_COLOR + (bEnabled ? "B0" : "50");
    if (bSplit)
    {
        var nFreq1 = nFrequency - nQ * 40;
        if (nFreq1 < DEESSER_FREQUENCY_MIN)
            nFreq1 = DEESSER_FREQUENCY_MIN;

        var nFreq2 = nFrequency + nQ * 40;
        if (nFreq2 > DEESSER_FREQUENCY_MAX)
            nFreq2 = DEESSER_FREQUENCY_MAX;

        var nFreq1X = DeesserCursorFreqToPosX(nFreq1, nWidth * 8 / 10);
        var nQWidth = DeesserCursorFreqToPosX(nFreq2, nWidth * 8 / 10) - nFreq1X;

        ctx.beginPath();
        ctx.fillRect(nWidth / 10 + nFreq1X, nHeight * 2 / 3 - 6, nQWidth, 8);
    }
    else
    {
        var nFreqX = DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10);

        ctx.beginPath();        
        ctx.fillRect(nWidth / 10 + nFreqX, nHeight * 2 / 3 - 6, nWidth * 8 / 10 - nFreqX, 8);
    }


    // Freq
    var nBallSize = 26;
    var nFreqX = DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10);
    ctx.beginPath();
    ctx.arc(nWidth / 10 + nFreqX, nHeight * 2 / 3 - 2, nBallSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = bEnabled ? DEESSER_COLOR : "#282828";
    ctx.fill();
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#bbbbbb";
    ctx.font = Number(g_nStripWidth / 4.3) + 'px Arial';
    var nTextTop = nHeight / 2 - 12;
    if (bSplit && bEnabled && nQ >= 3)
    {
        var nFreq1 = nFrequency - nQ * 40;
        if (nFreq1 < DEESSER_FREQUENCY_MIN)
            nFreq1 = DEESSER_FREQUENCY_MIN;

        var nFreq1X = nWidth / 10 + DeesserCursorFreqToPosX(nFreq1, nWidth * 8 / 10);
        if (nFreq1X > nWidth / 10 + DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10) - nBallSize * 2 / 3)
            nFreq1X = nWidth / 10 + DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10) - nBallSize * 2 / 3;

        var nFreq2 = nFrequency + nQ * 40;
        if (nFreq2 > DEESSER_FREQUENCY_MAX)
            nFreq2 = DEESSER_FREQUENCY_MAX;

        var nFreq2X = nWidth / 10 + DeesserCursorFreqToPosX(nFreq2, nWidth * 8 / 10);
        if (nFreq2X < nWidth / 10 + DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10) + nBallSize * 2 / 3)
            nFreq2X = nWidth / 10 + DeesserCursorFreqToPosX(nFrequency, nWidth * 8 / 10) + nBallSize * 2 / 3;

        var szText1 = nFreq1 < DEESSER_FREQUENCY_MIN + 50 ? "2" : Number(nFreq1 / 1000).toFixed(1);
        var text1 = ctx.measureText(szText1);
        ctx.fillText(szText1, nFreq1X - text1.width / 2, nTextTop);

        var szText2 = nFreq2 > DEESSER_FREQUENCY_MAX - 50 ? "20" : Number(nFreq2 / 1000).toFixed(1);
        var text2 = ctx.measureText(szText2);
        ctx.fillText(szText2, nFreq2X - text2.width / 2, nTextTop);
    }
    else
    {        
        var szText = bEnabled ? Number(nFrequency / 1000).toFixed(1) : (bNeumannEdition ? "" : "---");
        var text = ctx.measureText(szText);
        ctx.fillText(szText, nWidth / 10 + nFreqX - text.width / 2, nTextTop - 2);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserCursorFreqToPosX(nFreq, nPosXMax)
{
    var nPosX = (Math.log2(nFreq) - Math.log2(DEESSER_FREQUENCY_MIN)) / (Math.log2(DEESSER_FREQUENCY_MAX) - Math.log2(DEESSER_FREQUENCY_MIN)) * nPosXMax;

    if (nPosX < 0)
        nPosX = 0;
    else if (nPosX > nPosXMax)
        nPosX = nPosXMax;

    return nPosX;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectEQRotary(eRotary)
{
    if (g_nControledEQBandID == -1)
        return;

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }

    var jsEQ = GetEQJSON();
    if (jsEQ == null)
    {
        return;
    }

    if (!jsEQ.enabled)
        return;


    // clean capture
    var eRotarys = document.getElementsByClassName("eq-rotary");
    if (eRotarys == null)
    {
        return;
    }

    var szBandColor = jsSettings.neumann_edition ? NEUMANN_EQ_T_BAND_COLORS[g_nControledEQBandID] : EQ_T_BAND_COLORS[g_nControledEQBandID];
    for (var idx = 0; idx < eRotarys.length; idx++)
    {
        var eRotaryCanvas = document.getElementById(eRotarys[idx].id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotarys[idx].id.includes("-type"))
            {
                var bDisable = g_nControledEQBandID == -1;

                DrawEQTypeRotary(eRotaryCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].type, false, bDisable, szBandColor);
            }
            else if (eRotarys[idx].id.includes("-freq"))
            {
                var bDisable = g_nControledEQBandID == -1;
                var nValue = bDisable ? 20 : jsEQ.eq_bands[g_nControledEQBandID].freq;

                DrawEQFrequencyRotary(eRotaryCanvas, nValue, false, bDisable, szBandColor);
            }
            else if (eRotarys[idx].id.includes("-gain"))
            {
                var nEQType = g_nControledEQBandID == -1 ? EQ_TYPE_PEAK : jsEQ.eq_bands[g_nControledEQBandID].type;
                var bDisable = g_nControledEQBandID == -1 || nEQType == EQ_TYPE_LOCUT || nEQType == EQ_TYPE_HICUT;

                DrawEQGainRotary(eRotaryCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].gain, false, bDisable, szBandColor);
            }
            else if (eRotarys[idx].id.includes("-q"))
            {
                var bDisable = g_nControledEQBandID == -1 || jsEQ.eq_bands[g_nControledEQBandID].type != EQ_TYPE_PEAK;

                DrawEQQRotary(eRotaryCanvas, bDisable ? 10 : jsEQ.eq_bands[g_nControledEQBandID].Q, false, bDisable, szBandColor);
            }
        }

        var eRotaryValue = document.getElementById(eRotarys[idx].id + "-value");
        if (eRotaryValue)
        {
            eRotaryValue.classList.remove("eq-rotary-value-selected");
        }
    }
    
    if (eRotary == null)
        return;

    // Update capture
    if (g_szCapturedEffectRotaryControlElementId == eRotary.id) // eRotary already captured
    {
        g_szCapturedEffectRotaryControlElementId = "";
    }
    else // Capture eRotary
    {     
        g_szCapturedEffectRotaryControlElementId = eRotary.id;

        var eRotaryCanvas = document.getElementById(eRotary.id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotary.id.includes("-type"))
            {
                var bDisable = g_nControledEQBandID == -1;

                DrawEQTypeRotary(eRotaryCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].type, !bDisable, bDisable, szBandColor);
            }
            else if (eRotary.id.includes("-freq"))
            {
                var bDisable = g_nControledEQBandID == -1;
                var nValue = bDisable ? EQ_FREQUENCY_MIN : jsEQ.eq_bands[g_nControledEQBandID].freq;

                DrawEQFrequencyRotary(eRotaryCanvas, nValue, true, bDisable, szBandColor);
            }
            else if (eRotary.id.includes("-gain"))
            {
                var nEQType = g_nControledEQBandID == -1 ? EQ_TYPE_PEAK : jsEQ.eq_bands[g_nControledEQBandID].type;
                var bDisable = g_nControledEQBandID == -1 || nEQType == EQ_TYPE_LOCUT || nEQType == EQ_TYPE_HICUT;

                DrawEQGainRotary(eRotaryCanvas, bDisable ? 0 : jsEQ.eq_bands[g_nControledEQBandID].gain, !bDisable, bDisable, szBandColor);
            }
            else if (eRotary.id.includes("-q"))
            {
                var bDisable = g_nControledEQBandID == -1 || jsEQ.eq_bands[g_nControledEQBandID].type != EQ_TYPE_PEAK;

                DrawEQQRotary(eRotaryCanvas, bDisable ? 10 : jsEQ.eq_bands[g_nControledEQBandID].Q, !bDisable, bDisable, szBandColor);
            }
        }        

        var eRotaryValue = document.getElementById(eRotary.id + "-value");
        if (eRotaryValue)
        {
            eRotaryValue.classList.add("eq-rotary-value-selected");
        }
    }

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    g_bClickedEQRotary = true;
    g_bClickedDynamicsRotary = false;
    g_bClickedDeesserRotary = false;
    g_bClickedReverbRotary = false;
    g_bClickedEventideBlackholeRotary = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectDynamicsRotary(eRotary)
{
    if (!g_bDynamicsEnabled)
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    var jsSettings = GetSettingsJSON();
    if (jsSettings == null)
    {
        return;
    }
    var bNeumannEdition = jsSettings.neumann_edition;

    // clean capture
    var eRotarys = document.getElementsByClassName("dynamics-rotary");
    if (eRotarys == null)
    {
        return;
    }

    for (var idx = 0; idx < eRotarys.length; idx++)
    {
        var eRotaryCanvas = document.getElementById(eRotarys[idx].id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotarys[idx].id.includes("-ratio"))
            {
                var bDisabled = g_tDynamicsBypass[g_nControledDynamicsBandID] || g_nControledDynamicsBandID == 0 || g_nControledDynamicsBandID == 3;
                DrawDynamicsRatioRotary(eRotaryCanvas, g_tDynamicsRatioMin[g_nControledDynamicsBandID], g_tDynamicsRatioMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].ratio, false, bDisabled);
            }
            else if (eRotarys[idx].id.includes("-attack"))
            {
                DrawDynamicsRotary(eRotaryCanvas, g_tDynamicsAttackMin[g_nControledDynamicsBandID], g_tDynamicsAttackMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].attack, false, g_tDynamicsBypass[g_nControledDynamicsBandID]);
            }
            else if (eRotarys[idx].id.includes("-release"))
            {
                DrawDynamicsRotary(eRotaryCanvas, g_tDynamicsReleaseMin[g_nControledDynamicsBandID], g_tDynamicsReleaseMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].release, false, g_tDynamicsBypass[g_nControledDynamicsBandID]);
            }
        }

        if (bNeumannEdition)
        {
            var eRotaryValue = document.getElementById(eRotarys[idx].id + "-value");
            if (eRotaryValue)
            {
                eRotaryValue.classList.remove("dynamics-rotary-value-selected");
            }
        }
        else
        {
            var eRotaryTitle = document.getElementById(eRotarys[idx].id + "-title");
            if (eRotaryTitle)
            {
                eRotaryTitle.classList.remove("dynamics-rotary-title-selected");
            }
        }
    }

    if (eRotary == null)
        return;

    if (g_tDynamicsBypass[g_nControledDynamicsBandID])
        return;
    
    // Update capture
    if (g_szCapturedEffectRotaryControlElementId == eRotary.id) // eRotary already captured
    {
        g_szCapturedEffectRotaryControlElementId = "";
    }
    else // Capture eRotary
    {     
        g_szCapturedEffectRotaryControlElementId = eRotary.id;

        var eRotaryCanvas = document.getElementById(eRotary.id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotary.id.includes("-ratio"))
            {
                var bDisabled = g_tDynamicsBypass[g_nControledDynamicsBandID] || g_nControledDynamicsBandID == 0 || g_nControledDynamicsBandID == 3;
                DrawDynamicsRatioRotary(eRotaryCanvas, g_tDynamicsRatioMin[g_nControledDynamicsBandID], g_tDynamicsRatioMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].ratio, !bDisabled, bDisabled);
            }
            else if (eRotary.id.includes("-attack"))
            {
                DrawDynamicsRotary(eRotaryCanvas, g_tDynamicsAttackMin[g_nControledDynamicsBandID], g_tDynamicsAttackMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].attack, !g_tDynamicsBypass[g_nControledDynamicsBandID], g_tDynamicsBypass[g_nControledDynamicsBandID]);
            }
            else if (eRotary.id.includes("-release"))
            {
                DrawDynamicsRotary(eRotaryCanvas, g_tDynamicsReleaseMin[g_nControledDynamicsBandID], g_tDynamicsReleaseMax[g_nControledDynamicsBandID], jsDynamics.dynamics_bands[g_nControledDynamicsBandID].release, !g_tDynamicsBypass[g_nControledDynamicsBandID], g_tDynamicsBypass[g_nControledDynamicsBandID]);
            }
        }        

        if (bNeumannEdition)
        {
            var eRotaryValue = document.getElementById(eRotary.id + "-value");
            if (eRotaryValue)
            {
                eRotaryValue.classList.add("dynamics-rotary-value-selected");
            }
        }
        else
        {
            var eRotaryTitle = document.getElementById(eRotary.id + "-title");
            if (eRotaryTitle)
            {
                eRotaryTitle.classList.add("dynamics-rotary-title-selected");
            }
        }
    }

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    g_bClickedEQRotary = false;
    g_bClickedDynamicsRotary = true;
    g_bClickedDeesserRotary = false;
    g_bClickedReverbRotary = false;
    g_bClickedEventideBlackholeRotary = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectDeesserRotary(eRotary)
{
    if (!g_bDeesserEnabled)
        return;

    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }
    

    // clean capture
    var eRotarys = document.getElementsByClassName("deesser-rotary");
    if (eRotarys == null)
    {
        return;
    }

    for (var idx = 0; idx < eRotarys.length; idx++)
    {
        var eRotaryCanvas = document.getElementById(eRotarys[idx].id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotarys[idx].id.includes("-range"))
            {
                DrawDeesserRangeRotary(eRotaryCanvas, DEESSER_RANGE_MIN, DEESSER_RANGE_MAX, jsDeesser.range, false, !g_bDeesserEnabled);
            }
            else if (eRotarys[idx].id.includes("-freq"))
            {
                DrawDeesserRotary(eRotaryCanvas, DEESSER_FREQUENCY_MIN, DEESSER_FREQUENCY_MAX, jsDeesser.freq, false, !g_bDeesserEnabled);
            }
            else if (eRotarys[idx].id.includes("-q"))
            {
                DrawDeesserRotary(eRotaryCanvas, DEESSER_Q_MIN, DEESSER_Q_MAX, jsDeesser.q, false, !(g_bDeesserEnabled && jsDeesser.split));
            }
        }

        var eRotaryValue = document.getElementById(eRotarys[idx].id + (eRotarys[idx].id.includes("-range") ? "-value" : "-title"));
        if (eRotaryValue)
        {
            eRotaryValue.classList.remove("deesser-rotary-title-selected");
        }
    }

    if (eRotary == null)
        return;
    
    // Update capture
    if (g_szCapturedEffectRotaryControlElementId == eRotary.id) // eRotary already captured
    {
        g_szCapturedEffectRotaryControlElementId = "";
    }
    else // Capture eRotary
    {     
        g_szCapturedEffectRotaryControlElementId = eRotary.id;

        var eRotaryCanvas = document.getElementById(eRotary.id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotary.id.includes("-range"))
            {                
                DrawDeesserRangeRotary(eRotaryCanvas, DEESSER_RANGE_MIN, DEESSER_RANGE_MAX, jsDeesser.range, g_bDeesserEnabled, !g_bDeesserEnabled);
            }
            else if (eRotary.id.includes("-freq"))
            {
                DrawDeesserRotary(eRotaryCanvas, DEESSER_FREQUENCY_MIN, DEESSER_FREQUENCY_MAX, jsDeesser.freq, g_bDeesserEnabled, !g_bDeesserEnabled);
            }
            else if (eRotary.id.includes("-q"))
            {
                var bDisable = !(g_bDeesserEnabled && jsDeesser.split);
                DrawDeesserRotary(eRotaryCanvas, DEESSER_Q_MIN, DEESSER_Q_MAX, jsDeesser.q, !bDisable, bDisable);
            }
        }        

        var eRotaryValue = document.getElementById(eRotary.id + (eRotary.id.includes("-range") ? "-value" : "-title"));
        if (eRotaryValue)
        {
            eRotaryValue.classList.add("deesser-rotary-title-selected");
        }
    }

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    g_bClickedEQRotary = false;
    g_bClickedDynamicsRotary = false;
    g_bClickedDeesserRotary = true;
    g_bClickedReverbRotary = false;
    g_bClickedEventideBlackholeRotary = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectReverbRotary(eRotary)
{
    var jsReverb = GetReverbJSON();
    if (jsReverb == null)
    {
        return;
    }
    

    // clean capture
    var eRotarys = document.getElementsByClassName("reverb-rotary");
    if (eRotarys == null)
    {
        return;
    }

    for (var idx = 0; idx < eRotarys.length; idx++)
    {
        var eRotaryCanvas = document.getElementById(eRotarys[idx].id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotarys[idx].id.includes("-lowCut"))
            {
                DrawReverbFrequencyRotary(eRotaryCanvas, jsReverb.reverb_params.low_cut, false, false, REVERB_COLOR);
            }
            else if (eRotarys[idx].id.includes("-highCut"))
            {
                DrawReverbFrequencyRotary(eRotaryCanvas, jsReverb.reverb_params.high_cut, false, false, REVERB_COLOR);
            }
            else if (eRotarys[idx].id.includes("-size"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.size, false, false);
            }
            else if (eRotarys[idx].id.includes("-predelay"))
            {
                DrawPredelayRotary(eRotaryCanvas, jsReverb.reverb_params.pre_delay, false, false);
            }
            else if (eRotarys[idx].id.includes("-decay"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.decay, false, false);
            }
            else if (eRotarys[idx].id.includes("-diffusion"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.diffusion, false, false);
            }
        }

        var eRotaryValue = document.getElementById(eRotarys[idx].id + "-value");
        if (eRotaryValue)
        {
            eRotaryValue.classList.remove("reverb-rotary-value-selected");
        }
    }

    if (eRotary == null)
        return;
    
    // Update capture
    if (g_szCapturedEffectRotaryControlElementId == eRotary.id) // eRotary already captured
    {
        g_szCapturedEffectRotaryControlElementId = "";
    }
    else // Capture eRotary
    {     
        g_szCapturedEffectRotaryControlElementId = eRotary.id;

        var eRotaryCanvas = document.getElementById(eRotary.id + "-canvas");
        if (eRotaryCanvas)
        {
            if (eRotary.id.includes("-lowCut"))
            {
                DrawReverbFrequencyRotary(eRotaryCanvas, jsReverb.reverb_params.low_cut, true, false, REVERB_COLOR);
            }
            else if (eRotary.id.includes("-highCut"))
            {
                DrawReverbFrequencyRotary(eRotaryCanvas, jsReverb.reverb_params.high_cut, true, false, REVERB_COLOR);
            }
            else if (eRotary.id.includes("-size"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.size, true, false);
            }
            else if (eRotary.id.includes("-predelay"))
            {
                DrawPredelayRotary(eRotaryCanvas, jsReverb.reverb_params.pre_delay, true, false);
            }
            else if (eRotary.id.includes("-decay"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.decay, true, false);
            }
            else if (eRotary.id.includes("-diffusion"))
            {
                DrawLinearRotary(eRotaryCanvas, jsReverb.reverb_params.diffusion, true, false);
            }
        }        

        var eRotaryValue = document.getElementById(eRotary.id + "-value");
        if (eRotaryValue)
        {
            eRotaryValue.classList.add("reverb-rotary-value-selected");
        }
    }

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    g_bClickedEQRotary = false;
    g_bClickedDynamicsRotary = false;
    g_bClickedDeesserRotary = false;
    g_bClickedReverbRotary = true;
    g_bClickedEventideBlackholeRotary = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectEventideBlackholeRotary(eRotaryCanvas)
{
    var jsReverb = GetReverbJSON();
    if (jsReverb == null)
    {
        return;
    }
    

    // clean capture
    var eRotarys = document.getElementsByClassName("eventide-blackhole-rotary-canvas");
    if (eRotarys == null)
    {
        return;
    }

    for (var idx = 0; idx < eRotarys.length; idx++)
    {
        if (eRotarys[idx].id.includes("-mix"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.mix, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-size"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.size, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-predelay"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.pre_delay, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-low-level"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.low_level, false, false, ERRM_BOOST_CUT);
        }
        else if (eRotarys[idx].id.includes("-high-level"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.high_level, false, false, ERRM_BOOST_CUT);
        }
        else if (eRotarys[idx].id.includes("-inv-gravity"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.inv_gravity, false, false, ERRM_BOOST_CUT);
        }
        else if (eRotarys[idx].id.includes("-mod-depth"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.mod_depth, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-mod-rate"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.mod_rate, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-feedback"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.feedback, false, false, ERRM_WRAP);
        }
        else if (eRotarys[idx].id.includes("-resonance"))
        {
            DrawEventideBlackholeRotary(eRotarys[idx], jsReverb.eventide_blackhole_params.resonance, false, false, ERRM_WRAP);
        }        
    }

    if (eRotaryCanvas == null)
        return;
    
    // Update capture
    if (g_szCapturedEffectRotaryControlElementId == eRotaryCanvas.id) // eRotary already captured
    {
        g_szCapturedEffectRotaryControlElementId = "";
    }
    else // Capture eRotary
    {     
        g_szCapturedEffectRotaryControlElementId = eRotaryCanvas.id;

        if (eRotaryCanvas.id.includes("-mix"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.mix, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-size"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.size, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-predelay"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.pre_delay, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-low-level"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.low_level, true, false, ERRM_BOOST_CUT);
        }
        else if (eRotaryCanvas.id.includes("-high-level"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.high_level, true, false, ERRM_BOOST_CUT);
        }
        else if (eRotaryCanvas.id.includes("-inv-gravity"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.inv_gravity, true, false, ERRM_BOOST_CUT);
        }
        else if (eRotaryCanvas.id.includes("-mod-depth"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.mod_depth, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-mod-rate"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.mod_rate, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-feedback"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.feedback, true, false, ERRM_WRAP);
        }
        else if (eRotaryCanvas.id.includes("-resonance"))
        {
            DrawEventideBlackholeRotary(eRotaryCanvas, jsReverb.eventide_blackhole_params.resonance, true, false, ERRM_WRAP);
        }        
    }

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    g_bClickedEQRotary = false;
    g_bClickedDynamicsRotary = false;
    g_bClickedDeesserRotary = false;
    g_bClickedReverbRotary = false;
    g_bClickedEventideBlackholeRotary = true;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EffectRotaryControlMouseDown(event, bTouch)
{
    if (!g_bClickedEQRotary && !g_bClickedDynamicsRotary && !g_bClickedDeesserRotary && !g_bClickedReverbRotary && !g_bClickedEventideBlackholeRotary)
        return;

    var jsEQ;
    if (g_bClickedEQRotary)
    {
        jsEQ = GetEQJSON();
        if (jsEQ == null)
        {
            return;
        }
    }

    var jsDynamics;
    if (g_bClickedDynamicsRotary)
    {
        jsDynamics = GetDynamicsJSON();
        if (jsDynamics == null)
        {
            return;
        }
    }

    var jsDeesser;
    if (g_bClickedDeesserRotary)
    {
        jsDeesser = GetDeesserJSON();
        if (jsDeesser == null)
        {
            return;
        }
    }

    var jsReverb
    if (g_bClickedReverbRotary || g_bClickedEventideBlackholeRotary)
    {
        jsReverb = GetReverbJSON();
        if (jsReverb == null)
        {
            return;
        }
    }


    var nValue = 0;
    if (g_bClickedEQRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-type"))
        {
            nValue = jsEQ.eq_bands[g_nControledEQBandID].type;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq"))
        {
            nValue = jsEQ.eq_bands[g_nControledEQBandID].freq;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-gain"))
        {
            nValue = jsEQ.eq_bands[g_nControledEQBandID].gain;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-q"))
        {
            nValue = jsEQ.eq_bands[g_nControledEQBandID].Q;
        }
    }
    else if (g_bClickedDynamicsRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-ratio"))
        {
            nValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].ratio;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-attack"))
        {
            nValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].attack;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-release"))
        {
            nValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].release;
        }
    }
    else if (g_bClickedDeesserRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-range"))
        {
            nValue = jsDeesser.range;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq"))
        {
            nValue = jsDeesser.freq;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-q"))
        {
            nValue = jsDeesser.q;
        }
    }
    else if (g_bClickedReverbRotary)
    {
	    if (g_szCapturedEffectRotaryControlElementId.includes("-lowCut"))
        {
            nValue = jsReverb.reverb_params.low_cut;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-highCut"))
        {
            nValue = jsReverb.reverb_params.high_cut;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-size"))
        {
            nValue = jsReverb.reverb_params.size;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-predelay"))
        {
            nValue = jsReverb.reverb_params.pre_delay;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-decay"))
        {
            nValue = jsReverb.reverb_params.decay;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-diffusion"))
        {
            nValue = jsReverb.reverb_params.diffusion;
        }
    }
    else if (g_bClickedEventideBlackholeRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-mix"))
        {
            nValue = jsReverb.eventide_blackhole_params.mix;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-size"))
        {
            nValue = jsReverb.eventide_blackhole_params.size;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-predelay"))
        {
            nValue = jsReverb.eventide_blackhole_params.pre_delay;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-low-level"))
        {
            nValue = jsReverb.eventide_blackhole_params.low_level;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-high-level"))
        {
            nValue = jsReverb.eventide_blackhole_params.high_level;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-inv-gravity"))
        {
            nValue = jsReverb.eventide_blackhole_params.inv_gravity;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-mod-depth"))
        {
            nValue = jsReverb.eventide_blackhole_params.mod_depth;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-mod-rate"))
        {
            nValue = jsReverb.eventide_blackhole_params.mod_rate;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-feedback"))
        {
            nValue = jsReverb.eventide_blackhole_params.feedback;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-resonance"))
        {
            nValue = jsReverb.eventide_blackhole_params.resonance;
        }
    }
	

	g_nEffectRotaryControlMouseDownKnobValue = nValue;
	g_szClickedEffectRotaryControlElementId = g_szCapturedEffectRotaryControlElementId;

    
	if (bTouch && event.targetTouches)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

		g_nEffectRotaryControlMouseDownClick = event.targetTouches[0].clientY;
	}
	else
	{
        g_nEffectRotaryControlMouseDownClick = event.pageY;
	}


	event.stopPropagation();

	g_nPublishEffectRotaryValueTimer = window.setInterval(OnTimerPublishEffectRotaryControl, 100);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EffectRotaryControlMouseMove(event, bTouch)
{    
    if (g_szCapturedEffectRotaryControlElementId == "" || g_szClickedEffectRotaryControlElementId == "")
	{
		return;
    }

    g_isEffectsScroller.scrollTo(0, g_nEffectsScrollerY, 0);

	var nMove = 0;
	if (bTouch && event.targetTouches)
	{
		if (event.targetTouches.length <= 0)
		{
			return;
		}

        nMove = g_nEffectRotaryControlMouseDownClick - event.targetTouches[0].clientY;
	}
	else
	{
        nMove = g_nEffectRotaryControlMouseDownClick - event.pageY;
	}

    var nMoveEffect = 0;
    var nNewValue = 0;


    if (g_bClickedEQRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-type"))
        {
            nMoveEffect = nMove / 400 * 4;
            nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

            if (nNewValue < 0)
                nNewValue = 0;

            if (nNewValue > 4)
                nNewValue = 4;

            nNewValue = Math.trunc(nNewValue);
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq"))
        {
            var nCurrentPos = EQFrequencyRotaryValueToPos(g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = EQFrequencyRotaryPosToValue(nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);            
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-gain"))
        {
            nMoveEffect = nMove / 400 * 48;
            nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

            if (nNewValue < 0.1 && nNewValue > -0.1)
                nNewValue = 0;

            if (nNewValue < -24)
                nNewValue = -24;

            if (nNewValue > 24)
                nNewValue = 24;
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-q"))
        {
            var nCurrentPos = EQQRotaryValueToPos(g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = EQQRotaryPosToValue(nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
        }
    }
    else if (g_bClickedDynamicsRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-ratio"))
        {
            var nCurrentPos = DynamicsRatioRotaryValueToPos(g_tDynamicsRatioMin[g_nControledDynamicsBandID], g_tDynamicsRatioMax[g_nControledDynamicsBandID], g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = DynamicsRatioRotaryPosToValue(g_tDynamicsRatioMin[g_nControledDynamicsBandID], g_tDynamicsRatioMax[g_nControledDynamicsBandID], nCurrentPos + nMove / 600);

            nNewValue = Number(nNewValue).toFixed(1);
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-attack"))
        {
            var nCurrentPos = DynamicsRotaryValueToPos(g_tDynamicsAttackMin[g_nControledDynamicsBandID], g_tDynamicsAttackMax[g_nControledDynamicsBandID], g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = DynamicsRotaryPosToValue(g_tDynamicsAttackMin[g_nControledDynamicsBandID], g_tDynamicsAttackMax[g_nControledDynamicsBandID], nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-release"))
        {
            var nCurrentPos = DynamicsRotaryValueToPos(g_tDynamicsReleaseMin[g_nControledDynamicsBandID], g_tDynamicsReleaseMax[g_nControledDynamicsBandID], g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = DynamicsRotaryPosToValue(g_tDynamicsReleaseMin[g_nControledDynamicsBandID], g_tDynamicsReleaseMax[g_nControledDynamicsBandID], nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
        }
    }
    else if (g_bClickedDeesserRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-range"))
        {
            var mul;
            if (g_nEffectRotaryControlMouseDownKnobValue < DEESSER_RANGE_MIN * 2)
            {
                mul = 10;
            }
            else if (g_nEffectRotaryControlMouseDownKnobValue < DEESSER_RANGE_MIN * 4)
            {
                mul = 25;
            }
            else if (g_nEffectRotaryControlMouseDownKnobValue < DEESSER_RANGE_MIN * 8)
            {
                mul = 50;
            }
            else if (g_nEffectRotaryControlMouseDownKnobValue < DEESSER_RANGE_MIN * 16)
            {
                mul = 100;
            }
            else
                mul = 250;

            nMoveEffect = nMove / 600 * mul;
            nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

            if (nNewValue < DEESSER_RANGE_MIN)
                nNewValue = DEESSER_RANGE_MIN;

            if (nNewValue > DEESSER_RANGE_MAX)
                nNewValue = DEESSER_RANGE_MAX;

            nNewValue = Math.trunc(nNewValue);
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq"))
        {
            var nCurrentPos = DeesserRotaryValueToPos(DEESSER_FREQUENCY_MIN, DEESSER_FREQUENCY_MAX, g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = DeesserRotaryPosToValue(DEESSER_FREQUENCY_MIN, DEESSER_FREQUENCY_MAX, nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-q"))
        {
            var nCurrentPos = DeesserRotaryValueToPos(DEESSER_Q_MIN, DEESSER_Q_MAX, g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = DeesserRotaryPosToValue(DEESSER_Q_MIN, DEESSER_Q_MAX, nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
        }
    }
    else if (g_bClickedReverbRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-lowCut") || g_szCapturedEffectRotaryControlElementId.includes("-highCut"))
        {
            var nCurrentPos = ReverbFrequencyRotaryValueToPos(g_nEffectRotaryControlMouseDownKnobValue);

            nNewValue = ReverbFrequencyRotaryPosToValue(nCurrentPos + nMove / 400);

            nNewValue = Number(nNewValue).toFixed(0);
	    }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-size") || g_szCapturedEffectRotaryControlElementId.includes("-decay") || g_szCapturedEffectRotaryControlElementId.includes("-diffusion"))
	    {
	        nMoveEffect = nMove / 400 * 100;
	        nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

	        if (nNewValue < 0)
	            nNewValue = 0;

	        if (nNewValue > 100)
	            nNewValue = 100;

	        nNewValue = Math.trunc(nNewValue);
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-predelay"))
	    {
	        nMoveEffect = nMove / 400 * 300;
	        nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

	        if (nNewValue < 0)
	            nNewValue = 0;

	        if (nNewValue > 300)
	            nNewValue = 300;

	        nNewValue = Math.trunc(nNewValue);
        }
    }
    else if (g_bClickedEventideBlackholeRotary)
    {
        nMoveEffect = nMove / 400 * 100;
        nNewValue = g_nEffectRotaryControlMouseDownKnobValue + nMoveEffect;

        var nMax = g_szCapturedEffectRotaryControlElementId.includes("-feedback") ? 99 : 100; // ANUBIS-1244: workaround

        if (nNewValue < 0)
            nNewValue = 0;

        if (nNewValue > nMax)
            nNewValue = nMax;

        nNewValue = Math.trunc(nNewValue);
    }

    nNewValue = Number(nNewValue);

    PublishEffectRotaryControl(nNewValue);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EffectRotaryControlMouseUp(event)
{
    if (g_szCapturedEffectRotaryControlElementId == "" || g_szClickedEffectRotaryControlElementId == "")
	{
		return;
	}

	clearTimeout(g_nPublishEffectRotaryValueTimer);
	g_nPublishEffectRotaryTimer = null;
	g_nLastPublishedEffectRotary = null;
	g_nLastSendEffectRotary = null;

	g_szClickedEffectRotaryControlElementId = "";

	g_bClickedEQRotary = false;
    g_bClickedDynamicsRotary = false;
    g_bClickedDeesserRotary = false;
    g_bClickedReverbRotary = false;
    g_bClickedEventideBlackholeRotary = false;
    
	event.stopPropagation();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedEffectRotary = null;
var g_nLastSendEffectRotary = null;
var g_nPublishEffectRotaryTimer = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishEffectRotaryControl(nNewValue)
{
    g_nLastPublishedEffectRotary = nNewValue;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishEffectRotaryControl()
{
    if (g_szCapturedEffectRotaryControlElementId == "" || (!g_bClickedEQRotary && !g_bClickedDynamicsRotary && !g_bClickedDeesserRotary && !g_bClickedReverbRotary && !g_bClickedEventideBlackholeRotary))
	{
		return;
	}

	if (g_nLastPublishedEffectRotary == g_nLastSendEffectRotary)
	{
		return;
	}

	if (g_nLastPublishedEffectRotary == null)
	{
		return;
	}

	
	var szTruncatedPath = GetTruncatedPath();


    if (g_bClickedEQRotary)
    {
	    if (g_szCapturedEffectRotaryControlElementId.includes("-type") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 4)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { type: g_nLastPublishedEffectRotary } });
	    }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq") && g_nLastPublishedEffectRotary >= EQ_FREQUENCY_MIN && g_nLastPublishedEffectRotary <= EQ_FREQUENCY_MAX)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { freq: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-gain") && g_nLastPublishedEffectRotary >= -24 && g_nLastPublishedEffectRotary <= 24)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { gain: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-q") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".eq.eq_bands[" + g_nControledEQBandID + "]", value: { Q: g_nLastPublishedEffectRotary } });
        }
    }
    else if (g_bClickedDynamicsRotary)
    {
	    if (g_szCapturedEffectRotaryControlElementId.includes("-ratio") && g_nLastPublishedEffectRotary >= g_tDynamicsRatioMin[g_nControledDynamicsBandID] && g_nLastPublishedEffectRotary <= g_tDynamicsRatioMax[g_nControledDynamicsBandID])
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { ratio: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-attack") && g_nLastPublishedEffectRotary >= g_tDynamicsAttackMin[g_nControledDynamicsBandID] && g_nLastPublishedEffectRotary <= g_tDynamicsAttackMax[g_nControledDynamicsBandID])
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { attack: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-release") && g_nLastPublishedEffectRotary >= g_tDynamicsReleaseMin[g_nControledDynamicsBandID] && g_nLastPublishedEffectRotary <= g_tDynamicsReleaseMax[g_nControledDynamicsBandID])
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { release: g_nLastPublishedEffectRotary } });
        }
    }
    else if (g_bClickedDeesserRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-range") && g_nLastPublishedEffectRotary >= DEESSER_RANGE_MIN && g_nLastPublishedEffectRotary <= DEESSER_RANGE_MAX)
	    {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { range: g_nLastPublishedEffectRotary } });
	    }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-freq") && g_nLastPublishedEffectRotary >= DEESSER_FREQUENCY_MIN && g_nLastPublishedEffectRotary <= DEESSER_FREQUENCY_MAX)
	    {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { freq: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-q") && g_nLastPublishedEffectRotary >= DEESSER_Q_MIN && g_nLastPublishedEffectRotary <= DEESSER_Q_MAX)
	    {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { q: g_nLastPublishedEffectRotary } });
        }
    }
    else if (g_bClickedReverbRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-lowCut") && g_nLastPublishedEffectRotary >= REVERB_FREQUENCY_MIN && g_nLastPublishedEffectRotary <= REVERB_FREQUENCY_MAX)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { low_cut: g_nLastPublishedEffectRotary } });
	    }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-highCut") && g_nLastPublishedEffectRotary >= REVERB_FREQUENCY_MIN && g_nLastPublishedEffectRotary <= REVERB_FREQUENCY_MAX)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { high_cut: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-size") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { size: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-predelay") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 300)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { pre_delay: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-decay") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { decay: g_nLastPublishedEffectRotary } });
	    }
	    else if (g_szCapturedEffectRotaryControlElementId.includes("-diffusion") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
	    {
	        self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.reverb_params", value: { diffusion: g_nLastPublishedEffectRotary } });
        }
    }
    else if (g_bClickedEventideBlackholeRotary)
    {
        if (g_szCapturedEffectRotaryControlElementId.includes("-mix") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { mix: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-size") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { size: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-predelay") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { pre_delay: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-low-level") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { low_level: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-high-level") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { high_level: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-inv-gravity") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { inv_gravity: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-mod-depth") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { mod_depth: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-mod-rate") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { mod_rate: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-feedback") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 99) // ANUBIS-1244: workaround
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { feedback: g_nLastPublishedEffectRotary } });
        }
        else if (g_szCapturedEffectRotaryControlElementId.includes("-resonance") && g_nLastPublishedEffectRotary >= 0 && g_nLastPublishedEffectRotary <= 100)
        {
            self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".reverb.eventide_blackhole_params", value: { resonance: g_nLastPublishedEffectRotary } });
        }
    }

	g_nLastSendEffectRotary = g_nLastPublishedEffectRotary;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerDynamicsGainFaderLongClick(event)
{
    if (g_bDynamicsGainFaderMouseMoved)
        return;

    g_bDynamicsGainFaderLongClick = true;

    if (g_szCapturedDynamicsFaderElementId.includes("-makeup"))
    {
        self.Communicator.publish("/service/ravenna/settings", { path: GetTruncatedPath() + ".dynamics", value: { gain: 0 } });
    }

    DynamicsFaderMouseUp(event);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsFaderMouseDown(event, bTouch)
{
    if (g_szCapturedDynamicsFaderElementId == "" || !g_bDynamicsEnabled)
        return;

    var jsDynamics = GetDynamicsJSON();
    if (jsDynamics == null)
    {
        return;
    }

    var nValue = 0;
    if (g_szCapturedDynamicsFaderElementId.includes("-threshold"))
    {
        nValue = jsDynamics.dynamics_bands[g_nControledDynamicsBandID].threshold;
    }
    else if (g_szCapturedDynamicsFaderElementId.includes("-makeup"))
    {
        nValue = jsDynamics.gain;
    }

    g_nDynamicsMouseDownFaderValue = nValue;

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    if (bTouch && event.targetTouches)
    {
        if (event.targetTouches.length <= 0)
        {
            return;
        }

        g_nDynamicsFaderMouseDownClick = event.targetTouches[0].clientY;
    }
    else
    {
        g_nDynamicsFaderMouseDownClick = event.pageY;
    }


    event.stopPropagation();

    g_nPublishDynamicsFaderValueTimer = window.setInterval(OnTimerPublishDynamicsFaderValue, 100);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsFaderMouseMove(event, bTouch)
{
    if (g_szCapturedDynamicsFaderElementId == "" || !g_bDynamicsEnabled || g_bDynamicsGainFaderLongClick)
        return;

    g_isEffectsScroller.scrollTo(0, g_nEffectsScrollerY, 0);

    g_bDynamicsGainFaderMouseMoved = true;

    var nMove = 0;
    if (bTouch && event.targetTouches)
    {
        if (event.targetTouches.length <= 0)
        {
            return;
        }

        nMove = event.targetTouches[0].clientY - g_nDynamicsFaderMouseDownClick;
    }
    else
    {
        nMove = event.pageY - g_nDynamicsFaderMouseDownClick;
    }


    var nKnobPos;
    var nNewPos;
    var nNewValue;

    if (g_szCapturedDynamicsFaderElementId.includes("-threshold"))
    {
        nKnobPos = DynamicsThresholdFaderGainToPosY(g_nDynamicsMouseDownFaderValue);
        nNewPos = nKnobPos + nMove;
        nNewValue = DynamicsThresholdFaderPosYToGain(nNewPos);
    }
    else if (g_szCapturedDynamicsFaderElementId.includes("-makeup"))
    {
        nKnobPos = DynamicsMakeupFaderGainToPosY(g_nDynamicsMouseDownFaderValue);
        nNewPos = nKnobPos + nMove;
        nNewValue = DynamicsMakeupFaderPosYToGain(nNewPos);
    }

    nNewValue = Number(nNewValue);

    PublishDynamicsFaderValue(nNewValue);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DynamicsFaderMouseUp(event)
{
    if (g_szCapturedDynamicsFaderElementId == "" || !g_bDynamicsEnabled)
        return;

    clearInterval(g_nPublishDynamicsFaderValueTimer);
    clearTimeout(g_nPublishDynamicsFaderValueTimer);
    g_nPublishDynamicsFaderValueTimer = null;
    g_nLastPublishedDynamicsFaderValue = null;
    g_nLastSendDynamicsFaderValue = null;

    clearTimeout(g_nDynamicsGainFaderLongClickTimer);
    g_nDynamicsGainFaderLongClickTimer = null;

    g_bDynamicsGainFaderMouseMoved = false;
    g_bDynamicsGainFaderLongClick = false;

    g_szCapturedDynamicsFaderElementId = "";

    event.stopPropagation();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedDynamicsFaderValue = null;
var g_nLastSendDynamicsFaderValue = null;
var g_nPublishDynamicsFaderValueTimer = null;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishDynamicsFaderValue(nNewValue)
{
    g_nLastPublishedDynamicsFaderValue = nNewValue;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishDynamicsFaderValue()
{
    if (g_szCapturedDynamicsFaderElementId == "" || !g_bDynamicsEnabled || g_bDynamicsGainFaderLongClick)
    {
        return;
    }

    if (g_nLastPublishedDynamicsFaderValue == g_nLastSendDynamicsFaderValue)
	{
		return;
	}

    if (g_nLastPublishedDynamicsFaderValue == null)
	{
		return;
	}

	
	var szTruncatedPath = GetTruncatedPath();

	if (g_szCapturedDynamicsFaderElementId.includes("-threshold") && g_nLastPublishedDynamicsFaderValue >= g_tDynamicsThresholdMin[g_nControledDynamicsBandID] && g_nLastPublishedDynamicsFaderValue <= g_tDynamicsThresholdMax[g_nControledDynamicsBandID])
	{
	    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics.dynamics_bands[" + g_nControledDynamicsBandID + "]", value: { threshold: g_nLastPublishedDynamicsFaderValue } });
	}
	else if (g_szCapturedDynamicsFaderElementId.includes("-makeup") && g_nLastPublishedDynamicsFaderValue >= -360 && g_nLastPublishedDynamicsFaderValue <= 360)
	{
	    self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".dynamics", value: { gain: g_nLastPublishedDynamicsFaderValue } });
	}

	g_nLastSendDynamicsFaderValue = g_nLastPublishedDynamicsFaderValue;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserFaderMouseDown(event, bTouch)
{
    if (g_szCapturedDeesserFaderElementId == "" || !g_bDeesserEnabled)
        return;

    var jsDeesser = GetDeesserJSON();
    if (jsDeesser == null)
    {
        return;
    }

    var nValue = jsDeesser.threshold;

    g_nDeesserMouseDownFaderValue = nValue;

    g_nEffectsScrollerY = g_isEffectsScroller.y;

    if (bTouch && event.targetTouches)
    {
        if (event.targetTouches.length <= 0)
        {
            return;
        }

        g_nDeesserFaderMouseDownClick = event.targetTouches[0].clientY;
    }
    else
    {
        g_nDeesserFaderMouseDownClick = event.pageY;
    }


    event.stopPropagation();

    g_nPublishDeesserFaderValueTimer = window.setInterval(OnTimerPublishDeesserFaderValue, 100);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserFaderMouseMove(event, bTouch)
{
    if (g_szCapturedDeesserFaderElementId == "" || !g_bDeesserEnabled)
        return;

    g_isEffectsScroller.scrollTo(0, g_nEffectsScrollerY, 0);

    var nMove = 0;
    if (bTouch && event.targetTouches)
    {
        if (event.targetTouches.length <= 0)
        {
            return;
        }

        nMove = event.targetTouches[0].clientY - g_nDeesserFaderMouseDownClick;
    }
    else
    {
        nMove = event.pageY - g_nDeesserFaderMouseDownClick;
    }

    
    var nKnobPos = DeesserThresholdFaderGainToPosY(g_nDeesserMouseDownFaderValue);
    var nNewPos = nKnobPos + nMove;
    var nNewValue = DeesserThresholdFaderPosYToGain(nNewPos);    

    nNewValue = Number(nNewValue);

    PublishDeesserFaderValue(nNewValue);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DeesserFaderMouseUp(event)
{
    if (g_szCapturedDeesserFaderElementId == "" || !g_bDeesserEnabled)
        return;

    clearTimeout(g_nPublishDeesserFaderValueTimer);
    g_nPublishDeesserFaderValueTimer = null;
    g_nLastPublishedDeesserFaderValue = null;
    g_nLastSendDeesserFaderValue = null;

    g_szCapturedDeesserFaderElementId = "";

    event.stopPropagation();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var g_nLastPublishedDeesserFaderValue = null;
var g_nLastSendDeesserFaderValue = null;
var g_nPublishDeesserFaderValueTimer = null;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PublishDeesserFaderValue(nNewValue)
{
    g_nLastPublishedDeesserFaderValue = nNewValue;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnTimerPublishDeesserFaderValue()
{
    if (g_szCapturedDeesserFaderElementId == "" || !g_bDeesserEnabled)
    {
        return;
    }

    if (g_nLastPublishedDeesserFaderValue == g_nLastSendDeesserFaderValue)
	{
		return;
	}

    if (g_nLastPublishedDeesserFaderValue == null)
	{
		return;
	}

	
	var szTruncatedPath = GetTruncatedPath();

	self.Communicator.publish("/service/ravenna/settings", { path: szTruncatedPath + ".deesser", value: { threshold: g_nLastPublishedDeesserFaderValue } });

	g_nLastSendDeesserFaderValue = g_nLastPublishedDeesserFaderValue;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EffectLogRotaryValueToPos(nMin, nMax, nValue, nPow)
{
    var nPos = 0;

    if (nMin == nMax || nValue > nMax)
        nPos = 1;
    else if (nValue < nMin)
        nPos = 0;
    else
        nPos = Math.pow(Math.log(nValue - nMin + 1) / Math.log(nMax - nMin + 1), nPow);

    return nPos;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function EffectLogRotaryPosToValue(nMin, nMax, nPos, nPow)
{
    var nValue = 0;

    nValue = Math.exp(Math.log(nMax - nMin + 1) * Math.pow(nPos, nPow)) + nMin - 1;

    if (nValue > nMax)
        nValue = nMax;
    else if (nValue < nMin)
        nValue = nMin;

    return nValue;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetEQJSON()
{
    var jsEQ;

    if (g_bBusEffect && g_nOnBusID != -1)
    {
        var jsBus = GetBusJSON(g_nOnBusID);
        if (jsBus == null)
        {
            return;
        }

        jsEQ = jsBus.eq;
    }
    else if (g_bInputEffect && g_nOnInputID != -1)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        jsEQ = jsInput.eq;
    }

    return jsEQ;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetDynamicsJSON()
{
    var jsDynamics;

    if (g_bBusEffect && g_nOnBusID != -1)
    {
        var jsBus = GetBusJSON(g_nOnBusID);
        if (jsBus == null)
        {
            return;
        }

        jsDynamics = jsBus.dynamics;
    }
    else if (g_bInputEffect && g_nOnInputID != -1)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        jsDynamics = jsInput.dynamics;
    }

    return jsDynamics;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetDeesserJSON()
{
    var jsDeesser;

    if (g_bInputEffect && g_nOnInputID != -1)
    {
        var jsInput = GetInputJSON(g_nOnInputID);
        if (jsInput == null)
        {
            return;
        }

        jsDeesser = jsInput.deesser;
    }

    return jsDeesser;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetReverbJSON()
{
    var jsReverb;

    if (g_bBusEffect && g_nOnBusID != -1)
    {
        var jsBus = GetBusJSON(g_nOnBusID);
        if (jsBus == null)
        {
            return;
        }

        jsReverb = jsBus.reverb;
    }

    return jsReverb;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetTruncatedPath()
{
    var szTruncatedPath;

    if (g_bBusEffect && g_nOnBusID != -1)
    {
        szTruncatedPath = "$._oem_ui_process_engine.music.mixer.busses[?(@.id==" + g_nOnBusID + ")][0]";
    }
    else if (g_bInputEffect && g_nOnInputID != -1)
    {
        szTruncatedPath = "$._oem_ui_process_engine.music.mixer.inputs[?(@.id==" + g_nOnInputID + ")][0]";
    }

    return szTruncatedPath;
}