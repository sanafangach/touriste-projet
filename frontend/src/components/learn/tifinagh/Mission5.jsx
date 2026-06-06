import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ArrowLeft, CheckCircle, Compass, Heart, Mountain, Landmark, Globe, Music, Users, Library, Store, Map, Star, Book, Building2, Sparkles, Trophy } from "lucide-react";
import { useLanguage } from "../../accueil/LanguageContext";
import { useAuth } from "../../../context/AuthContext";
import "../darija/mission.css";
import { useAutoProgress, canAccessMission } from "../../../utils/progress";
import LockedScreen from "../common/LockedScreen";
import FavoriteButton from "../common/FavoriteButton";
import SaveVocabButton from "../common/SaveVocabButton";

const symbolsData = [
  {
    symbol: "ⵣ",
    name: "Yaz",
    title: { en: "The Free Man", fr: "L'homme libre", ar: "الرجل الحر" },
    meaning: { en: "Freedom and human dignity", fr: "Liberté et dignité humaine", ar: "الحرية والكرامة الإنسانية" },
    history: { en: "The Yaz is the most ancient and sacred Tifinagh symbol, found in rock carvings across the Sahara dating back over 3,000 years.", fr: "Le Yaz est le symbole tifinagh le plus ancien et le plus sacré, présent dans les gravures rupestres du Sahara datant de plus de 3 000 ans.", ar: "ياز هو أقدم وأقدس رمز تيفيناغ، موجود في النقوش الصخرية عبر الصحراء ويعود تاريخه لأكثر من 3000 عام." },
    cultural: { en: "It is the centerpiece of the Amazigh flag and appears on jewelry, carpets, and public buildings as a proud emblem of Amazigh identity.", fr: "C'est la pièce maîtresse du drapeau amazigh et il apparaît sur les bijoux, les tapis et les bâtiments publics comme un fier emblème de l'identité amazighe.", ar: "إنه محور العلم الأمازيغي ويظهر على المجوهرات والسجاد والمباني العامة كرمز فخور للهوية الأمازيغية." },
    icon: <Heart size={24} />
  },
  {
    symbol: "ⵎ",
    name: "Yem",
    title: { en: "Nature & Mountains", fr: "Nature & Montagnes", ar: "الطبيعة والجبال" },
    meaning: { en: "Connection to the earth", fr: "Connexion à la terre", ar: "الارتباط بالأرض" },
    history: { en: "Yem is associated with the Atlas Mountains, which have been home to Amazigh communities for millennia. The symbol represents the sacred bond between people and their land.", fr: "Yem est associé aux montagnes de l'Atlas, qui abritent les communautés amazighes depuis des millénaires. Le symbole représente le lien sacré entre les gens et leur terre.", ar: "يرتبط ييم بجبال الأطلس التي كانت موطناً للمجتمعات الأمازيغية لآلاف السنين. يرمز إلى الرابطة المقدسة بين الناس وأرضهم." },
    cultural: { en: "You will see this symbol woven into Berber carpets and carved into wooden doors, representing the Amazigh people's deep respect for nature.", fr: "Vous verrez ce symbole tissé dans les tapis berbères et sculpté dans les portes en bois, représentant le profond respect du peuple amazigh pour la nature.", ar: "سترى هذا الرمز منسوجاً في السجاد البربري ومنحوتاً في الأبواب الخشبية، ممثلاً الاحترام العميق للشعب الأمازيغي للطبيعة." },
    icon: <Mountain size={24} />
  },
  {
    symbol: "ⵜ",
    name: "Yat",
    title: { en: "Feminine Energy & Protection", fr: "Énergie Féminine & Protection", ar: "الطاقة الأنثوية والحماية" },
    meaning: { en: "Femininity, motherhood, protection", fr: "Féminité, maternité, protection", ar: "الأنوثة والأمومة والحماية" },
    history: { en: "Yat is one of the most frequently used Tifinagh letters. It begins and ends many feminine words and names, reflecting the important role of women in Amazigh society.", fr: "Yat est l'une des lettres tifinagh les plus utilisées. Elle commence et termine de nombreux mots et prénoms féminins, reflétant le rôle important des femmes dans la société amazighe.", ar: "يات هو أحد أكثر حروف تيفيناغ استخداماً. يبدأ وينتهي به العديد من الكلمات والأسماء المؤنثة، مما يعكس الدور المهم للمرأة في المجتمع الأمازيغي." },
    cultural: { en: "Amazigh women are the primary keepers of the Tifinagh writing tradition. They pass down symbols through weaving, pottery, and jewelry making.", fr: "Les femmes amazighes sont les principales gardiennes de la tradition d'écriture tifinagh. Elles transmettent les symboles à travers le tissage, la poterie et la bijouterie.", ar: "النساء الأمازيغيات هن الحافظات الرئيسيات لتقليد كتابة تيفيناغ. ينقلن الرموز عبر النسيج والفخار وصناعة المجوهرات." },
    icon: <Landmark size={24} />
  },
  {
    symbol: "ⵉ",
    name: "Yi",
    title: { en: "Life & Vitality", fr: "Vie & Vitalité", ar: "الحياة والحيوية" },
    meaning: { en: "Life, energy, growth", fr: "Vie, énergie, croissance", ar: "الحياة والطاقة والنمو" },
    history: { en: "Yi represents the concept of life and vitality. It appears in words related to living things and natural growth, like 'ⴰⵎⴰⵏ' (water) and 'ⵜⴰⴼⵓⴽⵜ' (sun).", fr: "Yi représente le concept de vie et de vitalité. Il apparaît dans des mots liés aux êtres vivants et à la croissance naturelle, comme 'ⴰⵎⴰⵏ' (eau) et 'ⵜⴰⴼⵓⴽⵜ' (soleil).", ar: "يي يمثل مفهوم الحياة والحيوية. يظهر في الكلمات المتعلقة بالكائنات الحية والنمو الطبيعي، مثل 'ⴰⵎⴰⵏ' (ماء) و'ⵜⴰⴼⵓⴽⵜ' (شمس)." },
    cultural: { en: "This symbol represents the vitality of Amazigh culture itself — a living tradition that continues to thrive in modern Morocco.", fr: "Ce symbole représente la vitalité de la culture amazighe elle-même — une tradition vivante qui continue de prospérer dans le Maroc moderne.", ar: "هذا الرمز يمثل حيوية الثقافة الأمازيغية نفسها — تقليد حي يستمر في الازدهار في المغرب الحديث." },
    icon: <Sparkles size={24} />
  }
];

const identityData = [
  {
    title: { en: "Who Are the Amazigh?", fr: "Qui Sont les Amazighs ?", ar: "من هم الأمازيغ؟" },
    content: {
      en: "The Amazigh (Imazighen) are the indigenous people of North Africa, with a history spanning over 5,000 years. Their presence extends across Morocco, Algeria, Tunisia, Libya, Mali, and Niger. The word 'Amazigh' means 'free man', reflecting their proud independent spirit. Today, over 30 million Amazigh people live in North Africa, preserving their language, traditions, and identity.",
      fr: "Les Amazighs (Imazighen) sont le peuple autochtone d'Afrique du Nord, avec une histoire de plus de 5 000 ans. Leur présence s'étend du Maroc à l'Algérie, la Tunisie, la Libye, le Mali et le Niger. Le mot 'Amazigh' signifie 'homme libre', reflétant leur esprit indépendant et fier. Aujourd'hui, plus de 30 millions d'Amazighs vivent en Afrique du Nord, préservant leur langue, traditions et identité.",
      ar: "الأمازيغ (إيمازيغن) هم السكان الأصليون لشمال إفريقيا، ويمتد تاريخهم لأكثر من 5000 عام. يتواجدون في المغرب والجزائر وتونس وليبيا ومالي والنيجر. كلمة 'أمازيغ' تعني 'رجل حر'، مما يعكس روحهم المستقلة والفخورة. اليوم، يعيش أكثر من 30 مليون أمازيغي في شمال إفريقيا، محافظين على لغتهم وتقاليدهم وهويتهم."
    },
    tag: { en: "A Living Heritage", fr: "Un Héritage Vivant", ar: "تراث حي" },
    icon: <Users size={28} />
  },
  {
    title: { en: "The Importance of Tamazight", fr: "L'Importance du Tamazight", ar: "أهمية الأمازيغية" },
    content: {
      en: "Tamazight is the language of the Amazigh people, written in the Tifinagh script. In 2011, it became an official language of Morocco alongside Arabic. This recognition was a historic milestone, ensuring Tifinagh appears on public buildings, road signs, schools, and official documents. Learning Tamazight helps travelers connect with local communities and shows respect for Morocco's dual heritage.",
      fr: "Le tamazight est la langue du peuple amazigh, écrite en alphabet tifinagh. En 2011, il est devenu langue officielle du Maroc aux côtés de l'arabe. Cette reconnaissance a été une étape historique, garantissant que le tifinagh apparaît sur les bâtiments publics, les panneaux routiers, les écoles et les documents officiels. Apprendre le tamazight aide les voyageurs à se connecter avec les communautés locales et montre du respect pour le double héritage du Maroc.",
      ar: "الأمازيغية هي لغة الشعب الأمازيغي، المكتوبة بخط تيفيناغ. في عام 2011، أصبحت لغة رسمية للمغرب إلى جانب العربية. كان هذا الاعتراف خطوة تاريخية، تضمن ظهور تيفيناغ على المباني العامة وعلامات الطرق والمدارس والوثائق الرسمية. تعلم الأمازيغية يساعد المسافرين على التواصل مع المجتمعات المحلية ويظهر احتراماً للتراث المزدوج للمغرب."
    },
    tag: { en: "Official Since 2011", fr: "Officiel Depuis 2011", ar: "رسمي منذ 2011" },
    icon: <Book size={28} />
  },
  {
    title: { en: "Why Tifinagh Matters", fr: "Pourquoi le Tifinagh est Important", ar: "لماذا تيفيناغ مهم" },
    content: {
      en: "Tifinagh is more than a writing system — it's a symbol of identity, resistance, and cultural pride. For centuries, despite pressures, Amazigh communities kept Tifinagh alive through art, jewelry, and oral tradition. Today, you'll see Tifinagh on currency, stamps, airport signs, and cultural centers. Reading even a few symbols opens doors to understanding Morocco's rich, diverse cultural landscape.",
      fr: "Le tifinagh est plus qu'un système d'écriture — c'est un symbole d'identité, de résistance et de fierté culturelle. Pendant des siècles, malgré les pressions, les communautés amazighes ont gardé le tifinagh vivant à travers l'art, les bijoux et la tradition orale. Aujourd'hui, vous verrez le tifinagh sur la monnaie, les timbres, les panneaux d'aéroport et les centres culturels. Lire ne serait-ce que quelques symboles ouvre des portes à la compréhension du riche paysage culturel diversifié du Maroc.",
      ar: "تيفيناغ أكثر من مجرد نظام كتابة — إنه رمز للهوية والمقاومة والاعتزاز الثقافي. لقرون، وعلى الرغم من الضغوط، حافظت المجتمعات الأمازيغية على تيفيناغ حياً من خلال الفن والمجوهرات والتقليد الشفهي. اليوم، سترى تيفيناغ على العملات والطوابع ولافتات المطارات والمراكز الثقافية. قراءة حتى بضعة رموز تفتح أبواباً لفهم المشهد الثقافي الغني والمتنوع للمغرب."
    },
    tag: { en: "A Living Script", fr: "Une Écriture Vivante", ar: "كتابة حية" },
    icon: <Globe size={28} />
  }
];

const artData = [
  {
    title: { en: "Kasbah Symbols", fr: "Symboles des Kasbahs", ar: "رموز القصبات" },
    content: {
      en: "In southern Morocco, ancient Kasbahs (fortified villages) are adorned with Tifinagh symbols carved into heavy wooden doors and clay walls. These symbols serve as protective charms, warding off negative energy and welcoming visitors. The Ait Benhaddou Kasbah, a UNESCO site, features many such carvings that travelers can spot.",
      fr: "Dans le sud du Maroc, les anciennes Kasbahs (villages fortifiés) sont ornées de symboles tifinagh sculptés dans de lourdes portes en bois et des murs d'argile. Ces symboles servent de charmes protecteurs, éloignant les énergies négatives et accueillant les visiteurs. La Kasbah d'Ait Benhaddou, site UNESCO, présente de nombreuses sculptures de ce type que les voyageurs peuvent repérer.",
      ar: "في جنوب المغرب، تزين القصبات القديمة (القرى المحصنة) برموز تيفيناغ منحوتة في الأبواب الخشبية الثقيلة والجدران الطينية. تعمل هذه الرموز كتمائم واقية، تطرد الطاقة السلبية وترحب بالزوار. قصبة آيت بن حدو، أحد مواقع اليونسكو، تتميز بالعديد من هذه النقوش التي يمكن للمسافرين اكتشافها."
    },
    icon: <Building2 size={24} />
  },
  {
    title: { en: "Traditional Patterns", fr: "Motifs Traditionnels", ar: "الأنماط التقليدية" },
    content: {
      en: "Amazigh carpets and textiles are famous for their geometric patterns, many of which are derived from Tifinagh letters. Each region has its own unique designs: Middle Atlas carpets feature diamond shapes (ⵄ), while High Atlas weavings incorporate zigzag lines (ⵣ). Learning to recognize these patterns helps you identify authentic Amazigh craftsmanship.",
      fr: "Les tapis et textiles amazighs sont célèbres pour leurs motifs géométriques, dont beaucoup sont dérivés des lettres tifinagh. Chaque région a ses propres designs uniques : les tapis du Moyen Atlas présentent des formes de diamant (ⵄ), tandis que les tissages du Haut Atlas intègrent des lignes en zigzag (ⵣ). Apprendre à reconnaître ces motifs vous aide à identifier l'artisanat amazigh authentique.",
      ar: "تشتهر السجاد والمنسوجات الأمازيغية بأنماطها الهندسية، العديد منها مشتق من حروف تيفيناغ. لكل منطقة تصاميمها الفريدة: سجاد الأطلس المتوسط يتميز بأشكال الماس (ⵄ)، بينما تنسيجات الأطلس الكبير تتضمن خطوطاً متعرجة (ⵣ). تعلم التعرف على هذه الأنماط يساعدك على تمييز الحرف الأمازيغية الأصيلة."
    },
    icon: <Star size={24} />
  },
  {
    title: { en: "Jewelry & Crafts", fr: "Bijoux & Artisanat", ar: "المجوهرات والحرف" },
    content: {
      en: "Tifinagh isn't just written; it's worn. Amazigh silver jewelry features intricate engravings of Tifinagh symbols, especially ⵣ (Yaz) and ⵜ (Yat). These pieces are more than accessories — they are identity statements passed down through generations. Each earring, bracelet, or necklace carries protective meanings and family history.",
      fr: "Le tifinagh n'est pas seulement écrit ; il est porté. Les bijoux en argent amazighs présentent de fines gravures de symboles tifinagh, surtout ⵣ (Yaz) et ⵜ (Yat). Ces pièces sont plus que des accessoires — ce sont des déclarations d'identité transmises de génération en génération. Chaque boucle d'oreille, bracelet ou collier porte des significations protectrices et une histoire familiale.",
      ar: "تيفيناغ لا يُكتب فقط بل يُلبس. المجوهرات الفضية الأمازيغية تتميز بنقوش دقيقة لرموز تيفيناغ، خاصة ⵣ (ياز) وⵜ (يات). هذه القطع أكثر من مجرد إكسسوارات — إنها بيانات هوية تنتقل عبر الأجيال. كل قرط أو سوار أو قلادة يحمل معاني وقائية وتاريخاً عائلياً."
    },
    icon: <Heart size={24} />
  },
  {
    title: { en: "Cultural Motifs", fr: "Motifs Culturels", ar: "الزخارف الثقافية" },
    content: {
      en: "Beyond writing, Tifinagh symbols appear in Amazigh pottery, painting, and architecture. The ⵣ motif often decorates tagine pots, while ⵎ patterns grace traditional doors. Modern Moroccan artists incorporate Tifinagh into contemporary works, blending ancient symbols with modern expression — a testament to the script's enduring relevance.",
      fr: "Au-delà de l'écriture, les symboles tifinagh apparaissent dans la poterie, la peinture et l'architecture amazighes. Le motif ⵣ décore souvent les tajines, tandis que les motifs ⵎ ornent les portes traditionnelles. Les artistes marocains modernes intègrent le tifinagh dans des œuvres contemporaines, mêlant symboles anciens et expression moderne — un testament à la pertinence durable de l'écriture.",
      ar: "ما وراء الكتابة، تظهر رموز تيفيناغ في الفخار والرسم والهندسة المعمارية الأمازيغية. زخرفة ⵣ غالباً ما تزين أواني الطاجين، بينما أنماط ⵎ تزين الأبواب التقليدية. الفنانون المغاربة المعاصرون يدمجون تيفيناغ في أعمال معاصرة، يمزجون الرموز القديمة بالتعبير الحديث — دليل على الأهمية المستمرة للخط."
    },
    icon: <Landmark size={24} />
  }
];

const discoveryData = [
  {
    title: { en: "Museums & Cultural Centers", fr: "Musées & Centres Culturels", ar: "المتاحف والمراكز الثقافية" },
    content: {
      en: "The National Museum of Moroccan Jewellery in Rabat, the Amazigh Culture Museum in Agadir, and the Museum of African Contemporary Art in Marrakech all feature exhibits with Tifinagh inscriptions. These museums offer travelers a curated journey through Amazigh history, displaying ancient artifacts alongside modern works.",
      fr: "Le Musée National de la Bijouterie Marocaine à Rabat, le Musée de la Culture Amazighe à Agadir, et le Musée d'Art Contemporain Africain à Marrakech présentent tous des expositions avec des inscriptions tifinagh. Ces musées offrent aux voyageurs un voyage organisé à travers l'histoire amazighe, exposant des artefacts anciens aux côtés d'œuvres modernes.",
      ar: "المتحف الوطني للمجوهرات المغربية في الرباط، ومتحف الثقافة الأمازيغية في أكادير، ومتحف الفن المعاصر الأفريقي في مراكش، جميعها تضم معروضات بنقوش تيفيناغ. تقدم هذه المتاحف للمسافرين رحلة منظمة عبر التاريخ الأمازيغي، وتعرض قطعاً أثرية قديمة إلى جانب أعمال حديثة."
    },
    icon: <Library size={24} />
  },
  {
    title: { en: "Amazigh Villages", fr: "Villages Amazighs", ar: "القرى الأمازيغية" },
    content: {
      en: "Travelers visiting the Atlas Mountains or the Rif region can experience Amazigh culture firsthand in traditional villages. Places like Imlil, Chefchaouen, and the Valley of the Roses offer homestays where you can see Tifinagh symbols in daily life — on house doors, community centers, and local handicrafts.",
      fr: "Les voyageurs visitant les montagnes de l'Atlas ou la région du Rif peuvent vivre la culture amazighe de première main dans des villages traditionnels. Des endroits comme Imlil, Chefchaouen et la Vallée des Roses offrent des hébergements chez l'habitant où vous pouvez voir les symboles tifinagh dans la vie quotidienne — sur les portes des maisons, les centres communautaires et l'artisanat local.",
      ar: "يمكن للمسافرين الذين يزورون جبال الأطلس أو منطقة الريف تجربة الثقافة الأمازيغية بشكل مباشر في القرى التقليدية. أماكن مثل إمليل وشيفشاون ووادي الورود تقدم إقامات منزلية حيث يمكنك رؤية رموز تيفيناغ في الحياة اليومية — على أبواب المنازل والمراكز المجتمعية والحرف المحلية."
    },
    icon: <Store size={24} />
  },
  {
    title: { en: "Public Signs & Roads", fr: "Panneaux Publics & Routes", ar: "اللافتات العامة والطرق" },
    content: {
      en: "Since 2011, all public signs in Morocco are bilingual: Arabic and Tamazight (Tifinagh). You'll see Tifinagh on highway directions, airport terminals, train stations, and government buildings. Common words like 'ⴰⵏⵙⴰⴼ' (Welcome), 'ⴰⵖⴰⵔⴰⵙ' (Road), and 'ⴰⵎⴰⵡⴰⵍ' (Dictionary) appear regularly.",
      fr: "Depuis 2011, tous les panneaux publics au Maroc sont bilingues : arabe et tamazight (tifinagh). Vous verrez le tifinagh sur les directions autoroutières, les terminaux d'aéroport, les gares et les bâtiments gouvernementaux. Des mots courants comme 'ⴰⵏⵙⴰⴼ' (Bienvenue), 'ⴰⵖⴰⵔⴰⵙ' (Route) et 'ⴰⵎⴰⵡⴰⵍ' (Dictionnaire) apparaissent régulièrement.",
      ar: "منذ عام 2011، جميع اللافتات العامة في المغرب ثنائية اللغة: العربية والأمازيغية (تيفيناغ). سترى تيفيناغ على اتجاهات الطرق السريعة ومحطات المطارات ومحطات القطارات والمباني الحكومية. كلمات شائعة مثل 'ⴰⵏⵙⴰⴼ' (مرحباً)، 'ⴰⵖⴰⵔⴰⵙ' (طريق)، و'ⴰⵎⴰⵡⴰⵍ' (قاموس) تظهر بانتظام."
    },
    icon: <Map size={24} />
  },
  {
    title: { en: "Festivals & Celebrations", fr: "Festivals & Célébrations", ar: "المهرجانات والاحتفالات" },
    content: {
      en: "Amazigh culture comes alive during festivals like the Gnaoua World Music Festival in Essaouira, the Imilchil Marriage Festival, and the New Year (Yennayer) celebrations. These events feature Tifinagh art, traditional music (Ahwash, Achawak), dance, and Amazigh poetry — offering travelers unforgettable cultural immersion.",
      fr: "La culture amazighe prend vie lors de festivals comme le Festival Gnaoua d'Essaouira, le Festival des Mariages d'Imilchil et les célébrations du Nouvel An (Yennayer). Ces événements présentent l'art tifinagh, la musique traditionnelle (Ahwash, Achawak), la danse et la poésie amazighe — offrant aux voyageurs une immersion culturelle inoubliable.",
      ar: "تنبض الثقافة الأمازيغية بالحياة خلال المهرجانات مثل مهرجان كناوة العالمي في الصويرة ومهرجان إميلشيل للزواج واحتفالات رأس السنة (يناير). تتميز هذه الفعاليات بفن تيفيناغ والموسيقى التقليدية (أحواش، أشواك) والرقص والشعر الأمازيغي — مما يقدم للمسافرين انغماساً ثقافياً لا يُنسى."
    },
    icon: <Music size={24} />
  },
  {
    title: { en: "Daily Hospitality", fr: "Hospitalité Quotidienne", ar: "الضيافة اليومية" },
    content: {
      en: "You don't need to visit a museum to experience Amazigh culture — it's in everyday moments. When a shopkeeper greets you with 'Azul', when mint tea is poured from height, when a carpet seller explains the symbols in their weave — these interactions are living expressions of Amazigh identity. Recognizing Tifinagh symbols deepens these connections.",
      fr: "Vous n'avez pas besoin de visiter un musée pour vivre la culture amazighe — elle est dans les moments quotidiens. Quand un commerçant vous accueille avec 'Azul', quand le thé à la menthe est versé de haut, quand un vendeur de tapis explique les symboles dans leur tissage — ces interactions sont des expressions vivantes de l'identité amazighe. Reconnaître les symboles tifinagh approfondit ces connexions.",
      ar: "لا تحتاج لزيارة متحف لتجربة الثقافة الأمازيغية — إنها في اللحظات اليومية. عندما يستقبلك صاحب متجر بعبارة 'أزول'، عندما يُسكب الشاي من ارتفاع، عندما يشرح بائع سجاد الرموز في نسجهم — هذه التفاعلات هي تعبيرات حية عن الهوية الأمازيغية. التعرف على رموز تيفيناغ يعمق هذه الروابط."
    },
    icon: <Heart size={24} />
  }
];

const scenarioData = [
  {
    q: { en: "You are visiting an Amazigh village in the Atlas Mountains. An elder greets you by saying 'Azul' and pointing to a carved ⵣ symbol on the door. What does this symbol represent?", fr: "Vous visitez un village amazigh dans les montagnes de l'Atlas. Un ancien vous accueille en disant 'Azul' et en pointant un symbole ⵣ sculpté sur la porte. Que représente ce symbole ?", ar: "أنت تزور قرية أمازيغية في جبال الأطلس. يرحب بك أحد الشيوخ بقوله 'أزول' ويشير إلى رمز ⵣ منحوت على الباب. ماذا يمثل هذا الرمز؟" },
    options: { en: ["The sun god", "The free man (Amazigh identity)", "A warning sign", "A family name"], fr: ["Le dieu soleil", "L'homme libre (identité amazighe)", "Un panneau d'avertissement", "Un nom de famille"], ar: ["إله الشمس", "الرجل الحر (الهوية الأمازيغية)", "علامة تحذير", "اسم عائلة"] },
    answer: 1,
    feedback: { en: "Correct! The ⵣ (Yaz) is the symbol of the free man and the central emblem of Amazigh identity. It's a welcoming and protective symbol often carved on village homes.", fr: "Correct ! Le ⵣ (Yaz) est le symbole de l'homme libre et l'emblème central de l'identité amazighe. C'est un symbole d'accueil et de protection souvent sculpté sur les maisons villageoises.", ar: "صحيح! ⵣ (ياز) هو رمز الرجل الحر والشعار المركزي للهوية الأمازيغية. إنه رمز ترحيبي وواقٍ يُنحت غالباً على منازل القرى." },
    feedbackWrong: { en: "Not quite. The ⵣ (Yaz) actually represents the free man and is the central symbol of Amazigh identity and pride.", fr: "Pas tout à fait. Le ⵣ (Yaz) représente en fait l'homme libre et est le symbole central de l'identité et de la fierté amazighes.", ar: "ليس تمامًا. ⵣ (ياز) في الواقع يمثل الرجل الحر وهو الرمز المركزي للهوية والفخر الأمازيغيين." }
  },
  {
    q: { en: "You're driving on a Moroccan highway and see a blue sign with 'ⴰⵖⴰⵔⴰⵙ' written in Tifinagh below the Arabic. What does this word likely mean?", fr: "Vous conduisez sur une autoroute marocaine et voyez un panneau bleu avec 'ⴰⵖⴰⵔⴰⵙ' écrit en tifinagh sous l'arabe. Que signifie probablement ce mot ?", ar: "أنت تقود على طريق سريع مغربي وترى لافتة زرقاء مكتوب عليها 'ⴰⵖⴰⵔⴰⵙ' بتيفيناغ أسفل العربية. ما هو المعنى المحتمل لهذه الكلمة؟" },
    options: { en: ["Welcome / Bienvenue", "Road / Route", "Museum / Musée", "Market / Marché"], fr: ["Welcome / Bienvenue", "Road / Route", "Museum / Musée", "Market / Marché"], ar: ["مرحباً", "طريق", "متحف", "سوق"] },
    answer: 1,
    feedback: { en: "Correct! 'ⴰⵖⴰⵔⴰⵙ' (Agharas) means 'Road' or 'Path'. Since 2011, all Moroccan highway and directional signs include Tifinagh translations.", fr: "Correct ! 'ⴰⵖⴰⵔⴰⵙ' (Agharas) signifie 'Route' ou 'Chemin'. Depuis 2011, toutes les autoroutes et panneaux directionnels marocains incluent des traductions en tifinagh.", ar: "صحيح! 'ⴰⵖⴰⵔⴰⵙ' (أغاراس) تعني 'طريق' أو 'مسار'. منذ عام 2011، تشمل جميع الطرق السريعة المغربية ولوحات الاتجاهات ترجمات بتيفيناغ." },
    feedbackWrong: { en: "Not quite. On a highway sign, a word starting with 'ⴰ' often indicates a place or thing like 'Road'. 'Agharas' means Road.", fr: "Pas tout à fait. Sur un panneau autoroutier, un mot commençant par 'ⴰ' indique souvent un lieu ou une chose comme 'Route'. 'Agharas' signifie Route.", ar: "ليس تمامًا. على لافتة طريق سريع، الكلمة التي تبدأ بـ 'ⴰ' غالباً ما تشير إلى مكان أو شيء مثل 'طريق'. 'أغاراس' تعني طريق." }
  },
  {
    q: { en: "You visit the Amazigh Culture Museum in Agadir and see silver jewelry engraved with the symbol 'ⵉ' (Yi). What does this symbol traditionally represent?", fr: "Vous visitez le Musée de la Culture Amazighe à Agadir et voyez des bijoux en argent gravés du symbole 'ⵉ' (Yi). Que représente traditionnellement ce symbole ?", ar: "تزور متحف الثقافة الأمازيغية في أكادير وترى مجوهرات فضية منقوشة برمز 'ⵉ' (يي). ماذا يمثل هذا الرمز تقليدياً؟" },
    options: { en: ["Death and mourning", "Wealth and money", "Life and vitality", "War and battle"], fr: ["La mort et le deuil", "La richesse et l'argent", "La vie et la vitalité", "La guerre et la bataille"], ar: ["الموت والحداد", "الثروة والمال", "الحياة والحيوية", "الحرب والمعركة"] },
    answer: 2,
    feedback: { en: "Correct! ⵉ (Yi) symbolizes life and vitality. It appears in words like 'ⴰⵎⴰⵏ' (water) and 'ⵜⴰⴼⵓⴽⵜ' (sun), which are essential for life.", fr: "Correct ! ⵉ (Yi) symbolise la vie et la vitalité. Il apparaît dans des mots comme 'ⴰⵎⴰⵏ' (eau) et 'ⵜⴰⴼⵓⴽⵜ' (soleil), essentiels à la vie.", ar: "صحيح! ⵉ (يي) يرمز للحياة والحيوية. يظهر في كلمات مثل 'ⴰⵎⴰⵏ' (ماء) و'ⵜⴰⴼⵓⴽⵜ' (شمس)، الضروريتين للحياة." },
    feedbackWrong: { en: "Actually, ⵉ (Yi) represents life and vitality. It's a positive symbol associated with growth and energy.", fr: "En fait, ⵉ (Yi) représente la vie et la vitalité. C'est un symbole positif associé à la croissance et à l'énergie.", ar: "في الواقع، ⵉ (يي) يمثل الحياة والحيوية. إنه رمز إيجابي يرتبط بالنمو والطاقة." }
  }
];

const quizData = [
  {
    q: { en: 'What does the "ⵣ" (Yaz) symbol represent?', fr: 'Que représente le symbole "ⵣ" (Yaz) ?', ar: 'ماذا يمثل رمز "ⵣ" (ياز)؟' },
    options: { en: ["The Sun", "The Free Man", "The Ocean", "The Mountain"], fr: ["Le Soleil", "L'Homme libre", "L'Océan", "La Montagne"], ar: ["الشمس", "الرجل الحر", "المحيط", "الجبل"] },
    answer: 1
  },
  {
    q: { en: 'Where might you see Tifinagh symbols as art?', fr: 'Où pourriez-vous voir des symboles tifinagh comme art ?', ar: 'أين قد ترى رموز تيفيناغ كفن؟' },
    options: { en: ["Only in books", "On silver jewelry and carpets", "On airplanes", "Only in museums"], fr: ["Uniquement dans les livres", "Sur les bijoux en argent et les tapis", "Sur les avions", "Uniquement dans les musées"], ar: ["فقط في الكتب", "على المجوهرات الفضية والسجاد", "على الطائرات", "فقط في المتاحف"] },
    answer: 1
  },
  {
    q: { en: 'What does the Tifinagh letter "ⵜ" (Yat) often symbolize?', fr: 'Que symbolise souvent la lettre tifinagh "ⵜ" (Yat) ?', ar: 'ماذا يرمز حرف تيفيناغ "ⵜ" (يات) غالباً؟' },
    options: { en: ["Feminine energy and protection", "Water and rain", "Fire", "Kings and Queens"], fr: ["Énergie féminine et protection", "Eau et pluie", "Feu", "Rois et Reines"], ar: ["الطاقة الأنثوية والحماية", "الماء والمطر", "النار", "الملوك والملكات"] },
    answer: 0
  },
  {
    q: { en: 'What do the three colors of the Amazigh flag represent?', fr: 'Que représentent les trois couleurs du drapeau amazigh ?', ar: 'ماذا تمثل الألوان الثلاثة للعلم الأمازيغي؟' },
    options: { en: ["Blue (sky), Green (mountains), Yellow (desert)", "Red, White, Black (freedom)", "Gold, Silver, Bronze (wealth)", "Blue (water), White (peace), Green (nature)"], fr: ["Bleu (ciel), Vert (montagnes), Jaune (désert)", "Rouge, Blanc, Noir (liberté)", "Or, Argent, Bronze (richesse)", "Bleu (eau), Blanc (paix), Vert (nature)"], ar: ["أزرق (السماء)، أخضر (الجبال)، أصفر (الصحراء)", "أحمر، أبيض، أسود (الحرية)", "ذهب، فضة، برونز (ثروة)", "أزرق (ماء)، أبيض (سلام)، أخضر (طبيعة)"] },
    answer: 0
  },
  {
    q: { en: 'In which year was Tamazight recognized as an official language of Morocco?', fr: 'En quelle année le tamazight a-t-il été reconnu comme langue officielle du Maroc ?', ar: 'في أي عام تم الاعتراف بالأمازيغية كلغة رسمية للمغرب؟' },
    options: { en: ["1999", "2005", "2011", "2018"], fr: ["1999", "2005", "2011", "2018"], ar: ["1999", "2005", "2011", "2018"] },
    answer: 2
  }
];

const STEPS = ["intro", "spotlight", "identity", "art", "discovery", "interactive", "scenarios", "quiz", "completion"];

const STEP_LABELS = {
  intro: { en: "Introduction", fr: "Introduction", ar: "مقدمة" },
  spotlight: { en: "Symbol Spotlight", fr: "Symbole Vedette", ar: "تسليط الضوء على الرمز" },
  identity: { en: "Amazigh Identity", fr: "Identité Amazighe", ar: "الهوية الأمازيغية" },
  art: { en: "Art & Architecture", fr: "Art & Architecture", ar: "الفن والعمارة" },
  discovery: { en: "Cultural Discovery", fr: "Découverte Culturelle", ar: "اكتشاف ثقافي" },
  interactive: { en: "Interactive Exploration", fr: "Exploration Interactive", ar: "استكشاف تفاعلي" },
  scenarios: { en: "Scenario-Based Learning", fr: "Apprentissage par Situations", ar: "التعلم القائم على السيناريوهات" },
  quiz: { en: "Culture Quiz", fr: "Quiz Culturel", ar: "اختبار ثقافي" },
  completion: { en: "Completion", fr: "Achèvement", ar: "اكتمال" }
};

function Mission5() {
  const { lang, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [selectedInteractiveSymbol, setSelectedInteractiveSymbol] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [currentStepIndex]);

  const step = STEPS[currentStepIndex];
  useAutoProgress(step);
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  const handleNext = () => { if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1); };
  const handleBack = () => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); };

  const getLangProp = (item, prop) => {
    if (typeof item[prop] === 'object') return item[prop][lang.toLowerCase()] || item[prop].en;
    return item[prop] || item[lang.toLowerCase()] || item.en || "";
  };

  const getStepLabel = (stepKey) => {
    const labels = STEP_LABELS[stepKey];
    if (!labels) return stepKey;
    return labels[lang.toLowerCase()] || labels.en;
  };

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const isCorrect = idx === quizData[quizQuestionIndex].answer;
    setQuizFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect && quizQuestionIndex < quizData.length - 1) {
      setTimeout(() => { setQuizQuestionIndex(prev => prev + 1); setSelectedOption(null); setQuizFeedback(null); }, 1500);
    } else if (!isCorrect) {
      setTimeout(() => { setSelectedOption(null); setQuizFeedback(null); }, 1500);
    }
  };

  const handleScenarioAnswer = (idx) => {
    if (scenarioFeedback) return;
    setScenarioFeedback(idx === scenarioData[currentScenarioIndex].answer ? "correct" : "wrong");
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarioData.length - 1) { setCurrentScenarioIndex(prev => prev + 1); setScenarioFeedback(null); }
    else { handleNext(); }
  };

  const pathMatch = window.location.pathname.match(/\/languages\/(\w+)\/mission-(\d+)/);
  const currentTrack = pathMatch?.[1];
  const currentMissionNum = pathMatch?.[2] ? parseInt(pathMatch[2]) : 0;
  if (currentTrack && currentMissionNum && !canAccessMission(currentTrack, currentMissionNum, user)) {
    return <LockedScreen track={currentTrack} />;
  }
  return (
    <div className={`mission-container tifinagh-theme ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mission-header">
        <button className="mission-close" onClick={() => navigate("/languages")}><X size={24} /></button>
        <FavoriteButton track="tifinagh" missionNum={5} />
        <div className="mission-progress-bar"><div className="mission-progress-fill" style={{ width: `${progressPercent}%` }}></div></div>
      </div>

      <div className="step-indicator">
        <span className="step-indicator-number">{lang === "FR" ? "Étape" : lang === "AR" ? "خطوة" : "Step"} {currentStepIndex + 1}/{STEPS.length}</span>
        <span className="step-indicator-name">{getStepLabel(step)}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="mission-content">

          {/* STEP 0: INTRO */}
          {step === "intro" && (
            <div className="intro-step">
              <div className="intro-icon"><Compass size={40} /></div>
              <h1 className="intro-title">{lang === "FR" ? "Culture & Symboles Amazighs" : lang === "AR" ? "الثقافة والرموز الأمازيغية" : "Amazigh Culture & Symbols"}</h1>
              <p className="intro-desc">
                {lang === "FR" ? "Le tifinagh est plus qu'un alphabet ; c'est un lien profond avec l'identité nord-africaine. Explorez les significations culturelles derrière les symboles et découvrez comment les rencontrer dans votre voyage au Maroc." :
                 lang === "AR" ? "تيفيناغ أكثر من مجرد أبجدية؛ إنه ارتباط عميق بهوية شمال إفريقيا. استكشف المعاني الثقافية وراء الرموز واكتشف كيف ستواجهها في رحلتك إلى المغرب." :
                 "Tifinagh is more than an alphabet; it's a deep connection to North African identity. Explore the cultural meanings behind the symbols and discover how you'll encounter them on your journey through Morocco."}
              </p>
              <button className="mission-btn" onClick={handleNext}>
                {lang === "FR" ? "Commencer la mission" : lang === "AR" ? "ابدأ المهمة" : "Start Mission"}
              </button>
            </div>
          )}

          {/* STEP 1: SYMBOL SPOTLIGHT */}
          {step === "spotlight" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "L'Emblème : Le Yaz (ⵣ)" : lang === "AR" ? "الرمز: ياز (ⵣ)" : "The Emblem: The Yaz (ⵣ)"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Le cœur de l'identité amazighe." : lang === "AR" ? "قلب الهوية الأمازيغية." : "The core of Amazigh identity."}</p>

              <div className="vocab-card tifinagh-card-override" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 100%)' }}>
                <div style={{ fontSize: '6rem', color: 'var(--learn-primary)', marginBottom: '4px', textShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif' }}>ⵣ</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>Yaz</div>
                <div style={{ fontSize: '1.2rem', color: 'var(--learn-primary)', fontWeight: 600, marginBottom: '16px' }}>{getLangProp(symbolsData[0], 'title')}</div>
                <div style={{ fontSize: '1.1rem', color: 'var(--learn-text-secondary)', textAlign: 'center', maxWidth: '80%', lineHeight: '1.6' }}>
                  {getLangProp(symbolsData[0], 'cultural')}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AMAZIGH IDENTITY */}
          {step === "identity" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Identité Amazighe" : lang === "AR" ? "الهوية الأمازيغية" : "Amazigh Identity"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Le peuple, la langue et l'écriture." : lang === "AR" ? "الشعب واللغة والكتابة." : "The people, the language, and the script."}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {identityData.map((item, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{ padding: '28px', border: '1px solid var(--learn-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div style={{ color: 'var(--learn-primary)', background: 'rgba(59,130,246,0.08)', padding: '10px', borderRadius: '12px' }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--learn-primary)' }}>
                          {getLangProp(item, 'title')}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--learn-text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                          {getLangProp(item, 'tag')}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                      {getLangProp(item, 'content')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: ART & ARCHITECTURE */}
          {step === "art" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Art & Architecture" : lang === "AR" ? "الفن والعمارة" : "Art & Architecture"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Le tifinagh dans la vie quotidienne et les monuments." : lang === "AR" ? "تيفيناغ في الحياة اليومية والمعالم." : "Tifinagh in daily life and monuments."}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {artData.map((item, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ color: 'var(--learn-primary)', background: 'rgba(59,130,246,0.08)', padding: '8px', borderRadius: '10px' }}>
                        {item.icon}
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--learn-primary)' }}>
                        {getLangProp(item, 'title')}
                      </div>
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.65', fontSize: '0.95rem' }}>
                      {getLangProp(item, 'content')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: CULTURAL DISCOVERY */}
          {step === "discovery" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Découverte Culturelle" : lang === "AR" ? "اكتشاف ثقافي" : "Cultural Discovery"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Où rencontrer la culture amazighe au Maroc." : lang === "AR" ? "أين تلتقي بالثقافة الأمازيغية في المغرب." : "Where to encounter Amazigh culture in Morocco."}</p>

              <div className="vocab-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {discoveryData.map((item, idx) => (
                  <div key={idx} className="vocab-card tifinagh-card-override" style={{ padding: '24px', border: '1px solid var(--learn-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                      <div style={{ color: 'var(--learn-primary)', background: 'rgba(59,130,246,0.08)', padding: '10px', borderRadius: '12px' }}>
                        {item.icon}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--learn-primary)' }}>
                        {getLangProp(item, 'title')}
                      </div>
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.65', fontSize: '0.95rem' }}>
                      {getLangProp(item, 'content')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: INTERACTIVE EXPLORATION */}
          {step === "interactive" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Exploration Interactive" : lang === "AR" ? "استكشاف تفاعلي" : "Interactive Exploration"}</h2>
              <p className="step-subtitle">{lang === "FR" ? "Sélectionnez un symbole pour découvrir sa signification, son histoire et son importance culturelle." : lang === "AR" ? "اختر رمزاً لاكتشاف معناه وتاريخه وأهميته الثقافية." : "Select a symbol to discover its meaning, history, and cultural significance."}</p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                {symbolsData.map((sym, idx) => (
                  <button
                    key={idx}
                    className={`vocab-card tifinagh-card-override ${selectedInteractiveSymbol === idx ? 'selected' : ''}`}
                    style={{ flex: '1 1 60px', maxWidth: '80px', display: 'flex', justifyContent: 'center', padding: '16px', border: selectedInteractiveSymbol === idx ? '2px solid var(--learn-primary)' : '2px solid transparent', cursor: 'pointer', background: selectedInteractiveSymbol === idx ? 'rgba(59,130,246,0.08)' : 'transparent' }}
                    onClick={() => setSelectedInteractiveSymbol(idx)}
                  >
                    <span className="tifinagh-script" style={{ fontSize: '2.5rem', color: selectedInteractiveSymbol === idx ? 'var(--learn-primary)' : 'var(--learn-text-secondary)', fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif' }}>{sym.symbol}</span>
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedInteractiveSymbol}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="vocab-card tifinagh-card-override"
                style={{ padding: '28px' }}
              >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div className="tifinagh-script" style={{ fontSize: '4rem', color: 'var(--learn-primary)', marginBottom: '8px', fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif' }}>{symbolsData[selectedInteractiveSymbol].symbol}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{symbolsData[selectedInteractiveSymbol].name}</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--learn-primary)', fontWeight: 600 }}>{getLangProp(symbolsData[selectedInteractiveSymbol], 'title')}</div>
                  <SaveVocabButton id={'tifinagh_5_' + symbolsData[selectedInteractiveSymbol].symbol} word={symbolsData[selectedInteractiveSymbol].symbol} translation={getLangProp(symbolsData[selectedInteractiveSymbol], 'title')} track="tifinagh" missionNum={5} type="vocab" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'rgba(59,130,246,0.05)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--learn-primary)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--learn-primary)', marginBottom: '4px' }}>
                      {lang === "FR" ? "Signification" : lang === "AR" ? "المعنى" : "Meaning"}
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.5' }}>{getLangProp(symbolsData[selectedInteractiveSymbol], 'meaning')}</div>
                  </div>
                  <div style={{ background: 'rgba(59,130,246,0.05)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--learn-primary)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--learn-primary)', marginBottom: '4px' }}>
                      {lang === "FR" ? "Histoire" : lang === "AR" ? "التاريخ" : "History"}
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.5' }}>{getLangProp(symbolsData[selectedInteractiveSymbol], 'history')}</div>
                  </div>
                  <div style={{ background: 'rgba(59,130,246,0.05)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--learn-primary)' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--learn-primary)', marginBottom: '4px' }}>
                      {lang === "FR" ? "Importance Culturelle" : lang === "AR" ? "الأهمية الثقافية" : "Cultural Significance"}
                    </div>
                    <div style={{ color: 'var(--learn-text-secondary)', lineHeight: '1.5' }}>{getLangProp(symbolsData[selectedInteractiveSymbol], 'cultural')}</div>
                  </div>
                </div>
              </motion.div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
                <button className="mission-btn" onClick={handleNext}>
                  {lang === "FR" ? "Continuer vers les Scénarios" : lang === "AR" ? "تابع إلى السيناريوهات" : "Continue to Scenarios"} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: SCENARIO-BASED LEARNING */}
          {step === "scenarios" && (() => {
            const sc = scenarioData[currentScenarioIndex];
            return (
              <div>
                <h2 className="step-title" style={{ textAlign: "center" }}>{lang === "FR" ? "Apprentissage par Situations" : lang === "AR" ? "التعلم القائم على السيناريوهات" : "Scenario-Based Learning"}</h2>
                <p className="step-subtitle" style={{ textAlign: "center" }}>
                  {lang === "FR" ? `Situation ${currentScenarioIndex + 1} sur ${scenarioData.length}` : lang === "AR" ? `السيناريو ${currentScenarioIndex + 1} من ${scenarioData.length}` : `Scenario ${currentScenarioIndex + 1} of ${scenarioData.length}`}
                </p>
                <div className="quiz-card" style={{ maxWidth: 600, margin: "0 auto" }}>
                  <div className="quiz-question">{getLangProp(sc, 'q')}</div>
                  <div className="quiz-options">
                    {getLangProp(sc, 'options').map((opt, idx) => {
                      let cls = "quiz-option";
                      if (scenarioFeedback) {
                        if (idx === sc.answer) cls += " correct";
                        else cls += " wrong";
                      }
                      return <button key={idx} className={cls} onClick={() => handleScenarioAnswer(idx)} disabled={scenarioFeedback !== null}>{opt}</button>;
                    })}
                  </div>
                  {scenarioFeedback && (
                    <div className={`quiz-feedback ${scenarioFeedback === "correct" ? "correct-text" : "wrong-text"}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>{scenarioFeedback === "correct" ? getLangProp(sc, 'feedback') : getLangProp(sc, 'feedbackWrong')}</div>
                      {scenarioFeedback === "correct" && (
                        <button className="mission-btn" style={{ alignSelf: "center", marginTop: 8 }} onClick={handleNextScenario}>
                          {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
                        </button>
                      )}
                      {scenarioFeedback === "wrong" && (
                        <button className="mission-btn secondary" style={{ alignSelf: "center", marginTop: 8 }} onClick={() => setScenarioFeedback(null)}>
                          {lang === "FR" ? "Réessayer" : lang === "AR" ? "حاول مرة أخرى" : "Retry"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* STEP 7: QUIZ */}
          {step === "quiz" && (
            <div>
              <h2 className="step-title">{lang === "FR" ? "Quiz Culturel" : lang === "AR" ? "اختبار ثقافي" : "Culture Quiz"}</h2>
              <p className="step-subtitle">
                {lang === "FR" ? `Question ${quizQuestionIndex + 1} sur ${quizData.length}` : lang === "AR" ? `السؤال ${quizQuestionIndex + 1} من ${quizData.length}` : `Question ${quizQuestionIndex + 1} of ${quizData.length}`}
              </p>
              <div className="quiz-card">
                <div className="quiz-question">{getLangProp(quizData[quizQuestionIndex], 'q')}</div>
                <div className="quiz-options">
                  {getLangProp(quizData[quizQuestionIndex], 'options').map((opt, idx) => {
                    let cls = "quiz-option";
                    if (selectedOption === idx) { if (quizFeedback === 'correct') cls += " correct"; else if (quizFeedback === 'wrong') cls += " wrong"; else cls += " selected"; }
                    else if (selectedOption !== null && idx === quizData[quizQuestionIndex].answer && quizFeedback === 'wrong') cls += " correct";
                    return <button key={idx} className={cls} onClick={() => handleQuizAnswer(idx)} disabled={selectedOption !== null}>{opt}</button>;
                  })}
                </div>
                <div className={`quiz-feedback ${quizFeedback ? (quizFeedback === 'correct' ? 'correct-text' : 'wrong-text') : ''}`}>
                  {quizFeedback === 'correct' && (lang === "FR" ? "Excellent !" : lang === "AR" ? "ممتاز!" : "Excellent!")}
                  {quizFeedback === 'wrong' && (lang === "FR" ? "Oops, essayez encore." : lang === "AR" ? "عفوا، حاول مرة أخرى." : "Oops, try again.")}
                </div>
                {quizFeedback === 'correct' && quizQuestionIndex === quizData.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="mission-btn" onClick={handleNext}>
                      {lang === "FR" ? "Voir la Fin" : lang === "AR" ? "عرض الإكمال" : "See Completion"} <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 8: FINAL COMPLETION */}
          {step === "completion" && (
            <div className="completion-step">
              <div className="completion-icon" style={{ background: 'linear-gradient(135deg, var(--learn-accent) 0%, #0284c7 50%, #38bdf8 100%)', padding: '24px', borderRadius: '50%', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }}>
                <Trophy size={64} />
              </div>
              <h1 className="intro-title" style={{ fontSize: '2.5rem', marginTop: '20px' }}>
                {lang === "FR" ? "Félicitations !" : lang === "AR" ? "مبروك!" : "Congratulations!"}
              </h1>
              <p className="intro-desc" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                {lang === "FR" ? "Vous avez terminé le parcours complet d'apprentissage du Tifinagh. Vous pouvez maintenant lire et comprendre les symboles et la culture amazighe." :
                 lang === "AR" ? "لقد أكملت مسار تعلم تيفيناغ بالكامل. يمكنك الآن قراءة وفهم الرموز والثقافة الأمازيغية." :
                 "You have completed the full Tifinagh Learning Path. You can now read and understand Amazigh symbols and culture."}
              </p>

              {/* PROGRESSION ROADMAP */}
              <div style={{ textAlign: 'left', background: 'var(--learn-surface)', padding: '28px', borderRadius: '20px', border: '2px solid var(--learn-primary)', width: '100%', maxWidth: '460px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <span className="tifinagh-script" style={{ fontSize: '2.5rem', color: 'var(--learn-primary)', fontFamily: '"Noto Sans Tifinagh", "Segoe UI Symbol", "Arial Unicode MS", sans-serif' }}>ⵣ</span>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--learn-primary)', textAlign: 'center', marginTop: '8px' }}>
                    {lang === "FR" ? "Parcours Tifinagh Terminé" : lang === "AR" ? "تم إكمال مسار تيفيناغ" : "Tifinagh Path Completed"}
                  </h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { fr: "Mission 1 : Découvrir les Symboles", ar: "المهمة 1: اكتشاف الرموز", en: "Mission 1: Discover Symbols" },
                    { fr: "Mission 2 : Écrire Votre Premier Mot", ar: "المهمة 2: كتابة كلمتك الأولى", en: "Mission 2: Write Your First Word" },
                    { fr: "Mission 3 : Lire les Panneaux", ar: "المهمة 3: قراءة اللافتات", en: "Mission 3: Reading Common Signs" },
                    { fr: "Mission 4 : Mots du Quotidien", ar: "المهمة 4: كلمات يومية", en: "Mission 4: Everyday Words" },
                    { fr: "Mission 5 : Culture & Symboles", ar: "المهمة 5: الثقافة والرموز", en: "Mission 5: Culture & Symbols" },
                    { fr: "Mission 6 : Alphabet Complet", ar: "المهمة 6: الأبجدية الكاملة", en: "Mission 6: Complete Alphabet" }
                  ].map((mission, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--learn-success)', padding: '10px 12px', background: 'rgba(16, 185, 129, 0.06)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                      <CheckCircle size={22} fill="currentColor" color="white" />
                      <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                        {lang === "FR" ? mission.fr : lang === "AR" ? mission.ar : mission.en}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px', padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '12px', border: '1px dashed var(--learn-primary)' }}>
                  <span style={{ fontSize: '0.95rem', color: 'var(--learn-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Trophy size={20} />
                    {lang === "FR" ? "5 missions complétées — Continuez vers la mission finale !" : lang === "AR" ? "5 مهام مكتملة — تابع إلى المهمة النهائية!" : "5 missions completed — Continue to the final mission!"}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button className="mission-btn" onClick={() => navigate("/languages/tifinagh/mission-6")}>
                  {lang === "FR" ? "Aller à la Mission 6" : lang === "AR" ? "انتقل إلى المهمة 6" : "Go to Mission 6"}
                  <ArrowRight size={20} />
                </button>
                <button className="mission-btn secondary" onClick={() => navigate("/languages")}>
                  {lang === "FR" ? "Retour au Hub d'Apprentissage" : lang === "AR" ? "العودة إلى لوحة التعلم" : "Return to Learning Hub"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== "intro" && step !== "completion" && step !== "quiz" && step !== "interactive" && step !== "scenarios" && (
        <div className="mission-footer">
          <button className="mission-btn secondary" onClick={handleBack} disabled={currentStepIndex === 0}>
            <ArrowLeft size={18} /> {lang === "FR" ? "Précédent" : lang === "AR" ? "السابق" : "Back"}
          </button>
          <button className="mission-btn" onClick={handleNext}>
            {lang === "FR" ? "Continuer" : lang === "AR" ? "متابعة" : "Continue"} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Mission5;
