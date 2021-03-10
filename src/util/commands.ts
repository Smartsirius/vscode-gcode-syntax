/* eslint-disable max-classes-per-file */
/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Applied Eng & Design All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 * -------------------------------------------------------------------------------------------- */

'use strict';

import { ExtensionContext } from 'vscode';
import { ShowGCodeSettings } from './commands/showGCodeSettings';
import { ShowSupportGCode } from './commands/showSupportGCode';

export function registerCommands(context: ExtensionContext): void {
    context.subscriptions.push(new ShowGCodeSettings(), new ShowSupportGCode());
}
