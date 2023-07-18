import Glechik from "../../images/common/glechick.jpeg"

const AboutUs: React.FC = () => {


    return <><head>
        <title>Кераміка українська опішнянська Полтавська🏺</title>
    </head><body>
            <div className="container-about-us">
                <h1 className="header-about-us">
                    Кераміка українська 🇺🇦 опішнянська 🪘 ⚱️ 🏺 - стародавня та унікальна
                    традиція українського народу, народжена на Полтавщині, яка передається
                    із покоління в покоління
                </h1>
                <h2 className="under-header-about-us">
                    <strong>
                        Результат родинної клопіткої праці, збереженої та розвинутої повз
                        сторіччя
                    </strong>
                </h2>
                <hr />
                <img className="img-about-us" src={Glechik}/>
                <hr />
                <p className="decript-craft">
                    <strong> Опішня́нська кера́міка </strong> — традиційна українська кераміка
                    із смт. Опішня на Полтавщині (Україна), одного з найбільших осередків
                    виробництва гончарної кераміки в Україні. Об'єкт нематеріальної
                    культурної спадщини України. Згідно з археологічними знахідками,
                    виявленими на околицях Опішні, територія селища була заселена ще у добу
                    неоліту. Саме тоді набуває широке використання керамічного посуду.
                    Розвиток же сучасного промислу веде свій початок з кінця 19 століття,
                    коли більшість населення Опішні займалося виробництвом своєрідних
                    декоративних глеків. Сучасні опішнянські керамічні вироби зберегли
                    багате різноманіття форм, серед яких поряд з традиційними національними
                    з'явився ряд нових — вази, декоративні блюда тощо.
                </p>
                <a
                    href="https://uk.wikipedia.org/wiki/%D0%9E%D0%BF%D1%96%D1%88%D0%BD%D1%8F%D0%BD%D1%81%D1%8C%D0%BA%D0%B0_%D0%BA%D0%B5%D1%80%D0%B0%D0%BC%D1%96%D0%BA%D0%B0"
                    target="blank"
                    className="wikipedia"
                >
                    Дізнатися більше на Вікіпедії
                </a>
                <hr />
                <button className="buynow-button-about-us">Придбати зараз</button>
                <br />

                <div className="info-block-creator">
                    This page was bilt by
                    <a href="mailto:evgenii.prs@gmail.com" className="name-creator"> EvgeniyP </a>
                </div>
            </div>
        </body></>
    }

export default AboutUs;

