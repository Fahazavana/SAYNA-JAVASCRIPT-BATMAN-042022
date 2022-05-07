$(document).ready(function() {
    const quizz = [{
            question: "Quel est l’autre nom de l’Homme:Mystère ?",
            choix: {

                0: "Le Sphinx",

                1: "Saphir",

                2: "Le Joker",
            },
            correct: "",
        },

        {
            question: "Quelle est l’ancienne profession de Harley Quinn ",
            choix: {
                0: "Infirmière",
                1: "Psychiatre",
                2: "Dentiste"
            },
            correct: "",
        },

        {
            question: "Quel est l’objet fétiche de Double Face ?",
            choix: {
                0: "Une pièce",
                1: "Un livre",
                2: "Un couteau"
            },
            correct: "",
        },

        {
            question: "Quelle ville Batman défend-il ?",
            choix: {
                0: "Gotham City",
                1: "Starling City",
                2: "Hell’s Kitchen"
            },
            correct: "",
        },

        {
            question: "Tim Burtin a réalisé deux Batman, qui jouait Batman ",
            choix: {
                0: "Georges Clooney",
                1: "Val Kilmer",
                2: "Mickael Keaton"
            },
            correct: "",
        },

        {
            question: "Dans son premier Batman (1989) Jack Nicholson jouait :",
            choix: {
                0: "Le Pingouin",
                1: "L’Homme Mystère",
                2: "Le Joker"
            },
            correct: "",
        },

        {
            question: "Quel est le prénom des parents du jeune Bruce Wayne ?",
            choix: {


                0: "Thomas et Martha",

                1: "Elaine et Georges",

                2: "Martha et James",
            },
            correct: "",
        },

        {
            question: "Qui interprète le Joker en 2008 ?",
            choix: {
                0: "Heath Legder",
                1: "Haeth Ledger",
                2: "Heath Ledger"
            },
            correct: "",
        },

        {
            question: "En quelle année Robin fait il sa première apparition ",
            choix: {
                0: "1940",
                1: "1936",
                2: "1941"
            },
            correct: "",
        },

        {
            question: "Qui est la fille de Batman et Catwoman (Earth : 2) ? ",
            choix: {
                0: "Oracle",
                1: "Huntress",
                2: "Black Canary"
            },
            correct: "",
        },

        {
            question: "Qui est Jonathan Crane ?",
            choix: {
                0: "L’Épouvantail",
                1: "Le Joker",
                2: "Hugo Strange"
            },
            correct: "",
        },

        {
            question: "Batman c’est aussi le nom d’une ville en...",
            choix: {
                0: "Turquie",
                1: "Islande",
                2: "Allemagne"
            },
            correct: "",
        },

        {
            question: "Qui a produit Batman en 1964 ",
            choix: {
                0: "Stanley Kubrick",
                1: "Andy Warhol",
                2: "Peter Jackson"
            },
            correct: "",
        },

        {
            question: "Quel vilain apparaît pour la première fois dans le Batman 232 ?",
            choix: {
                0: "Ra’s al Ghul",
                1: "Poison Ivy",
                2: "Emma Watson"
            },
            correct: "",
        },

        {
            question: " Qui est l’interprète de Catwoman dans le nouveau Batman de Matt Reeves (2022) ?",
            choix: {

                0: "Gigi Hadid ",

                1: "Lola Iolani Momoa ",

                2: "Zoë Kravitz",
            },
            correct: "",
        },
    ];

    function setmultipleAttribute(element, attrs) {
        for (const key in attrs) {
            console.log(key)
            element.setAttribute(key, attrs[key]);
        }
    }

    function loadQuizz1() {
        let i;
        for (i = 0; i < quizz.length; i++) {
            const { question, choix } = quizz[i];
            let quest = document.createElement("div");
            let container = document.createElement("div");
            container.setAttribute("class", "quizz-container");
            quest.setAttribute("class", "quizz-title");
            container.appendChild(quest);
            quest.innerText = question;
            for (let j in choix) {
                var qcm = document.createElement("div");
                qcm.setAttribute("class", "qcm")
                let checkbox = document.createElement("input")
                setmultipleAttribute(checkbox, { "type": "checkbox", "id": `choix${i}-${j}`, "value": `${i}-${j}`, });
                qcm.appendChild(checkbox);
                let label = document.createElement("label")
                label.setAttribute("for", `choix${i}-${j}`);
                label.innerText = choix[j];
                qcm.appendChild(label);
                container.appendChild(qcm);
            }
            $("section#quizz1").append(container);
        }
    }
    loadQuizz1()


    /* On passe au suivant apres avoir clicker */
    $(".quizz-container").click(function(e) {
        let $next = $("~", this);
        if ($next.length > 0) {
            var offset = $($next).offset().top;
            $(document).scrollTop(offset);
        }

    })

});