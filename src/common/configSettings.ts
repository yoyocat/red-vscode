'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export interface IRedSettings {
    redPath: string;
    devOptions: any[];
}

export interface IAutoCompeteSettings {
    extraPaths: string[];
}

export class RedSettings implements IRedSettings {
    constructor() {
        vscode.workspace.onDidChangeConfiguration(() => {
            this.initializeSettings();
        });

        this.initializeSettings();
    }
    private initializeSettings() {
        var redSettings = vscode.workspace.getConfiguration("red");
        this.redPath = redSettings.get<string>("redPath");
        this.devOptions = redSettings.get<any[]>("devOptions");
        this.devOptions = Array.isArray(this.devOptions) ? this.devOptions : [];

        var autoCompleteSettings = redSettings.get<IAutoCompeteSettings>("autoComplete");
        if (this.autoComplete) {
            Object.assign<IAutoCompeteSettings, IAutoCompeteSettings>(this.autoComplete, autoCompleteSettings);
        }
        else {
            this.autoComplete = autoCompleteSettings;
        }
    }

    public redPath: string;
    public devOptions: any[];
    public autoComplete: IAutoCompeteSettings;
}