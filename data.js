/*
  DATOS DEL MENÚ — este es el único archivo que cambia cada semana.
  Todas las cantidades están YA multiplicadas ×2 (el menú del nutricionista es para 1 persona).
  Fuente: menú "Alimentación 1" del nutricionista.
*/
window.MENU = {
  // Cambia el id cada vez que llegue un menú nuevo: la lista de la compra empieza de cero.
  id: "alimentacion-1",
  titulo: "Alimentación 1",
  personas: 2,

  pautas: [
    "Beber de 2 a 2,5 litros de agua al día cada uno.",
    "Frutos secos siempre crudos: sin tostar ni salar.",
    "Cocinar a la plancha, cocido, al horno o al vapor.",
    "La pechuga de pollo o pavo es a la plancha, no fiambre (salvo en el desayuno).",
    "Aliño de ensaladas: 1 cucharada de vinagre de manzana + 1 cucharada de AOVE.",
  ],

  // Orden de las comidas y hora aproximada a partir de la cual "toca" cada una.
  comidas: [
    { id: "desayuno", nombre: "Desayuno", desde: "00:00" },
    { id: "mediaManana", nombre: "Media mañana", desde: "10:30" },
    { id: "almuerzo", nombre: "Almuerzo", desde: "13:00" },
    { id: "mediaTarde", nombre: "Media tarde", desde: "17:00" },
    { id: "cena", nombre: "Cena", desde: "20:00" },
  ],

  // dias: lunes..domingo. Cada comida: { plato?, receta?, items: [[alimento, cantidad]], nota? }
  dias: {
    lunes: {
      desayuno: { items: [["Pan integral", "200 g"], ["Jamón serrano", "120 g"]], nota: "Puedes agregar tomate rallado a la base de las tostadas." },
      mediaManana: { items: [["Manzana", "2"], ["Nueces", "40 g"]] },
      almuerzo: { plato: "Ensalada de lentejas", receta: "ensalada-lentejas", items: [["Naranja", "2"]] },
      mediaTarde: { items: [["Yogur griego natural", "2 × 125 g"]] },
      cena: { items: [["Huevo", "4"], ["Aceite de oliva", "20 g"], ["Arándanos", "160 g"]], nota: "Agregar vegetales al gusto." },
    },
    martes: {
      desayuno: { items: [["Pan integral", "200 g"], ["Queso de Burgos", "120 g"]], nota: "Puedes agregar aguacate a la base de las tostadas." },
      mediaManana: { items: [["Naranja", "2"], ["Pistachos", "80 g"]] },
      almuerzo: { plato: "Solomillo de pavo con cebolla caramelizada exprés y calabacín", receta: "solomillo-pavo", items: [["Arroz integral cocido", "300 g"], ["Kiwi", "2"]] },
      mediaTarde: { items: [["Kéfir", "200 g"], ["Arándanos", "160 g"]] },
      cena: { plato: "Merluza al papillote", receta: "merluza-papillote", items: [["Mandarina", "2"]] },
    },
    miercoles: {
      desayuno: { items: [["Pan integral", "200 g"], ["Fiambre de pavo o pollo", "120 g"]], nota: "Puedes agregar aguacate a la base de las tostadas." },
      mediaManana: { items: [["Kéfir", "200 g"], ["Kiwi", "2"]] },
      almuerzo: { plato: "Muslos o contramuslos de pollo con boniato", receta: "pollo-boniato", items: [["Naranja", "2"]], nota: "Agregar vegetales al gusto." },
      mediaTarde: { items: [["Mandarina", "2"], ["Almendra cruda", "40 g"]] },
      cena: { plato: "Ensalada de sardinillas con anacardos", receta: "ensalada-sardinillas", items: [["Arándanos", "200 g"]] },
    },
    jueves: {
      desayuno: { items: [["Pan integral", "200 g"], ["Salmón ahumado", "120 g"]], nota: "Puedes agregar aguacate a la base de las tostadas." },
      mediaManana: { items: [["Kiwi", "2"], ["Avellanas", "40 g"]] },
      almuerzo: { plato: "Garbanzos con pisto, jamón y huevo", receta: "garbanzos-pisto", items: [["Mandarina", "4"]] },
      mediaTarde: { items: [["Yogur griego natural", "2 × 125 g"]] },
      cena: { plato: "Pechuga de pollo en horno o freidora de aire", receta: "pechuga-rellena", items: [["Manzana", "2"]] },
    },
    viernes: {
      desayuno: { items: [["Pan integral", "200 g"], ["Jamón serrano", "120 g"]], nota: "Puedes agregar tomate rallado a la base de las tostadas." },
      mediaManana: { items: [["Manzana", "300 g"], ["Nueces", "40 g"]] },
      almuerzo: { plato: "Bowl de boniato con salmón y aguacate", receta: "bowl-boniato-salmon", items: [["Boniato", "300 g"]], nota: "El boniato es el de la receta." },
      mediaTarde: { items: [["Kéfir", "200 g"], ["Arándanos", "200 g"]] },
      cena: { items: [["Huevo", "4"], ["Aceite de oliva", "20 g"], ["Kiwi", "4"]], nota: "Agregar vegetales al gusto." },
    },
    sabado: {
      desayuno: { items: [["Pan integral", "200 g"], ["Queso de Burgos", "120 g"]], nota: "Puedes agregar aguacate a la base de las tostadas." },
      mediaManana: { items: [["Mandarina", "2"], ["Pistachos", "40 g"]] },
      almuerzo: { plato: "Bol de quinoa con verduritas y huevo", receta: "bol-quinoa", items: [["Kiwi", "2"]] },
      mediaTarde: { items: [["Kéfir", "200 g"], ["Arándanos", "200 g"]] },
      cena: { items: [["Hamburguesas de ternera", "400 g"]], nota: "Agregar vegetales al gusto." },
    },
    domingo: {
      desayuno: { items: [["Pan integral", "200 g"], ["Fiambre de pavo o pollo", "120 g"]], nota: "Puedes agregar aguacate a la base de las tostadas." },
      mediaManana: { items: [["Yogur griego natural", "2 × 125 g"]] },
      almuerzo: { plato: "Pechuga de pollo al limón con hierbas y patatas crujientes", receta: "pollo-limon", items: [["Manzana", "2"]], nota: "Agregar vegetales al gusto." },
      mediaTarde: { items: [["Naranja", "2"], ["Anacardo crudo", "40 g"]] },
      cena: { items: [["Dorada o lubina", "400 g"], ["Aceite de oliva", "20 g"], ["Kiwi", "4"]], nota: "Agregar vegetales al gusto." },
    },
  },

  // Recetas (cantidades para 2 personas).
  recetas: {
    "ensalada-lentejas": {
      nombre: "Ensalada de lentejas",
      ingredientes: [
        "400 g de lentejas de bote cocidas",
        "4 latas de sardinillas en aceite de oliva",
        "1 cebolla morada",
        "2 zanahorias",
        "1 pepino (si te gusta)",
        "Tomates cherry",
        "Un poco de perejil",
        "Zumo de 1 limón",
        "2 cucharadas de AOVE",
        "1 pizca de sal",
        "Pimienta negra al gusto",
      ],
      pasos: [
        "En un bol echa las lentejas junto con las verduras finamente troceadas.",
        "Añade las sardinillas, escurriendo antes el aceite de la lata.",
        "Añade el zumo de limón, el aceite, la sal y la pimienta.",
        "Remueve y sirve.",
      ],
    },
    "solomillo-pavo": {
      nombre: "Solomillo de pavo con cebolla caramelizada exprés y calabacín",
      ingredientes: [
        "400 g de solomillo o pechuga de pavo",
        "2 cebollas",
        "2 calabacines",
        "Tomillo o romero",
        "Sal",
        "20 g de AOVE",
      ],
      pasos: [
        "Pon el solomillo en la freidora de aire.",
        "En una sartén con unas gotas de AOVE echa la cebolla en tiras finas con una pizca de sal y un par de cucharadas de agua. Tapa y cocina a fuego medio-bajo 5-6 minutos.",
        "Añade las rodajas de calabacín, sube un poco el fuego y deja que doren 3 minutos.",
      ],
    },
    "pollo-boniato": {
      nombre: "Muslos o contramuslos de pollo con boniato",
      ingredientes: [
        "500 g de contramuslos o muslos de pollo sin piel ni hueso",
        "300 g de boniato",
        "Romero",
        "Ajo en polvo",
        "Pimienta negra",
        "20 g de AOVE",
      ],
      pasos: [
        "Pela el boniato y córtalo en bastones. Ponlo en un bol tapado y al microondas 3 minutos para precocer el interior.",
        "Pincela o pulveriza con AOVE el boniato y los muslos, salpimienta y añade romero.",
        "Freidora de aire a 195 °C durante 12-14 minutos, dándoles la vuelta a mitad.",
      ],
    },
    "garbanzos-pisto": {
      nombre: "Garbanzos con pisto, jamón y huevo",
      ingredientes: [
        "400 g de garbanzos cocidos",
        "Pisto congelado (o casero)",
        "100 g de tacos de jamón serrano",
        "20 g de AOVE",
        "4 huevos",
        "Una pizca de sal",
      ],
      pasos: [
        "Escurre y lava los garbanzos si son de bote. Si son secos, ponlos en remojo la noche antes y cuécelos hasta que estén tiernos.",
        "Pon el pisto en una sartén. Cuando esté en su punto, añade los tacos de jamón y los garbanzos escurridos y deja unos 3 minutos más.",
        "Haz los huevos a la plancha y ponlos encima al emplatar.",
      ],
    },
    "bowl-boniato-salmon": {
      nombre: "Bowl de boniato con salmón y aguacate",
      ingredientes: [
        "300 g de boniato",
        "400 g de salmón",
        "1 aguacate",
        "Rúcula, canónigos, brotes tiernos…",
        "2 cucharaditas de chía o sésamo hidratada en agua",
        "Un poco de limón",
      ],
      pasos: [
        "Asa el boniato cortado en cubos en el horno o la freidora de aire.",
        "Cocina el salmón a la plancha o en la freidora de aire.",
        "Monta el bowl con las hojas verdes, el aguacate, el boniato y el salmón.",
        "Añade las semillas y un poco de limón.",
      ],
    },
    "bol-quinoa": {
      nombre: "Bol de quinoa con verduritas y huevo",
      ingredientes: [
        "500 g de quinoa cocida (4 vasitos)",
        "1 cebolla",
        "1 pimiento verde",
        "1 pimiento rojo",
        "1 zanahoria",
        "1 calabacín",
        "4 huevos",
        "20 g de AOVE",
        "Una pizca de sal",
        "Hierbas provenzales al gusto",
        "Pimentón dulce",
      ],
      pasos: [
        "Pela y corta en trozos pequeños la cebolla y la zanahoria. Corta los pimientos del mismo tamaño.",
        "Calienta el AOVE en una cazuela y pocha la cebolla y los pimientos a fuego muy suave, tapado, unos 10 minutos.",
        "Añade la zanahoria y pocha otros 10 minutos. Después el calabacín, 5 minutos más. Sazona y añade hierbas provenzales.",
        "Calienta los vasitos de quinoa en el microondas, échala a la cazuela, remueve y retira del fuego.",
        "Haz los huevos a la plancha.",
        "Sirve la quinoa con verduritas en un bol con los huevos encima y un poco de pimentón dulce.",
      ],
    },
    "pollo-limon": {
      nombre: "Pechuga de pollo al limón con hierbas y patatas crujientes",
      ingredientes: [
        "400 g de pechuga de pollo",
        "400 g de patatas",
        "2 limones (zumo y ralladura)",
        "4 dientes de ajo picados",
        "30 g de AOVE",
        "Tomillo, orégano y romero seco",
        "1 cucharadita de pimentón dulce",
        "Sal y pimienta negra molida",
      ],
      pasos: [
        "Corta las patatas en gajos o dados medianos. Mézclalas en un bol con una cucharada de AOVE, sal, pimienta, orégano y el pimentón.",
        "Cocínalas en la freidora de aire el tiempo necesario.",
        "Mientras, mezcla el zumo y la ralladura de limón, el ajo, tomillo, romero, sal, pimienta y dos cucharadas de AOVE. Marina las pechugas 10-15 minutos.",
        "En una sartén o plancha bien caliente, cocina las pechugas a fuego medio-alto 3-4 minutos por lado. En el último minuto vierte los jugos del marinado para glasear.",
        "Sirve con las patatas, salseando con los jugos de limón y hierbas.",
      ],
    },
    "pechuga-rellena": {
      nombre: "Pechuga de pollo en horno o freidora de aire",
      ingredientes: [
        "400 g de pechuga de pollo o de pavo",
        "30 g de queso curado rallado",
        "30 g de queso crema (tipo Philadelphia)",
        "Pimienta",
        "Una pizca de sal",
        "300 g de brócoli",
        "20 g de AOVE",
      ],
      pasos: [
        "Mezcla en un bol el queso crema con el queso curado rallado, la pimienta y la sal.",
        "Haz un corte en un lateral de cada pechuga para poder rellenarla.",
        "Rellena con la mezcla de quesos.",
        "Echa un poco de AOVE en la freidora o en la bandeja del horno y pon las pechugas.",
        "Cocina 20 minutos, 10 por cada lado.",
        "Cuando queden 6-7 minutos, añade el brócoli con un poco de AOVE, especias y un chorrito de agua.",
      ],
    },
    "merluza-papillote": {
      nombre: "Merluza al papillote",
      ingredientes: [
        "400 g de merluza",
        "1 cebolla",
        "2 zanahorias ralladas",
        "2 pimientos rojos y 2 verdes",
        "1 limón",
        "4 dientes de ajo",
        "2 cucharadas de AOVE",
        "Una pizca de sal y pimienta negra",
      ],
      pasos: [
        "Sobre papel de aluminio añade aceite y coloca las verduras. Deja papel suficiente para luego cerrar.",
        "Añade el pescado, la sal, la pimienta, los ajos, el AOVE y el zumo del limón.",
        "Cierra el papel de aluminio como un envoltorio.",
        "Al horno precalentado, 15-20 minutos a 180 °C.",
      ],
    },
    "ensalada-sardinillas": {
      nombre: "Ensalada de sardinillas con anacardos",
      ingredientes: [
        "Mezcla de brotes tiernos, rúcula, canónigos…",
        "Tomates cherry",
        "1 cebolla pequeña",
        "4 latas de sardinillas en AOVE",
        "40 g de anacardos",
        "2 cucharadas de vinagre de manzana",
        "2 cucharadas de AOVE",
        "Una pizca de sal",
      ],
      pasos: [
        "Echa las hojas verdes en una ensaladera. Lava, seca y corta los tomates cherry por la mitad y añádelos.",
        "Pela la cebolla, córtala en aros y échala también.",
        "Abre las latas de sardinas, escúrrelas y añádelas con los anacardos.",
        "Mezcla el vinagre, la sal y el aceite con una varilla y aliña la ensalada.",
      ],
    },
  },

  // Lista de la compra de la semana para 2 (suma de todo el menú y las recetas).
  compra: [
    {
      seccion: "Fruta",
      items: [
        ["Kiwis", "16"],
        ["Mandarinas", "10"],
        ["Manzanas", "8"],
        ["Naranjas", "8"],
        ["Arándanos", "920 g"],
        ["Limones", "4"],
        ["Aguacate", "1 (+ para tostadas)"],
      ],
    },
    {
      seccion: "Verdura",
      items: [
        ["Cebollas", "4 + 1 pequeña"],
        ["Cebolla morada", "1"],
        ["Zanahorias", "5"],
        ["Calabacines", "3"],
        ["Pimientos rojos", "3"],
        ["Pimientos verdes", "3"],
        ["Boniato", "600 g"],
        ["Patatas", "400 g"],
        ["Brócoli", "300 g"],
        ["Tomates cherry", "2 bandejas"],
        ["Brotes tiernos / rúcula / canónigos", "2 bolsas"],
        ["Pepino (opcional)", "1"],
        ["Ajos", "1 cabeza"],
        ["Perejil", "1 manojo"],
        ["Tomate para rallar (tostadas)", "al gusto"],
        ["Verdura para acompañar cenas", "al gusto"],
      ],
    },
    {
      seccion: "Carne",
      items: [
        ["Pechuga de pollo", "800 g"],
        ["Contramuslos de pollo sin piel ni hueso", "500 g"],
        ["Solomillo de pavo", "400 g"],
        ["Hamburguesas de ternera", "400 g"],
      ],
    },
    {
      seccion: "Pescado",
      items: [
        ["Merluza", "400 g"],
        ["Salmón fresco", "400 g"],
        ["Dorada o lubina", "400 g"],
      ],
    },
    {
      seccion: "Charcutería",
      items: [
        ["Jamón serrano en lonchas", "240 g"],
        ["Fiambre de pavo o pollo", "240 g"],
        ["Salmón ahumado", "120 g"],
        ["Tacos de jamón serrano", "100 g"],
      ],
    },
    {
      seccion: "Lácteos y huevos",
      items: [
        ["Huevos", "16"],
        ["Kéfir", "800 g"],
        ["Yogur griego natural", "6 × 125 g"],
        ["Queso de Burgos", "240 g"],
        ["Queso curado rallado", "30 g"],
        ["Queso crema (tipo Philadelphia)", "30 g"],
      ],
    },
    {
      seccion: "Panadería",
      items: [["Pan integral", "1,4 kg"]],
    },
    {
      seccion: "Frutos secos (crudos)",
      items: [
        ["Pistachos", "120 g"],
        ["Nueces", "80 g"],
        ["Anacardos", "80 g"],
        ["Avellanas", "40 g"],
        ["Almendras", "40 g"],
      ],
    },
    {
      seccion: "Conservas y despensa",
      items: [
        ["Sardinillas en AOVE", "8 latas"],
        ["Lentejas cocidas de bote", "400 g"],
        ["Garbanzos cocidos", "400 g"],
        ["Quinoa cocida", "500 g (4 vasitos)"],
        ["Arroz integral cocido", "300 g (2 vasitos)"],
        ["Pisto congelado", "1 bolsa grande"],
        ["Chía o sésamo", "1 paquete"],
      ],
    },
    {
      seccion: "Revisar en casa",
      items: [
        ["Aceite de oliva virgen extra", ""],
        ["Vinagre de manzana", ""],
        ["Pimienta negra", ""],
        ["Pimentón dulce", ""],
        ["Ajo en polvo", ""],
        ["Romero, tomillo, orégano", ""],
        ["Hierbas provenzales", ""],
        ["Papel de aluminio", ""],
      ],
    },
  ],
};
