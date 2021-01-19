var sqlMap = {
    review: {
        select: 'select * from review'
    },
    admin: {
        select: 'select * from admin'
    },
    company: {
        add: 'insert into company (username, password) values (?,?)',
        select: 'select * from company'
    },
    content: {
        add: 'insert into content (username, title, text) values (?,?,?)',
        del: 'delete from content',
        select: 'select * from content'
    },
    access: {
        add: 'insert into access (title, text, username, reviewer) values (?,?,?,?)',
        del: 'delete from access',
        select: 'select * from access'
    }
}

module.exports = sqlMap;