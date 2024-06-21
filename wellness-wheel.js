export default (() => {
    const wellnessWheel = document.querySelector('#wellness-wheel');
    const wheel = document.querySelector('#wheel');
    const wheelList = document.querySelector('#wheel ul');
    const tabContainer = document.querySelector('#tab-content');
    const closeBtn = tabContainer.querySelector('.close');

    const addSelectionListener = (element, handler) => {
        element.addEventListener('click', handler);
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handler();
            }
        });
    }


    const openTab = (id) => {
        tabContainer.classList.add('open');
        wellnessWheel.attributes['data-expansion-state'].value = 'open';
        tabContainer.attributes['data-expansion-state'].value = 'open';
        tabContainer.attributes['data-content-id'].value = id;
        for (const elem of tabContainer.children) {
            if (elem.id.toLowerCase() === id.toLowerCase()) {
                elem.classList.add('active');
                // window.location.hash = id;

                tabContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
                tabContainer.focus();
            } else {
                elem.classList.remove('active');
            }
        }
    }

    const closeTab = () => {
        wellnessWheel.attributes['data-expansion-state'].value = 'closed';
        tabContainer.attributes['data-expansion-state'].value = 'closed';
        tabContainer.attributes['data-content-id'].value = '';
        tabContainer.classList.remove('open');
        for (const elem of tabContainer.children) {
            elem.classList.remove('active');
        }
        // window.location.hash = '';
        wellnessWheel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }

    const open = () => {
        wheel.classList.add('open');
    }

    const __init__ = () => {
        closeBtn.addEventListener('click', closeTab);
        setTimeout(open, 800);


        for (const elem of wheelList.children) {
            addSelectionListener(elem, () => {
                const id = elem.attributes['data-id'].value;
                openTab(id);
            });
        }


        const hash = window.location.hash.toLowerCase();
        if (hash && hash != '#content-wrap') {
            const id = hash.replace('#', '');
            openTab(id);
        }
    }





    document.addEventListener('DOMContentLoaded', __init__);
})();