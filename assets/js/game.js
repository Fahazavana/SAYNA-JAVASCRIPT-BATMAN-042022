$(document).ready(function () {
    const quizz = [
        {
            question: "Quel est l’autre nom de l’Homme:Mystère ?",
            choix: {
                0: "Le Sphinx",

                1: "Saphir",

                2: "Le Joker",
            },
            correct: 0,
        },

        {
            question: "Quelle est l’ancienne profession de Harley Quinn ",
            choix: {
                0: "Dentiste",
                1: "Infirmière",
                2: "Psychiatre",
            },
            correct: 2,
        },

        {
            question: "Quel est l’objet fétiche de Double Face ?",
            choix: {
                0: "Un livre",
                1: "Une pièce",
                2: "Un couteau",
            },
            correct: 1,
        },

        {
            question: "Quelle ville Batman défend-il ?",
            choix: {
                0: "Gotham City",
                1: "Starling City",
                2: "Hell’s Kitchen",
            },
            correct: 0,
        },

        {
            question: "Tim Burtin a réalisé deux Batman, qui jouait Batman ",
            choix: {
                0: "Val Kilmer",
                1: "Mickael Keaton",
                2: "Georges Clooney",
            },
            correct: 1,
        },

        {
            question: "Dans son premier Batman (1989) Jack Nicholson jouait :",
            choix: {
                0: "L’Homme Mystère",
                1: "Le Pingouin",
                2: "Le Joker",
            },
            correct: 2,
        },

        {
            question: "Quel est le prénom des parents du jeune Bruce Wayne ?",
            choix: {
                0: "Elaine et Georges",
                1: "Thomas et Martha",
                2: "Martha et James",
            },
            correct: "",
        },

        {
            question: "Qui interprète le Joker en 2008 ?",
            choix: {
                0: "Heath Legder",
                1: "Haeth Ledger",
                2: "Heath Ledger",
            },
            correct: 2,
        },

        {
            question: "En quelle année Robin fait il sa première apparition ",
            choix: {
                0: "1940",
                1: "1936",
                2: "1941",
            },
            correct: 1,
        },

        {
            question: "Qui est la fille de Batman et Catwoman (Earth : 2) ? ",
            choix: {
                0: "Oracle",
                1: "Huntress",
                2: "Black Canary",
            },
            correct: 1,
        },

        {
            question: "Qui est Jonathan Crane ?",
            choix: {
                0: "L’Épouvantail",
                1: "Le Joker",
                2: "Hugo Strange",
            },
            correct: 0,
        },

        {
            question: "Batman c’est aussi le nom d’une ville en...",
            choix: {
                0: "Turquie",
                1: "Islande",
                2: "Allemagne",
            },
            correct: 0,
        },

        {
            question: "Qui a produit Batman en 1964 ",
            choix: {
                0: "Stanley Kubrick",
                1: "Andy Warhol",
                2: "Peter Jackson",
            },
            correct: 1,
        },

        {
            question:
                "Quel vilain apparaît pour la première fois dans le Batman 232 ?",
            choix: {
                0: "Ra’s al Ghul",
                1: "Poison Ivy",
                2: "Emma Watson",
            },
            correct: 0,
        },

        {
            question:
                " Qui est l’interprète de Catwoman dans le nouveau Batman de Matt Reeves (2022) ?",
            choix: {
                0: "Gigi Hadid ",

                1: "Lola Iolani Momoa ",

                2: "Zoë Kravitz",
            },
            correct: 2,
        },
    ];

    let $resultat = {};

    function setmultipleAttribute(element, attrs) {
        for (const key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }

    function loadQuizz1() {
        let i;
        for (i = 0; i < quizz.length; i++) {
            const { question, choix } = quizz[i];
            let quest = document.createElement("div");
            let container = document.createElement("div");
            setmultipleAttribute(container, {
                class: "quizz-container",
                id: `quizz${i}`,
            });
            quest.setAttribute("class", "quizz-title");
            container.appendChild(quest);
            quest.innerText = question;
            for (let j in choix) {
                var qcm = document.createElement("div");
                qcm.setAttribute("class", "qcm");
                let checkbox = document.createElement("input");
                setmultipleAttribute(checkbox, {
                    type: "checkbox",
                    id: `qcm${i}${j}`,
                    value: `${j}`,
                    name: `quizz${i}`,
                });
                qcm.appendChild(checkbox);
                let label = document.createElement("label");
                label.setAttribute("for", `qcm${i}-${j}`);
                label.innerText = choix[j];
                qcm.appendChild(label);
                container.appendChild(qcm);
            }
            $("section#quizznum1").append(container);
        }
        $resultat = {};
    }
    loadQuizz1();

    /* On passe au suivant apres avoir clicker et on desactive*/
    function getQuizzId(quizzId) {
        let id = 0,
            tmp = "";
        for (var i = 5; i < quizzId.length; i++) {
            tmp += quizzId[i];
        }
        return parseInt(tmp, 10);
    }
    $(".quizz-container  input[type='checkbox']").click(function (e) {
        let $next = $(this).parent().parent().next();
        let $current = $(this);
        let reponse = {};
        let $nameVal = $current.attr("name");
        console.log(typeof $nameVal);
        let $quizzId = getQuizzId($nameVal);
        let $group = $(`input[name=${$nameVal}]`);
        for (let i = 0; i < $group.length; i++) {
            $($group[i]).attr("disabled", "true");
            if ($($group[i]).is(":checked")) {
                $resultat[$quizzId] = $($group[i]).val();
            }
        }

        let $resultLength = Object.keys($resultat).length;
        console.log(quizz.length, $resultLength, $resultat);
        if ($next.length > 0 && quizz.length !== $resultLength) {
            var offset = $($next).offset().top;
            $("html,body").animate({ scrollTop: offset }, 800);
        } else {
            if ($resultLength != quizz.length) {
                alert("Veuillez completer tout les reponse");
            } else {
                checkResult();
            }
        }

        function checkResult() {
            for (var i = 0; i < quizz.length; i++) {
                if (quizz[i].correct == $resultat[i]) {
                    $(`#quizz${i}`)
                        .find(`[value="${$resultat[i]}"]`)
                        .parent()
                        .addClass("correct");
                    console.log(i, "correct");
                } else {
                    $(`#quizz${i}`)
                        .find(`[value="${quizz[i].correct}"]`)
                        .parent()
                        .addClass("correct");
                    $(`#quizz${i}`)
                        .find(`[value="${$resultat[i]}"]`)
                        .parent()
                        .addClass("wrong");
                    console.log("wrong");
                }
            }
        }
    });
});
