// fontawesome icons import
import {
    faDice,
    faMasksTheater,
    faPalette,
    faPills,
    faCloud,
    faPersonHiking,
    faPuzzlePiece,
    faSignsPost,
    faEye,
    faBinoculars,
    faRepeat,
    faPooStorm,
    faHandsBound,
    faSatelliteDish,
    faDoorOpen,
    faStairs,
    faShoePrints,
    faSmile,
    faGrinStars,
    faPeace,
    faFaceFrown,
    faFaceFrownOpen,
    faMehRollingEyes,
    faSurprise,
    faAngry,
    faFaceGrimace,
    faFaceDizzy,
    faFaceMehBlank,
    faFaceFlushed,
    faFistRaised,
    faPrayingHands,
    faLightbulb,
    faBrain,
    faMedal,
    faTired,
    faFaceSadTear,
    faFeather,
    faPersonFalling,
    faRunning,
    faPersonHarassing,
    faTeethOpen,
    faPersonCircleExclamation,
    faMapLocationDot,
    faClock,
    faPenClip,
    faWater,
    faSkullCrossbones,
    faTasks,
    faStar,
    faSquarePersonConfined,
    faBaby,
    faSpaghettiMonsterFlying,
    faHourglassEnd,
    faRoute,
    faPaw,
    faMeteor,
    faDove,
    faRing,
    faPersonDigging,
    faBriefcase,
    faGraduationCap,
    faPersonSnowboarding,
    faCar,
    faToilet,
    faPizzaSlice,
    faBed,
    faMarsAndVenusBurst,
    faComments,
    faGuitar,
    faPeopleArrows,
    faEyedropper,
    faFlask,
    faMortarPestle,
    faLeaf,
    faSeedling,
    faCapsules,
    faTablets,
    faMattressPillow, 
} from '@fortawesome/free-solid-svg-icons'

// switch statement maps icons to values
export const renderIcon = (value: any) => {
    switch (value) {
      case 'Everyday':
        return faPersonHiking;
      case 'Fragmented':
        return faPuzzlePiece;
      case 'Nonsensical':
        return faSignsPost;
      case 'Vivid':
        return faEye;
      case 'Precognitive':
        return faBinoculars;
      case 'Recurring':
        return faRepeat;
      case 'Nightmare':
        return faPooStorm;
      case 'Sleep Paralysis':
        return faHandsBound;
      case 'Telepathic':
        return faSatelliteDish;
      case 'Lucid':
        return faDoorOpen;
      case 'Out of Body':
        return faStairs;
      case 'Sleepwalking':
        return faShoePrints;
      case 'Happy':
        return faSmile;
      case 'Excited':
        return faGrinStars;
      case 'Relaxed':
        return faPeace;
      case 'Sad':
        return faFaceFrown;
      case 'Frightened':
        return faFaceFrownOpen;
      case 'Confused':
        return faMehRollingEyes;
      case 'Surprised':
        return faSurprise;
      case 'Angry':
        return faAngry;
      case 'Anxious':
        return faFaceGrimace;
      case 'Amazed':
        return faFaceDizzy;
      case 'Curious':
        return faFaceMehBlank;
      case 'Embarrassed':
        return faFaceFlushed;
      case 'Determined':
        return faFistRaised;
      case 'Grateful':
        return faPrayingHands;
      case 'Inspired':
        return faLightbulb;
      case 'Thoughtful':
        return faBrain;
      case 'Proud':
        return faMedal;
      case 'Stressed':
        return faTired;
      case 'Sympathetic':
        return faFaceSadTear;
      case 'Flying':
        return faFeather;
      case 'Falling':
        return faPersonFalling;
      case 'Chased':
        return faRunning;
      case 'Fighting':
        return faPersonHarassing;
      case 'Teeth':
        return faTeethOpen;
      case 'Naked':
        return faPersonCircleExclamation;
      case 'Lost':
        return faMapLocationDot;
      case 'Late':
        return faClock;
      case 'Exam':
        return faPenClip;
      case 'Water':
        return faWater;
      case 'Death':
        return faSkullCrossbones;
      case 'Tasks':
        return faTasks;
      case 'Celebrities':
        return faStar;
      case 'Trapped':
        return faSquarePersonConfined;
      case 'Family':
        return faBaby;
      case 'Surreal':
        return faSpaghettiMonsterFlying;
      case 'Time Travel':
        return faHourglassEnd;
      case 'Journey':
        return faRoute;
      case 'Animals':
        return faPaw;
      case 'Disasters':
        return faMeteor;
      case 'Transformation':
        return faDove;
      case 'Treasure':
        return faRing;
      case 'Mundane':
        return faPersonDigging;
      case 'Work':
        return faBriefcase;
      case 'School':
        return faGraduationCap;
      case 'Driving':
        return faCar;
      case 'Sport':
        return faPersonSnowboarding;
      case 'Bodily functions':
        return faToilet;
      case 'Food':
        return faPizzaSlice;
      case 'Sleeping':
        return faBed;
      case 'Romance':
        return faMarsAndVenusBurst;
      case 'Communication':
        return faComments;
      case 'Music':
        return faGuitar;
      case 'Being Somebody Else':
        return faPeopleArrows;
      case 'Melatonin':
        return faEyedropper;
      case 'Magnesium':
        return faFlask;
      case 'Valerian Root':
        return faMortarPestle;
      case 'Chamomile':
        return faLeaf;
      case 'Lavender':
        return faSeedling;
      case 'L-theanine':
        return faCapsules;
      case 'Benzodiazepine':
        return faTablets;
      case 'Sedative':
        return faMattressPillow;
      default:
        return faCloud;
    }

  }

// data for each category
export const categoryData = [
    {
        name: 'Dream Type',
        description: 'What kind of dream did you experience?',
        icon: faDice,
        color: '#86AF9B', // morningblue
        values: [
            'Everyday',
            'Fragmented',
            'Nonsensical',
            'Vivid',
            'Precognitive',
            'Recurring',
            'Nightmare',
            'Sleep Paralysis',
            'Telepathic',
            'Lucid',
            'Out of Body',
            'Sleepwalking',
        ]
    },
    {
        name: 'Emotion',
        description: 'How did this dream make you feel?',
        icon: faMasksTheater,
        color: '#A986AF', // glossygrape
        values: [
            "Happy",
            "Excited",
            "Relaxed",
            "Sad",
            "Frightened",
            "Confused",
            "Surprised",
            "Angry",
            "Anxious",
            "Amazed",
            "Curious",
            "Embarrassed",
            "Determined",
            "Grateful",
            "Inspired",
            "Thoughtful",
            "Proud",
            "Stressed",
            "Sympathetic"
        ], 
    },
    {
        name: 'Dream Theme',
        description: 'Select from common dream themes.',
        icon: faPalette,
        color: '#86A9AF', // pewterblue
        values: [
            "Flying",
            "Falling",
            "Chased",
            "Fighting",
            "Teeth",
            "Naked",
            "Lost",
            "Late",
            "Exam",
            "Water",
            "Death",
            "Tasks",
            "Celebrities",
            "Trapped",
            "Family",
            "Surreal",
            "Time Travel",
            "Journey",
            "Animals",
            "Disasters",
            "Transformation",
            "Treasure",
            "Mundane",
            "Work",
            "School",
            "Sport",
            "Driving",
            "Bodily functions",
            "Food",
            "Sleeping",
            "Romance",
            "Communication",
            "Music",
            "Being Somebody Else"
        ], 
    },
    {
        name: 'Supplements or Medication',
        description: 'Select any supplements or medication that might have impacted your dream.',
        icon: faPills,
        color: '#AFAF86', // sage 
        values: [
            "Melatonin",
            "Magnesium",
            "Valerian Root",
            "Chamomile",
            "Lavender",
            "L-theanine",
            "Benzodiazepine",
            "Sedative"
        ],
    },
]
