'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {RedCompletionProvider} from './providers/completionProvider';
import {RedHoverProvider} from './providers/hoverProvider';
import {RedDefinitionProvider} from './providers/definitionProvider';
import {RedReferenceProvider} from './providers/referenceProvider';
import {RedRenameProvider} from './providers/renameProvider';
import {RedSymbolProvider} from './providers/symbolProvider';

import * as path from 'path';
import * as settings from './common/configSettings'

const RED_MODE: vscode.DocumentFilter = { language: 'red', scheme: 'file' }
let outChannel: vscode.OutputChannel;
  
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    var rootDir = context.asAbsolutePath(".");
    var redSettings = new settings.RedSettings();
    outChannel = vscode.window.createOutputChannel('Red-Lang');
    outChannel.clear();

    context.subscriptions.push(vscode.languages.registerHoverProvider(RED_MODE, new RedHoverProvider(context)));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(RED_MODE, new RedCompletionProvider(context), '/'));
    //context.subscriptions.push(vscode.languages.registerDefinitionProvider(RED, new RedDefinitionProvider(context)));
    //context.subscriptions.push(vscode.languages.registerReferenceProvider(RED, new RedReferenceProvider(context)));
    //context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(RED, new RedSymbolProvider(context)));
    
	vscode.languages.setLanguageConfiguration(RED_MODE.language, {
		indentationRules: {
			// ^(.*\*/)?\s*\}.*$
			decreaseIndentPattern: /^(.*\*\/)?\s*\}.*$/,
			// ^.*\{[^}'']*$
			increaseIndentPattern: /^.*\{[^}'']*$/
		},
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
		comments: {
			lineComment: ';',
			blockComment: ['comment {', '}']
		},
		brackets: [
			['{', '}'],
			['[', ']'],
			['(', ')'],
		],

		__electricCharacterSupport: {
			brackets: [
				{ tokenType: 'delimiter.curly.ts', open: '{', close: '}', isElectric: true },
				{ tokenType: 'delimiter.square.ts', open: '[', close: ']', isElectric: true },
				{ tokenType: 'delimiter.paren.ts', open: '(', close: ')', isElectric: true }
			]
		},

		__characterPairSupport: {
			autoClosingPairs: [
				{ open: '{', close: '}' },
				{ open: '[', close: ']' },
				{ open: '(', close: ')' },
				{ open: '`', close: '`', notIn: ['string'] },
				{ open: '"', close: '"', notIn: ['string'] },
			]
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {
}