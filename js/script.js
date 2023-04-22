

// addEventListener('load', async () => {
//     // updateLinks()
//     const queryOpts = { name: 'clipboard-read', allowWithoutGesture: false };
//     const permissionStatus = await navigator.permissions.query(queryOpts);
//     // Will be 'granted', 'denied' or 'prompt':
//     console.log(permissionStatus.state);

//     // Listen for changes to the permission state
//     permissionStatus.onchange = () => {
//         console.log(permissionStatus.state);
//     };
//     //startObserver()
// })

// // function startObserver() {
// //     try {
// //         const observer = new MutationObserver(updateLinks)
// //         observer.observe(document.body, {childList: true, subtree: true, attributes: true})
// //     } 
// //     catch (error) {
// //         console.log(error)
// //     }
// // }

// // function updateLinks() {
// //     let uncheckedLinks = document.querySelectorAll('a[href^="https://d.docs.live.net"][href*=".one"]:not([data-kuba-checked]')

// //     for(let link of uncheckedLinks) {
// //         link.href = `onenote:${link.href}`
// //         link.dataset.kubaChecked = true
// //     }
// // }

// document.addEventListener('paste', async (e) => {
//     // await navigator.clipboard.writeText(`aaaa`)
//     const text = await navigator.clipboard.readText();
//     await navigator.clipboard.writeText(`${text}aaaa`)
//     e.preventDefault();
//     console.log('Pasted text: ', text);
// });


// function log(result) {
//     console.log(result)
// }

// async function dummy() {
//     // console.log(navigator.clipboard)
//     // promise = navigator.clipboard.read().then(log, log)
//     // console.log(promise)
//     // promise.then(result)

//     try {
//         const text = await navigator.clipboard.readText();
//         // console.log('Pasted content: ', text);
//         await navigator.clipboard.writeText(`${text}aaaa`)
//         // await navigator.clipboard.write([
//         //     new ClipboardItem({
//         //         ['text/plain']: 'aaaaa'
//         //     })
//         // ]);
//     } catch (err) {
//         console.error('Failed to read clipboard contents: ', err);
//     }



//     // try {
//     //     const clipboardItems = await navigator.clipboard.read();

//     //     for (const clipboardItem of clipboardItems) {
//     //       for (const type of clipboardItem.types) {
//     //         const blob = await clipboardItem.getType(type)
//     //         // we can now use blob here
//     //         console.log(blob)
//     //         console.log(blob.text())
//     //         console.log(blob.size())
//     //         console.log(blob.type())
//     //         console.log(clipboardItem)
//     //       }
//     //     }
//     //   } catch (err) {
//     //     console.error(err.name, err.message);
//     //   }
// }

// // document.onclick = dummy

// // async function copyPageUrl() {
// //     try {
// //       await navigator.clipboard.writeText(location.href);
// //       console.log('Page URL copied to clipboard');
// //     } catch (err) {
// //       console.error('Failed to copy: ', err);
// //     }
// //   }


document.addEventListener('paste', function (e) {
    var oldData = null, re=null;
    if (e.clipboardData.types.indexOf('text/html') > -1) {
        oldData = e.clipboardData.getData('text/html');
        re = /(.*)(<a\s+href="onenote:(https.*)">.*<\/a>)(.*\s*.*)(<a\s+href="https.*">.*<\/a>)(.*)/
        matches = re.exec(oldData) //.match(re)
        //re = /(.*)(<a\s+href="onenote:https.*").*\s*.*(<a\s+href=https.*")(.*)/g
        if (matches === null) {
            return
        }
        onenote_desktop_link = matches[3].replaceAll('&amp;', '&')
    } else if (e.clipboardData.types.indexOf('text/plain') > -1) {
        oldData = e.clipboardData.getData('text/plain');
        re = /(https?:.*one.*)\s*onenote:(https?.*one.*section-id=.*page-id=.*)/g
        matches = re.exec(oldData) //.match(re)
        if (matches === null) {
            return
        }
    onenote_desktop_link = matches[2]
    } else {
        return
    }
    e.preventDefault();
    window.document.execCommand('insertText', false, onenote_desktop_link);
    // var newData = '<b>Ha Ha!</b> ';
    // e.clipboardData.clearData()

    // Since we are canceling the paste operation, we need to manually
    // paste the data into the document.
    //   pasteClipboardData(newData);
    // e.clipboardData.setData('text/plain', newData)
    // e.clipboardData.setData('text/html', newData)
    // e.target.value = newData
    // t = e.target

    // This is necessary to prevent the default paste action.
    // document.execCommand('paste')
    // const selection = window.getSelection();
    // let element = document.activeElement
    // element.textContent

    // if (element) {

    //     element.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
    //     element.value = newData;
    //     element.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));
    //     element.dispatchEvent(new Event('change', {bubbles: true}));

    // }
    // selection.focusNode
    // if (!selection.rangeCount) return;
    // // selection.deleteFromDocument();
    // selection.getRangeAt(0).insertNode(document.createTextNode(newData));

});