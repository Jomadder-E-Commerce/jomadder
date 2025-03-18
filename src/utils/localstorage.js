const getDataFromLocalStorage = (key) => {
  try {
    const data =  window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing data from Local Storage:", error);
    return null;
  }
};

const saveDataIntoLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data into Local Storage:", error);
  }
};

const addNewDataIntoLocalStorage = (key, data) => {
  
  try {
    const existingData = getDataFromLocalStorage(key)
      ? getDataFromLocalStorage(key)
      : [];
    console.log(existingData);
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error adding data into Local Storage:", error);
  }
};

const updateLocalStorageObject = (key, dataKey, dataValue) => {
  try {
    const existingData = getDataFromLocalStorage(key) || {};
    existingData[dataKey] = dataValue;
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error("Error adding data into Local Storage:", error);
  }
};

const updateLocalStorageArrayToObject = (key, dataKey, value, identifier) => {
  try {
    const existingData = getDataFromLocalStorage(key) || [];
    const updateData = existingData.map((single) => {
      if (single.id == identifier) {
        return {
          [dataKey]: value,
          ...single,
        };
      } else {
        return single;
      }
    });
    localStorage.setItem(key, JSON.stringify(updateData));
  } catch (error) {
    console.error("Error adding data into Local Storage:", error);
  }
};

const updateLocalStorageCartQuantity = (key, cartId, skuId, quantity) => {
  try {
    const existingData = getDataFromLocalStorage(key) || [];
    const updateData = existingData?.map((single) => {
      if (single.id == cartId) {
        return {
          ...single,
          skus: single?.skus?.map((singleSku) => {
            // console.log(skuId,quantity);
            // console.log(singleSku?.sku,quantity);
            // console.log(singleSku?.sku == skuId);
            if(singleSku?.sku == skuId) {
              return { ...singleSku, quantity: quantity };
            } 
            // if (singleSku?.sku == skuId) {
            //   return { ...singleSku, quantity: quantity };
            // } else {
            //   return singleSku;
            // }
           else{
            return {...singleSku}
           }
            
          }),
        };
      } else {
        return single;
      }
    });
    localStorage.setItem(key, JSON.stringify(updateData));
  } catch (error) {
    console.error("Error adding data into Local Storage:", error);
  }
};

const removeDataFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from Local Storage:", error);
  }
};


const removeOneDataFromLocalStorage = (key, dataKey) => {
  console.log(key, dataKey);
  try {
    const existingData = getDataFromLocalStorage(key)
      ? getDataFromLocalStorage(key)
      : [];
    console.log(existingData);
    const findData = existingData.filter((single) => single?.id != dataKey);
    console.log(findData);
    localStorage.setItem(key, JSON.stringify(findData));
  } catch (error) {
    console.error("Error removing data from Local Storage:", error);
  }
};

const findDataFromLocalStorage = (key, dataKey) => {
  try {
    const existingData = getDataFromLocalStorage(key)
      ? getDataFromLocalStorage(key)
      : [];
    console.log(existingData);
    const findData = existingData.find((single) => single?.id == dataKey);
    if (findData) {
      return findData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error removing data from Local Storage:", error);
  }
};
export {
  findDataFromLocalStorage,
  getDataFromLocalStorage,
  saveDataIntoLocalStorage,
  addNewDataIntoLocalStorage,
  removeDataFromLocalStorage,
  removeOneDataFromLocalStorage,
  updateLocalStorageObject,
  updateLocalStorageArrayToObject,
  updateLocalStorageCartQuantity,
};
