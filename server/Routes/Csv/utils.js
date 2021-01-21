
const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.substring(1);

const getSelectedLocations = (filters) => {

    let selectedLocation;

    if (filters.location) {

        const locations = Object.values(filters.location);

        const selected = locations.reduce((acc, element) => {
            if (element && typeof element === "string") {
                acc.push(element);
            }
            return acc;
        }, []);

        selectedLocation = selected.reduce((ac, el) => {
            return ac + "-" + el;
        });
    } else {
        selectedLocation = "All Locations";
    }

    return selectedLocation;
}

const getSelectedActivities = (filters) => {

    const selections = filters.email_activity;

    let selectedActivity;

    if(typeof selections !== 'object'){
        selectedActivity = selections === null ? 'All Companies' : capitalizeFirstLetter(selections)
    } else{
        if(selections.length > 1){
            selectedActivity = selections.reduce((ac, el) => {
                return capitalizeFirstLetter(ac) + "-" + capitalizeFirstLetter(el)
            })
        } else {
            selectedActivity = capitalizeFirstLetter(selections[0])
        }

    }
    return selectedActivity;
}

module.exports = {
    getSelectedLocations,
    getSelectedActivities
}
