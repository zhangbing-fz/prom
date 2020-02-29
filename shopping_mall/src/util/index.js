export const checkOpened = function(opened, fullpath) {
  for (var i = 0; i < opened.length; i++) {
    if (opened[i].path == fullpath) {
      return opened[i]
    }
  }
  return false
}
