document.addEventListener("DOMContentLoaded", function () {

    //original/vegan
    var versionButtons = document.getElementsByClassName("version-btn");

    for (var i = 0; i < versionButtons.length; i++) {
        versionButtons[i].onclick = function () {

            var card = this.parentElement;
            while (card && !card.classList.contains("recipe-card")) {
                card = card.parentElement;
            }

            if (!card) {
                return;
            }

            var buttons = card.getElementsByClassName("version-btn");
            var versions = card.getElementsByClassName("recipe-version");

            for (var j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }

            for (var k = 0; k < versions.length; k++) {
                versions[k].classList.remove("show");
            }

            this.classList.add("active");

            var targetId = this.getAttribute("data-target");
            var targetDiv = document.getElementById(targetId);

            if (targetDiv) {
                targetDiv.classList.add("show");
            }
        };
    }


    var recipeCards = document.getElementsByClassName("recipe-card");
    var prevBtn = document.getElementById("prevRecipe");
    var nextBtn = document.getElementById("nextRecipe");
    var counterSpan = document.getElementById("recipeCounter");
    var currentRecipeIndex = 0;

    function showRecipe(index) {
        if (recipeCards.length === 0) {
            return;
        }

        for (var i = 0; i < recipeCards.length; i++) {
            recipeCards[i].style.display = "none";
        }

        recipeCards[index].style.display = "block";

        if (counterSpan) {
            counterSpan.textContent = (index + 1) + " / " + recipeCards.length;
        }

        if (prevBtn) {
            prevBtn.disabled = (index === 0);
        }
        if (nextBtn) {
            nextBtn.disabled = (index === recipeCards.length - 1);
        }
    }

    showRecipe(currentRecipeIndex);

    if (nextBtn) {
        nextBtn.onclick = function () {
            if (currentRecipeIndex < recipeCards.length - 1) {
                currentRecipeIndex++;
                showRecipe(currentRecipeIndex);
            }
        };
    }

    if (prevBtn) {
        prevBtn.onclick = function () {
            if (currentRecipeIndex > 0) {
                currentRecipeIndex--;
                showRecipe(currentRecipeIndex);
            }
        };
    }

});