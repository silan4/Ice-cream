import { render ,screen} from "@testing-library/react"
import userEvent  from '@testing-library/user-event';
import Toppings from ".";

test("API'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
  render (<Toppings/>);

  const images = await screen.findAllByAltText("sos-resim")
      
  expect(images.length).toBeGreaterThanOrEqual(1);
})

test("Sosları ekleme çıkarma işlemi toplam fiyatı etkiler ", async()=> {
   render(<Toppings/>);
   const user = userEvent.setup();
  
   // toplam ücret başlığı sıfır mı
   const total = screen.getByRole("heading",{
    name:/soslar ücreti/i,
  });

  expect(total).toHaveTextContent(0)

  // bütün sosların checbox'larını çağır
   const toppings = await screen.findAllByRole("checkbox");
  
   // soslardan birincisini sepete ekle
   await  user.click(toppings[0]);

   // total 3 e eşit mi?
   expect(total).toHaveTextContent(3);

   // soslardan üçüncüsünü sepete ekle
   await user.click(toppings[2]);

   // total 6'ya eşit mi?
   expect(total).toHaveTextContent(6);

   //soslardan birini kaldır
   await user.click(toppings[0]);

   //total 3'e eşit mi ?
   expect(total).toHaveTextContent(3);

   // soslardan birini kaldır
   await user.click(toppings[2]);

   // total 0'a eşit mi?
   expect(total).toHaveTextContent(0);
});