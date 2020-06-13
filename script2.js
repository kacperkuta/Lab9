var el = document.querySelector('input[id=loginbut]');
var user = document.querySelector('input[type=username]');
var pas = document.querySelector('input[type=password]');


el.addEventListener('click', async _ => {
    try {
        console.log("click!");
        const response = await fetch('http://localhost:3000/login/' + user.value + '/' + pas.value, {
            method: 'post',
        });
        console.log("sent!")
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});

