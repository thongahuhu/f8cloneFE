import likeEmoji from '../asset/images/likeemoji.png'
import loveEmoji from '../asset/images/loveemoji.png'
import hahaEmoji from '../asset/images/hahaemoji.png'
import cryEmoji from '../asset/images/cryemoji.png'
import angryEmoji from '../asset/images/angryemoji.png'
import wowEmoji from '../asset/images/wowemoji.png'

const apiURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://f8clone.herokuapp.com'

const COUNTRY_CODE = {
  AF: {
    country_name: 'Afghanistan',
    dialling_code: '+93',
  },
  AL: {
    country_name: 'Albania',
    dialling_code: '+355',
  },
  DZ: {
    country_name: 'Algeria',
    dialling_code: '+213',
  },
  AS: {
    country_name: 'American Samoa',
    dialling_code: '+1',
  },
  AD: {
    country_name: 'Andorra',
    dialling_code: '+376',
  },
  AO: {
    country_name: 'Angola',
    dialling_code: '+244',
  },
  AI: {
    country_name: 'Anguilla',
    dialling_code: '+1',
  },
  AG: {
    country_name: 'Antigua',
    dialling_code: '+1',
  },
  AR: {
    country_name: 'Argentina',
    dialling_code: '+54',
  },
  AM: {
    country_name: 'Armenia',
    dialling_code: '+374',
  },
  AW: {
    country_name: 'Aruba',
    dialling_code: '+297',
  },
  AU: {
    country_name: 'Australia',
    dialling_code: '+61',
  },
  AT: {
    country_name: 'Austria',
    dialling_code: '+43',
  },
  AZ: {
    country_name: 'Azerbaijan',
    dialling_code: '+994',
  },
  BH: {
    country_name: 'Bahrain',
    dialling_code: '+973',
  },
  BD: {
    country_name: 'Bangladesh',
    dialling_code: '+880',
  },
  BB: {
    country_name: 'Barbados',
    dialling_code: '+1',
  },
  BY: {
    country_name: 'Belarus',
    dialling_code: '+375',
  },
  BE: {
    country_name: 'Belgium',
    dialling_code: '+32',
  },
  BZ: {
    country_name: 'Belize',
    dialling_code: '+501',
  },
  BJ: {
    country_name: 'Benin',
    dialling_code: '+229',
  },
  BM: {
    country_name: 'Bermuda',
    dialling_code: '+1',
  },
  BT: {
    country_name: 'Bhutan',
    dialling_code: '+975',
  },
  BO: {
    country_name: 'Bolivia',
    dialling_code: '+591',
  },
  BA: {
    country_name: 'Bosnia and Herzegovina',
    dialling_code: '+387',
  },
  BW: {
    country_name: 'Botswana',
    dialling_code: '+267',
  },
  BR: {
    country_name: 'Brazil',
    dialling_code: '+55',
  },
  IO: {
    country_name: 'British Indian Ocean Territory',
    dialling_code: '+246',
  },
  VG: {
    country_name: 'British Virgin Islands',
    dialling_code: '+1',
  },
  BN: {
    country_name: 'Brunei',
    dialling_code: '+673',
  },
  BG: {
    country_name: 'Bulgaria',
    dialling_code: '+359',
  },
  BF: {
    country_name: 'Burkina Faso',
    dialling_code: '+226',
  },
  MM: {
    country_name: 'Burma Myanmar',
    dialling_code: '+95',
  },
  BI: {
    country_name: 'Burundi',
    dialling_code: '+257',
  },
  KH: {
    country_name: 'Cambodia',
    dialling_code: '+855',
  },
  CM: {
    country_name: 'Cameroon',
    dialling_code: '+237',
  },
  CA: {
    country_name: 'Canada',
    dialling_code: '+1',
  },
  CV: {
    country_name: 'Cape Verde',
    dialling_code: '+238',
  },
  KY: {
    country_name: 'Cayman Islands',
    dialling_code: '+1',
  },
  CF: {
    country_name: 'Central African Republic',
    dialling_code: '+236',
  },
  TD: {
    country_name: 'Chad',
    dialling_code: '+235',
  },
  CL: {
    country_name: 'Chile',
    dialling_code: '+56',
  },
  CN: {
    country_name: 'China',
    dialling_code: '+86',
  },
  CO: {
    country_name: 'Colombia',
    dialling_code: '+57',
  },
  KM: {
    country_name: 'Comoros',
    dialling_code: '+269',
  },
  CK: {
    country_name: 'Cook Islands',
    dialling_code: '+682',
  },
  CR: {
    country_name: 'Costa Rica',
    dialling_code: '+506',
  },
  CI: {
    country_name: "Côte d'Ivoire",
    dialling_code: '+225',
  },
  HR: {
    country_name: 'Croatia',
    dialling_code: '+385',
  },
  CU: {
    country_name: 'Cuba',
    dialling_code: '+53',
  },
  CY: {
    country_name: 'Cyprus',
    dialling_code: '+357',
  },
  CZ: {
    country_name: 'Czech Republic',
    dialling_code: '+420',
  },
  CD: {
    country_name: 'Democratic Republic of Congo',
    dialling_code: '+243',
  },
  DK: {
    country_name: 'Denmark',
    dialling_code: '+45',
  },
  DJ: {
    country_name: 'Djibouti',
    dialling_code: '+253',
  },
  DM: {
    country_name: 'Dominica',
    dialling_code: '+1',
  },
  DO: {
    country_name: 'Dominican Republic',
    dialling_code: '+1',
  },
  EC: {
    country_name: 'Ecuador',
    dialling_code: '+593',
  },
  EG: {
    country_name: 'Egypt',
    dialling_code: '+20',
  },
  SV: {
    country_name: 'El Salvador',
    dialling_code: '+503',
  },
  GQ: {
    country_name: 'Equatorial Guinea',
    dialling_code: '+240',
  },
  ER: {
    country_name: 'Eritrea',
    dialling_code: '+291',
  },
  EE: {
    country_name: 'Estonia',
    dialling_code: '+372',
  },
  ET: {
    country_name: 'Ethiopia',
    dialling_code: '+251',
  },
  FK: {
    country_name: 'Falkland Islands',
    dialling_code: '+500',
  },
  FO: {
    country_name: 'Faroe Islands',
    dialling_code: '+298',
  },
  FM: {
    country_name: 'Federated States of Micronesia',
    dialling_code: '+691',
  },
  FJ: {
    country_name: 'Fiji',
    dialling_code: '+679',
  },
  FI: {
    country_name: 'Finland',
    dialling_code: '+358',
  },
  FR: {
    country_name: 'France',
    dialling_code: '+33',
  },
  GF: {
    country_name: 'French Guiana',
    dialling_code: '+594',
  },
  PF: {
    country_name: 'French Polynesia',
    dialling_code: '+689',
  },
  GA: {
    country_name: 'Gabon',
    dialling_code: '+241',
  },
  GE: {
    country_name: 'Georgia',
    dialling_code: '+995',
  },
  DE: {
    country_name: 'Germany',
    dialling_code: '+49',
  },
  GH: {
    country_name: 'Ghana',
    dialling_code: '+233',
  },
  GI: {
    country_name: 'Gibraltar',
    dialling_code: '+350',
  },
  GR: {
    country_name: 'Greece',
    dialling_code: '+30',
  },
  GL: {
    country_name: 'Greenland',
    dialling_code: '+299',
  },
  GD: {
    country_name: 'Grenada',
    dialling_code: '+1',
  },
  GP: {
    country_name: 'Guadeloupe',
    dialling_code: '+590',
  },
  GU: {
    country_name: 'Guam',
    dialling_code: '+1',
  },
  GT: {
    country_name: 'Guatemala',
    dialling_code: '+502',
  },
  GN: {
    country_name: 'Guinea',
    dialling_code: '+224',
  },
  GW: {
    country_name: 'Guinea-Bissau',
    dialling_code: '+245',
  },
  GY: {
    country_name: 'Guyana',
    dialling_code: '+592',
  },
  HT: {
    country_name: 'Haiti',
    dialling_code: '+509',
  },
  HN: {
    country_name: 'Honduras',
    dialling_code: '+504',
  },
  HK: {
    country_name: 'Hong Kong',
    dialling_code: '+852',
  },
  HU: {
    country_name: 'Hungary',
    dialling_code: '+36',
  },
  IS: {
    country_name: 'Iceland',
    dialling_code: '+354',
  },
  IN: {
    country_name: 'India',
    dialling_code: '+91',
  },
  ID: {
    country_name: 'Indonesia',
    dialling_code: '+62',
  },
  IR: {
    country_name: 'Iran',
    dialling_code: '+98',
  },
  IQ: {
    country_name: 'Iraq',
    dialling_code: '+964',
  },
  IE: {
    country_name: 'Ireland',
    dialling_code: '+353',
  },
  IL: {
    country_name: 'Israel',
    dialling_code: '+972',
  },
  IT: {
    country_name: 'Italy',
    dialling_code: '+39',
  },
  JM: {
    country_name: 'Jamaica',
    dialling_code: '+1',
  },
  JP: {
    country_name: 'Japan',
    dialling_code: '+81',
  },
  JO: {
    country_name: 'Jordan',
    dialling_code: '+962',
  },
  KZ: {
    country_name: 'Kazakhstan',
    dialling_code: '+7',
  },
  KE: {
    country_name: 'Kenya',
    dialling_code: '+254',
  },
  KI: {
    country_name: 'Kiribati',
    dialling_code: '+686',
  },
  XK: {
    country_name: 'Kosovo',
    dialling_code: '+381',
  },
  KW: {
    country_name: 'Kuwait',
    dialling_code: '+965',
  },
  KG: {
    country_name: 'Kyrgyzstan',
    dialling_code: '+996',
  },
  LA: {
    country_name: 'Laos',
    dialling_code: '+856',
  },
  LV: {
    country_name: 'Latvia',
    dialling_code: '+371',
  },
  LB: {
    country_name: 'Lebanon',
    dialling_code: '+961',
  },
  LS: {
    country_name: 'Lesotho',
    dialling_code: '+266',
  },
  LR: {
    country_name: 'Liberia',
    dialling_code: '+231',
  },
  LY: {
    country_name: 'Libya',
    dialling_code: '+218',
  },
  LI: {
    country_name: 'Liechtenstein',
    dialling_code: '+423',
  },
  LT: {
    country_name: 'Lithuania',
    dialling_code: '+370',
  },
  LU: {
    country_name: 'Luxembourg',
    dialling_code: '+352',
  },
  MO: {
    country_name: 'Macau',
    dialling_code: '+853',
  },
  MK: {
    country_name: 'Macedonia',
    dialling_code: '+389',
  },
  MG: {
    country_name: 'Madagascar',
    dialling_code: '+261',
  },
  MW: {
    country_name: 'Malawi',
    dialling_code: '+265',
  },
  MY: {
    country_name: 'Malaysia',
    dialling_code: '+60',
  },
  MV: {
    country_name: 'Maldives',
    dialling_code: '+960',
  },
  ML: {
    country_name: 'Mali',
    dialling_code: '+223',
  },
  MT: {
    country_name: 'Malta',
    dialling_code: '+356',
  },
  MH: {
    country_name: 'Marshall Islands',
    dialling_code: '+692',
  },
  MQ: {
    country_name: 'Martinique',
    dialling_code: '+596',
  },
  MR: {
    country_name: 'Mauritania',
    dialling_code: '+222',
  },
  MU: {
    country_name: 'Mauritius',
    dialling_code: '+230',
  },
  YT: {
    country_name: 'Mayotte',
    dialling_code: '+262',
  },
  MX: {
    country_name: 'Mexico',
    dialling_code: '+52',
  },
  MD: {
    country_name: 'Moldova',
    dialling_code: '+373',
  },
  MC: {
    country_name: 'Monaco',
    dialling_code: '+377',
  },
  MN: {
    country_name: 'Mongolia',
    dialling_code: '+976',
  },
  ME: {
    country_name: 'Montenegro',
    dialling_code: '+382',
  },
  MS: {
    country_name: 'Montserrat',
    dialling_code: '+1',
  },
  MA: {
    country_name: 'Morocco',
    dialling_code: '+212',
  },
  MZ: {
    country_name: 'Mozambique',
    dialling_code: '+258',
  },
  NA: {
    country_name: 'Namibia',
    dialling_code: '+264',
  },
  NR: {
    country_name: 'Nauru',
    dialling_code: '+674',
  },
  NP: {
    country_name: 'Nepal',
    dialling_code: '+977',
  },
  NL: {
    country_name: 'Netherlands',
    dialling_code: '+31',
  },
  AN: {
    country_name: 'Netherlands Antilles',
    dialling_code: '+599',
  },
  NC: {
    country_name: 'New Caledonia',
    dialling_code: '+687',
  },
  NZ: {
    country_name: 'New Zealand',
    dialling_code: '+64',
  },
  NI: {
    country_name: 'Nicaragua',
    dialling_code: '+505',
  },
  NE: {
    country_name: 'Niger',
    dialling_code: '+227',
  },
  NG: {
    country_name: 'Nigeria',
    dialling_code: '+234',
  },
  NU: {
    country_name: 'Niue',
    dialling_code: '+683',
  },
  NF: {
    country_name: 'Norfolk Island',
    dialling_code: '+672',
  },
  KP: {
    country_name: 'North Korea',
    dialling_code: '+850',
  },
  MP: {
    country_name: 'Northern Mariana Islands',
    dialling_code: '+1',
  },
  NO: {
    country_name: 'Norway',
    dialling_code: '+47',
  },
  OM: {
    country_name: 'Oman',
    dialling_code: '+968',
  },
  PK: {
    country_name: 'Pakistan',
    dialling_code: '+92',
  },
  PW: {
    country_name: 'Palau',
    dialling_code: '+680',
  },
  PS: {
    country_name: 'Palestine',
    dialling_code: '+970',
  },
  PA: {
    country_name: 'Panama',
    dialling_code: '+507',
  },
  PG: {
    country_name: 'Papua New Guinea',
    dialling_code: '+675',
  },
  PY: {
    country_name: 'Paraguay',
    dialling_code: '+595',
  },
  PE: {
    country_name: 'Peru',
    dialling_code: '+51',
  },
  PH: {
    country_name: 'Philippines',
    dialling_code: '+63',
  },
  PL: {
    country_name: 'Poland',
    dialling_code: '+48',
  },
  PT: {
    country_name: 'Portugal',
    dialling_code: '+351',
  },
  PR: {
    country_name: 'Puerto Rico',
    dialling_code: '+1',
  },
  QA: {
    country_name: 'Qatar',
    dialling_code: '+974',
  },
  CG: {
    country_name: 'Republic of the Congo',
    dialling_code: '+242',
  },
  RE: {
    country_name: 'Réunion',
    dialling_code: '+262',
  },
  RO: {
    country_name: 'Romania',
    dialling_code: '+40',
  },
  RU: {
    country_name: 'Russia',
    dialling_code: '+7',
  },
  RW: {
    country_name: 'Rwanda',
    dialling_code: '+250',
  },
  BL: {
    country_name: 'Saint Barthélemy',
    dialling_code: '+590',
  },
  SH: {
    country_name: 'Saint Helena',
    dialling_code: '+290',
  },
  KN: {
    country_name: 'Saint Kitts and Nevis',
    dialling_code: '+1',
  },
  MF: {
    country_name: 'Saint Martin',
    dialling_code: '+590',
  },
  PM: {
    country_name: 'Saint Pierre and Miquelon',
    dialling_code: '+508',
  },
  VC: {
    country_name: 'Saint Vincent and the Grenadines',
    dialling_code: '+1',
  },
  WS: {
    country_name: 'Samoa',
    dialling_code: '+685',
  },
  SM: {
    country_name: 'San Marino',
    dialling_code: '+378',
  },
  ST: {
    country_name: 'São Tomé and Príncipe',
    dialling_code: '+239',
  },
  SA: {
    country_name: 'Saudi Arabia',
    dialling_code: '+966',
  },
  SN: {
    country_name: 'Senegal',
    dialling_code: '+221',
  },
  RS: {
    country_name: 'Serbia',
    dialling_code: '+381',
  },
  SC: {
    country_name: 'Seychelles',
    dialling_code: '+248',
  },
  SL: {
    country_name: 'Sierra Leone',
    dialling_code: '+232',
  },
  SG: {
    country_name: 'Singapore',
    dialling_code: '+65',
  },
  SK: {
    country_name: 'Slovakia',
    dialling_code: '+421',
  },
  SI: {
    country_name: 'Slovenia',
    dialling_code: '+386',
  },
  SB: {
    country_name: 'Solomon Islands',
    dialling_code: '+677',
  },
  SO: {
    country_name: 'Somalia',
    dialling_code: '+252',
  },
  ZA: {
    country_name: 'South Africa',
    dialling_code: '+27',
  },
  KR: {
    country_name: 'South Korea',
    dialling_code: '+82',
  },
  ES: {
    country_name: 'Spain',
    dialling_code: '+34',
  },
  LK: {
    country_name: 'Sri Lanka',
    dialling_code: '+94',
  },
  LC: {
    country_name: 'St. Lucia',
    dialling_code: '+1',
  },
  SD: {
    country_name: 'Sudan',
    dialling_code: '+249',
  },
  SR: {
    country_name: 'Suriname',
    dialling_code: '+597',
  },
  SZ: {
    country_name: 'Swaziland',
    dialling_code: '+268',
  },
  SE: {
    country_name: 'Sweden',
    dialling_code: '+46',
  },
  CH: {
    country_name: 'Switzerland',
    dialling_code: '+41',
  },
  SY: {
    country_name: 'Syria',
    dialling_code: '+963',
  },
  TW: {
    country_name: 'Taiwan',
    dialling_code: '+886',
  },
  TJ: {
    country_name: 'Tajikistan',
    dialling_code: '+992',
  },
  TZ: {
    country_name: 'Tanzania',
    dialling_code: '+255',
  },
  TH: {
    country_name: 'Thailand',
    dialling_code: '+66',
  },
  BS: {
    country_name: 'The Bahamas',
    dialling_code: '+1',
  },
  GM: {
    country_name: 'The Gambia',
    dialling_code: '+220',
  },
  TL: {
    country_name: 'Timor-Leste',
    dialling_code: '+670',
  },
  TG: {
    country_name: 'Togo',
    dialling_code: '+228',
  },
  TK: {
    country_name: 'Tokelau',
    dialling_code: '+690',
  },
  TO: {
    country_name: 'Tonga',
    dialling_code: '+676',
  },
  TT: {
    country_name: 'Trinidad and Tobago',
    dialling_code: '+1',
  },
  TN: {
    country_name: 'Tunisia',
    dialling_code: '+216',
  },
  TR: {
    country_name: 'Turkey',
    dialling_code: '+90',
  },
  TM: {
    country_name: 'Turkmenistan',
    dialling_code: '+993',
  },
  TC: {
    country_name: 'Turks and Caicos Islands',
    dialling_code: '+1',
  },
  TV: {
    country_name: 'Tuvalu',
    dialling_code: '+688',
  },
  UG: {
    country_name: 'Uganda',
    dialling_code: '+256',
  },
  UA: {
    country_name: 'Ukraine',
    dialling_code: '+380',
  },
  AE: {
    country_name: 'United Arab Emirates',
    dialling_code: '+971',
  },
  GB: {
    country_name: 'United Kingdom',
    dialling_code: '+44',
  },
  US: {
    country_name: 'United States',
    dialling_code: '+1',
  },
  UY: {
    country_name: 'Uruguay',
    dialling_code: '+598',
  },
  VI: {
    country_name: 'US Virgin Islands',
    dialling_code: '+1',
  },
  UZ: {
    country_name: 'Uzbekistan',
    dialling_code: '+998',
  },
  VU: {
    country_name: 'Vanuatu',
    dialling_code: '+678',
  },
  VA: {
    country_name: 'Vatican City',
    dialling_code: '+39',
  },
  VE: {
    country_name: 'Venezuela',
    dialling_code: '+58',
  },
  VN: {
    country_name: 'Vietnam',
    dialling_code: '+84',
  },
  WF: {
    country_name: 'Wallis and Futuna',
    dialling_code: '+681',
  },
  YE: {
    country_name: 'Yemen',
    dialling_code: '+967',
  },
  ZM: {
    country_name: 'Zambia',
    dialling_code: '+260',
  },
  ZW: {
    country_name: 'Zimbabwe',
    dialling_code: '+263',
  },
}

const EMOJIES = [
  {
    title: 'Thích',
    icon: likeEmoji,
  },
  {
    title: 'Yêu Thích',
    icon: loveEmoji,
  },
  {
    title: 'Haha',
    icon: hahaEmoji,
  },
  {
    title: 'WoW',
    icon: wowEmoji,
  },
  {
    title: 'Buồn',
    icon: cryEmoji,
  },
  {
    title: 'Phẫn Nộ',
    icon: angryEmoji,
  },
]

export { apiURL, COUNTRY_CODE, EMOJIES }
