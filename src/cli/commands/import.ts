import chalk from 'chalk';
import fs from 'node:fs/promises';
import { EOL } from 'node:os';
import { resolve } from 'node:path';

import {Offer} from '../../models/offer.js';
import {City, Facilities, HousingType, UserType} from '../../models/enums.js';
import {ICliCommand} from '../ICliCommand.js';

export class ImportCommand implements ICliCommand {
  public readonly name = 'import';

  public async printHelp() : Promise<void> {
    console.log('NAME:\n    "import" - Imports data from TSV-file\n');
    console.log(`USAGE:\n    ${chalk.bold('cli.js')} import ${chalk.blue('<path>')}\n`);
    console.log('ARGUMENTS:');
    console.log(`    ${chalk.bold('<path>')} - The path to the file from which you want to import data in tsv format`);
  }

  public async execute(...parameters: string[]) : Promise<void> {
    const content = await fs.readFile(resolve(parameters[0]), {encoding: 'utf-8'});
    const lines = content.split(EOL);

    for (const line of lines) {
      const [
        title,
        description,
        date,
        city,
        preview,
        images,
        premium,
        favorite,
        rating,
        housingType,
        roomCount,
        guestCount,
        facilities,
        authorName,
        authorAvatar,
        authorType,
        authorEmail,
        authorPassword,
        commentsCount,
        latitude,
        longitude,
        cost,
      ] = line.split('\t');
      const offer: Offer = {
        title: title,
        description: description,
        date: new Date(date),
        city: city as unknown as City,
        preview: preview,
        images: images.split(','),
        isPremium: premium as unknown as boolean,
        isFavourite: favorite as unknown as boolean,
        rating: parseFloat(rating),
        housingType: housingType as unknown as HousingType,
        roomCount: parseInt(roomCount, 10),
        guestCount: parseInt(guestCount, 10),
        cost: parseInt(cost, 10),
        facilities: facilities.split(',').map((x) => x as unknown as Facilities),
        author: {
          name: authorName,
          avatar: authorAvatar,
          type: authorType as unknown as UserType,
          email: authorEmail,
          password: authorPassword,
        },
        commentsCount: parseInt(commentsCount, 10),
        coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
      };

      console.log(JSON.stringify(offer));
    }
  }
}
