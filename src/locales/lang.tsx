import {useRouter} from 'next/router'
import {en} from './en.js'
import {es} from './es.js'
import {ru} from './ru.js'

export default function lang() {
    const locale = useRouter().locale
    if (locale==='es') {return es}
    else if (locale==='ru') {return ru}
    return en
}

/*export function translate (word, locale) {
    const t = router.locale === 'en' ? en : 'es'? es : ru
    const key_en = Object.values(en).find(word)
    const key_t = Object.keys(t).find(key_en)
    return t[key_t]? t[key_t] : word
}*/