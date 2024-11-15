import { render, screen } from "@testing-library/react";
import Scoops from "."
import userEvent from '@testing-library/user-event';


/* 
! Seçiciler
? Method [All] BySeçici
* Method > get | find | query
* get > element başlangıçta DOM'da var ise kullanılır
* query > get ile bezner bir şekilde çalışır eleman bulamazsa null döndürür
* find > elementin ne zaman ekrana basılacağı belli değilse (async)

*not:  find methodu promise dödürür
* find - bu yüzden async await kullanılmalı

* eğer All kullanırsak gelen cevap her zaman dizi şeklindedir
*/

test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />);

    // ekrana basılan kartları al
    const images = await screen.findAllByAltText('çeşit-resim');

    // gelen resimlerin sayısı 1' den büyük mü ?
    expect(images.length).toBeGreaterThanOrEqual(1);
});


// ekleme ve sıfırlama butonlarının işlevselliği
test('Çeşit ekleme ve sıfır toplama etkisi', async () => {
    render(<Scoops />);
    const user = userEvent.setup();


    //1) Ekle ve Sıfırlama butonlarını çağırma
     const addButtons = await screen.findAllByRole('button', {
        name:'Ekle',
     });
     const delButtons = await screen.findAllByRole('button', {
        name:'Sıfırla',
     });

    //2) Toplam spanı Çağır
    const total = screen.getByRole('heading', {
        name: /çeşitler ücreti/i,
    });

    //3) Toplamın fiyatı 0'dır
     expect(total).toHaveTextContent(0);

    //4) Ekle butonlarından birine tıklanır
     await user.click(addButtons[0]);

    //5) Toplam fiyatı 20 olur
      expect(total).toHaveTextContent(20);

    //6) Farklı bir çeşitten iki tane daha eklenir
       await user.dblClick(addButtons[2]);
    
    //7) Toplam fiyat 60 olur
      expect(total).toHaveTextContent(60);
    
    //8) 1 tane ekleneni Sıfırla butonuna tıklanır
       await user.click(delButtons[0]);

    //9) Toplam fiyat 40 olur
      expect(total).toHaveTextContent(40);
    
    //10)2 tane eklenenin sıfırla butonuna tıklanır
      await user.click(delButtons[2]);

    //11) Toplam fiyat 0 olur
    expect(total).toHaveTextContent(0);
});

