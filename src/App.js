import logo from './logo.svg';
import './App.css';
const { JWK, JWE, parse } = require("node-jose");

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAwiSxcx5xFsNCjfDTOXz0M6RivgPXTTKb/PH6/x4vYl1xg/vI
rG1yDGyFuyAizxNaGtA+qo2CvM3iATyDWQg3/8vDWiD4cIvUD2WE3XXewjyeGzQs
o26DceRxopI2tlSgvznjifetGCp+oj4BWrTCqLF1AsR2ioUS7vuXMlpxXFhJfyEG
oWuQaZDwoz7CZv1KrQwlRTtkqtn4IeXpVcgWhg/1r0iRsvNJDokyiMVY8hrrvza2
j31JGaKYqCNYSC8Jf5EV7ONQhYGgQeRVxn8jS8UhLOFXDdNtgHwKi02tF1bmb3Ko
/s3vzPvFB8C7CsYRtHAzcx/xor2/CbT0QGYfUQIDAQABAoIBADgdoQj0UJ3SvKcI
aBViz7cpmbzwoUfYDAx16SXalLmq5sfOfDeSvvdmWtU2ubj/D/lWHfbwRkzKebv/
wLt4S69tNz8S7pyhXh9BKcFVc5jTKqQUVZ67r9S4wjvKZXQYTApZ8jIL3AVzKv08
TOnp+6YE/RxaqyToyAs5v383czLMdSM9bThDw+IZHfKFcl2iyUI4XVaPLDZPzUlG
MW13ypwFQXbdro9pnMs9v2573WumIVvbiLqIdxK1anag0KbCnCY2hDmoLNv7Mohz
1pFiqEStI6DQsYfEm/geIIL9nLhA8QJ28B9DtLKqRN7oWl2w5BiMEDCrmVK/4niM
lsqF1ZECgYEA5zVsjoJzRCBgZ5dRx9BOu9MKXQ+h00LS3+JaApEzW+QV0DplTvb5
aRUHhTIhUig2WdQVrEiBVXKg9eYmOBXOpX5pgDO5XJ16KcjdHcwMwoYAcUPIT5Y2
tMgoX+jCgTt95cnLKhAnSlH9cCyq+nmcdfDNuvNx8HJO7P33MaVDHCUCgYEA1vXX
cBWM+sGkUxpJNwlgA8bO7xq2kpbM3gqa0z6SKQhxnnmPyoKsZSHdwQMUCKIWBLjU
n27STmXm2SblT1cT39MCED2t0U7N2D1KUQfZkFaN4gImF77iZBWIfDLObAom6JKg
gER0glakAjbDMKq90mVzrKrR6XsD3az+AJE1eL0CgYBbHKB04E9QD3ouGGFv3lTI
i3fQCHL676Bt/aL+0/1rPsyhzAFURtsuX80g3gpnd9VDPOJ1i/T7mTp47IMvItjW
OqSUks1/A8e6Y59POLPmjCvsdoufYVCZmS7f7LeJeco5HXZkUw1Iqlq3M8MFBZt0
lrpb68eAu2sC1WnuNHPnyQKBgQC1LFb7vO4pmnOpJwp2PIyUIkfe9qDSRA8/Rajg
Smhd9SPt8X7jq+cpBbYlKzcDX7k3GaD7DyhpszEx7LpweG/jwbCHh7SsKMMNcfrk
+LzCDnFe/3ijotqkiBGUvC2GmbfZZVupQAkCoYtx4j35Eq8SWTd5XC+3nVrQxzD9
wWVT8QKBgBylVSsVeU7H/RT3RZ/qgWnpllBzGJic8X6lfyTHVD/9dO9XMzuD7R+/
VFc9Ib71QPzyq39BX+YiCI+xwDGARgO3GGA4vxvF46Tq0rYUpZ1LiC4raO4I5xrl
NxZCLVlhLWU27FR7xu8YN18mRCCwz1FCcsEtNU4nrBK2IIIwGLCf
-----END RSA PRIVATE KEY-----`;

const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwiSxcx5xFsNCjfDTOXz0M6RivgPXTTKb/PH6/x4vYl1xg/vIrG1yDGyFuyAizxNaGtA+qo2CvM3iATyDWQg3/8vDWiD4cIvUD2WE3XXewjyeGzQso26DceRxopI2tlSgvznjifetGCp+oj4BWrTCqLF1AsR2ioUS7vuXMlpxXFhJfyEGoWuQaZDwoz7CZv1KrQwlRTtkqtn4IeXpVcgWhg/1r0iRsvNJDokyiMVY8hrrvza2j31JGaKYqCNYSC8Jf5EV7ONQhYGgQeRVxn8jS8UhLOFXDdNtgHwKi02tF1bmb3Ko/s3vzPvFB8C7CsYRtHAzcx/xor2/CbT0QGYfUQIDAQAB";

const publicKeyBackend = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAktn7eZ1lO2BTDi3GY6Ap
Uqma1w8DGVj/hgnxcDzlTkVg4qz28Y7957HupR/N+emI2v+nZSit0j6Mn1ZA7Zua
lfITOHozwDScIlzdseb50dKUi6ZIJBrOKWFBe1xwKCUbG8gMjALaXbFN2iuG0uil
J1U7WKC0cjJ8NfmzPyxePHZ+urSlPOWT3WGxm1bHExdZv4xFQ+U/oGgwqIP1DEtn
wjgMx5B0fTK+sTwQUegqk9YZTTOOCUcZPHGA2FTHIQeC1aemrqjJDEWbKSl+rRsZ
JdKA9xeKDxcYtrCD/SX1+2K4wGIgncXnNJJHvqEMsRxB8JEXxmGyccKdfj74OShR
owIDAQAB
-----END PUBLIC KEY-----`;

const makeKeys = async () => {
  const jwKeys = await Promise.all([
    JWK.asKey(privateKey, "pem"),
    JWK.asKey(publicKeyBackend, "pem")
  ]);
  let keystore = JWK.createKeyStore();
  await keystore.add(jwKeys[0]);
  await keystore.add(jwKeys[1]);
}

const encrypt = async (raw, publicKeyBackend, format = 'compact', contentAlg = "A256GCM", alg = "RSA-OAEP") => {
  let publicKey = await JWK.asKey(publicKeyBackend, "pem");
  const buffer = Buffer.from(JSON.stringify(raw))
  return await JWE.createEncrypt({ format: format, contentAlg: contentAlg, fields: { alg: alg } }, publicKey).update(buffer).final();
}

const decrypt = async (encryptedBody, privateKey) => {
  let keystore = JWK.createKeyStore();
  await keystore.add(await JWK.asKey(privateKey, "pem"));
  let outPut = parse.compact(encryptedBody);
  let decryptedVal = await outPut.perform(keystore);
  return Buffer.from(decryptedVal.plaintext).toString();
}

async function test() {
  let raw = {
    "id": 1,
    "name": "Bladimir",
    "lastname": "Minga"
  };
  makeKeys();
  //encrypt(raw, publicKeyBackend);

  fetch("http://localhost:8080/users/5",
    {
      method: "GET",
      headers: {
        "key": publicKey
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("Respuesta encriptada: ", json.data);
      decrypt(json.data, privateKey)
        .then((plainText) => {
          console.log("Datos en plano: ", plainText);
        });
    });

  let encriptData = await encrypt(raw, publicKeyBackend);

  fetch("http://localhost:8080/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "key": publicKey
      },
      body: JSON.stringify({ "data": encriptData })
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("Respuesta encriptada: ", json.data);
      decrypt(json.data, privateKey)
        .then((plainText) => {
          console.log("Datos en plano: ", plainText);
        });
    });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={test}>Probar</button>
      </header>
    </div>
  );
}

export default App;
