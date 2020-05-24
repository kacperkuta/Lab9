var el = document.querySelector('input[id=button]');
var priceel = document.querySelector('input[id=price]');
var nr = document.querySelector('h2').innerHTML;

    el.addEventListener('click', async _ => {
        try {
            const response = await fetch('http://localhost:3000/meme/' + nr + '/' + priceel.value, {
                method: 'post',
            });
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    });

