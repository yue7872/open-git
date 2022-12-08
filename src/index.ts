import { exec } from 'child_process'
import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('open-git', () => {
    const openWindow = window.createTerminal('gitOpen')
    const projectRoot = workspace.workspaceFolders![0].uri.path

    exec(`cd ${projectRoot} && git config --get remote.origin.url`, (err, stdout) => {
      if (err) {
        window.showInformationMessage(err.message)
        return
      }

      // ssh地址转换为https地址
      const gitUrl = stdout.replace('.git', '').replace('.com:', '.com/').replace('git@', 'https://')

      openWindow.sendText(`open ${gitUrl}`)
      openWindow.show()
      window.showInformationMessage('已在浏览器打开git仓库')
    })
  })

  context.subscriptions.push(disposable)
}
export function deactivate() {

}
