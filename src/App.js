import "./reset.css";
import "./App.css";

import { useEffect, useState, useId } from "react";

import nlp from "compromise";
import init from "./cyk";

function App() {
  const [inputValue, setInputValue] = useState();
  const [res, setRes] = useState();
  const [wordsArr, setWordsArr] = useState();

  const [stringNumber, setStringNumber] = useState(
    "ninety five thousand and fifty two"
  );
  const [numberToAdd, setNumberToAdd] = useState(0);
  const [resNumber, setResNumber] = useState();

  console.log(wordsArr);

  function changeIt() {
    let doc = nlp(inputValue);
    setRes(doc.sentences().toPastTense().text());
    doc.document.map((el) => setWordsArr(el));
  }

  function addNumberToString() {
    let doc = nlp(stringNumber);
    setResNumber(doc.numbers().add(numberToAdd).text());
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <h2 className="app-title">Введите Ваше предложение:</h2>
          <div style={{ display: "flex" }}>
            <input
              className="app-input"
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button className="app-button" onClick={() => changeIt()}>
              Сделай в прошедшем
            </button>
          </div>
        </div>

        <div className="info-block">
          <div className="result-container">
            <h2 className="app-title">Результат:</h2>
            <div className="result">{res}</div>
          </div>
          <div className="table-wrapper">
            {wordsArr && (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th data-type="text-short">
                        Слово <span className="resize-handle"></span>
                      </th>
                      <th data-type="text-short">
                        Часть речи <span className="resize-handle"></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordsArr?.map((el) => (
                      <tr>
                        <td>{el.text}</td>
                        <td>{el.chunk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="container">
            <h2 className="app-title">Прибавь число к предложению:</h2>
            <div style={{ display: "flex" }}>
              <input
                className="app-input"
                defaultValue={stringNumber}
                onChange={(e) => setStringNumber(e.target.value)}
              />
              <input
                className="app-input"
                type="number"
                style={{ width: 80, marginLeft: 10 }}
                defaultValue={numberToAdd}
                onChange={(e) => setNumberToAdd(e.target.value)}
              />

              <button
                className="app-button"
                onClick={() => addNumberToString()}
              >
                Прибавить
              </button>
            </div>
          </div>
          <div className="info-block">
            <div className="result-container">
              <h2 className="app-title">Результат:</h2>
              <div className="result">{resNumber}</div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => init()}> press me</button>
    </div>
  );
}

export default App;
