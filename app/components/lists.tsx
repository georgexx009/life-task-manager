import { Link } from "@remix-run/react";
import { Card, Heading } from "@radix-ui/themes";
import { List } from "~/types";

export function Lists({ lists }: { lists: List[] }) {
  return lists.map((list) => (
    <Link to={`/lists/${list.name}`}>
      <Card>
        <Heading size="4">{list.label}</Heading>
      </Card>
    </Link>
  ));
}
