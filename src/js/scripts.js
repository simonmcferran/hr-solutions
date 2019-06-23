
function scrollPageTo (to, duration=500) {
    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    const easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function() {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

const buttonClick = (target) => {
    window.scrollPageTo(target, 400)
};

const clientClick = (i, client ) => {
    console.log(client);
    const currClassList = i.classList;
    const arrQuote = Array.from(document.getElementsByClassName('client-quote-item'));
    const arrLogo = Array.from(document.getElementsByClassName('buttonInvisible'));
    if (!currClassList.contains('is-active')) {
        stripActive(arrLogo);
        currClassList.add('is-active');
    }
    setActiveQuote(arrQuote, client);
};

const stripActive = (arrLogo) => {
    return [...arrLogo].filter(element => element.classList.remove('is-active'))
};

const setActiveQuote = (arrQuote, client) => {
    const el = document.getElementById(client);
    if (el && !el.classList.contains('is-active')) {
        [...arrQuote].filter(element => element.classList.remove('is-active'))
        el.classList.add('is-active');
    }
};

const today = new Date();

const thisYear = () => {
    document.write(`${today.getFullYear()}`);
};

