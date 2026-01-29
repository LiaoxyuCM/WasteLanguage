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
        let bracketStack = [];

        for (let i = 0; i < code.length; i++) {
            let char = code[i];
            switch (char) {
                case '<': case '＜': saved = ptr; break;
                case '>': case '＞': ptr = saved; break;
                case '^': case '＾': ptr = Math.random() < 0.5 ? 0 : 1; break;
                case '@': case '＠': out = ''; break;
                case ',': case '，': out += code.slice(i + 1); i = code.length; break;
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
                case '!': case '！': return {status: 1, output: out}; break;
                case '[': case '［': 
                    bracketStack.push({ type: ']', position: i, currranges: 0 });
                    break;
                case ']': case '］':
                    if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== ']') {
                        return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                    } else {
                        if (bracketStack[bracketStack.length - 1].currranges > 0) {
                            bracketStack.pop();
                        } else {
                            bracketStack[bracketStack.length - 1].currranges++;
                            i = bracketStack[bracketStack.length - 1].position;
                        }
                    }
                    break;
                case '(': case '（': 
                    bracketStack.push({ type: ')', position: i });
                    if (Math.random() < 0.5) {
                        let innerBrackets = [{ type: '(', position: i }];
                        while (innerBrackets.length > 0) {
                            switch (code[++i]) {
                                case '(': case '（':
                                    innerBrackets.push({ type: '(', position: i });
                                    break;
                                case '{': case '｛':
                                    innerBrackets.push({ type: '}', position: i });
                                    break;
                                case '[': case '［':
                                    innerBrackets.push({ type: ']', position: i });
                                    break;
                                case ')': case '）': case ']': case '］': case '}': case '｝':
                                    let lb = innerBrackets.pop();
                                    if (innerBrackets.length === 0) {
                                        if (lb.type !== ')') {
                                            return {status: -1, message: 'Mismatched brackets at position ' + i};
                                        }
                                    }
                                    break;

                            }
                        }
                    };
                    break;
                case ')': case '）':
                    if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== ')') {
                        return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                    } 
                case '{': case '｛':
                    while (innerBrackets.length > 0) {
                        switch (code[++i]) {
                            case '(': case '（':
                                innerBrackets.push({ type: '(', position: i });
                                break;
                            case '{': case '｛':
                                innerBrackets.push({ type: '}', position: i });
                                break;
                            case '[': case '［':
                                innerBrackets.push({ type: ']', position: i });
                                break;
                            case ')': case '）': case ']': case '］': case '}': case '｝':
                                let lb = innerBrackets.pop();
                                if (innerBrackets.length === 0) {
                                    if (lb.type !== '}') {
                                        return {status: -1, message: 'Mismatched brackets at position ' + i};
                                    }
                                }
                                break;

                        }
                    }
                case '}': case '｝':
                    if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== '}') {
                        return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                    } 
            }

        }
        
        

        this.ptr=ptr;
        this.saved=saved;
        return {status: 0, output: out};
    }
}

