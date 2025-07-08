export const CODE_SNIPPETS = {
  action1: `import { useState } from 'react';

// Tek tek gönderileri görüntülemek için component
const PostItem = ({ post }) => {
  return (
    <div className='bg-[#1B1D25] text-white shadow-md p-6 my-6 rounded-2xl'>
      {/* Post title */}
      <h2 className='text-xl font-bold capitalize'>{post.title}</h2>
      {/* Post body */}
      <p>{post.body}</p>
    </div>
  );
};

// Yeni gönderi ekleme componenti
const PostForm = ({ addPost }) => {
  // formAction form gönderimini işler ve yeni gönderi verileriyle addPost'u çağırır
  const formAction = async (formData) => {
    const newPost = {
      title: formData.get('title'),
      body: formData.get('body'),
    };

    // Gönderiyi eklemeden önce her iki alanın da doldurulduğundan emin olmamız lazım
    if (newPost.title && newPost.body) {
      addPost(newPost);
    } else {
      console.warn('Bir gönderi oluşturmak için hem title hem de body gereklidir.');
    }
  };

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] shadow-md px-8 pt-6 pb-8 mb-4 mt-6 rounded-2xl relative'
    >
      {/* Post Title için input field */}
      <div className='mb-4'>
        <label
          className='block text-white text-sm font-bold mb-2'
          htmlFor='title'
        >
          Title
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='title'
          type='text'
          placeholder='Enter title'
          name='title'
        />
      </div>

      {/* Post Body için Textarea */}
      <div className='mb-6'>
        <label
          className='block text-white text-sm font-bold mb-2'
          htmlFor='body'
        >
          Body
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
          id='body'
          rows='5'
          placeholder='Enter body'
          name='body'
        ></textarea>
      </div>

      {/* Submit buton */}
      <div className='flex items-center justify-between'>
        <button
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// Post'ları yönetmek ve görüntülemek için main component
const Posts = () => {
  const [posts, setPosts] = useState([]);

  // Listeye yeni bir post ekler
  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div className='relative mx-8 mt-6'>
      <div>
        {/* Yeni gönderi oluşturmak için form */}
        <PostForm addPost={addPost} />

        {/* Post'ların listesi */}
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export { Posts as ActionExample1 };`,
  action2: `import { useState } from 'react';

// React 19 geliştiricilerin form gönderimlerini yerel olarak işlemesine olanak tanıyan güncellenmiş bir formAction prop'u sunar.
// Daha declarative bir yaklaşım sağlar ve manuel event listener veya handling ihtiyacını azaltır.

const AddToCartForm = ({ id, title, addToCart }) => {
  // formAction işlevi form verilerini doğrudan alarak form gönderimlerinin modern bir şekilde işlenmesini sağlar.
  const formAction = async (formData) => {
    try {
      await addToCart(formData, title);
    } catch (error) {
      console.error('Ürün sepete eklenirken hata oluştu:', error);
    }
  };

  return (
    <form
      action={formAction}
      className='bg-[#1B1D25] border shadow-md text-white rounded-2xl px-8 pt-6 pb-8 mb-4 relative mt-6 mx-8'
    >
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      {/* Hidden input, item ID’nin formData içinde yer almasını sağlar. */}
      <input type='hidden' name='itemID' value={id} />
      <button
        type='submit'
        className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
      >
        Add to Cart
      </button>
    </form>
  );
};

// Sepet içeriğini görüntülemek için component
const CartDisplay = ({ cart }) => {
  // Early return, boş bir sepet durumunda gereksiz DOM render işlemlerini engeller.
  if (cart.length === 0) {
    return null;
  }

  return (
    <div className='px-8 text-indigo-300'>
      <h2 className='text-xl font-bold my-4'>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <hr className='my-4' />
    </div>
  );
};

// Alışveriş sepetini yöneten main component
const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  // React 19 daha akıcı bir UX için state güncelleme fonksiyonlarında async mantığın kullanılmasını teşvik eder.
  const addToCart = async (formData, title) => {
    const id = String(formData.get('itemID'));

    // Asynchronous API call gecikmeli olarak simülesi
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Yeni öğeyi sepete ekle
    setCart((prevCart) => [...prevCart, { id, title }]);

    return { id }; // İleride yapılabilecek ek işlemler için nesneyi(object) return et.
  };

  return (
    <div className="relative mx-8 mt-6">
      <div className='bg-[#1B1D25] py-6 px-2 rounded-2xl'>
        {/* Geçerli sepet içeriğini görüntüleme */}
        <CartDisplay cart={cart} />

        {/* Sepete ürün eklemek için örnek formlar */}
        <AddToCartForm
          id='1'
          title='JavaScript: The Good Parts'
          addToCart={addToCart}
        />
        <AddToCartForm
          id='2'
          title='5000 V-Bucks Gift Card'
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export { ShoppingCart as ActionExample2 };`,
  use1: `import { use, Suspense } from 'react';
  
  // Veriyi fetch eden ve yerel olarak cacheleyen memoize edilmiş bir fonksiyon.
  const fetchData = (() => {
    const cache = new Map();
  
    return async () => {
      const url = 'https://api.chucknorris.io/jokes/random';
  
      // Verinin önceden cachelenip cachelenmediğini kontrol et.
      if (cache.has(url)) {
        return cache.get(url);
      }
  
      // Eğer veri cachelenmemişse yeni veriyi fetch et.
      const res = await fetch(url, { cache: 'no-store' }); // 'no-store' kullanarak stale veriden kaçın.
      const data = await res.json();
  
      // Fetch edilen veriyi cachele.
      cache.set(url, data);
      return data;
    };
  })();
  
  // Async veriyi doğrudan component içinde işlemek için yeni 'use()' API'sini kullanan component.
  const JokeItem = () => {
    // use() API'si, promise’ları componentler içinde doğrudan çağırmanı sağlar.
    // Promise çözülene kadar bu component’in render işlemi askıya alınır (suspend edilir).
    const joke = use(fetchData());
    return (
      <div className='bg-[#1B1D25] shadow-md p-4 my-6 rounded-lg mt-12 relative mx-8 text-white'>
        <h2 className='text-xl'>{joke.value}</h2>
      </div>
    );
  };
  
  // Fallback render işlemi için Suspense kullanan wrapper component.
  const Joke = () => {
    return (
      <Suspense
        fallback={
          // JokeItem verisi yüklenirken gösterilen yedek (fallback) UI.
          <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
        }
      >
        {/* SEO amaçları için meta verisi ekle. */}
        {/* React 19 artık document metadata etiketlerini componentler içinde yerel olarak render etmeyi destekliyor. */}
        <title>Jokes</title>
        <meta name='description' content='jokes' />
        <meta name='keywords' content='joke, jokes' />
  
        {/* Render */}
        <JokeItem />
      </Suspense>
    );
  };
  
  export { Joke as UseExample1 };`,
  use2: `import { use, Suspense } from 'react';
  
  // Cache'leme ile kaynakları fetch eden fonksiyon.
  const fetchResource = (url) => {
    // Tekrarlayan fetch işlemlerini önlemek için cache kullan.
    const cache = fetchResource.cache || (fetchResource.cache = new Map());
  
    // Eğer URL cache’de yoksa, veriyi fetch et ve promise’ı cache’e kaydet.
    if (!cache.has(url)) {
      const promise = fetch(url).then((res) => res.json());
      cache.set(url, promise);
    }
  
    // Cache’deki promise’ı döndür.
    return cache.get(url);
  };
  
  // Gönderi listesini gösteren component.
  const PostItems = () => {
    // Async fetch işlemini yönetmek için yeni use() API’sini kullan.
    const posts = use(fetchResource('https://jsonplaceholder.typicode.com/posts'));
  
    return (
      <ul className='px-8 max-h-[400px] overflow-y-scroll rounded-2xl py-3 mt-12 mx-8 relative bg-[#1B1D25]'>
        {posts.map((post) => (
          <div
            key={post.id}
            className='text-white border shadow-md p-4 my-6 rounded-lg'
          >
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </ul>
    );
  };
  
  // Gönderi listesini fallback UI ile sarmalamak için Suspense kullanan component.
  const Posts = () => {
    return (
      <Suspense
        fallback={
          // Veri fetch edilirken bir yükleme göstergesi (loading indicator) göster.
          <h1 className='text-2xl text-center font-bold mt-5'>Loading...</h1>
        }
      >
        {/* Gönderi listesini render et. */}
        <PostItems />
      </Suspense>
    );
  };
  
  export { Posts as UseExample2 };`,
  use3: `import { use, useState, Suspense } from 'react';
  
  // Mesaj fetch etmek için simüle edilmiş asenkron fonksiyon.
  function fetchMessage() {
    return new Promise((resolve) => setTimeout(resolve, 1000, '⚛️'));
  }
  
  // Mesaj çözüldükten sonra gösteren component.
  const MessageOutput = ({ messagePromise }) => {
    // React 19’un use() API’sini kullanarak promise’ı doğrudan yönetme.
    const messageContent = use(messagePromise);
  
    return (
      <p className='text-xl relative text-white bg-[#1B1D25] w-fit p-6 rounded-lg shadow-md'>
        Here is the message: {messageContent}
      </p>
    );
  };
  
  // Yükleme durumu için Suspense fallback kullanan container component.
  const MessageContainer = ({ messagePromise }) => {
    return (
      <Suspense
        fallback={
          <p className='text-xl text-white'>⌛ Downloading message...</p>
        }
      >
        {/* Çözülen mesajı render et. */}
        <MessageOutput messagePromise={messagePromise} />
      </Suspense>
    );
  };
  
  // Kullanıcı etkileşimi ve state yönetimi için main component.
  const Message = () => {
    const [messagePromise, setMessagePromise] = useState(null);
    const [show, setShow] = useState(false);
  
    // Mesaj fetch işlemini başlatan fonksiyon.
    function download() {
      setMessagePromise(fetchMessage());
      setShow(true);
    }
  
    return (
      <div className='relative mx-8 mt-6 flex justify-center items-center bg-[#1B1D25] p-12 rounded-2xl'>
        {show ? (
          // Kullanıcı indirme işlemini başlattıysa mesaj container’ını göster.
          <MessageContainer messagePromise={messagePromise} />
        ) : (
          // Başlangıçta indirme butonunu göster.
          <button
            className='bg-indigo-500 text-white font-bold py-2 px-4 rounded-full'
            onClick={download}
          >
            Download message
          </button>
        )}
      </div>
    );
  };
  
  export { Message as UseExample3 };`,
  use4: `import { createContext, useState, use } from 'react';
  
  // Tema için bir context oluştur.
  const ThemeContext = createContext();
  
  // Mevcut temayı yönetip sağlayan Theme Provider.
  const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // İlk tema 'light' olarak ayarlanmıştır.
  
    // 'Light' ve 'dark' temaları arasında geçiş yap.
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  // Theme context’ini consume etmek için use() kullanan component.
  const ThemedCard = () => {
    // use() API’si ile useContext’i birleştirerek ThemeContext değerine doğrudan erişim
    const { theme, toggleTheme } = use(ThemeContext);
  
    return (
      <div
        className={\`relative mt-6 mx-8 shadow-md rounded-lg p-6 \${theme === 'light' ? 'bg-white' : 'bg-[#1B1D25]'
          }\`}
      >
        {/* Mevcut temaya göre dinamik style uygulama. */}
        <h1
          className={\`text-2xl mb-3 \${theme === 'light' ? 'text-gray-800' : 'text-white'
            }\`}
        >
          Themed Card
        </h1>
        <p className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
          libero. Nullam mattis metus a sapien tempor, sit amet mollis est
          facilisis. Phasellus nec turpis nec dui venenatis vestibulum. Sed
          dapibus dapibus justo, at rhoncus risus malesuada vel. Proin eget leo id
          mi ullamcorper rhoncus.
        </p>
        {/* Temayı değiştirmek için buton. */}
        <button
          onClick={toggleTheme}
          className='mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
        >
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </div>
    );
  };
  
  // Theme Provider ve temaya göre style verilen kartı render eden main component.
  const Theme = () => {
    return (
      <ThemeProvider>
        <ThemedCard />
      </ThemeProvider>
    );
  };
  
  export { Theme as UseExample4 };`,
  useActionState: `import { useActionState } from 'react';
  
  // Form gönderimlerini işleyen action fonksiyonu.
  // Önceki state ve query verisini parametre olarak alır.
  const addToCart = (prevState, queryData) => {
    const itemID = queryData.get('itemID');
  
    // itemID’ye göre farklı state’ler döndürür.
    if (itemID === '1') {
      return { message: 'Added to cart!', status: 'success' };
    } else {
      return { message: 'Out of stock!', status: 'failure' };
    }
  };
  
  // Sepete ürün eklemek için form component’i.
  const AddToCartForm = ({ itemID, itemTitle }) => {
    // useActionState, mevcut state’i ve bir action fonksiyonunu sağlar.
    const [formState, formAction] = useActionState(addToCart, null);
  
    return (
      <form
        action={formAction}
        className='bg-[#1B1D25] border shadow-md text-white rounded-2xl px-8 pt-6 pb-4 mb-4 relative mt-6 mx-8'
      >
        {/* Item Title göster. */}
        <h2 className='text-xl font-bold mb-4'>{itemTitle}</h2>
  
        {/* Item ID için gizli (hidden) input.*/}
        <input type='hidden' name='itemID' value={itemID} />
  
        {/* Submit buton */}
        <button
          type='submit'
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
        >
          Add to Cart
        </button>
  
        {/* formState’e göre geri bildirimi göster. */}
        <div
          className={\`mt-4 text-sm \${formState?.status === 'success' ? 'text-green-400' : 'text-red-400'
            }\`}
        >
          {formState?.message}
        </div>
      </form>
    );
  };
  
  export default AddToCartForm;`,
  useDeferredValue: `import { useState, useDeferredValue } from 'react';
  
  const SearchResults = ({ searchTerm }) => {
    const deferredSearchTerm = useDeferredValue(searchTerm); // defer
  
    // Ertelenmiş değere göre filtrelenmiş sonuçları simüle etme.
    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  
    return (
      <ul className="max-h-[200px] overflow-y-scroll bg-[#1B1D25] text-white p-4 rounded-lg">
        {filteredResults.map((result, index) => (
          <li key={index} className="py-1 border-b border-gray-500">
            {result}
          </li>
        ))}
      </ul>
    );
  };
  
  const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Input değerini takip eder.
  
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value); // Hemen günceller.
    };
  
    return (
      <div className="p-6 bg-[#1B1D25] rounded-2xl text-white relative mx-8 mt-6">
        <h2 className="text-2xl mb-4">Search Items</h2>
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-indigo-500"
          onChange={handleInputChange}
          value={searchTerm}
        />
        <SearchResults searchTerm={searchTerm} />
      </div>
    );
  };
  
  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Pineapple',
    'Mango',
    'Blueberry',
    'Strawberry',
  ];
  
  export { SearchBox as UseDeferredValueExample };`,
  useFormStatus: `import { useFormStatus } from 'react-dom';
  import { useState } from 'react';
  
  // Tekil gönderileri gösteren component.
  const PostItem = ({ post }) => {
    return (
      <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
        <h2 className='text-xl font-bold'>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  };
  
  // Durumunu yönetmek için useFormStatus kullanan özel submit butonu.
  const SubmitButton = () => {
    // useFormStatus, formun gönderilip gönderilmediğini gösteren pending durumunu sağlar.
    const { pending } = useFormStatus();
  
    return (
      <button
        className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
        type='submit'
        disabled={pending} // Gönderim devam ederken butonu devre dışı bırak.
      >
        {pending ? 'Submitting...' : 'Submit'} {/* Pending durumuna göre dinamik etiket.*/}
      </button>
    );
  };
  
  // Yeni gönderi gönderimini yönetmek için form component’i.
  const PostForm = ({ addPost }) => {
    // Form gönderimlerini işleyen action.
    const formAction = async (formData) => {
      // Gönderim için gecikme simüle et.
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      const newPost = {
        title: formData.get('title'), // Form verilerinden title bilgisini al.
        body: formData.get('body'), // Form verilerinden body bilgisini al.
      };
  
      addPost(newPost); // Yeni gönderiyi listeye ekle.
    };
  
    return (
      <form
        action={formAction} // Form action’ını belirt.
        className='bg-[#1B1D25] shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 relative mt-6 mx-8'
      >
        {/* Post Title için input. */}
        <div className='mb-4'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            placeholder='Enter title'
            name='title'
          />
        </div>
  
        {/* Post body için Textarea  */}
        <div className='mb-6'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='body'
          >
            Body
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 bg-[#1B1D25] text-white leading-tight focus:outline-none focus:shadow-outline'
            id='body'
            rows='5'
            placeholder='Enter body'
            name='body'
          ></textarea>
        </div>
  
        {/* Dinamik duruma sahip submit butonu. */}
        <div className='flex items-center justify-between'>
          <SubmitButton />
        </div>
      </form>
    );
  };
  
  // Gönderileri yönetip gösteren main component.
  const Posts = () => {
    const [posts, setPosts] = useState([]);
  
    // Yeni gönderiyi listeye ekleyen fonksiyon.
    const addPost = (newPost) => {
      setPosts((posts) => [...posts, newPost]);
    };
  
    return (
      <>
        {/* Yeni bir gönderi eklemek için form */}
        <PostForm addPost={addPost} />
  
        {/* Gönderilerin listesini görüntüleme */}
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </>
    );
  };
  
  export { Posts as UseFormStatusExample };`,
  useOptimistic: `import { useOptimistic, useState, useRef } from 'react';
  
  // Mesaj göndermek için form componenti
  const MessageForm = ({ addOptimisticMessage, sendMessage }) => {
    const formRef = useRef(); // Gönderimden sonra formu sıfırlamak için Ref
  
    const formAction = async (formData) => {
      // Kullanıcı arayüzüne hemen optimistic bir mesaj ekleyin
      addOptimisticMessage(formData.get('message'));
  
      // Form input'u sıfırlayın
      formRef.current.reset();
  
      // Gerçek mesajı gönderin (asenkron işlemin simülesi)
      await sendMessage(formData);
    };
  
    return (
      <form action={formAction} ref={formRef} className='flex items-center mb-5'>
        <input
          type='text'
          name='message'
          placeholder='Hello!'
          className='border bg-[#1B1D25] text-white rounded py-1 px-2 mr-2 focus:outline-none focus:border-indigo-500'
        />
        <button
          type='submit'
          className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded-full focus:outline-none focus:shadow-outline'
        >
          Send
        </button>
      </form>
    );
  };
  
  // Optimistic güncellemelerle mesajları gösteren thread component’i.
  const Thread = ({ messages, sendMessage }) => {
    // useOptimistic, mesajlar için optimistik bir state tutar
    // İlk state (messages) ve bir reducer fonksiyonunu alır
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
      messages,
      (state, newMessage) => [
        ...state,
        {
          text: newMessage, // Optimistic text
          sending: true, // Mesajın hala gönderilmekte olduğunu gösteren flag
        },
      ]
    );
  
    return (
      <div className='relative mx-8 mt-6 bg-[#1B1D25] p-6 rounded-2xl'>
        <MessageForm
          addOptimisticMessage={addOptimisticMessage}
          sendMessage={sendMessage}
        />
        <span className='text-white'>Latest Messages:</span>
        {optimisticMessages.map((message, index) => (
          <div key={index} className='flex items-center'>
            <span className="text-white bg-indigo-500 mb-2 py-2 px-4 rounded-2xl max-w-[30ch] break-all">{message.text}</span>
            {message.sending && (
              <small className='ml-1 text-gray-500'>(Sending...)</small>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Bir mesajın teslimini simüle eder (mock API çağrısı)
  const deliverMessage = async (message) => {
    await new Promise((res) => setTimeout(res, 1000)); // Delay Simülasyon
    return message; // Gönderilen mesajı döndür
  };
  
  // Mesajları yöneten main component
  const MessageBox = () => {
    const [messages, setMessages] = useState([]); // Gerçek mesajları saklamak için state
  
    // Mesaj gönderme fonksiyonu
    async function sendMessage(formData) {
      const sentMessage = await deliverMessage(formData.get('message'));
  
      // Gönderilen mesaj ile gerçek state’i güncelle.
      setMessages((messages) => [...messages, { text: sentMessage }]);
    }
  
    return <Thread messages={messages} sendMessage={sendMessage} />;
  };
  
  export { MessageBox as UseOptimisticExample };`,
  useTransition: `import { useState, useTransition, memo } from 'react';
  
  const TabButton = ({ children, isActive, onClick }) => {
    if (isActive) {
      return <div className='text-indigo-600'>{children}</div>;
    }
    return (
      <button
        className="text-white"
        onClick={() => {
          onClick();
        }}
      >
        {children}
      </button>
    );
  };
  
  const Tab1 = () => {
    return <div className="text-white">This is Tab 1</div>;
  };
  
  const Tab2 = memo(function Tab2() {
    let items = [];
    for (let i = 0; i < 500; i++) {
      items.push(<Post key={i} index={i} />);
    }
    return <ul className='items max-h-[400px] overflow-y-auto'>{items}</ul>;
  });
  
  const Tab3 = () => {
    return <div className="text-white">This is Tab 3</div>;
  };
  
  function Post({ index }) {
    let startTime = performance.now();
    while (performance.now() - startTime < 1) {
      // Yapay gecikme
    }
  
    return <li className='item text-white'>Post {index + 1}</li>;
  }
  
  export function Tabs() {
    // useTransition, geçişleri bloklamayan bir şekilde yönetmek için bir mekanizma sağlar.
    const [, startTransition] = useTransition();
    const [tab, setTab] = useState('tab1'); // O anda etkin olan sekmeyi izler
  
    function selectTab(nextTab) {
      // startTransition, geçiş sırasında kullanıcı arayüzünün duyarlı kalmasını sağlar
      startTransition(() => {
        setTab(nextTab); // Etkin sekmeyi güncelleyin
      });
    }
  
    return (
      <div className='p-6 relative mx-8 mt-2 bg-[#1B1D25] rounded-2xl'>
        {/* Tab butonları */}
        <div className='flex space-x-4 mb-4'>
          <TabButton isActive={tab === 'tab1'} onClick={() => selectTab('tab1')}>
            Tab One
          </TabButton>
          <TabButton isActive={tab === 'tab2'} onClick={() => selectTab('tab2')}>
            Tab 2 (slow)
          </TabButton>
          <TabButton isActive={tab === 'tab3'} onClick={() => selectTab('tab3')}>
            Tab 3
          </TabButton>
        </div>
  
        <hr className='mb-4' />
  
        {/* Sekme içeriğini koşullu olarak oluşturma */}
        {tab === 'tab1' && <Tab1 />}
        {tab === 'tab2' && <Tab2 />}
        {tab === 'tab3' && <Tab3 />}
      </div>
    );
  }
  
  export { Tabs as UseTransitionExample };`,
};
