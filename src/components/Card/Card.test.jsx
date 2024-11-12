import { render, screen } from "@testing-library/react"
import Card from "."
import userEvent from '@testing-library/user-event';

const item = {
    name: 'Salted caramel',
    imagePath: '/images/salted-caramel.png',

}

const basket = [
    {
        name: "Salted caramel",
        imagePath: "/images/salted-caramel.png",

    },
    {
        name: "Salted caramel",
        imagePath: "/images/salted-caramel.png",

    },
    {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",

    },
]

// Prop alan bileşenleri test ediyorsak
// aldıkları propların benzerini göndericez
test('', async () => {
    // prop olarak göndermemiz gereken orijinnal fonksiyonun
    // yerine geçicek ve bize imkanları sağlayacak mock fonksiyonu oluşturma
    const mock = jest.fn();

    render(
        <Card
            item={item}
            basket={basket}
            setBasket={mock}
        />);

    // item'in name değeri için ekrana bir span basılır
    screen.getByText(item.name);

    // resim src'si item'in imagePath değerine uygundur
    const img = screen.getByAltText("çeşit-resim")
    expect(img).toHaveAttribute("src", item.imagePath)

    // toplam ürün bilgisi kısmında sepette 2 eleman olduğunda 2 yazmalı
    const amount = screen.getByTestId('amount');
    expect(amount).toHaveTextContent(2);

    // ekle ve sıfırla butonlarına tıklanınca setBasket tetiklenir
    const user = userEvent.setup();
    const addBtn = screen.getByRole('button', { name: /ekle/i });
    const delBtn = screen.getByRole('button', { name: /sıfırla/i });

    //  ekle butonuna tıkla
    await user.click(addBtn);

    //  setBasket fonk  doğru parametreyle çalıştı mı?
    expect(mock).toHaveBeenCalledWith([...basket,item]);
    
    // sıfırla butonuna tıkla
    await user.click(delBtn);

    // setBasket doğru parametreyle çalıştı mı
    expect(mock).toHaveBeenLastCalledWith([
        {
            name: "Chocolate",
            imagePath: "/images/chocolate.png",
    
        },
    ]) 

});