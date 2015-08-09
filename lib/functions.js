
/*
 *Remove potentially dangerous charaters from string to avoid XSS ans DB Injection
 */
sanitizeString = function(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
