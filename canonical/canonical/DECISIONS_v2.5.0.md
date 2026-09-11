# DECISIONS

DOC=DECISIONS
OWNER=decisions,high_value_decisions

DOC_VERSION=2.5.0
CANONICAL_SET=GUILD24_CANONICAL_v2.5.0

Only high-value decisions that are easy to accidentally reverse.
Detailed rules live only in their owning Canonical Specs.

## CORE-001
rule=RPG world played from behind convenience-store counter
playerCombat=NO
focus=store decisions + adventurer outcomes

## CORE-002
rule=turnBasedOnly
realTimeGameplay=NO

## CORE-003
rule=NPCs are emotional core
targetTrustedRegulars≈2–4/run

## CORE-004
rule=materialsPublic_formulaHidden
exactSuccessDeathProb=NO
masterSafetyScore=NO

## SYS-001
division:
JOB=BaseStats+Growth
TRAIT=CharacterVariation
RELIC=StoreBuild
ITEM=ExpeditionPreparation
DUNGEON=Stat/HazardPuzzle
EVENT=DailyDecisionModifier
BOSS=FinalOpponentIdentity+BossTrait
FINAL=RunCulminationResolution
META=JobMastery+Unlock+Knowledge
COPY=PlayerFacingVoice

## SYS-002
rule=preferRemoveMergeClarifyRebalanceBeforeAdd
newSubsystemForFlavor=NO

## COPY-001
playerStatTerms:
combat=투력
survival=강인함
mobility=기동
spirit=정신
battle/fight=전투
internalPowerTerms=HIDDEN

## RELIC-001
rule=Relic is primary Run-variation/store-build layer
windows=[D0,D5,D10,D15,D20,D25,D30]

## RELIC-002
rule=Run high-roll synergy is allowed
forcedAverageNormalization=NO

## RELIC-003
relic=발주 교환권
effect=매일 첫 canonical Full-offer Reroll 비용 0G
freeUseConsumesFirstRerollStep=YES
singleOfferSwap=NO
pityAdvance=NO

## DUN-001
rule=Family identity > equal hazard count
families:
SPIDER=poison+bind
SLIME=corrosion+mire
FIRE=fire+highCombatPower(non-Hazard second axis)
CRYPT=fear+dark
SNOW=cold+whiteout
canonicalHazards=[poison,bind,corrosion,mire,fire,fear,dark,cold,whiteout]

## DUN-002
rule=T3 has viable <=2 required-prep-slot route
Lv10+.slot3=insurance/flex/luxury

## DUN-003
rule=DirectCounter reliability > HybridCounter reliability
Direct=certainty
Hybrid=flexibility

## DUN-004
longHazard=NO
thirstSystem=NO
longExpeditionPressure=SUPPLY_BURDEN
Supply=visible Food/Drink preparation resource

## ITEM-001
rule=general hidden Item combo system prohibited
explicit special interaction only if player-readable

## ITEM-002
activeCatalog=30
thirstSystem=NO
caffeineStackSystem=NO
hiddenJobItemEffect=NO

## JOB-001
rule=hidden Job-ID bonus prohibited
jobIdentity=BaseStats+Growth

## TRAIT-001
rule=NPC rarity independent from Trait quality

## NPC-001
livingNpcCap=22
capCounts=alive NPC
recoveryFreesCap=NO
deathFreesCap=YES
targetTrustedRegulars≈2–4/run

## DEST-001
rule=destination random among open Gates by default
autoBestFitRouting=NO
rarePlayerReassignmentEvent=YES

## ECO-001
normalPriceModes=[50%,100%,150%]
normalFreeSale=NO

## ECO-002
rule=Gold tension is current cash vs NPC investment vs Store investment

## ORDER-001
rule=base Order Reroll is paid Full-offer regeneration
sameDayCost=escalating
dailyReset=YES
rerollAdvancesPity=NO
PASS3.startingCurve=[30G,60G,120G,240G]

## ORDER-002
rule=Order is same-day replenishment
confirmedStockUsable=currentDaySale
currentDayGateHazard=KNOWN_BEFORE_ORDER
nextDayPlanningSignal=TIER_PROBABILITY_ONLY

## FORECAST-001
rule=next-day Tier probabilities are exact world/market information
nextDayFamily=HIDDEN
expeditionProbability=HIDDEN

## EVENT-001
normalEventEligible=D3–D29 except D5/D10/D15/D20/D25
D1–2=NO_EVENT
D30=NO_NORMAL_EVENT
dailyEventChance=35%
maxEventsPerDay=1

## EVENT-002
rule=explicitly revealed Event Hazard is immediately Known
coldEventExcludes=[existingCold,fireField]
poisonEventExcludes=[existingPoison]
counterItemAutoGuarantee=NO

## EVENT-003
catalog=22
rarePositiveEasterEggs=[늙은 음유시인,본사 야간 근무 수칙]
rareWeight=0.35
normalWeight=1.0

## UI-001
rule=phase identity must differ
MORNING=situation
ORDER=management
SALE=store+customer
NIGHT=result
CLOSING=economics

## UI-002
rule=avoid SaaS/card-dashboard composition
GUILD24Green=accent, not whole-screen visual system

## UI-003
tutorial=coachMark/spotlight
inFlowTutorialCard=NO

## UI-004
rule=Event is MORNING opening beat, not a separate Phase
whenEvent=FocusedReveal before Gate/Morning detail

## RUN-001
runLength=30
D30=Final Expedition culmination
lastDayRandomNPCShouldNotReplaceInvestedNPCValue=YES

## META-001
GlobalMetaXP=REMOVED
JobBossClearMatrix=6x7
maxJobMasteryPerJob=7
maxTotalJobMastery=42
permanentCombatPowerMeta=JOB_MASTERY_ONLY_IF_EXPLICIT_AND_VISIBLE
FranchiseGradeGameplayEffect=NO
FranchiseGradeStartContractGate=YES
crossRunHallOfFameDependency=NO

## FINAL-001
rule=D30 Final reuses existing Dungeon/NPC/Item systems; separate combat minigame prohibited
normalGateGeneration=NO
familyRoll=2 distinct canonical Families
familyHazardSource=existing T2 Hazard keys only
finalHazardScale=4.6
bossIdentityTraitOwnership=BOSS
bossStrengthAxis=effectiveBossPowerFromBOSS
maxPartySize=3
survivorFallback=[3+=choose3,2=2,1=1,0=RunFail]
jobDiversitySynergy=NO
finalRoll=0.88–1.12
bossClear=immediateRunClear
postClearNormalResolve=NO

## PACING-001
rule=preserve decisions, compress repeated interaction/read cost
SaleSequentialDecision=KEEP
returningNpcDeltaVisibility=PRIORITIZE
routineNightResult=COMPACT
meaningfulNightEvent=EMPHASIZE

## CUSTOMER-001
rule=Customer build may alter traffic/mix but must not make repetitive workload its primary reward
trustedRegularTarget=preserve
livingNpcCap=respect

## ECO-003
GoldRounding=nearestIntegerHalfUp
implementationReference=Math.round
oneRuleAcross=[UI,affordability,payment,history,closing]

## RELIC-004
KeystoneEligibleFrom=D10
separateKeystoneHardRate=NO
normalPoolAndSoftBuildBias=YES

## DUN-005
baseNoise=±17.5%
baseNoiseCoefficient=0.175
status=v2.5RetainedStartingValue
exactNoisePlayerFacing=HIDDEN

## DUN-006
SupplyBurden.T1=NO
SupplyBurden.T2=eligible
SupplyBurden.T3=eligible
SupplyBurden.starting=[T2:35%/required3,T3:55%/required5]
FinalExtraRandomSupplyBurden=NO
allActiveFoodDrinkSupplyPositive=YES

## ITEM-003
ReturnStone.escapeBonus=+50%p
role=probabilisticEscapeInsurance
DeathToSevereOwnership=WorldTreeOnly

## TRAIT-002
activeTraitCatalog=30
traitCatalogStatus=FROZEN
legacyActiveTraitsRemoved=[카페인중독,술고래,언데드혐오]
hiddenCombatVarianceTrait=NO

## DEST-002
playerFacingDestination=예상 목적지
defaultExpectedEqualsActual=YES
explicitTraitOrEventMayCreateDifference=YES
tutorialRule=특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있음

## RELIC-005
internalTaxonomyPlayerFacing=NO
milestoneWindowFocusedReveal=[D5,D10,D15,D20,D25,D30]
ownedRelicReadOnlyQuickView=[MORNING,ORDER,SALE]

## TRAIT-003
playerFacingTraitDirectionQualityLabel=NO
internalDirection=KEEP
effectSemanticTone=[benefit,cost,neutral]
semanticToneInferredFromNumericSign=NO

## META-002
MonsterKnowledgeGain=requiresAtLeast1SuppliedItem+nonDeathReturn
nakedScoutKnowledgeGain=NO
playerProgressLabel=보급 생환 N회

## META-003
distinctBossUnlocks=[1:황금1+1쿠폰,3:도적,6:광전사]
duplicateBossClearDoesNotAdvanceDistinctBossCount=YES
FranchiseGradeSource=TotalJobMastery
FranchiseGradeStartContractGate=YES
FranchiseGradeDirectGameplayBonus=NO
StartContractUnlockMapping=PASS3_START_CONTRACT_UNLOCK_TUNING
legacyStartContractGates=[day10,regular3,run1,level15]->REMOVED_AS_META_TRUTH

## META-004
JobMasteryCredit=successfulFinal+representedJob+uniqueJobBossPair
failMasteryGain=NO
duplicatePairMasteryGain=NO

## RUN-002
minimalEngagementLateCoastEfficient=NO
newInactivityPunishmentSubsystem=NO
exactEconomyTuningOwner=CORE_RUN+ECONOMY_ORDER

## BOSS-001
bossPool=[WRATH,PRIDE,ENVY,GREED,GLUTTONY,LUST,SLOTH]
selection=pureRNGOnePerRun
reveal=[D5:Identity,D15:Trait,D30:FamilyPair]
revealBeforeSameDayRelicDecision=YES
fixedBossFamilyPair=NO

## BOSS-002
SlothOpportunityDays=exactly2of[D15,D20,D25]+D30
SlothSealBreakGold=0
SlothSealBreakConsumesRelicWindowAcquisition=YES
SlothDifficultyOrder=[3breaks:weakest,2breaks:weak,1break:slightlyBelowWrath,0breaks:strongest]

## COPY-002
normalNpcNameVoice=한국식+판타지+유쾌한비틀기
strongWesternHighFantasyMajority=NO
randomSyllableSoup=NO

## UI-005
allCanonicalHazardsExplainStatPressure=YES
hoverOnlyHazardInfo=NO
mobileWidthsQA=[360,390,430]
