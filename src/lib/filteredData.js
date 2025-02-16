




const getNestedValue = (obj, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const filterData = (data, filterStatus, searchId, searchKey, statusKey, matchWith) => {
    return data.filter((item) => {
        const itemStatus = item[statusKey] ? item[statusKey].toLowerCase() : ""; // Dynamically access the status key
        const filterStatusLower =
            filterStatus && filterStatus.toLowerCase() !== matchWith
                ? filterStatus.toLowerCase()
                : "";

        const matchesStatus =
            filterStatusLower === "" || itemStatus === filterStatusLower;
        const matchesId = searchId ? (getNestedValue(item, searchKey) || "").includes(searchId) : true;

        return matchesStatus && matchesId;
    });
};
