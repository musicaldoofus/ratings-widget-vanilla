const API_CONSTANTS = {
    GET_ENDPOINT: '',
    PUT_ENDPOINT: ''
};

const el = (type) => document.createElement(type ? type : 'div');

const createWidgetContainer = ({avgRating, userRating, amtResponses}, feedbackElement) => {
    const widgetContainer = el();
    widgetContainer.classList.add('feedback-widget-container');
    const starContainer = el();
    starContainer.classList.add('star-container');
    for (let i = 0; i <= 4; i++) {
        const wStar = el('span');
        wStar.classList.add('ratings-star');
        wStar.classList.add(i <= (avgRating - 1) ? 'active' : 'inactive');
        wStar.addEventListener('click', () => {
            //placeholder until we have a valid PUT endpoint
            /*
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if ( this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);
                }
            }
            xhttp.open('PUT', API_CONSTANTS.PUT_ENDPOINT);
            xhttp.send();
            */
            //this is a hack until we have a valid PUT endpoint for this user's activity (or another reliable way to detect - until then LS or IndexDB should be fine)
            localStorage.setItem(feedbackElement.dataset.feedbackObjectId, i + 1);
            const emM = document.querySelector('.user-rating-message');
            emM.innerHTML = `Your rating: ${i + 1}/5 stars`;
            emM.append(el('br'));
            emM.append('Click to submit another rating');
            const amtRM = document.querySelector('.amt-responses-message');
            amtRM.innerHTML = `(${amtResponses + 1})`
        });
        starContainer.append(wStar);
    }
    const amtResponsesMessage = el('span');
    amtResponsesMessage.classList.add('amt-responses-message');
    amtResponsesMessage.append('('.concat(amtResponses).concat(')'));
    starContainer.append(amtResponsesMessage);
    widgetContainer.append(starContainer);
    const messageContainer = el('div');
    messageContainer.classList.add('message-container');
    const message = userRating ? `Your rating: ${userRating}/5 stars` : 'Select to submit a rating';
    const emMessage = el('em');
    emMessage.classList.add('user-rating-message')
    emMessage.append(message);
    if (userRating) {
        emMessage.append(el('br'));
        const submitAgainText = el('span');
        submitAgainText.append('Click to submit another rating');
        emMessage.append(submitAgainText);
    }
    messageContainer.append(emMessage);
    widgetContainer.append(messageContainer);
    feedbackElement.append(widgetContainer);
}

const onSuccess = (data, feedbackElement) => {
    const parsedData = JSON.parse(data);
    createWidgetContainer(parsedData, feedbackElement);
}

const onFailure = (err) => {
    console.error(err);
}

const getRatings = (objId) => {
    return new Promise((resolve, reject) => {
        //use code below with a valid API endpoint that returns a JSON payload of the average score for this objectId
        //to extend for the future: when the page loads, and the first script crawls the page (getting 'feedbackElements'), compose a single API request of all objectIds from the page (to reduce network calls and control any inconsistent behavior or incorrect HTML data attributes etc.)
        /*
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log('xhttp success', typeof this.response, this.response);
                resolve(JSON.parse(this.response));
            }
        };
        xhttp.open('GET', API_CONSTANTS.GET_ENDPOINT);
        xhttp.send();
        */
    //below is a mock response as an arbitrary value while waiting for valid GET endpoint
        const response = {
            avgRating: 4.33,
            amtResponses: 217,
            userRating: localStorage.getItem(objId) //hack for now - this may need to come from a separate API (dependent on backend model)
        }
        resolve(JSON.stringify(response));
    });
}

const attachFeedbackWidget = (feedbackElement) => {
    const objId = feedbackElement.dataset.feedbackObjectId; //exposing the data-* attribute
    getRatings(objId)
        .then(data => onSuccess(data, feedbackElement))
        .catch(onFailure);
}

(() => {
    const cssLink = document.createElement('link');
    cssLink.setAttribute('type', 'text/css');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', './styles.css');
    document.head.append(cssLink);

    const feedbackElements = document.getElementsByClassName('feedback');

    Object.keys(feedbackElements).forEach(elem => attachFeedbackWidget(feedbackElements[elem]));
})();