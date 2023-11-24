import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Header from '../components/Header';

const Home = () => {
  const [kumlaMenu, setKumlaMenu] = useState<string[]>([]);
  const [silveradoMenu, setSilveradoMenu] = useState<string[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const kumlaResponse = await axios.get('https://www.kumlaherrgard.se/menyer-och-catering/lunch/');
      const silveradoResponse = await axios.get('https://silverado.gastrogate.com/lunch-buffe/');

      const kumlaData = cheerio.load(kumlaResponse.data);
      const silveradoData = cheerio.load(silveradoResponse.data);

      // Parse the HTML data using cheerio and push it to the state
      // The selectors used here are placeholders, replace them with the actual selectors from the websites
      kumlaData('.menu-item').each((index, element) => {
        setKumlaMenu(oldArray => [...oldArray, kumlaData(element).text()]);
      });

      silveradoData('.menu-item').each((index, element) => {
        setSilveradoMenu(oldArray => [...oldArray, silveradoData(element).text()]);
      });
    };

    fetchMenus();
  }, []);

  return (
    <div className="p-4">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Kumla Herrgård Menu</h2>
          {kumlaMenu.map((item, index) => (
            <p key={index} className="mb-1">{item}</p>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Silverado Menu</h2>
          {silveradoMenu.map((item, index) => (
            <p key={index} className="mb-1">{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;