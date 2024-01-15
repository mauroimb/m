function tag_bind(dis) {
    dis.tag = tag.bind(dis)
}


function tag(TAG) {
    if (!TAG || typeof TAG != 'string') throw new Error('missing TAG or wrong type')

    return {
        log: (...args) => {
            if (this.file.tags.includes(TAG)) { this._file_log(...args) }
            if (this.console.tags.includes(TAG)) { this._console_log(...args) }
            return true
        },
        func: (fname, ...args) => {
            if (this.functions.tags.includes(TAG)) { this.func(fname, ...args) }
        },
        set: {
            console: () => this.console.tags.push(TAG),
            file: () => this.file.tags.push(TAG),
            functions: () => this.functions.tags.push(TAG)
        },
        unset: {
            console: () => this.removeElement(TAG, this.console.tags),
            file: () => this.removeElement(TAG, this.file.tags),
            functions: () => this.removeElement(TAG, this.functions.tags)
        },
        unsetAll: {
            console: () => this.console.tags = [],
            file: () => this.file.tags = [],
            functions: () => this.functions.tags = []
        },
        crono: {
            start: () => this.crono.start(TAG),
            stop: () => this.crono.stop(TAG)
        }
    }

}

module.exports = tag_bind



