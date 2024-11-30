import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { FileService } from './file.service';

@Command({
  name: 'hydrate',
  arguments: '[file]',
  description: 'Converts a file from JSON fromat to dev friendly format',
  argsDescription: {
    file: 'The file to be parsed from JSON to dev format',
  },
  options: { isDefault: true },
})


export class CliCommand extends CommandRunner {
  constructor(
    private readonly fileService: FileService
  ) {
    super();
  }
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    // Destructure the file argument from passedParams
    const [file] = passedParams;

    // Check if the file argument is provided
    if (!file) {
      console.error('Please provide a file to display its data.');
      return;
    }

    try {
      // Step 1: Read the file content (assuming it's JSON)
      const fileContent = await this.fileService.read(file);

      // Step 2: Parse the content if it's JSON (or show it as is)
      let parsedContent;
      try {
        parsedContent = JSON.parse(fileContent);
      } catch (err) {
        console.warn('The file is not a valid JSON. Displaying raw content...');
        parsedContent = fileContent;
      }

      // Step 3: Output the file content to the console
      // this.streamService.outputToConsole(parsedContent); // This could be a custom service or just `console.log()`

    } catch (error) {
      // Handle any error that occurs while reading the file
      console.error('Error reading or processing the file:', error.message);
    }
  }
}

