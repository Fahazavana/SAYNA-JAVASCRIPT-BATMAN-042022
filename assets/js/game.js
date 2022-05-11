$(document).ready(function () {
    /* const quizz = [
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
            correct: 1,
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
*/

    function setmultipleAttribute(element, attrs) {
        for (const key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }
    loadquizz = function () {
        $.ajax({
            url: "https://plankton-app-mj9br.ondigitalocean.app/questions/all",
            dataType: "json",
            success: function (quizz) {
                let i;
                for (i = 0; i < quizz.length; i++) {
                    const { question, response } = quizz[i];
                    let quest = document.createElement("div");
                    let container = document.createElement("div");
                    setmultipleAttribute(container, {
                        class: "quizz-container",
                        id: `quizz${i}`,
                    });

                    quest.setAttribute("class", "quizz-title");
                    container.appendChild(quest);
                    quest.innerText = question;
                    for (let j in response) {
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
                        label.setAttribute("for", `qcm${i}${j}`);
                        label.innerText = response[j].text;
                        qcm.appendChild(label);
                        container.appendChild(qcm);
                    }
                    $("section#quizznum1 > .quizz-wrapper").append(container);
                }
                drawLine();
                let $resultat = {};
                /* On passe au suivant apres avoir clicker et on desactive*/
                function getQuizzId(quizzId) {
                    let id = 0,
                        tmp = "";
                    for (var i = 5; i < quizzId.length; i++) {
                        tmp += quizzId[i];
                    }
                    return parseInt(tmp, 10);
                }

                $(".quizz-container  input[type='checkbox']").click(function (
                    e
                ) {
                    let $next = $(this).parent().parent().next();
                    let $current = $(this);
                    let $nameVal = $current.attr("name");
                    let $quizzId = getQuizzId($nameVal);
                    let $group = $(`input[name=${$nameVal}]`);
                    for (let i = 0; i < $group.length; i++) {
                        $($group[i]).attr("disabled", "true");
                        if ($($group[i]).is(":checked")) {
                            $resultat[$quizzId] = $($group[i]).val();
                        }
                    }

                    let $resultLength = Object.keys($resultat).length;
                    if ($next.length > 0 && quizz.length !== $resultLength) {
                        var offset = $($next).offset().top;
                        $("html,body").animate({ scrollTop: offset }, 800);
                    } else {
                        if ($resultLength != quizz.length) {
                            alert("Veuillez completer tout les reponse");
                        } else {
                            checkResult(quizz, $resultat);
                        }
                    }
                });
            },
            error: function () {
                console.log(" Impossible de Contacter le srveur");
            },
        });
    };
    loadquizz();
    function checkResult(quizz, $resultat) {
        let $good = 0,
            $bad = 0;
        for (var i = 0; i < quizz.length; i++) {
            if (quizz[i].response[$resultat[i]].isGood) {
                $(`#quizz${i}`)
                    .find(`[value="${$resultat[i]}"]`)
                    .parent()
                    .addClass("correct");
                $good++;
            } else {
                for (let j = 0; j < quizz[i].response.length; j++) {
                    if (quizz[i].response[j].isGood) {
                        $(`#quizz${i}`)
                            .find(`[value="${j}"]`)
                            .parent()
                            .addClass("correct");
                        break;
                    }
                }
                $(`#quizz${i}`)
                    .find(`[value="${$resultat[i]}"]`)
                    .parent()
                    .addClass("wrong");
                $bad++;
            }
        }
        $("#quizzresult .title").text("QUIZZ NIVEAUX 1");
        $(".bonne").text($good);
        $(".bad").text($bad);
        $("#quizzresult").slideToggle(600);
        $("html,body").animate(
            { scrollTop: `${$("#quizzresult").offset().top}` },
            600
        );
    }

    $(".button2.resetQuizz").click(function (e) {
        e.preventDefault();
        $("#quizzresult").slideToggle(600);
        $("section#quizznum1 > .quizz-wrapper").empty();
        $("html,body").animate(
            { scrollTop: `${$("section#quizznum1").offset().top}` },
            600
        );
        loadquizz();
    });

    // QUIZZ NUMERO 2
    loadQuizz2 = function () {
        $.ajax({
            url: "https://plankton-app-mj9br.ondigitalocean.app/questions/all",
            dataType: "json",
            success: function (quizz) {
                let i;
                for (i = 0; i < quizz.length; i++) {
                    const { question, response } = quizz[i];
                    let quest = document.createElement("div");
                    let container = document.createElement("div");
                    setmultipleAttribute(container, {
                        class: "quizz-container",
                        id: `quizz${i}`,
                    });

                    quest.setAttribute("class", "quizz-title");
                    container.appendChild(quest);
                    quest.innerText = question;
                    for (let j in response) {
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
                        label.setAttribute("for", `qcm${i}${j}`);
                        label.innerText = response[j].text;
                        qcm.appendChild(label);
                        container.appendChild(qcm);
                    }
                    $("section#quizznum2 > .quizz-wrapper").append(container);
                }
                drawLine();
                let $resultat = {};
                /* On passe au suivant apres avoir clicker et on desactive*/
                function getQuizzId(quizzId) {
                    let id = 0,
                        tmp = "";
                    for (var i = 5; i < quizzId.length; i++) {
                        tmp += quizzId[i];
                    }
                    return parseInt(tmp, 10);
                }

                $(".slider-quizz").fadeOut(500);
                $("#quizznum2 >.quizz-wrapper #quizz0.quizz-container").fadeIn(500);


                $(".quizz-container  input[type='checkbox']").click(function (
                    e
                ) {
                    let $thisParent = $(this).parent().parent()
                    let $next = $thisParent.next();
                    let $current = $(this);
                    let $nameVal = $current.attr("name");
                    let $quizzId = getQuizzId($nameVal);
                    let $group = $(`input[name=${$nameVal}]`);
                    for (let i = 1; i < $group.length; i++) {
                        $($group[i]).attr("disabled", "true");
                        if ($($group[i]).is(":checked")) {
                            $resultat[$quizzId] = $($group[i]).val();
                        }
                    }
                    let $resultLength = Object.keys($resultat).length;
                    if ($next.length > 0 && quizz.length !== $resultLength) {
                        $thisParent.fadeOut(500);
                        $next.fadeIn(500);
                    } else {
                        if ($resultLength != quizz.length) {
                            alert("Veuillez completer tout les reponse");
                        } else {
                            checkResult(quizz, $resultat);
                        }
                    }
                });
            },
            error: function () {
                console.log(" Impossible de Contacter le srveur");
            },
        });
    };

    $("#startQuizz2").click(function (e) {
        e.preventDefault();
        loadQuizz2();
    });
});
