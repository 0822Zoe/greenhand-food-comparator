(() => {
  'use strict';

  const SUPABASE_URL = 'https://dxmdqsktvddlvburtnkv.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_lfMrcOmLdYScnGimlsRAuA_MQmuZZcW';
  const GROUPS = ['fruits','vegetables','cereals','starchy_staples','legumes_nuts','meat','fish_seafood','eggs','dairy','oils_fats','sweets','nonalcoholic_beverages','alcoholic_beverages','salt_condiments','condiments_mixed','other'];
  const GROUP_LABELS = {
    fruits:['Fruit','Fruits','水果'], vegetables:['Vegetables','Légumes','蔬菜'], cereals:['Cereals','Céréales','谷物'], starchy_staples:['Starchy staples','Féculents','淀粉类主食'], legumes_nuts:['Legumes & nuts','Légumineuses et noix','豆类和坚果'], meat:['Meat','Viande','肉类'], fish_seafood:['Fish & seafood','Poissons et fruits de mer','鱼类和海鲜'], eggs:['Eggs','Œufs','蛋类'], dairy:['Dairy','Produits laitiers','乳制品'], oils_fats:['Oils & fats','Huiles et matières grasses','油脂'], sweets:['Sweets','Produits sucrés','甜食'], nonalcoholic_beverages:['Non-alcoholic drinks','Boissons sans alcool','非酒精饮料'], alcoholic_beverages:['Alcoholic drinks','Boissons alcoolisées','酒精饮料'], salt_condiments:['Salt & condiments','Sel et condiments','盐和调味料'], condiments_mixed:['Mixed foods & condiments','Plats et condiments','混合食品和调味料'], other:['Other / unclassified','Autre / non classé','其他/未分类']
  };
  const I18N = {
    en:{kicker:'FOOD DIARY · YOUR RULES · CLEAR REFERENCES',title:'Make your food record useful.',lead:'Choose foods from the supplied catalogue, record what you ate, then see how your own limits and public-health references compare.',notice:'Personal food tracking only. Do not enter patient records or diagnoses. This is educational information, not medical advice.',account:'Your private account',accountTitle:'Save your records across devices',create:'Create account',signin:'Sign in',signout:'Sign out',email:'Email',password:'Password (8+ characters)',accountHelp:'Before sign-in, entries are kept only in this open tab. After sign-in, your records sync to your private account. Each account can access only its own rows.',entry:'TODAY’S FOOD LOG',addFood:'Add a food',entryHelp:'Search the catalogue below or type a food name. Selecting a catalogue food fills its group and sample portion.',food:'Food name',group:'Food group',amount:'Amount',unit:'Unit',date:'Date',salt:'Salt (g), optional',sugar:'Free sugars (g), optional',energy:'Energy (kcal), optional',add:'Add to today’s log',diary:'Your entries',emptyDiary:'No foods recorded for this day yet.',remove:'Remove',catalog:'SEARCHABLE FOOD CATALOGUE',catalogTitle:'Choose a food',filter:'Search food catalogue',catalogHelp:'Use a food to add it to the log. The listed amount is a sample from your dataset, not a recommended serving.',foodCol:'Food',groupCol:'Group',sample:'Sample amount',energyCol:'Energy / 100 g',action:'Action',use:'Use',noFoods:'No foods match this search.',rules:'YOUR OWN COMPARISON',rulesTitle:'Set your own limits',rulesHelp:'Enter a minimum and maximum for a food group. The app compares the total logged amount for this date and unit.',minimum:'Minimum',maximum:'Maximum',saveRule:'Save my rule',noRules:'No personal rules yet. Add one above to compare your entries.',who:'PUBLIC HEALTH REFERENCES',whoTitle:'WHO indicators for this date',whoHelp:'These broad references are not individual targets. Incomplete inputs or missing food data are marked as partial.',noWho:'Add foods to see what can be compared.',association:'DATASET PATTERNS',associationTitle:'Often purchased together',associationHelp:'This is grocery co-occurrence from the supplied rules.csv. It does not mean a food is healthy, suitable, or causes another choice.',associationEmpty:'Add catalogue foods to see matching purchase patterns.',method:'How to read these numbers',methodText:'Support is the share of baskets containing both sides of a rule. Confidence is the share of baskets with the antecedent that also contain its consequent. Lift compares that rate with the consequent’s overall frequency. Lift above 1 means more frequent co-occurrence in this dataset, not a causal or healthy recommendation.',support:'Support',confidence:'Confidence',lift:'Lift',data:'DATA AND PRIVACY',dataTitle:'Where the information comes from',sourceCatalog:'Food names/groups: foodID_groceries.csv. Example amounts: top_50_items_amount.xlsx. Nutrient estimates: NZFOODNutrients.xlsx, averaged across mapped FoodIDs. Amounts in ml are not converted to grams for nutrient estimates.',sourceGroups:'Food groups are practical broad mappings of the supplied labels, informed by FAO/WHO GIFT grouping concepts. Source data has no FoodEx2 codes; this is not official FoodEx2 coding.',sourceIntake:'The table below is copied from Nutrition intake.xlsx. It is a project reference, not WHO guidance or a personalized requirement.',storage:'Signed-in food entries and rules are stored in Supabase Postgres. Row-level security limits access to your own account. Without sign-in, data stays in this tab and is not sent to the database.',nutrient:'Project nutrient',value:'Reference value',direction:'Flag',beneficial:'Beneficial in source',limit:'Limit in source',footer:'GreenHand helps you review a food log. It does not diagnose, prevent, or treat disease.',loading:'Loading the supplied food catalogue…',loaded:n=>`${n} foods loaded from your supplied files.`,loadError:'Could not load the food data. Refresh this page and check your connection.',statusReady:'Ready. Your unsaved entries exist only in this tab.',needLogin:'Sign in to save records to your account. You can still use this page for a temporary session.',saved:'Saved.',deleted:'Entry removed.',ruleSaved:'Rule saved.',signupSent:'Account created. Check your email to confirm before signing in.',signedIn:'Signed in. Your private records are loaded.',authError:'Account request failed. Check your email/password and Supabase Auth URL settings.',dbError:'Could not sync with the database. Your data has not been confirmed as saved.',noData:'Not enough data to assess',within:'Within your rule',below:'Below your rule',above:'Above your rule',range:'Logged {amount} {unit}; your range is {min}–{max} {unit}.',whoFruit:'Fruit and vegetables',whoSalt:'Salt equivalent',whoSugar:'Free sugars',whoEnergy:'Energy input',whoFruitExplain:'WHO reference: at least 400 g/day for people over 10 years. Only mapped fruit/vegetable entries measured in grams are counted; juice and starchy roots are excluded. Missing food matches make this partial.',whoSaltExplain:'WHO reference for adults: less than 5 g salt/day, equivalent to less than 2,000 mg sodium. Estimated from mapped sodium only for gram entries; add known salt directly for better coverage.',whoSugarExplain:'WHO advises free sugars below 10% of total daily energy, with below 5% as a conditional further benefit. Total sugars in the catalogue are not treated as free sugars; enter free sugars and total energy to compare.',whoEnergyExplain:'Energy total is assessed only when you enter the energy value for each item. Otherwise free-sugar percentage cannot be calculated.',partial:'Partial estimate',complete:'Based on entered data',nutritionMissing:'No mapped nutrient estimate for this item.',sourceGroup:'Source group',statusLabel:'Status',unknown:'Not available',amountInvalid:'Enter an amount greater than zero.',dateLabel:'Date',signedOut:'Signed out. Data already saved remains in your account.',whoSource:'WHO healthy diet',saltSource:'WHO sodium guidance', foodAdded:'Food added to your log.'},
    fr:{kicker:'JOURNAL ALIMENTAIRE · VOS RÈGLES · REPÈRES EXPLIQUÉS',title:'Tirez parti de votre journal alimentaire.',lead:'Choisissez dans le catalogue fourni, notez vos aliments, puis comparez vos propres limites aux repères de santé publique.',notice:'Suivi alimentaire personnel uniquement. Ne saisissez aucun dossier ni diagnostic de patient. Informations pédagogiques, pas un avis médical.',account:'Votre compte privé',accountTitle:'Retrouvez vos données sur vos appareils',create:'Créer un compte',signin:'Se connecter',signout:'Se déconnecter',email:'E-mail',password:'Mot de passe (8 caractères minimum)',accountHelp:'Avant la connexion, les entrées restent dans cet onglet. Après connexion, elles sont synchronisées dans votre compte privé. Chaque compte ne peut accéder qu’à ses propres données.',entry:'JOURNAL DU JOUR',addFood:'Ajouter un aliment',entryHelp:'Recherchez dans le catalogue ou saisissez un nom. Choisir un aliment remplit son groupe et sa portion indicative.',food:'Nom de l’aliment',group:'Groupe alimentaire',amount:'Quantité',unit:'Unité',date:'Date',salt:'Sel (g), facultatif',sugar:'Sucres libres (g), facultatif',energy:'Énergie (kcal), facultatif',add:'Ajouter au journal',diary:'Vos aliments',emptyDiary:'Aucun aliment enregistré pour cette date.',remove:'Supprimer',catalog:'CATALOGUE ALIMENTAIRE',catalogTitle:'Choisir un aliment',filter:'Rechercher un aliment',catalogHelp:'Utilisez un aliment pour l’ajouter au journal. La quantité indiquée est un exemple du jeu de données, pas une portion recommandée.',foodCol:'Aliment',groupCol:'Groupe',sample:'Quantité exemple',energyCol:'Énergie / 100 g',action:'Action',use:'Choisir',noFoods:'Aucun aliment ne correspond.',rules:'VOTRE COMPARAISON',rulesTitle:'Définir vos limites',rulesHelp:'Définissez un minimum et un maximum par groupe. La quantité enregistrée pour cette date et cette unité est comparée.',minimum:'Minimum',maximum:'Maximum',saveRule:'Enregistrer ma règle',noRules:'Aucune règle personnelle. Ajoutez-en une ci-dessus.',who:'REPÈRES DE SANTÉ PUBLIQUE',whoTitle:'Repères OMS pour cette date',whoHelp:'Ces repères généraux ne sont pas des objectifs individuels. Les données incomplètes sont signalées.',noWho:'Ajoutez des aliments pour voir les comparaisons possibles.',association:'TENDANCES DU JEU DE DONNÉES',associationTitle:'Achats souvent associés',associationHelp:'Cooccurrences d’achats issues de rules.csv. Elles ne prouvent ni intérêt pour la santé, ni adéquation, ni causalité.',associationEmpty:'Ajoutez des aliments du catalogue pour voir les tendances correspondantes.',method:'Comprendre ces indicateurs',methodText:'Le support est la part des paniers contenant les deux côtés de la règle. La confiance est la part des paniers avec l’antécédent contenant aussi le conséquent. Le lift compare ce taux à la fréquence générale du conséquent. Un lift supérieur à 1 indique une cooccurrence plus fréquente dans ce jeu de données, sans causalité ni recommandation santé.',support:'Support',confidence:'Confiance',lift:'Lift',data:'DONNÉES ET CONFIDENTIALITÉ',dataTitle:'Origine des informations',sourceCatalog:'Noms et groupes : foodID_groceries.csv. Quantités exemples : top_50_items_amount.xlsx. Nutriments : NZFOODNutrients.xlsx, moyennés pour les FoodID associés. Les ml ne sont pas convertis en grammes.',sourceGroups:'Les groupes sont des correspondances générales inspirées des concepts FAO/OMS GIFT. Les sources ne comportent pas de codes FoodEx2 officiels.',sourceIntake:'Le tableau vient de Nutrition intake.xlsx. C’est une référence du projet, distincte des recommandations OMS et non personnalisée.',storage:'Après connexion, les aliments et règles sont conservés dans Supabase Postgres. La sécurité des lignes limite l’accès à votre compte. Sans connexion, les données restent dans cet onglet.',nutrient:'Nutriment du projet',value:'Valeur de référence',direction:'Indication',beneficial:'Considéré favorable',limit:'Limite dans la source',footer:'GreenHand aide à examiner un journal alimentaire. Il ne diagnostique ni ne traite aucune maladie.',loading:'Chargement du catalogue fourni…',loaded:n=>`${n} aliments chargés depuis vos fichiers.`,loadError:'Impossible de charger les données. Actualisez la page et vérifiez la connexion.',statusReady:'Prêt. Les entrées non enregistrées restent dans cet onglet.',needLogin:'Connectez-vous pour enregistrer vos données. Le mode temporaire reste disponible.',saved:'Enregistré.',deleted:'Entrée supprimée.',ruleSaved:'Règle enregistrée.',signupSent:'Compte créé. Vérifiez votre e-mail avant de vous connecter.',signedIn:'Connexion réussie. Vos données privées sont chargées.',authError:'Échec de la demande. Vérifiez votre e-mail, votre mot de passe et les URL Auth Supabase.',dbError:'Synchronisation impossible. L’enregistrement n’est pas confirmé.',noData:'Données insuffisantes',within:'Dans votre limite',below:'Sous votre limite',above:'Au-dessus de votre limite',range:'Quantité : {amount} {unit} ; limite : {min}–{max} {unit}.',whoFruit:'Fruits et légumes',whoSalt:'Équivalent en sel',whoSugar:'Sucres libres',whoEnergy:'Énergie saisie',whoFruitExplain:'Repère OMS : au moins 400 g/jour après 10 ans. Seuls les fruits et légumes saisis en grammes comptent ; jus et racines féculentes exclus.',whoSaltExplain:'Repère OMS adulte : moins de 5 g de sel par jour, soit moins de 2 000 mg de sodium. Estimation à partir du sodium des aliments appariés en grammes ; saisissez le sel connu pour améliorer la couverture.',whoSugarExplain:'L’OMS conseille moins de 10 % de l’énergie quotidienne en sucres libres, moins de 5 % pouvant apporter un bénéfice supplémentaire. Les sucres totaux ne remplacent pas les sucres libres : saisissez sucres libres et énergie.',whoEnergyExplain:'Le total énergétique n’est évalué que si vous le saisissez pour chaque aliment.',partial:'Estimation partielle',complete:'Selon les données saisies',nutritionMissing:'Pas de valeur nutritionnelle associée.',sourceGroup:'Groupe source',statusLabel:'État',unknown:'Indisponible',amountInvalid:'Saisissez une quantité supérieure à zéro.',dateLabel:'Date',signedOut:'Déconnexion. Les données enregistrées restent dans votre compte.',whoSource:'OMS : alimentation saine',saltSource:'OMS : sodium',foodAdded:'Aliment ajouté au journal.'},
    zh:{kicker:'饮食记录 · 自定义规则 · 可解释参考',title:'让饮食记录真正有用。',lead:'从提供的食物目录中选择食物，记录摄入量，再查看个人规则与公共健康参考的对比。',notice:'仅供个人饮食记录。请勿录入患者档案或诊断信息。这是教育性比较，不是医疗建议。',account:'个人私有账户',accountTitle:'跨设备保存自己的记录',create:'创建账户',signin:'登录',signout:'退出登录',email:'电子邮箱',password:'密码（至少 8 位）',accountHelp:'登录前，记录仅保存在当前浏览器标签页。登录后记录同步至你的私有账户；每个账户只能访问自己的数据。',entry:'今日饮食记录',addFood:'添加食物',entryHelp:'在下方目录搜索，或输入食物名称。选择目录食物会自动填入分类和样本份量。',food:'食物名称',group:'食物类别',amount:'摄入量',unit:'单位',date:'日期',salt:'盐（克，可选）',sugar:'游离糖（克，可选）',energy:'能量（千卡，可选）',add:'加入今日记录',diary:'已记录食物',emptyDiary:'这一天还没有食物记录。',remove:'删除',catalog:'可搜索食物目录',catalogTitle:'选择食物',filter:'搜索食物目录',catalogHelp:'点击“选用”将食物填入记录。显示的份量来自样本数据，不是推荐摄入量。',foodCol:'食物',groupCol:'类别',sample:'样本份量',energyCol:'能量/100克',action:'操作',use:'选用',noFoods:'没有匹配的食物。',rules:'个人比较规则',rulesTitle:'设定你自己的范围',rulesHelp:'为食物类别设定最小值和最大值。应用会比较所选日期、相同单位下的已记录总量。',minimum:'最小值',maximum:'最大值',saveRule:'保存规则',noRules:'尚未设置个人规则，请在上方添加。',who:'公共健康参考',whoTitle:'WHO 参考指标',whoHelp:'这些是一般性参考，并非个人目标。数据或食物营养信息不完整时会标为“部分估算”。',noWho:'添加食物后查看可计算的比较。',association:'数据集购买规律',associationTitle:'经常同时购买的食物',associationHelp:'来自 rules.csv 的购物共现规律，不代表健康益处、适宜性或因果关系。',associationEmpty:'添加目录中的食物后查看匹配的购买规律。',method:'如何理解这些指标',methodText:'支持度表示购物篮中同时出现规则两侧食物的比例。置信度表示包含前项的购物篮中也包含后项的比例。提升度将这个比例与后项总体出现频率进行比较。提升度大于 1 表示在本数据集中共同出现得更频繁，不代表因果关系或健康推荐。',support:'支持度',confidence:'置信度',lift:'提升度',data:'数据来源与隐私',dataTitle:'数据从哪里来',sourceCatalog:'食物名称和分类：foodID_groceries.csv。样本份量：top_50_items_amount.xlsx。营养估算：NZFOODNutrients.xlsx，对匹配的 FoodID 取平均。毫升数据不会换算成克用于营养估算。',sourceGroups:'这里将来源分类映射为较宽泛的食物类别，参考 FAO/WHO GIFT 分类理念。来源数据没有 FoodEx2 编码，因此不声称是官方 FoodEx2 编码。',sourceIntake:'下表来自 Nutrition intake.xlsx，是项目自带参考值，与 WHO 标准分开显示，也不是个人化建议。',storage:'登录后，食物记录和规则存储在 Supabase Postgres。行级安全策略限制为本人账户访问。未登录时，数据只保留在当前标签页，不会提交到数据库。',nutrient:'项目营养素',value:'参考值',direction:'来源属性',beneficial:'来源标为有益',limit:'来源标为限制',footer:'GreenHand 用于回顾饮食记录，不用于诊断、预防或治疗疾病。',loading:'正在加载提供的食物目录…',loaded:n=>`已从你提供的文件加载 ${n} 种食物。`,loadError:'食物数据加载失败，请刷新页面并检查网络。',statusReady:'已就绪。尚未保存的记录只存在于当前标签页。',needLogin:'登录后可保存并同步数据；现在也可以先使用临时记录。',saved:'已保存。',deleted:'已删除记录。',ruleSaved:'规则已保存。',signupSent:'账户已创建，请先查看邮箱完成验证，再登录。',signedIn:'登录成功，已加载你的私有记录。',authError:'账户操作失败，请检查邮箱、密码及 Supabase Auth 的网址配置。',dbError:'数据库同步失败，目前不能确认数据已保存。',noData:'数据不足，无法判断',within:'在你的规则范围内',below:'低于你的规则',above:'高于你的规则',range:'记录 {amount} {unit}；你的范围是 {min}–{max} {unit}。',whoFruit:'水果和蔬菜',whoSalt:'盐当量',whoSugar:'游离糖',whoEnergy:'能量记录',whoFruitExplain:'WHO 参考：10 岁以上每天至少 400 克。只统计已映射、以克记录的水果和蔬菜；果汁和淀粉类根茎不计。食物未匹配时结果为部分估算。',whoSaltExplain:'WHO 成人参考：每日盐少于 5 克，相当于钠少于 2,000 毫克。仅估算有营养映射且以克记录的食物钠；若知道盐量，可直接填写以提高覆盖度。',whoSugarExplain:'WHO 建议游离糖低于每日总能量的 10%，低于 5%可能有额外益处。目录中的总糖不等于游离糖；请填写游离糖和总能量才能比较。',whoEnergyExplain:'只有为每种食物填写能量，才能计算游离糖占总能量的比例。',partial:'部分估算',complete:'基于已填写数据',nutritionMissing:'该食物没有匹配的营养估算。',sourceGroup:'来源分类',statusLabel:'结果',unknown:'暂无数据',amountInvalid:'请输入大于零的摄入量。',dateLabel:'日期',signedOut:'已退出登录。已保存的数据仍在你的账户中。',whoSource:'WHO 健康饮食参考',saltSource:'WHO 钠摄入参考',foodAdded:'已添加食物。'}
  };

  const $ = id => document.getElementById(id);
  const state = { lang: 'en', client: null, user: null, foods: [], rules: [], entries: [], associationRules: [], intake: [], selectedFood: null, loadFailed: false };
  const today = new Date().toLocaleDateString('en-CA');
  const t = (key, vars={}) => { const item = I18N[state.lang][key] ?? I18N.en[key] ?? key; return typeof item === 'function' ? item(vars.n) : String(item).replace(/\{(\w+)\}/g, (_,k)=>vars[k] ?? ''); };
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groupName = key => { const row=GROUP_LABELS[key] || GROUP_LABELS.other; return row[['en','fr','zh'].indexOf(state.lang)] || row[0]; };
  const status = (message, error=false) => { $('app-status').textContent=message; $('app-status').classList.toggle('is-error',error); };
  const setText=(id,key)=>{if($(id))$(id).textContent=t(key)};
  const percent = n => `${(Number(n)*100).toFixed(1)}%`;
  const amountText = n => Number(n).toLocaleString(state.lang==='zh'?'zh-CN':state.lang==='fr'?'fr-FR':'en-US',{maximumFractionDigits:1});

  function translateStatic(){
    document.documentElement.lang=state.lang;
    const ids={ 'hero-kicker':'kicker','hero-title':'title','hero-copy':'lead','medical-notice':'notice','account-kicker':'account','account-title':'accountTitle','email-label':'email','password-label':'password','account-explainer':'accountHelp','entry-kicker':'entry','entry-title':'addFood','entry-help':'entryHelp','food-label':'food','group-label':'group','amount-label':'amount','unit-label':'unit','date-label':'date','salt-label':'salt','sugar-label':'sugar','energy-label':'energy','add-entry':'add','diary-food-head':'foodCol','diary-group-head':'groupCol','diary-amount-head':'amount','diary-date-head':'date','catalog-kicker':'catalog','catalog-title':'catalogTitle','catalog-search-label':'filter','catalog-help':'catalogHelp','catalog-food-head':'foodCol','catalog-group-head':'groupCol','catalog-portion-head':'sample','catalog-energy-head':'energyCol','catalog-action-head':'action','rules-kicker':'rules','rules-title':'rulesTitle','rules-help':'rulesHelp','rule-group-label':'group','min-label':'minimum','max-label':'maximum','rule-unit-label':'unit','save-rule':'saveRule','who-kicker':'who','who-title':'whoTitle','who-help':'whoHelp','association-kicker':'association','association-title':'associationTitle','association-help':'associationHelp','association-method-summary':'method','source-summary':'data','intake-nutrient-head':'nutrient','intake-value-head':'value','intake-direction-head':'direction','footer-note':'footer'};
    Object.entries(ids).forEach(([id,key])=>setText(id,key));
    setText('association-method','methodText');
    $('create-account').textContent=t('create'); $('sign-in').textContent=t('signin'); $('sign-out').textContent=t('signout');
    $('food-name').placeholder=state.lang==='zh'?'搜索食物，例如 whole milk':state.lang==='fr'?'Rechercher, par ex. whole milk':'Search, e.g. whole milk';
    $('catalog-search').placeholder=t('filter');
    $('load-summary').textContent=state.foods.length?t('loaded',{n:state.foods.length}):state.loadFailed?t('loadError'):t('loading');
    $('source-foods').textContent=t('sourceCatalog'); $('source-groups').textContent=t('sourceGroups'); $('source-intake').textContent=t('sourceIntake'); $('source-storage').textContent=t('storage');
    renderGroupSelects(); renderIntake(); renderAll();
  }

  function renderGroupSelects(){
    const options=GROUPS.map(g=>`<option value="${g}">${esc(groupName(g))}</option>`).join('');
    $('food-group').innerHTML=options; $('rule-group').innerHTML=options;
  }

  function foodByName(name){return state.foods.find(f=>f.name.toLowerCase()===String(name).trim().toLowerCase())||null}
  function groupFor(food){return food ? groupName(food.group) : ''}
  function nutrient(food,key,amount){const per=food?.nutrientsPer100g?.[key];return Number.isFinite(per)&&Number.isFinite(amount)?per*amount/100:null}

  function renderCatalog(){
    const query=$('catalog-search').value.trim().toLowerCase();
    const matches=state.foods.filter(f=>`${f.name} ${groupName(f.group)} ${f.sourceGroup||''}`.toLowerCase().includes(query)).slice(0,150);
    $('catalog-count').textContent=matches.length;
    $('food-options').innerHTML=matches.map(f=>`<option value="${esc(f.name)}"></option>`).join('');
    $('catalog-rows').innerHTML=matches.length?matches.map(f=>{
      const energy=f.nutrientsPer100g?.energyKcal;
      const sample=f.sourceAmount?`${amountText(f.sourceAmount)} ${f.sourceUnit||'g'}`:'—';
      return `<tr><td><strong>${esc(f.name)}</strong><small>${esc(f.sourceCategory||'')}</small></td><td>${esc(groupName(f.group))}</td><td>${sample}</td><td>${Number.isFinite(energy)?`${amountText(energy)} kcal`:'—'}</td><td><button type="button" class="button button-small use-food" data-food="${esc(f.id)}">${esc(t('use'))}</button></td></tr>`
    }).join(''):`<tr><td colspan="5" class="empty-cell">${esc(t('noFoods'))}</td></tr>`;
  }

  function selectFood(food){
    if(!food)return;
    state.selectedFood=food; $('food-name').value=food.name; $('food-group').value=food.group;
    if(food.sourceAmount){$('amount').value=food.sourceAmount;$('unit').value=food.sourceUnit||'g'}
    const nutrients=food.nutrientsPer100g||{};
    $('food-detail').textContent=Number.isFinite(nutrients.energyKcal)?`${t('energyCol')}: ${amountText(nutrients.energyKcal)} kcal / 100 g · ${t('sourceGroup')}: ${food.sourceGroup||groupName(food.group)}`:`${t('sourceGroup')}: ${food.sourceGroup||groupName(food.group)} · ${t('nutritionMissing')}`;
    $('amount').focus();
  }

  function filteredEntries(){return state.entries.filter(e=>e.eaten_on=== $('eaten-on').value)}
  function renderDiary(){
    const entries=filteredEntries(); $('entry-count').textContent=entries.length;
    $('diary-rows').innerHTML=entries.length?entries.map(e=>`<tr><td>${esc(e.food_name)}</td><td>${esc(groupName(e.food_group))}</td><td>${amountText(e.amount)} ${esc(e.unit)}</td><td>${esc(e.eaten_on)}<small>${[e.salt_g!=null?`${e.salt_g} g salt`:null,e.free_sugar_g!=null?`${e.free_sugar_g} g free sugar`:null,e.energy_kcal!=null?`${e.energy_kcal} kcal`:null].filter(Boolean).join(' · ')}</small></td><td><button class="text-button delete-entry" type="button" data-id="${esc(e.id)}">${esc(t('remove'))}</button></td></tr>`).join(''):`<tr><td colspan="5" class="empty-cell">${esc(t('emptyDiary'))}</td></tr>`;
  }

  function renderPersonalRules(){
    const items=state.rules.map(rule=>{
      const sum=filteredEntries().filter(e=>e.food_group===rule.food_group&&e.unit===rule.unit).reduce((a,e)=>a+Number(e.amount),0);
      const has=filteredEntries().some(e=>e.food_group===rule.food_group&&e.unit===rule.unit);
      const min=Number(rule.min_amount),max=Number(rule.max_amount);
      const verdict=!has?t('noData'):sum<min?t('below'):sum>max?t('above'):t('within');
      return `<article class="result-card"><div><strong>${esc(groupName(rule.food_group))}</strong><span class="result-badge">${esc(verdict)}</span></div><p>${esc(t('range',{amount:amountText(sum),unit:rule.unit,min:amountText(min),max:amountText(max)}))}</p></article>`;
    });
    $('rule-results').innerHTML=items.length?items.join(''):`<p class="empty-cell">${esc(t('noRules'))}</p>`;
  }

  function renderWho(){
    const entries=filteredEntries(); if(!entries.length){$('who-results').innerHTML=`<p class="empty-cell">${esc(t('noWho'))}</p>`;return}
    let fv=0,fvPartial=false,sodium=0,sodiumPartial=false,sugar=0,energy=0,sugarCount=0,energyCovered=0,energyPartial=false;
    for(const e of entries){
      const food=foodByName(e.food_name); const amt=Number(e.amount);
      if(food&&food.whoFruitVegEligible&&['fruits','vegetables'].includes(food.group)){
        if(e.unit==='g')fv+=amt;else fvPartial=true;
      }
      if(e.salt_g!=null&&e.salt_g!==''){sodium+=Number(e.salt_g)*400}
      else if(food&&e.unit==='g'){const n=nutrient(food,'sodiumMg',amt);if(n==null)sodiumPartial=true;else sodium+=n}
      else sodiumPartial=true;
      if(e.free_sugar_g!=null&&e.free_sugar_g!==''){sugar+=Number(e.free_sugar_g);sugarCount++}
      if(e.energy_kcal!=null&&e.energy_kcal!==''){energy+=Number(e.energy_kcal);energyCovered++}
      else if(food&&e.unit==='g'){const kcal=nutrient(food,'energyKcal',amt);if(kcal==null)energyPartial=true;else{energy+=kcal;energyCovered++}}
      else energyPartial=true;
    }
    const fruitPartial=fvPartial||entries.some(e=>{const f=foodByName(e.food_name);return !f||(['fruits','vegetables'].includes(f.group)&&!f.whoFruitVegEligible)})||entries.some(e=>!foodByName(e.food_name));
    const allSaltKnown=!sodiumPartial;
    const energyComplete=energyCovered===entries.length&&!energyPartial;
    const sugarComplete=sugarCount===entries.length&&energyComplete&&energy>0;
    const sugarPct=sugarComplete?100*sugar*4/energy:null;
    const cards=[
      {title:t('whoFruit'),value:`${amountText(fv)} g`,badge:fv>=400?t('within'):t('below'),partial:fruitPartial,explain:t('whoFruitExplain')},
      {title:t('whoSalt'),value:allSaltKnown?`${amountText(sodium/400)} g (${amountText(sodium)} mg sodium)`:'—',badge:allSaltKnown?(sodium<2000?t('within'):t('above')):t('noData'),partial:!allSaltKnown,explain:t('whoSaltExplain')},
      {title:t('whoSugar'),value:sugarPct==null?'—':`${amountText(sugar)} g · ${amountText(sugarPct)}% energy`,badge:sugarPct==null?t('noData'):(sugarPct<10?(state.lang==='zh'?'低于 10%参考':state.lang==='fr'?'Sous le repère de 10 %':'Below 10% reference'):t('above')),partial:!sugarComplete,explain:t('whoSugarExplain')},
      {title:t('whoEnergy'),value:energyCovered?`${amountText(energy)} kcal`:'—',badge:energyComplete?t('complete'):energyCovered?t('partial'):t('noData'),partial:!energyComplete,explain:t('whoEnergyExplain')}
    ];
    $('who-results').innerHTML=cards.map(c=>`<article class="result-card"><div><strong>${esc(c.title)}</strong><span class="result-badge ${c.partial?'badge-partial':''}">${esc(c.partial?t('partial'):c.badge)}</span></div><p class="metric-value">${esc(c.value)}</p><p>${esc(c.explain)}</p></article>`).join('');
  }

  function renderAssociations(){
    const selected=new Set(filteredEntries().map(e=>e.food_name.toLowerCase()));
    const candidates=state.associationRules.filter(r=>r.antecedents?.length&&r.consequents?.length&&r.antecedents.every(x=>selected.has(x.toLowerCase()))&&r.consequents.some(x=>!selected.has(x.toLowerCase()))).sort((a,b)=>b.lift-a.lift||b.confidence-a.confidence).slice(0,8);
    $('association-count').textContent=candidates.length;
    $('association-results').innerHTML=candidates.length?candidates.map(r=>`<article class="association-card"><p><strong>${esc(r.antecedents.join(' + '))}</strong> <span aria-hidden="true">→</span> <strong>${esc(r.consequents.join(' + '))}</strong></p><div class="metric-row"><span>${esc(t('support'))}: ${percent(r.support)}</span><span>${esc(t('confidence'))}: ${percent(r.confidence)}</span><span>${esc(t('lift'))}: ${Number(r.lift).toFixed(2)}</span></div></article>`).join(''):`<p class="empty-cell">${esc(t('associationEmpty'))}</p>`;
  }

  function renderIntake(){
    $('intake-reference-rows').innerHTML=state.intake.map(r=>`<tr><td>${esc(r.nutrient)}</td><td>${amountText(r.dailyValue)}</td><td>${esc(r.unit)}</td><td>${esc(r.beneficial?t('beneficial'):t('limit'))}</td></tr>`).join('');
  }
  function renderAll(){renderDiary();renderPersonalRules();renderWho();renderAssociations();renderCatalog()}

  async function refreshCloud(){
    if(!state.client||!state.user){state.entries=[];state.rules=[];renderAll();return}
    const [entries,rules]=await Promise.all([state.client.from('food_entries').select('*').order('eaten_on',{ascending:false}).limit(500),state.client.from('comparison_rules').select('*').order('food_group')]);
    if(entries.error||rules.error){console.error(entries.error||rules.error);status(t('dbError'),true);return}
    state.entries=entries.data||[];state.rules=rules.data||[];renderAll();
  }
  function accountUI(){
    const signed=Boolean(state.user); $('auth-form').classList.toggle('is-hidden',signed); $('sign-out').classList.toggle('is-hidden',!signed);
    $('account-state').textContent=signed?state.user.email:(state.lang==='zh'?'未登录':state.lang==='fr'?'Non connecté':'Not signed in');
  }
  async function signIn(create){
    const email=$('email').value.trim(),password=$('password').value;
    if(!state.client){status(t('dbError'),true);return}
    const result=create?await state.client.auth.signUp({email,password,options:{emailRedirectTo:location.href.split('#')[0]}}):await state.client.auth.signInWithPassword({email,password});
    if(result.error){console.error(result.error);status(t('authError'),true);return}
    if(create&&!result.data.session){status(t('signupSent'));return}
    state.user=result.data.user;accountUI();await refreshCloud();status(t('signedIn'));
  }
  async function addEntry(event){
    event.preventDefault();const amount=Number($('amount').value);if(!(amount>0)){status(t('amountInvalid'),true);return}
    const name=$('food-name').value.trim();if(!name){return}
    const e={food_name:name,food_group:$('food-group').value,amount,unit:$('unit').value,eaten_on:$('eaten-on').value||today,salt_g:$('salt-g').value===''?null:Number($('salt-g').value),free_sugar_g:$('free-sugar-g').value===''?null:Number($('free-sugar-g').value),energy_kcal:$('energy-kcal').value===''?null:Number($('energy-kcal').value)};
    const food=foodByName(name); if(!food) e.food_group=$('food-group').value;
    if(state.user){const {data,error}=await state.client.from('food_entries').insert({...e,user_id:state.user.id}).select().single();if(error){console.error(error);status(t('dbError'),true);return}state.entries.unshift(data);status(t('saved'))}
    else {state.entries.unshift({...e,id:`local-${Date.now()}`});status(t('needLogin'))}
    $('entry-form').reset();$('eaten-on').value=today;$('food-detail').textContent='';renderAll();
  }
  async function removeEntry(id){
    if(String(id).startsWith('local-'))state.entries=state.entries.filter(e=>String(e.id)!==String(id));
    else if(state.user){const {error}=await state.client.from('food_entries').delete().eq('id',id);if(error){status(t('dbError'),true);return}state.entries=state.entries.filter(e=>String(e.id)!==String(id))}
    renderAll();status(t('deleted'));
  }
  async function saveRule(event){
    event.preventDefault();const data=new FormData(event.currentTarget),min=Number(data.get('min_amount')),max=Number(data.get('max_amount'));
    if(max<min){status(state.lang==='zh'?'最大值必须大于或等于最小值':state.lang==='fr'?'Le maximum doit être supérieur au minimum':'Maximum must be at least the minimum.',true);return}
    const row={food_group:data.get('food_group'),min_amount:min,max_amount:max,unit:data.get('unit')};
    if(state.user){const {data:saved,error}=await state.client.from('comparison_rules').upsert({...row,user_id:state.user.id},{onConflict:'user_id,food_group,unit'}).select().single();if(error){console.error(error);status(t('dbError'),true);return}state.rules=state.rules.filter(r=>!(r.food_group===row.food_group&&r.unit===row.unit));state.rules.push(saved);status(t('ruleSaved'))}
    else {state.rules=state.rules.filter(r=>!(r.food_group===row.food_group&&r.unit===row.unit));state.rules.push({...row,id:`local-${row.food_group}-${row.unit}`});status(t('needLogin'))}
    renderAll();
  }

  async function start(){
    $('eaten-on').value=today;
    const remembered=localStorage.getItem('greenhand-language');if(['en','fr','zh'].includes(remembered))state.lang=remembered;
    $('language').value=state.lang;
    $('food-group').innerHTML=GROUPS.map(g=>`<option value="${g}">${esc(groupName(g))}</option>`).join('');
    $('rule-group').innerHTML=$('food-group').innerHTML;
    try{
      const [foods,rules,intake]=await Promise.all(['food-catalog.json','association-rules.json','nutrition-intake-reference.json'].map(p=>fetch(`./data/${p}`).then(r=>{if(!r.ok)throw new Error(`${p} ${r.status}`);return r.json()})));
      state.foods=foods.foods||[];state.associationRules=rules.rules||[];state.intake=intake.values||[];
    }catch(err){console.error(err);state.loadFailed=true}
    if(window.supabase?.createClient){state.client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);const {data}=await state.client.auth.getSession();state.user=data.session?.user||null;state.client.auth.onAuthStateChange((_event,session)=>{state.user=session?.user||null;accountUI();refreshCloud()});}
    else console.warn('Supabase client bundle unavailable; cloud saving is disabled.');
    translateStatic();accountUI();if(state.user){await refreshCloud();status(t('signedIn'))}else status(t('statusReady'));
  }

  document.addEventListener('DOMContentLoaded',()=>{
    $('language').addEventListener('change',e=>{state.lang=e.target.value;localStorage.setItem('greenhand-language',state.lang);translateStatic()});
    $('catalog-search').addEventListener('input',renderCatalog);
    $('food-name').addEventListener('input',()=>{const food=foodByName($('food-name').value);if(food){$('food-group').value=food.group;state.selectedFood=food}else{$('food-detail').textContent='';state.selectedFood=null}});
    $('entry-form').addEventListener('submit',addEntry);$('rule-form').addEventListener('submit',saveRule);
    $('eaten-on').addEventListener('change',renderAll);
    $('catalog-rows').addEventListener('click',e=>{const b=e.target.closest('.use-food');if(b)selectFood(state.foods.find(f=>f.id===b.dataset.food))});
    $('diary-rows').addEventListener('click',e=>{const b=e.target.closest('.delete-entry');if(b)removeEntry(b.dataset.id)});
    $('create-account').addEventListener('click',()=>signIn(true));$('sign-in').addEventListener('click',()=>signIn(false));
    $('sign-out').addEventListener('click',async()=>{await state.client.auth.signOut();state.user=null;state.entries=[];state.rules=[];accountUI();renderAll();status(t('signedOut'))});
    start();
    if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Offline install is unavailable:',err));
  });
})();
