import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; //after time pass the promise will be rejected and changed by error 

export const getJSON = async function(url){
  try {
    const fetchPro = fetch(url);
    //loading recipe
    const rec = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //after time passe promise will be replaced by error
      // const rec = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e845a');
    const data = await rec.json();

    if(!rec.ok) throw new Error(`${data.message} (${rec.status})`);
    return data;
  } catch(err){
    throw err;
  }
};

export const sendJSON = async function(url, uploadData){
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });

    const rec = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //after time passe promise will be replaced by error
      // const rec = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e845a');
    const data = await rec.json();

    if(!rec.ok) throw new Error(`${data.message} (${rec.status})`);
    return data;
  } catch(err){
    throw err;
  }
};