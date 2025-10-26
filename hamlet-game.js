// Hamlet Interactive Game - JavaScript Engine
// Comprehensive branching story with educational elements

class HamletGame {
    constructor() {
        this.currentScene = 'start';
        this.gameState = {
            act: 1,
            scene: 1,
            path: 'main',
            choices: [],
            character: 'hamlet',
            mood: 'contemplative'
        };
        this.characters = this.initializeCharacters();
        this.storyData = this.initializeStoryData();
        this.init();
    }

    initializeCharacters() {
        return {
            hamlet: {
                name: 'Prince Hamlet',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI0NTEzIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI0ZGRDcwMCIvPgo8Y2lyY2xlIGN4PSI5MCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxjaXJjbGUgY3g9IjExMCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xMDAgOTVMMTEwIDEwNUw5MCAxMDVMMTAwIDk1WiIgZmlsbD0iIzAwMCIvPgo8cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiPgo8dGV4dCB4PSIzMCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4p2UPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+',
                description: 'The Prince of Denmark, known for his philosophical nature and indecision. He is deeply affected by his father\'s death and his mother\'s hasty remarriage.',
                themes: ['Revenge', 'Madness', 'Mortality', 'Indecision']
            },
            ophelia: {
                name: 'Ophelia',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZCNkM0Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI0ZGRDcwMCIvPgo8Y2lyY2xlIGN4PSI5MCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxjaXJjbGUgY3g9IjExMCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xMDAgOTVMMTEwIDEwNUw5MCAxMDVMMTAwIDk1WiIgZmlsbD0iIzAwMCIvPgo8cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiPgo8dGV4dCB4PSIzMCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4p2VPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+',
                description: 'Polonius\'s daughter and Hamlet\'s love interest. She becomes a pawn in the political games and ultimately loses her sanity.',
                themes: ['Love', 'Madness', 'Innocence', 'Victimization']
            },
            claudius: {
                name: 'King Claudius',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOEI0NTEzIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI0ZGRDcwMCIvPgo8Y2lyY2xlIGN4PSI5MCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxjaXJjbGUgY3g9IjExMCIgY3k9Ijc1IiByPSI1IiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xMDAgOTVMMTEwIDEwNUw5MCAxMDVMMTAwIDk1WiIgZmlsbD0iIzAwMCIvPgo8cmVjdCB4PSI4MCIgeT0iMTIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiPgo8dGV4dCB4PSIzMCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4p2WPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+',
                description: 'Hamlet\'s uncle who murdered his brother (Hamlet\'s father) to become king. He marries Gertrude and rules Denmark.',
                themes: ['Power', 'Guilt', 'Manipulation', 'Ambition']
            },
            ghost: {
                name: 'Ghost of King Hamlet',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjkwIiBjeT0iNzUiIHI9IjUiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iMTEwIiBjeT0iNzUiIHI9IjUiIGZpbGw9IiMwMDAiLz4KPHBhdGggZD0iTTEwMCA5NUwxMTAgMTA1TDkwIDEwNUwxMDAgOTVaIiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjgwIiB5PSIxMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjgiLz4KPHN2ZyB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiPgo8dGV4dCB4PSIzMCIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4p2XPC90ZXh0Pgo8L3N2Zz4KPC9zdmc+',
                description: 'The spirit of Hamlet\'s deceased father who appears to reveal the truth about his murder and demand revenge.',
                themes: ['Revenge', 'Truth', 'Supernatural', 'Justice']
            },
            gertrude: {
                name: 'Queen Gertrude',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9bm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkI2QzQiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjQwIiBmaWxsPSIjRkZENzAwIi8+CjxjaXJjbGUgY3g9IjkwIiBjeT0iNzUiIHI9IjUiIGZpbGw9IiMwMDAiLz4KPGNpcmNsZSBjeD0iMTEwIiBjeT0iNzUiIHI9IjUiIGZpbGw9IiMwMDAiLz4KPHBhdGggZD0iTTEwMCA5NUwxMTAgMTA1TDkwIDEwNUwxMDAgOTVaIiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjgwIiB5PSIxMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0ZGRDcwMCIvPgo8c3ZnIHg9IjcwIiB5PSIxMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0MCI+Cjx0ZXh0IHg9IjMwIiB5PSIyMCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7inZg8L3RleHQ+Cjwvc3ZnPgo8L3N2Zz4=',
                description: 'Hamlet\'s mother who quickly remarries Claudius after her husband\'s death. She is torn between her son and new husband.',
                themes: ['Love', 'Loyalty', 'Guilt', 'Maternal Conflict']
            }
        };
    }

    initializeStoryData() {
        return {
            start: {
                text: "Welcome to Elsinore Castle, Prince Hamlet! Your father, King Hamlet, has recently died, and your uncle Claudius has taken the throne and married your mother, Queen Gertrude. You feel something is amiss...",
                character: 'hamlet',
                choices: [
                    { text: "Investigate the strange circumstances", next: 'investigate', path: 'detective' },
                    { text: "Accept the situation and move on", next: 'accept', path: 'passive' },
                    { text: "Seek counsel from your friends", next: 'counsel', path: 'social' }
                ],
                educational: "This is the opening of Shakespeare's Hamlet. The play begins with a sense of unease and mystery surrounding King Hamlet's death."
            },
            investigate: {
                text: "You decide to investigate. Late one night, you encounter the ghost of your father on the castle ramparts. The spirit reveals that Claudius murdered him by pouring poison in his ear while he slept!",
                character: 'ghost',
                choices: [
                    { text: "Swear to avenge your father's murder", next: 'revenge_plan', path: 'revenge' },
                    { text: "Question the ghost's truthfulness", next: 'doubt_ghost', path: 'skeptical' },
                    { text: "Seek proof before acting", next: 'proof_seek', path: 'methodical' }
                ],
                educational: "The ghost scene is one of the most famous in literature. It sets up the central conflict and Hamlet's moral dilemma about revenge."
            },
            accept: {
                text: "You choose to accept the situation, but your conscience won't let you rest. Ophelia, your beloved, approaches you with concern about your recent behavior.",
                character: 'ophelia',
                choices: [
                    { text: "Confide in Ophelia about your suspicions", next: 'confide_ophelia', path: 'romantic' },
                    { text: "Push Ophelia away to protect her", next: 'push_away', path: 'protective' },
                    { text: "Pretend everything is fine", next: 'pretend', path: 'deceptive' }
                ],
                educational: "Hamlet's relationship with Ophelia is complex and tragic. His treatment of her reflects his internal turmoil and the impossibility of normal relationships in this corrupt court."
            },
            counsel: {
                text: "You seek advice from your trusted friends Horatio, Rosencrantz, and Guildenstern. However, you soon discover that Rosencrantz and Guildenstern have been sent by Claudius to spy on you.",
                character: 'hamlet',
                choices: [
                    { text: "Confront them about their betrayal", next: 'confront_friends', path: 'confrontational' },
                    { text: "Use them to gather information", next: 'use_friends', path: 'manipulative' },
                    { text: "Trust only Horatio", next: 'trust_horatio', path: 'selective' }
                ],
                educational: "The theme of betrayal runs throughout Hamlet. Even those closest to Hamlet can be corrupted by power and political intrigue."
            },
            revenge_plan: {
                text: "You swear to avenge your father's death. To test the ghost's story, you decide to stage a play that reenacts the murder. If Claudius reacts guiltily, you'll know the ghost spoke true.",
                character: 'hamlet',
                choices: [
                    { text: "Proceed with the play immediately", next: 'play_immediate', path: 'direct' },
                    { text: "Wait for the right moment", next: 'play_wait', path: 'patient' },
                    { text: "Confront Claudius directly", next: 'direct_confront', path: 'bold' }
                ],
                educational: "The play-within-a-play is a brilliant dramatic device. It allows Hamlet to test Claudius's guilt while providing entertainment for the court."
            },
            doubt_ghost: {
                text: "You question whether the ghost is truly your father or a demon trying to lead you astray. You decide to test its claims before acting.",
                character: 'hamlet',
                choices: [
                    { text: "Stage a play to test Claudius", next: 'play_test', path: 'methodical' },
                    { text: "Observe Claudius's behavior closely", next: 'observe', path: 'analytical' },
                    { text: "Seek spiritual guidance", next: 'spiritual', path: 'religious' }
                ],
                educational: "Hamlet's doubt reflects Renaissance concerns about the supernatural. The play explores the tension between faith and reason."
            },
            proof_seek: {
                text: "You decide to gather evidence before acting. You begin to observe Claudius's behavior and look for signs of guilt.",
                character: 'hamlet',
                choices: [
                    { text: "Watch Claudius during prayer", next: 'prayer_scene', path: 'observant' },
                    { text: "Question your mother about the marriage", next: 'question_mother', path: 'familial' },
                    { text: "Set up a trap to catch Claudius", next: 'trap_set', path: 'strategic' }
                ],
                educational: "Hamlet's methodical approach shows his intelligence and moral complexity. He wants justice, not just revenge."
            },
            confide_ophelia: {
                text: "You confide in Ophelia about your suspicions. She is shocked but promises to help you. However, her father Polonius overhears your conversation.",
                character: 'ophelia',
                choices: [
                    { text: "Ask Ophelia to keep your secret", next: 'secret_keeping', path: 'trust' },
                    { text: "Use Ophelia to mislead Polonius", next: 'mislead', path: 'deceptive' },
                    { text: "Break off the relationship to protect her", next: 'break_off', path: 'sacrificial' }
                ],
                educational: "Ophelia becomes a pawn in the political games between Hamlet and the court. Her tragedy is that she's caught between conflicting loyalties."
            },
            push_away: {
                text: "You push Ophelia away, telling her harshly to 'get thee to a nunnery.' She is devastated, but you believe you're protecting her from the dangerous truth.",
                character: 'ophelia',
                choices: [
                    { text: "Continue to push her away", next: 'continue_push', path: 'harsh' },
                    { text: "Apologize and explain your reasons", next: 'apologize', path: 'compassionate' },
                    { text: "Watch her from a distance", next: 'watch_distance', path: 'protective' }
                ],
                educational: "Hamlet's treatment of Ophelia is one of the most controversial aspects of the play. Some see it as cruelty, others as protection."
            },
            pretend: {
                text: "You pretend everything is fine, but your inner turmoil grows. You begin to act strangely, leading others to believe you're going mad.",
                character: 'hamlet',
                choices: [
                    { text: "Embrace the madness as a strategy", next: 'embrace_madness', path: 'strategic' },
                    { text: "Try to control your emotions", next: 'control_emotions', path: 'disciplined' },
                    { text: "Seek help from a counselor", next: 'seek_help', path: 'therapeutic' }
                ],
                educational: "The question of whether Hamlet is truly mad or merely pretending is central to the play's interpretation."
            },
            confront_friends: {
                text: "You confront Rosencrantz and Guildenstern about their betrayal. They admit they were sent by Claudius but claim they're trying to help you.",
                character: 'hamlet',
                choices: [
                    { text: "Forgive them and work together", next: 'forgive_friends', path: 'forgiving' },
                    { text: "Use them to feed false information to Claudius", next: 'use_false_info', path: 'manipulative' },
                    { text: "Cut all ties with them", next: 'cut_ties', path: 'isolationist' }
                ],
                educational: "Friendship and loyalty are tested throughout the play. Hamlet must navigate a world where trust is a luxury."
            },
            use_friends: {
                text: "You decide to use Rosencrantz and Guildenstern to gather information about Claudius's plans. You feed them false information about your mental state.",
                character: 'hamlet',
                choices: [
                    { text: "Tell them you're planning to leave Denmark", next: 'false_departure', path: 'deceptive' },
                    { text: "Claim you're in love with Ophelia", next: 'false_love', path: 'romantic_deception' },
                    { text: "Pretend to be completely mad", next: 'false_madness', path: 'strategic_madness' }
                ],
                educational: "Hamlet's intelligence is shown through his ability to manipulate others while gathering information."
            },
            trust_horatio: {
                text: "You decide to trust only Horatio, your most loyal friend. Together, you plan to investigate Claudius's guilt and find a way to expose him.",
                character: 'hamlet',
                choices: [
                    { text: "Plan the play-within-a-play with Horatio", next: 'plan_play', path: 'collaborative' },
                    { text: "Have Horatio spy on Claudius", next: 'horatio_spy', path: 'investigative' },
                    { text: "Share your suspicions about the ghost", next: 'share_ghost', path: 'open' }
                ],
                educational: "Horatio represents the ideal friend - loyal, intelligent, and trustworthy. He serves as Hamlet's confidant and moral compass."
            },
            play_immediate: {
                text: "You immediately stage the play 'The Mousetrap' that reenacts your father's murder. As the poison is poured into the sleeping king's ear, Claudius rises in agitation and leaves the room!",
                character: 'hamlet',
                choices: [
                    { text: "Follow Claudius and confront him", next: 'confront_claudius', path: 'confrontational' },
                    { text: "Celebrate with Horatio", next: 'celebrate', path: 'triumphant' },
                    { text: "Plan your next move carefully", next: 'plan_next', path: 'strategic' }
                ],
                educational: "The play-within-a-play is a brilliant moment of dramatic irony. The audience knows what's happening while the characters react to the 'fiction.'"
            },
            play_wait: {
                text: "You decide to wait for the perfect moment to stage your play. You spend time observing Claudius's behavior and planning your strategy.",
                character: 'hamlet',
                choices: [
                    { text: "Wait for a royal gathering", next: 'royal_gathering', path: 'patient' },
                    { text: "Stage it during a private audience", next: 'private_audience', path: 'intimate' },
                    { text: "Use it as a distraction for another plan", next: 'distraction', path: 'complex' }
                ],
                educational: "Timing is crucial in Hamlet. The play explores how the right moment can make all the difference in achieving justice."
            },
            direct_confront: {
                text: "You decide to confront Claudius directly about the murder. You find him alone in his chambers and accuse him of killing your father.",
                character: 'hamlet',
                choices: [
                    { text: "Demand a confession", next: 'demand_confession', path: 'direct' },
                    { text: "Present your evidence", next: 'present_evidence', path: 'logical' },
                    { text: "Challenge him to a duel", next: 'challenge_duel', path: 'honorable' }
                ],
                educational: "Direct confrontation is risky but honest. Hamlet must balance his desire for truth with the political realities of the court."
            },
            // Continue with more scenes...
            confront_claudius: {
                text: "You follow Claudius to his private chambers where he's trying to pray. You have your sword drawn and could easily kill him, but you hesitate...",
                character: 'hamlet',
                choices: [
                    { text: "Kill him now while he's vulnerable", next: 'kill_claudius', path: 'vengeful' },
                    { text: "Wait - he's praying and would go to heaven", next: 'wait_prayer', path: 'strategic' },
                    { text: "Confront him with words instead", next: 'verbal_confront', path: 'diplomatic' }
                ],
                educational: "This is one of the most famous scenes in Hamlet. His hesitation shows his moral complexity and fear of sending Claudius to heaven."
            },
            kill_claudius: {
                text: "You strike Claudius down! However, in doing so, you've committed regicide and must face the consequences. The court is in chaos...",
                character: 'hamlet',
                choices: [
                    { text: "Flee the country immediately", next: 'flee_country', path: 'exile' },
                    { text: "Try to explain your actions", next: 'explain_actions', path: 'justification' },
                    { text: "Accept your fate", next: 'accept_fate', path: 'resigned' }
                ],
                educational: "This path shows the consequences of taking direct action. Even justified revenge has complex moral and political implications."
            },
            wait_prayer: {
                text: "You decide to wait for a better moment when Claudius is engaged in sinful activity. You want him to go to hell, not heaven. You leave him to his prayers.",
                character: 'hamlet',
                choices: [
                    { text: "Wait for him to commit another sin", next: 'wait_sin', path: 'patient' },
                    { text: "Find him with your mother", next: 'find_mother', path: 'familial' },
                    { text: "Plan a more elaborate revenge", next: 'elaborate_revenge', path: 'complex' }
                ],
                educational: "Hamlet's reasoning shows his deep religious beliefs and his desire for true justice, not just revenge."
            },
            // Add more branching paths...
            final_scene: {
                text: "The story reaches its climax as all the plot threads converge. Your choices have led to this moment - will you find peace, justice, or tragedy?",
                character: 'hamlet',
                choices: [
                    { text: "Begin a new journey", next: 'start', path: 'restart' },
                    { text: "Explore different paths", next: 'path_selection', path: 'exploration' }
                ],
                educational: "Hamlet is a tragedy, but it's also a story about human nature, choice, and the consequences of our actions."
            }
        };
    }

    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Character click events
        document.getElementById('character-image').addEventListener('click', () => {
            this.showCharacterModal(this.gameState.character);
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', this.closeModal);
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('character-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    makeChoice(choiceIndex) {
        const currentScene = this.storyData[this.currentScene];
        if (!currentScene || !currentScene.choices[choiceIndex - 1]) {
            console.error('Invalid choice or scene');
            return;
        }

        const choice = currentScene.choices[choiceIndex - 1];
        this.gameState.choices.push(choice);
        this.gameState.path = choice.path;
        this.currentScene = choice.next;

        // Update act and scene based on story progression
        this.updateGameState();

        this.updateDisplay();
        this.showEducationalContent();
    }

    updateGameState() {
        // Simple progression system
        if (this.currentScene.includes('confront') || this.currentScene.includes('kill')) {
            this.gameState.act = 3;
            this.gameState.scene = 3;
        } else if (this.currentScene.includes('play') || this.currentScene.includes('ghost')) {
            this.gameState.act = 2;
            this.gameState.scene = 2;
        }
    }

    updateDisplay() {
        const currentScene = this.storyData[this.currentScene];
        if (!currentScene) {
            console.error('Scene not found:', this.currentScene);
            return;
        }

        // Update character
        this.gameState.character = currentScene.character;
        const character = this.characters[currentScene.character];
        
        document.getElementById('character-image').src = character.image;
        document.getElementById('character-name').textContent = character.name;
        document.getElementById('character-description').textContent = character.description;

        // Update story text
        document.getElementById('story-text').textContent = currentScene.text;

        // Update choices
        const choicesContainer = document.getElementById('choices-section');
        choicesContainer.innerHTML = '';
        
        currentScene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(index + 1);
            choicesContainer.appendChild(button);
        });

        // Update stats
        document.getElementById('current-act').textContent = this.gameState.act;
        document.getElementById('current-scene').textContent = this.gameState.scene;
        document.getElementById('current-path').textContent = this.gameState.path;

        // Add animation
        document.getElementById('story-text').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('story-text').classList.remove('fade-in');
        }, 800);
    }

    showCharacterModal(characterKey) {
        const character = this.characters[characterKey];
        if (!character) return;

        document.getElementById('modal-character-name').textContent = character.name;
        document.getElementById('modal-character-info').innerHTML = `
            <p><strong>Description:</strong> ${character.description}</p>
            <p><strong>Key Themes:</strong> ${character.themes.join(', ')}</p>
            <p><strong>Role in Play:</strong> ${this.getCharacterRole(characterKey)}</p>
        `;
        
        document.getElementById('character-modal').style.display = 'block';
    }

    getCharacterRole(characterKey) {
        const roles = {
            hamlet: 'The protagonist and Prince of Denmark, struggling with revenge and moral questions.',
            ophelia: 'Hamlet\'s love interest, caught between loyalty to her father and love for Hamlet.',
            claudius: 'The antagonist, Hamlet\'s uncle who murdered his brother to become king.',
            ghost: 'The spirit of King Hamlet, seeking revenge for his murder.',
            gertrude: 'Hamlet\'s mother, torn between her son and new husband.'
        };
        return roles[characterKey] || 'A character in Shakespeare\'s Hamlet.';
    }

    closeModal() {
        document.getElementById('character-modal').style.display = 'none';
    }

    showEducationalContent() {
        const currentScene = this.storyData[this.currentScene];
        if (currentScene.educational) {
            document.getElementById('educational-content').innerHTML = `
                <p><strong>Educational Note:</strong> ${currentScene.educational}</p>
                <p><strong>Current Path:</strong> ${this.gameState.path}</p>
                <p><strong>Key Themes:</strong> ${this.getCurrentThemes()}</p>
            `;
        }
    }

    getCurrentThemes() {
        const themes = {
            revenge: 'Revenge, Justice, Morality',
            detective: 'Investigation, Truth, Suspicion',
            passive: 'Acceptance, Resignation, Status Quo',
            social: 'Friendship, Loyalty, Betrayal',
            romantic: 'Love, Relationships, Trust',
            protective: 'Care, Sacrifice, Responsibility',
            deceptive: 'Deception, Strategy, Manipulation'
        };
        return themes[this.gameState.path] || 'Choice, Consequence, Human Nature';
    }

    saveGame() {
        const saveData = {
            currentScene: this.currentScene,
            gameState: this.gameState,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('hamletGameSave', JSON.stringify(saveData));
        alert('Game saved successfully!');
    }

    loadGame() {
        const saveData = localStorage.getItem('hamletGameSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.currentScene = data.currentScene;
            this.gameState = data.gameState;
            this.updateDisplay();
            alert('Game loaded successfully!');
        } else {
            alert('No save data found!');
        }
    }

    restartGame() {
        if (confirm('Are you sure you want to restart? All progress will be lost.')) {
            this.currentScene = 'start';
            this.gameState = {
                act: 1,
                scene: 1,
                path: 'main',
                choices: [],
                character: 'hamlet',
                mood: 'contemplative'
            };
            this.updateDisplay();
        }
    }

    showHint() {
        const currentScene = this.storyData[this.currentScene];
        if (currentScene.educational) {
            alert(`Hint: ${currentScene.educational}`);
        } else {
            alert('No hint available for this scene. Trust your instincts!');
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.hamletGame = new HamletGame();
});

// Global functions for HTML onclick events
function makeChoice(choiceIndex) {
    window.hamletGame.makeChoice(choiceIndex);
}

function saveGame() {
    window.hamletGame.saveGame();
}

function loadGame() {
    window.hamletGame.loadGame();
}

function restartGame() {
    window.hamletGame.restartGame();
}

function showHint() {
    window.hamletGame.showHint();
}

function closeModal() {
    window.hamletGame.closeModal();
}