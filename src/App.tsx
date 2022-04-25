import React, { useState } from 'react';
import style from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import {GridItem} from './componets/GridItem/GridItem';

import {levels, calculateImc, Level} from './helpers/imc';

const App = () => {
    const[heightField, setHeightField] = useState<number>(0);
    const[weightField, setWeightField] = useState<number>(0);
    const[toShow,setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {      
      if(heightField && weightField) {
        setToShow(calculateImc(heightField, weightField));
      }else {
        alert("Digite todos os campos");
      }
    }

    const handleBackButton = () => {
      setToShow(null);
      setHeightField(0);
      setWeightField(0);
    }

  return(
    <div className={style.main}>
      <header>
        <div className={style.headerContainer}>
          <img src={poweredImage} alt='' width={150}></img>
        </div>
      </header>
      <div className={style.container}> 
        <div className={style.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em métros).'
            value={heightField > 0 ? heightField: ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
          type="number"
          placeholder='Digite o seu peso. Ex: 70.5 (em KG).'
          value={weightField > 0 ? weightField: ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
        />

        <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={style.rightSide}>
          {!toShow &&
            <div className={style.grid}>
              {levels.map((item, key) => (
                <GridItem  key={key} item={item}/>
              ))}
          </div>
          }
          {toShow &&
            <div className={style.rightBig}>
              <div className={style.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item= {toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;