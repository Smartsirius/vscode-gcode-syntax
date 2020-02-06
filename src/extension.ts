import * as vscode from 'vscode';
import { config } from './util/config';
import * as consts from './util/constants';

import { GCodeTreeProvider } from './providers/gcodeTree';
//import { getColorization } from './colorization';

const name = consts.name;
const version = consts.version;

// Create output channel
const conout = vscode.window.createOutputChannel("G-Code");

export function activate(context: vscode.ExtensionContext) {

    conout.show(true);
    conout.appendLine(name + " v" + version + " activated.");

    // G-Code Tree View
    const gcodeTree = new GCodeTreeProvider(context);
    vscode.window.registerTreeDataProvider('gcodeTree', gcodeTree);

    vscode.commands.registerCommand('gcodeTree.refreshEntry', () => gcodeTree.refresh());
    vscode.commands.registerCommand('extension.gcodeSelection', range => gcodeTree.select(range));

    conout.appendLine("G-Code Tree View Enabled");
    conout.appendLine('Tree AutoRefresh: ' + (config.getParam('treeAutoRefresh') ? 'Enabled' : 'Disabled') );

    /*


    if (gcodeconf.colorization) {

        // Gcode Configuration is on

        console.log('gcode.colorization:' + gcodeconf.colorization);

    }

    


    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {

            if (e.affectsConfiguration('gcode.colorization')) {

                // Get Configuration
                let gcodeconf: vscode.WorkspaceConfiguration = util.getConfig();
             
                console.log('gcode.colorization:' + gcodeconf.colorization);
            
                if (vscode.workspace.getConfiguration().get('gcode.colorization')) {
                    console.log('toggle on');

                    let colors = getColorization();

                    if (vscode.workspace.getConfiguration().has('editor.tokenColorCustomizations')) {
                        let tokenColors = vscode.workspace.getConfiguration('editor.tokenColorCustomization');
                        console.log('Storing User Colorization');
                        let userColors = util.storeUserTokenColorCustomizations(tokenColors);
                    }

                    console.log('No textMateRules. Adding colorization\n' + colors)
                    
                    // textMateRules doesn't exist so add it
                    vscode.workspace.getConfiguration().update(
                        'editor.tokenColorCustomizations',
                        {
                            "textMateRules": colors
                        },
                        vscode.ConfigurationTarget.Global
                    );
                    console.log('Added.');
                    console.log(vscode.workspace.getConfiguration('editor.tokenColorCustomization').has('textMateRules'));

                } else {
                    console.log('toggle off');
                    vscode.workspace.getConfiguration().update(
                        'editor.tokenColorCustomizations',
                        undefined,
                        vscode.ConfigurationTarget.Global
                    );
                    console.log('Removed');
                    console.log(vscode.workspace.getConfiguration('editor.tokenColorCustomization').has('textMateRules'));
                }
            }

    }));*/
}

export function deactivate() {

    conout.dispose();
}