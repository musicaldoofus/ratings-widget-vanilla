# Example usage

- setup

Download and include all files in the root folder (excluding index.html).

- ./index.html

Below the body, add:

```
<script src="./ratingsWidget.js"></script>
```

To add the star ratings widget to a 'card', add the following to the top-level div:

- Add the `.feedback` class
- Add the `data-feedback-object-id` attribute with the corresponding object id

```
<div class="col-xs-12 col-md-4 feedback" data-feedback-object-id="1">
    <a href="#" style="text-decoration: none;">
        <div class="bucket">
            ...
```

Example -> https://github.com/musicaldoofus/ratings-widget-vanilla/blob/master/index.html#L81

- ./constants.js

```
const API_CONSTANTS = {
    GET_ENDPOINT: ${your_get_endpoint},
    PUT_ENDPOINT: ${your_get_endpoint},
};
```