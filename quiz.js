function submitQuiz() {
    const questions = document.querySelectorAll('.question');
    let totalQuestions = questions.length;
    let correctQuestions = 0;

    questions.forEach(question => {
        let questionCorrect = true;

        // Check if this is a dropdown gapword question
        if (question.dataset.type === 'dropdown') {
            const selects = question.querySelectorAll('select.gap');
            const correctAnswers = JSON.parse(question.dataset.answers);

            selects.forEach((select, idx) => {
                const parent = select.parentElement;

                if (select.value === correctAnswers[idx]) {
                    parent.classList.add('correct');
                } else {
                    parent.classList.add('incorrect');
                    questionCorrect = false;
                }

                // Disable dropdown after submission
                select.disabled = true;
            });

        } else {
            // Existing checkbox evaluation logic
            const checkboxes = question.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                const parent = checkbox.parentElement;
                const isCorrect = checkbox.dataset.correct === 'true';
                const isChecked = checkbox.checked;

                // Mark the option visually
                if (isChecked && isCorrect) {
                    parent.classList.add('correct');
                } else if (isChecked && !isCorrect) {
                    parent.classList.add('incorrect');
                    questionCorrect = false;
                } else if (!isChecked && isCorrect) {
                    parent.classList.add('correct');
                    questionCorrect = false;
                }

                // Disable checkbox after submission
                checkbox.disabled = true;
            });
        }

        if (questionCorrect) {
            correctQuestions++;
        }
    });

    // Calculate percentage
    const percentage = ((correctQuestions / totalQuestions) * 100).toFixed(1);

    // Display results
    document.getElementById('score').textContent = percentage + '%';
    document.getElementById('feedback').textContent =
        `You got ${correctQuestions} out of ${totalQuestions} questions completely correct.`;
    document.getElementById('results').classList.add('show');

    // Hide submit button
    document.querySelector('.submit-btn').style.display = 'none';

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Burger menu toggle - OUTSIDE of submitQuiz function
document.addEventListener('DOMContentLoaded', function () {
    // Create burger menu if it doesn't exist
    const navbar = document.querySelector('.navbar');
    if (navbar && !document.querySelector('.burger-menu')) {
        const burgerMenu = document.createElement('div');
        burgerMenu.className = 'burger-menu';
        burgerMenu.innerHTML = '<span></span><span></span><span></span>';
        navbar.insertBefore(burgerMenu, navbar.firstChild);
    }

    const burger = document.querySelector('.burger-menu');
    const navUl = document.querySelector('.navbar ul');

    if (burger && navUl) {
        burger.addEventListener('click', function () {
            this.classList.toggle('active');
            navUl.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                navUl.classList.remove('active');
            });
        });
    }
});