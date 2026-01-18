export class Waste {
    constructor(){
        this.ptr=0;
        this.saved=0;
    }
    clearHistory() {
        this.ptr=0;
        this.saved=0;
    }
    async waste(code) {
        let ptr = this.ptr, saved = this.saved, out = '';

        async function walk(start, end) {
            for (let i = start; i < end; ) {
            const ch = code[i];
            switch (ch) {
                case '<': case '＜': saved = ptr; break;
                case '>': case '＞': ptr = saved; break;
                case '^': case '＾': ptr = Math.random() < 0.5 ? 0 : 1; break;
                case '@': case '＠': out = ''; break;
                case ',': case '，': out += code.slice(i + 1); return -1;
                case '#': case '＃': ptr = 0; break;
                case '+': case '＋': if (!isNaN(ptr)) ptr++; break;
                case '-': case '－': if (!isNaN(ptr)) ptr--; break;
                case '*': case '＊': if (!isNaN(ptr)) ptr *= 2; break;
                case '/': case '／': if (!isNaN(ptr)) ptr = Math.floor(ptr / 2); break;
                case '%': case '％': out += ptr; break;
                case '&': case '＆': alert('Breakpoint'); break;
                case '.': case '．': out += String.fromCharCode(ptr); break;
                case ':': case '：': out += '\n'; break;
                case '?': case '？': await new Promise(r => setTimeout(r, 1)); break;
                case '!': case '！': return -1;
                case '[': case '［': {
                let d = 1, j = i + 1;
                while (j < code.length && d) { const c = code[j]; if (c === '[' || c === '［') d++; if (c === ']' || c === '］') d--; j++; }
                for (let rep = 0; rep < 2; rep++) if ((await walk(i + 1, j - 1)) === -1) return -1;
                i = j - 1; break;
                }
                case '(' : case '（': {
                let d = 1, j = i + 1;
                while (j < code.length && d) { const c = code[j]; if (c === '(' || c === '（') d++; if (c === ')' || c === '）') d--; j++; }
                if (Math.random() < 0.5) { i++; break; }
                if ((await walk(i + 1, j - 1)) === -1) return -1;
                i = j - 1; break;
                }
                case '{': case '｛': {
                let d = 1, j = i + 1;
                while (j < code.length && d) { const c = code[j]; if (c === '{' || c === '｛') d++; if (c === '}' || c === '｝') d--; j++; }
                i = j - 1; break;
                }
            }
            i++;
            }
            return 0;
        }
        await walk(0, code.length);
        this.ptr=ptr;
        this.saved=saved;
        return out;
    }
}

